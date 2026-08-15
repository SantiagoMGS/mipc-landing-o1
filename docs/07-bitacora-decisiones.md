# 07 — Bitácora de decisiones

> Registro de las decisiones con consecuencias del proyecto, con el motivo y la evidencia que
> las sustenta. El **qué** se hizo está en el historial de Git; aquí está el **por qué**.
>
> Cada entrada indica también qué la invalidaría, para que quien venga después pueda revisarla
> en lugar de heredarla a ciegas.

---

## D1 — Migrar de WordPress a sitio estático

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada

### Contexto

El sitio corría WordPress 6.1.12 con Elementor Pro 3.7.7 (julio 2022) junto a Elementor free
3.23.4 (agosto 2024). Dos años de desfase entre ambos, con errores de JavaScript ya visibles en
producción. Sin nadie administrando la instalación.

### Decisión

Reconstruir en Astro con salida estática.

### Por qué

| Factor | Peso |
|---|---|
| 8 páginas de contenido estático, sin catálogo ni usuarios | WordPress estaba sobredimensionado |
| Elementor Pro requiere licencia activa para actualizarse | Sin licencia, la vulnerabilidad es permanente |
| Nadie administra el sitio | El riesgo solo crece con el tiempo |
| Blog sin tocar desde abril de 2023 | La capacidad de "editar sin programador" no se estaba usando |

El argumento decisivo no fue técnico: **se estaban pagando todos los costos de WordPress sin
recibir ninguno de sus beneficios.**

### Resultado medido

| Métrica | Antes | Después |
|---|---:|---:|
| Peso de la portada | 3.300 KB | 201 KB |
| Peticiones | 79 | 16 |
| TTFB | 590 ms | 137 ms |
| Load | 2.860 ms | 177 ms |

### Qué la invalidaría

Que el negocio necesite funcionalidad dinámica real: reservas, área de cliente, catálogo con
inventario. Nada de eso está en el horizonte hoy.

---

## D2 — Actualizar a Astro 7 antes de escribir código

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada

### Contexto

Se instaló Astro 5.18.2 y `npm audit` reportó vulnerabilidades altas: XSS en varios vectores,
más `sharp` y `esbuild` afectados.

### Decisión

Migrar a Astro 7.2.2 con el proyecto recién creado.

### Por qué

El objetivo entero de la migración era eliminar deuda de seguridad. **Arrancar con
vulnerabilidades conocidas habría contradicho la razón de ser del proyecto.** Migrar un proyecto
de dos horas es barato; migrarlo dentro de un año, no.

Resultado: `found 0 vulnerabilities`.

---

## D3 — Servir SVG en lugar de raster para el logotipo

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada — *revierte una decisión anterior*

### Contexto

La conversión directa del kit vectorial producía un SVG de 96 KB. SVGO solo lograba quitar un
3,4 %, porque el archivo contenía **las cuatro variantes** del logotipo y solo estaban recortadas
por `viewBox`: formalmente, todo el contenido seguía en uso.

### Primera decisión (descartada)

Servir WebP generado desde el vector, y archivar el vector solo como fuente de impresión.
Razonable con 96 KB frente a 5 KB del WebP.

### Decisión final

Filtrar los trazos por posición para extraer cada variante como archivo independiente, y servir
SVG.

### Cómo se resolvió el filtrado

Tres trampas, en orden de aparición:

1. **Los degradados** se convierten en un rectángulo enorme recortado por un `clipPath`. Medir el
   rectángulo da media página.
2. **Los textos** van dentro de un recorte que es la hoja entera. Medir el recorte tampoco sirve.
3. **Trazos de fondo del tamaño de la página** se colaban en todas las variantes.

> La regla correcta resultó ser **contenido ∩ recorte**: para el degradado manda el recorte, para
> el texto manda el contenido. Los trazos de página completa se descartan por área.

### Resultado

96 KB → 10,5 KB, que con brotli quedan en **2,5 KB**: menos que el WebP equivalente y nítido a
cualquier resolución.

### Lección

La decisión original era correcta *con los datos disponibles en ese momento*. Cambió cuando
cambió el dato, no cuando cambió la opinión.

---

## D4 — Separar el color de marca del color de acción

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada

### Contexto

Aparecieron tres valores distintos para el mismo naranja:

| Fuente | Naranja | Fiabilidad |
|---|---|---|
| Vector de marca | `#FF461A` | ✅ Autoritativa |
| PNG del WordPress | `#E54D00` | Export degradado |
| CSS del sitio | `#EB3A00` | Elegido a ojo |

Al adoptar el del vector y medir contrastes, apareció un problema que **ya existía y nadie había
medido**: texto blanco a 17 px sobre el naranja de marca da 3,42:1, y sobre el naranja del sitio
anterior 4,09:1. El mínimo AA es 4,5:1. **Los botones nunca cumplieron.**

### Decisión

| Token | HEX | Uso | Contraste |
|---|---|---|---|
| `brand-500` | `#FF461A` | Logotipo, ondas, iconos, bordes | 3,42:1 |
| `brand-600` | `#D63F0F` | Fondo de botones con texto blanco | 4,59:1 |
| `brand-700` | `#B33200` | Texto y enlaces en línea | 6,23:1 |

