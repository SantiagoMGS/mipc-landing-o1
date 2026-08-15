/**
 * Genera los SVG de marca a partir del kit vectorial original.
 *
 *   node scripts/generar-svg-marca.mjs
 *
 * Requiere dependencias temporales (no van en package.json):
 *   npm install --no-save pdfjs-dist@2.16.105 @xmldom/xmldom svgo
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const { DOMImplementation, XMLSerializer } = require('@xmldom/xmldom');
const { optimize } = require('svgo');

const ORIGEN = 'src/assets/marca/vector/logo-kit.pdf';
const DESTINO = 'src/assets/marca/vector';
const ESCALA = 4;

/* ---------- 1. PDF -> SVG ---------- */

const impl = new DOMImplementation();
const docBase = impl.createDocument('http://www.w3.org/2000/svg', 'svg', null);
const ElementProto = Object.getPrototypeOf(docBase.documentElement);
if (!ElementProto.append) {
  ElementProto.append = function (...nodos) {
    for (const n of nodos) {
      this.appendChild(typeof n === 'string' ? this.ownerDocument.createTextNode(n) : n);
    }
  };
}
globalThis.document = { createElementNS: (ns, el) => impl.createDocument(ns, el, null).documentElement };
globalThis.XMLSerializer = XMLSerializer;

const pdfjs = require('pdfjs-dist/legacy/build/pdf.js');
const doc = await pdfjs.getDocument({ data: new Uint8Array(readFileSync(ORIGEN)) }).promise;
const page = await doc.getPage(1);
const viewport = page.getViewport({ scale: 1 });
const gfx = new pdfjs.SVGGraphics(page.commonObjs, page.objs);
gfx.embedFonts = true;
const svgCompleto = new XMLSerializer().serializeToString(await gfx.getSVG(await page.getOperatorList(), viewport));

const ALTO_PAGINA = viewport.height;

/* ---------- 2. Localizar las variantes ---------- */

const { data, info } = await sharp(Buffer.from(svgCompleto), { density: 72 * ESCALA })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const escala = viewport.height / info.height;

function bandas(umbralPt) {
  const filas = [];
  for (let y = 0; y < info.height; y++) {
    let tinta = false;
    for (let x = 0; x < info.width && !tinta; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 10) tinta = true;
    }
    filas.push(tinta);
  }
  const crudas = [];
  let ini = null;
  filas.forEach((t, i) => {
    if (t && ini === null) ini = i;
    if (!t && ini !== null) (crudas.push([ini, i - 1]), (ini = null));
  });
  if (ini !== null) crudas.push([ini, filas.length - 1]);

  const out = [];
  for (const b of crudas) {
    const u = out[out.length - 1];
    if (u && (b[0] - u[1]) * escala < umbralPt) u[1] = b[1];
    else out.push([...b]);
  }
  return out;
}

const variantes = bandas(10);

/* ---------- 3. Filtrar los trazos de cada variante ---------- */

const defsTexto = svgCompleto.match(/<svg:defs>([\s\S]*?)<\/svg:defs>/)?.[1] ?? '';
const cuerpo = svgCompleto.match(/<svg:g transform="matrix\(1 0 0 -1 0 [\d.]+\)">([\s\S]*)<\/svg:g><\/svg:svg>/)?.[1] ?? '';

/** Separa los hijos directos del grupo raiz respetando el anidamiento. */
function trozos(xml) {
  const out = [];
  let i = 0;
  while (i < xml.length) {
    if (xml[i] !== '<') { i++; continue; }
    const cierreEtiqueta = xml.indexOf('>', i);
    const etiqueta = xml.slice(i, cierreEtiqueta + 1);
    const nombre = etiqueta.match(/^<([\w:]+)/)[1];
    if (etiqueta.endsWith('/>')) {
      out.push(xml.slice(i, cierreEtiqueta + 1));
      i = cierreEtiqueta + 1;
      continue;
    }
    let profundidad = 1;
    let j = cierreEtiqueta + 1;
    while (profundidad > 0 && j < xml.length) {
      const sig = xml.indexOf('<', j);
      if (sig < 0) break;
      const fin = xml.indexOf('>', sig);
      const t = xml.slice(sig, fin + 1);
      if (t.startsWith(`</${nombre}`)) profundidad--;
      else if (t.startsWith(`<${nombre}`) && !t.endsWith('/>')) profundidad++;
      j = fin + 1;
    }
    out.push(xml.slice(i, j));
    i = j;
  }
  return out;
}

