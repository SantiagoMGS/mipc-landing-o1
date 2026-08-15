/**
 * Genera la imagen Open Graph a partir del logotipo vectorial.
 *
 *   node scripts/generar-og.mjs
 *
 * Se ejecuta a mano: el resultado se versiona en public/og-default.jpg
 */
import sharp from 'sharp';
import { readFileSync } from 'node:fs';

const ANCHO = 1200;
const ALTO = 630;
const NARANJA = '#ff461a';
const GRAFITO = '#28303d';

// Onda inferior: mismo gesto que separa las secciones del sitio.
const fondo = `
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <rect width="${ANCHO}" height="${ALTO}" fill="#ffffff"/>
  <rect width="${ANCHO}" height="${ALTO}" fill="#fef2ea" opacity="0.75"/>
  <path d="M0,470 C300,540 600,540 900,500 C1050,480 1150,470 1200,478 L1200,630 L0,630 Z" fill="${GRAFITO}"/>
  <path d="M0,455 C300,525 600,525 900,485 C1050,465 1150,455 1200,463 L1200,485 C1150,477 1050,487 900,507 C600,547 300,547 0,477 Z" fill="${NARANJA}"/>
</svg>`;

const texto = `
<svg xmlns="http://www.w3.org/2000/svg" width="${ANCHO}" height="${ALTO}">
  <style>
    .titulo { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 700; fill: ${GRAFITO}; }
    .sub    { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 400; fill: #54595f; }
    .pie    { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 700; fill: #ffffff; }
    .pieTen { font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; font-weight: 400; fill: #adadad; }
  </style>
  <text class="titulo" x="80" y="310" font-size="58">Reparación de computadores</text>
  <text class="titulo" x="80" y="378" font-size="58">en <tspan fill="${NARANJA}">Medellín</tspan></text>
  <text class="sub" x="80" y="428" font-size="28">Soporte TI · Redes de datos · Cámaras de seguridad</text>
  <text class="pie" x="80" y="562" font-size="34">314 888 90 78</text>
  <text class="pieTen" x="330" y="562" font-size="26">Laureles - Estadio, Medellín · Desde 2009</text>
</svg>`;

const logo = await sharp(readFileSync('public/logo-mipc.svg'), { density: 600 })
  .resize({ width: 290 })
  .png()
  .toBuffer();

await sharp(Buffer.from(fondo))
  .composite([
    { input: logo, top: 72, left: 80 },
    { input: Buffer.from(texto), top: 0, left: 0 },
  ])
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile('public/og-default.jpg');

const { size, width, height } = await sharp('public/og-default.jpg').metadata();
console.log(`public/og-default.jpg  ${width}x${height}`);