### Por qué

Las alternativas eran peores:

- **Subir el tamaño de fuente a 19 px** para entrar en el umbral de "texto grande" — cambia el
  diseño para cumplir una norma, en vez de al revés.
- **Ignorarlo** — es lo que hacía el sitio anterior.
- **Cambiar el color de marca** — perder identidad por accesibilidad, cuando se pueden tener
  ambas.

La identidad se conserva: el naranja de marca sigue en el logotipo y los elementos gráficos. Solo
los fondos que llevan texto encima usan la variante oscurecida.

---

## D5 — Analítica con Consent Mode v2, no analítica sin cookies

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada · **Decidido por el cliente**

### Contexto

Se plantearon tres caminos: GA4 con banner de consentimiento, analítica sin cookies (Cloudflare
Web Analytics, Plausible), o solo dejar los eventos marcados sin conectar nada.

### Decisión

GA4 + Google Ads con Consent Mode v2 y banner.

### Por qué

El cliente eligió **máxima integración con Google Ads**. La analítica sin cookies evita el banner
pero se integra peor con Ads, y el plan es invertir en publicidad.

### Salvaguarda técnica

Sin `PUBLIC_GA4_ID` ni `PUBLIC_GOOGLE_ADS_ID` **no se emite una sola línea de Google en el HTML**,
ni aparece el banner. Verificado en cada build:

```
googletagmanager   False
consent-banner     False
gtag               False
dataLayer          False
```

Esto permitió desplegar antes de decidir sobre analítica, sin arrastrar nada.

### Consecuencia pendiente

Obligó a crear `/privacidad/`, que **requiere revisión jurídica** antes de publicar.

---

## D6 — Publicar precios y plazos concretos

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada — reparación · ⏳ Pendiente — otros 4 servicios

### Contexto

Las páginas de servicio tenían ~300 palabras contra las 900-1.400 que publican los competidores
del top-10 en Medellín.

### Decisión

Ampliar con información concreta —precio del diagnóstico, tiempo de entrega, marcas atendidas,
garantía— en vez de rellenar con texto genérico.

### Por qué

| Competidor típico | Esta página |
|---|---|
| "Consulta sin compromiso" | "$25.000, abonables a la reparación" |
| "Servicio rápido" | "Un día hábil" |
| "Reparamos computadores" | "Cualquier marca, incluido Apple" |

**La ambigüedad no protege el margen, solo pierde el cliente.** Alguien con el portátil dañado que
abre tres pestañas elige la que le responde.

### Regla que se siguió

**No se inventó ningún dato.** La primera versión quedó con respuestas genéricas y un comentario
listando los seis datos que faltaban. Solo cuando el cliente los confirmó se reemplazaron.

Las otras cuatro landings quedan con el mismo mecanismo: `TODO(contenido)` en el markdown con las
preguntas específicas de cada servicio.

---

## D7 — Cloudflare Workers en vez de Pages

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada · **Impuesta por la plataforma**

### Contexto

El plan era Cloudflare Pages, pero el asistente de Cloudflare ahora crea proyectos de **Workers**
por defecto. Pages quedó en modo mantenimiento para proyectos nuevos.

### Decisión

Quedarse en Workers con assets estáticos, añadiendo `wrangler.jsonc`.

### Consecuencias

- `_headers` y `_redirects` funcionan igual. Verificado: 9/9 redirecciones y 7/7 cabeceras.
- `not_found_handling: "404-page"` sirve el 404 propio.
- **`_redirects` no admite el código 404.** Hubo que quitar cuatro reglas que enviaban rutas de
  WordPress a `/404.html`; eran redundantes porque esas rutas ya no existen.
- Cloudflare inyecta `X-Robots-Tag: noindex` en todo `*.workers.dev`. Desaparece al conectar el
  dominio propio.

---

## D8 — No forzar 301 en la normalización de barra final

**Fecha:** 2026-08-14 · **Estado:** ✅ Aplicada — *decisión de no hacer*

### Contexto

`/servicios` redirige a `/servicios/` con **307** en lugar de 301. Es comportamiento por defecto
de Cloudflare Assets.

### Decisión

Dejarlo así.

### Por qué

Forzar 301 exigiría escribir una regla por cada página en `_redirects` y mantenerlas sincronizadas
con las rutas. Google sigue los 307 sin problema; el beneficio es marginal y el costo de
mantenimiento es permanente. **No toda observación de una auditoría merece acción.**

---

## Decisiones pendientes

| # | Decisión | Bloqueada por |
|---|---|---|
| P1 | Cambiar el DNS a Cloudflare | Verificar antes los registros MX del correo |
| P2 | Consolidar o separar `mipctecnologia.com` | Definición del cliente |
| P3 | Alinear el naranja del sitio al del logotipo en todos los usos | Criterio de marca |
| P4 | Publicar `/garantias/` y `/privacidad/` | Revisión jurídica |
| P5 | Ampliar las 4 landings restantes | Datos operativos del cliente |