const defsPorId = {};
for (const m of defsTexto.matchAll(/<svg:(clipPath|linearGradient|radialGradient|mask)[^>]*id="([^"]+)"[\s\S]*?<\/svg:\1>/g)) {
  defsPorId[m[2]] = m[0];
}

const numeros = (s) => (s.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);

/** Caja del trozo en coordenadas de pantalla.
 *  Lo visible es contenido ∩ recorte: el rect de un degradado se sale a
 *  proposito, y el recorte de un texto suele ser la pagina entera. */
function caja(trozo) {
  const ids = [...trozo.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
  const recortes = ids.map((id) => defsPorId[id]).filter((d) => d && d.includes('clipPath'));

  const tr = trozo.match(/transform="(matrix|translate)\(([-\d.\s]+)\)"/);
  let ex = 1;
  let ey = 1;
  let tx = 0;
  let ty = 0;
  if (tr) {
    const v = numeros(tr[2]);
    if (tr[1] === 'matrix') {
      ex = v[0] ?? 1;
      ey = v[3] ?? 1;
      tx = v[4] ?? 0;
      ty = v[5] ?? 0;
    } else {
      tx = v[0] ?? 0;
      ty = v[1] ?? 0;
    }
  }

  const puntos = (fuente, sx, sy, dx, dy) => {
    const xs = [];
    const ys = [];
    for (const d of fuente.matchAll(/\sd="([^"]+)"/g)) {
      const n = numeros(d[1]);
      for (let k = 0; k + 1 < n.length; k += 2) {
        xs.push(dx + sx * n[k]);
        ys.push(dy + sy * n[k + 1]);
      }
    }
    for (const r of fuente.matchAll(/<svg:rect[^>]*\sx="(-?[\d.]+)"[^>]*\sy="(-?[\d.]+)"[^>]*width="(-?[\d.]+)"[^>]*height="(-?[\d.]+)"/g)) {
      const [x, y, w, h] = [Number(r[1]), Number(r[2]), Number(r[3]), Number(r[4])];
      xs.push(dx + sx * x, dx + sx * (x + w));
      ys.push(dy + sy * y, dy + sy * (y + h));
    }
    return { xs, ys };
  };

  const c = puntos(trozo, ex, ey, tx, ty);
  const r = recortes.length ? puntos(recortes.join(''), 1, 1, 0, 0) : null;

  const rango = (arr) => [Math.min(...arr), Math.max(...arr)];
  const cruce = (a, b) => {
    const lo = Math.max(a[0], b[0]);
    const hi = Math.min(a[1], b[1]);
    return lo <= hi ? [lo, hi] : null;
  };

  if (!c.ys.length && !r) return null;

  let X = c.xs.length ? rango(c.xs) : null;
  let Y = c.ys.length ? rango(c.ys) : null;

  if (r && r.ys.length) {
    const RX = rango(r.xs);
    const RY = rango(r.ys);
    X = X ? cruce(X, RX) : RX;
    Y = Y ? cruce(Y, RY) : RY;
  }
  if (!X || !Y) return null;

  // El grupo raiz invierte el eje vertical.
  return { x: X, y: [ALTO_PAGINA - Y[1], ALTO_PAGINA - Y[0]] };
}

const piezas = trozos(cuerpo)
  .map((t) => ({ xml: t, caja: caja(t) }))
  // pdfjs emite trazos del tamano de la pagina para el fondo: no son arte.
  .filter((p) => {
    if (!p.caja) return false;
    const anchoCompleto = p.caja.x[1] - p.caja.x[0] > viewport.width * 0.9;
    const altoCompleto = p.caja.y[1] - p.caja.y[0] > ALTO_PAGINA * 0.9;
    return !(anchoCompleto && altoCompleto);
  });

if (process.env.DEBUG) {
  console.log(`piezas utiles: ${piezas.length}`);
}

function construir(y0px, y1px, { margen = 3, soloNaranja = false, cuadrado = false } = {}) {
  const yTop = y0px * escala - margen;
  const yBot = y1px * escala + margen;

  let usados = piezas.filter((p) => p.caja.y[1] >= yTop && p.caja.y[0] <= yBot);

  if (soloNaranja) {
    const naranja = (p) => {
      const ids = [...p.xml.matchAll(/url\(#([^)]+)\)/g)].map((m) => m[1]);
      const texto = p.xml + ids.map((id) => defsPorId[id] ?? '').join('');
      return [...texto.matchAll(/#([0-9a-f]{6})/gi)].some((m) => {
        const n = parseInt(m[1], 16);
        return (n >> 16) > 0xd0 && ((n >> 8) & 255) < 0x90;
      });
    };
    usados = usados.filter(naranja);
  }

  const ids = new Set();
  for (const p of usados) for (const m of p.xml.matchAll(/url\(#([^)]+)\)/g)) ids.add(m[1]);

  let x0 = Math.min(...usados.map((p) => p.caja.x[0])) - margen;
  let x1 = Math.max(...usados.map((p) => p.caja.x[1])) + margen;
  let yA = yTop;
  let yB = yBot;

  if (cuadrado) {
    const w = x1 - x0;
    const h = yB - yA;
    const lado = Math.max(w, h) * 1.12;
    const cx = (x0 + x1) / 2;
    const cy = (yA + yB) / 2;
    x0 = cx - lado / 2;
    x1 = cx + lado / 2;
    yA = cy - lado / 2;
    yB = cy + lado / 2;
  }

  const defs = [...ids].map((id) => defsPorId[id]).filter(Boolean).join('');
  const svg =
    `<svg:svg version="1.1" viewBox="${x0.toFixed(2)} ${yA.toFixed(2)} ${(x1 - x0).toFixed(2)} ${(yB - yA).toFixed(2)}" xmlns:svg="http://www.w3.org/2000/svg">` +
    `<svg:defs>${defs}</svg:defs>` +
    `<svg:g transform="matrix(1 0 0 -1 0 ${ALTO_PAGINA})">${usados.map((p) => p.xml).join('')}</svg:g>` +
    `</svg:svg>`;

  const plano = svg.replace(/svg:/g, '').replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
  return optimize(plano, { multipass: true, floatPrecision: 2 }).data;
}

/* ---------- 4. Escribir ---------- */

mkdirSync(DESTINO, { recursive: true });

const nombres = ['logo-reparamos', 'logo-tecnologia-espaciado', 'logo-dominio', 'logo-tecnologia'];
variantes.forEach(([a, b], i) => {
  const svg = construir(a, b);
  writeFileSync(`${DESTINO}/${nombres[i]}.svg`, svg);
  console.log(`${nombres[i].padEnd(28)} ${(svg.length / 1024).toFixed(1)} KB`);
});

// Isotipo: la variante compacta sin su descriptor.
const sub = (() => {
  const [a, b] = variantes[3];
  const filas = [];
  for (let y = a; y <= b; y++) {
    let tinta = false;
    for (let x = 0; x < info.width && !tinta; x++) {
      if (data[(y * info.width + x) * info.channels + 3] > 10) tinta = true;
    }
    filas.push(tinta);
  }
  const cr = [];
  let ini = null;
  filas.forEach((t, i) => {
    if (t && ini === null) ini = i;
    if (!t && ini !== null) (cr.push([ini, i - 1]), (ini = null));
  });
  if (ini !== null) cr.push([ini, filas.length - 1]);
  const out = [];
  for (const x of cr) {
    const u = out[out.length - 1];
    if (u && (x[0] - u[1]) * escala < 3) u[1] = x[1];
    else out.push([...x]);
  }
  return out.map(([p, q]) => [p + a, q + a]);
})();

const iso = construir(sub[0][0], sub[sub.length - 2][1]);
writeFileSync(`${DESTINO}/isotipo.svg`, iso);
console.log(`${'isotipo'.padEnd(28)} ${(iso.length / 1024).toFixed(1)} KB`);

// Favicon: solo el bloque naranja, en cuadrado. El wordmark completo es
// ilegible a 32 px.
const fav = construir(sub[0][0], sub[sub.length - 2][1], { soloNaranja: true, cuadrado: true });
writeFileSync('public/favicon.svg', fav);
console.log(`${'public/favicon.svg'.padEnd(28)} ${(fav.length / 1024).toFixed(1)} KB`);

// El logotipo que usa el sitio, servido tal cual.
writeFileSync('public/logo-mipc.svg', readFileSync(`${DESTINO}/logo-tecnologia-espaciado.svg`));
