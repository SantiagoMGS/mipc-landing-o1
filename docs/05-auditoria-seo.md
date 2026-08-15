# Auditoría SEO — MiPC Tecnología

**URL auditada:** `https://f330ce5d-mipc-landing-o1.santiago-martinez.workers.dev/`
**Dominio de destino:** `https://mipc.com.co`
**Fecha:** 14 de agosto de 2026
**Alcance:** 16 páginas rastreadas (100 % del sitemap), cabeceras HTTP, redirecciones
heredadas, JSON-LD, peso de assets, y comparación con el sitio WordPress que aún ocupa
el dominio.

---

## 1. Puntuación SEO global: **66 / 100**

| Categoría | Peso | Nota | Aporte |
|---|---:|---:|---:|
| SEO técnico | 22 % | 70 | 15,4 |
| Calidad de contenido | 23 % | 45 | 10,4 |
| On-page | 20 % | 72 | 14,4 |
| Schema / datos estructurados | 10 % | 78 | 7,8 |
| Rendimiento (CWV) | 10 % | 92 | 9,2 |
| Preparación para búsqueda con IA | 10 % | 50 | 5,0 |
| Imágenes | 5 % | 80 | 4,0 |
| **Total** | | | **66** |

**Tipo de negocio detectado:** servicio local B2B/B2C híbrido (local service con dirección
física en Laureles-Estadio + área de servicio en Medellín y área metropolitana).

### Lectura rápida

La **base técnica es de primer nivel**: 253 KB de peso total, cero JavaScript de terceros,
fuentes autoalojadas, WebP en todas las imágenes, schema correcto y 17 redirecciones 301
de la migración WordPress ya escritas y verificadas. Eso está mejor que la mayoría de la
competencia local.

Lo que impide posicionar hoy son **dos cosas, y solo dos**: el sitio no está en el dominio,
y el contenido es demasiado delgado para competir. Todo lo demás es pulido.

---

## 2. Hallazgos críticos

### C1 — El sitio no es indexable: sigue en el subdominio de preview

Cloudflare añade automáticamente la cabecera `X-Robots-Tag: noindex` a **todo** lo servido
desde `*.workers.dev`. Verificado en la respuesta:

```
HTTP/2 200
X-Robots-Tag: noindex
```

Ninguna página puede entrar en el índice mientras viva ahí. Además, todos los `canonical`
apuntan a `https://mipc.com.co/...`, que **hoy sirve un sitio distinto**: WordPress 6.1.12
sobre LiteSpeed/Hostinger (`89.117.7.139`), con título `mipc.com.co – Tecnología, reparación
de computadores` y su propio `wp-sitemap.xml` de 13 URLs.

O sea: el sitio nuevo está terminado y apuntando a un dominio que todavía sirve el sitio viejo.

**Cómo saber si falló:** tras conectar el dominio, `curl -I https://mipc.com.co/` no debe
devolver `X-Robots-Tag`, y la respuesta debe traer `Server: cloudflare`.

**Indicador a vigilar:** cobertura en Search Console; se esperan 15 URLs indexadas
(17 del sitemap menos `/gracias/` y `/resena/`) en 2–4 semanas.

---

### C2 — La cabecera `X-Robots-Tag` no está bajo control propio

El archivo `public/_headers` define CSP, HSTS y cacheo, pero **no** declara nada sobre
robots. Hoy la cabecera la pone Cloudflare; cuando se migre desaparecerá sola, pero conviene
no dejarlo al azar en despliegues de preview futuros.

**Riesgo real:** si algún día se publica una rama de preview con dominio propio, quedará
indexable sin querer y competirá con producción.

---

## 3. Hallazgos de prioridad alta

### A1 — Contenido muy por debajo del umbral competitivo

| Página | Palabras | Umbral recomendado |
|---|---:|---:|
| `/` | 463 | 800–1.200 |
| `/servicios/reparacion-de-computadores/` | 327 | 900–1.400 |
| `/servicios/redes-de-datos/` | 336 | 900–1.400 |
| `/servicios/mesa-de-ayuda/` | 315 | 900–1.400 |
| `/servicios/camaras-de-seguridad/` | 315 | 900–1.400 |
| `/servicios/alquiler-de-computadores/` | 299 | 900–1.400 |
| `/servicios/` | 352 | 600–900 |
| `/blog/` (1 solo artículo) | 198 | — |

*(Conteo sobre texto renderizado, incluye cabecera y pie; el cuerpo real de cada servicio
son ~180–220 palabras según los `.md` en `src/content/servicios/`.)*

Los competidores que ocupan el top-10 en Medellín —
[TI Rescue](https://tirescue.com/reparacion-de-computadores/),
[Comsoport](https://comsoport.com/),
[Reparaciones JD](https://reparacionesjd.com.co/medellin/laureles/),
[Expertos Digitales](https://www.expertosdigitales.net/) —
publican páginas de servicio largas, con listados de síntomas, marcas atendidas, precios
orientativos, tiempos de respuesta y páginas por barrio. Con 300 palabras no se compite
contra eso, por muy limpio que esté el HTML.

**Cómo saber si falló:** si a los 3 meses de indexar, ninguna página de servicio aparece
en el top-30 para su keyword principal, el problema es profundidad de contenido, no técnica.

---

### A2 — Canibalización: `/` y `/servicios/reparacion-de-computadores/` comparten título exacto

Ambas usan `Reparación de Computadores en Medellín | MiPC Tecnología`. Google tendrá que
elegir una y probablemente elija la equivocada.

**Origen:** `SITE.defaultTitle` en `src/consts.ts:12` coincide literalmente con `seoTitle`
en `src/content/servicios/reparacion-de-computadores.md`.

**Arreglo:** diferenciar por intención. La home debe capturar la marca + el paraguas de
servicios; la página de servicio, la keyword transaccional.

- Home → `MiPC Tecnología | Soporte TI y Reparación de Computadores en Medellín`
- Servicio → `Reparación de Computadores en Medellín a Domicilio | MiPC Tecnología`

---

### A3 — El H1 de la home no contiene la keyword ni la ciudad

Actual: `Nosotros reparamos tu computador` (`src/pages/index.astro:26`).

Es buen copy y mal H1. Falta el «dónde», que es justo lo que decide una búsqueda local.

**Propuesta:** `Reparación de computadores en Medellín` como H1, y mover
«Nosotros reparamos tu computador» al kicker superior o a un subtítulo. El texto ya presente
en el kicker (`Laureles - Estadio, Medellín · Desde 2009`) es correcto y debe mantenerse.

---

### A4 — La imagen Open Graph devuelve 404

`Seo.astro:22` usa `/og-default.jpg` como imagen por defecto en las 16 páginas.
El archivo no existe:

```
/og-default.jpg -> 404
```

Cada vez que alguien comparta el sitio en WhatsApp, Facebook o LinkedIn no habrá previsualización.
Para un negocio cuyo canal principal es WhatsApp, esto cuesta clics reales.

**Arreglo:** generar `public/og-default.jpg` a 1200×630 (marca + claim + teléfono), y
opcionalmente una OG por servicio.

---

### A5 — El sitemap incluye páginas marcadas `noindex`

`/gracias/` y `/resena/` llevan `<meta name="robots" content="noindex, nofollow">` — correcto —
pero aparecen en `sitemap-0.xml`. Es una señal contradictoria que Search Console reporta como
«Página indexada aunque bloqueada» o «Excluida por etiqueta noindex».

**Arreglo** en `astro.config.mjs`:

```js
integrations: [
  sitemap({
    i18n: undefined,
    filter: (page) => !['/gracias/', '/resena/'].some((p) => page.endsWith(p)),
  }),
],
```

---

## 4. Hallazgos de prioridad media

### M1 — LocalBusiness incompleto para el paquete local

El JSON-LD (`src/components/Seo.astro:29-51`) está bien construido pero le faltan campos
que Google usa para conciliar el sitio con la ficha de Google Business Profile:

| Campo faltante | Por qué importa |
|---|---|
| `geo` (latitud/longitud) | Refuerza la asociación geográfica del negocio |
| `postalCode` | Ya está marcado como TODO en `consts.ts:37` |
| `@type` más específico | `LocalBusiness` genérico → considerar `ProfessionalService` con `additionalType` apuntando al concepto de reparación informática |
| `aggregateRating` | Solo si hay reseñas reales y verificables en la ficha; nunca inventadas |
| `sameAs` con el enlace de GBP | Actualmente solo Facebook e Instagram |
| `hasOfferCatalog` | Enlaza los 5 servicios desde el nodo del negocio |

Además, los nodos `Service` de las páginas de servicio deberían referenciar al negocio con
`"provider": { "@id": "https://mipc.com.co/#business" }` para formar un grafo coherente.

### M2 — Normalización de barra final con 307 en vez de 301

```
/servicios  -> 307 Location: /servicios/
/index.html -> 307
```

Google sigue el 307 sin problema, pero el 301 consolida mejor y evita una comprobación
repetida en cada rastreo. Es un comportamiento por defecto de Cloudflare Assets; se puede
forzar con una regla en `_redirects` si se quiere ser estricto.

### M3 — Enlazado interno completamente plano

Las 14 páginas indexables reciben exactamente **16 enlaces internos cada una**, todos desde
el menú y el pie. No hay enlaces contextuales dentro del cuerpo del texto, y el único
artículo del blog solo recibe 2 enlaces.

Con 15 páginas no es grave, pero significa que no hay jerarquía temática: Google no distingue
qué página es la importante. Al crecer el blog se vuelve un problema real.

**Arreglo:** enlaces contextuales dentro del cuerpo. Ejemplo: en el artículo del disco duro,
enlazar «cambio de disco duro» → `/servicios/reparacion-de-computadores/`; en cámaras,
enlazar «cableado» → `/servicios/redes-de-datos/`.

### M4 — Sin migas de pan visibles

El `BreadcrumbList` en JSON-LD está presente en las 5 páginas de servicio, pero no hay
migas visibles en la interfaz. Google recomienda que el marcado corresponda a contenido
visible en la página.

### M5 — Preparación para búsqueda con IA (GEO) baja

- No hay `llms.txt` (opcional; Google Search lo ignora, pero algunos rastreadores de IA lo leen).
- El contenido no está estructurado en pasajes citables: faltan bloques de pregunta-respuesta
  directos, definiciones y datos concretos (precios orientativos, tiempos de respuesta,
  cobertura por barrio) que los modelos puedan extraer y atribuir.
- Sin `llms.txt` ni pasajes citables, el sitio es difícil de citar por AI Overviews,
  ChatGPT Search o Perplexity, canales que ya mandan tráfico en consultas de servicio local.

### M6 — E-E-A-T sin evidencia de autoría

Hay señales de confianza reales y valiosas —15 años, dirección física, 10 logos de clientes
identificados (Olímpica Stereo, Radio Tiempo, IPS Ser Integral…), políticas de garantía
detalladas (1.871 palabras)—. Falta lo que las conecta con personas:

- Sin página o bloque de equipo con nombres y roles.
- El artículo del blog no tiene autor visible ni fecha de actualización.
- Sin certificaciones ni alianzas de fabricante (si existen, deben aparecer).
- Sin reseñas o casos con resultados concretos.

### M7 — Estadísticas incompletas visibles

`STATS` en `consts.ts:69-76` tiene 3 de 6 métricas en `null`. Si se renderizan vacías o en
cero, resta credibilidad. Conviene o conseguir los datos o retirar esas tres filas.

---

## 5. Lo que ya está bien (no tocar)

- **Rendimiento excelente.** 253 KB de assets + 29 KB de HTML en la home. Cero scripts de
  terceros. Un solo `<script type="module">`. Fuentes autoalojadas (Baloo Chettan 2 + Raleway
  en woff2). Cacheo `immutable` de un año en `/_astro/*`.
- **Imágenes correctas.** 100 % WebP con `srcset`, `width`/`height` en todas (previene CLS),
  `loading="eager"` + `fetchpriority="high"` solo en el logo y el hero, `lazy` en el resto.
  Los `alt` vacíos en las ilustraciones decorativas son la decisión correcta.
- **Migración WordPress bien resuelta.** Las 17 reglas de `_redirects` funcionan y cubren las
  13 URLs del `wp-sitemap.xml` viejo, incluidas `/feed/`, `/category/*` y `/author/*`.
  Verificado uno por uno con `curl`.
- **Seguridad.** HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- **Metadatos on-page.** Los 16 títulos son únicos salvo el par de A2, todos con modificador
  geográfico, longitudes entre 38 y 74 caracteres. Descripciones escritas a mano, no plantilla.
- **Jerarquía de encabezados.** Un solo H1 por página, sin saltos de nivel.
- `lang="es-CO"` en las 16 páginas. Página 404 propia. `trailingSlash` consistente.

---

## 6. Estrategia de keywords

El diferencial de MiPC frente a la competencia local no es «reparación a domicilio» —ahí hay
una docena de dominios de coincidencia exacta peleando— sino **el ángulo B2B**: 15 años,
razón social, dirección física, clientes institucionales con nombre, mesa de ayuda, cableado
estructurado. Ahí la competencia es mucho más blanda.

### Nivel 1 — Transaccional B2B (menos disputado, mayor ticket)

| Keyword | Página destino |
|---|---|
| soporte TI para empresas Medellín | `/servicios/mesa-de-ayuda/` |
| mesa de ayuda TI Medellín | `/servicios/mesa-de-ayuda/` |
| cableado estructurado Medellín | `/servicios/redes-de-datos/` |
| instalación de cámaras de seguridad Medellín | `/servicios/camaras-de-seguridad/` |
| alquiler de computadores para empresas Medellín | `/servicios/alquiler-de-computadores/` |
| mantenimiento preventivo de computadores empresas | `/servicios/reparacion-de-computadores/` |

### Nivel 2 — Transaccional B2C (muy disputado, defensivo)

`reparación de computadores Medellín` · `mantenimiento de computadores Medellín` ·
`servicio técnico de computadores Medellín` · `reparación de portátiles Medellín`

Aquí se compite con el paquete local (mapa), no con resultados orgánicos. La palanca es
**Google Business Profile**, no la página.

### Nivel 3 — Barrio (crear solo si hay contenido real y diferenciado)

`reparación de computadores Laureles` · `servicio técnico computadores Estadio` ·
`mantenimiento de computadores El Poblado` · `soporte TI Envigado`

⚠️ **Regla dura:** no crear páginas por barrio en plantilla con la ciudad intercambiada. Es
la técnica que usa la competencia y es exactamente lo que Google penaliza como contenido
duplicado a escala. Máximo 3–4 páginas de barrio, cada una con ≥60 % de contenido único
(fotos del trabajo en la zona, tiempos de desplazamiento reales, casos locales).

### Nivel 4 — Informacional para el blog

`por qué mi computador está lento` · `cambiar disco duro por SSD vale la pena` ·
`cuánto cuesta el mantenimiento de un computador en Colombia` ·
`cada cuánto hacer mantenimiento preventivo a un PC` ·
`cómo saber si mi fuente de poder está dañada` ·
`qué es cableado estructurado categoría 6`

---

## 7. Plan de acción

### Fase 1 — Desbloquear la indexación (semana 1)

1. Conectar `mipc.com.co` al Worker de Cloudflare y retirar el WordPress de Hostinger.
   Es el único cambio que convierte todo el trabajo hecho en tráfico potencial.
2. Verificar que `X-Robots-Tag` desaparece de la respuesta.
3. Reemplazar el `robots.txt` del WordPress; el nuevo ya apunta al sitemap correcto.
4. Verificar la propiedad en Google Search Console y enviar `sitemap-index.xml`.
5. Comprobar las 13 redirecciones antiguas ya en producción (`/home/*`, `/feed/`,
   `/category/*`, `/author/*`, los 3 posts despublicados).
6. Crear `public/og-default.jpg` (1200×630) — arregla A4.
7. Filtrar `/gracias/` y `/resena/` del sitemap — arregla A5.

**Dependencia:** los pasos 2–5 no pueden ocurrir antes del 1.
**Señal de éxito:** primeras impresiones en Search Console a los 7–14 días.

### Fase 2 — Corregir on-page (semanas 2–3)

8. Diferenciar el título de la home del de reparación (A2).
9. Reescribir el H1 de la home con keyword + ciudad (A3).
10. Completar el LocalBusiness: `geo`, `postalCode`, enlace de GBP en `sameAs`,
    `provider` con `@id` en los nodos `Service` (M1).
11. Añadir migas de pan visibles en las páginas de servicio (M4).
12. Resolver o retirar las 3 estadísticas vacías (M7).
13. Auditar y completar la ficha de Google Business Profile: categoría primaria
    correcta, horarios, fotos recientes, servicios listados, zona de cobertura.
    **Para las keywords de nivel 2, esto pesa más que cualquier cambio en la web.**

### Fase 3 — Contenido y autoridad (mes 2 en adelante)

14. Ampliar las 5 páginas de servicio a 900–1.400 palabras: síntomas concretos, marcas
    atendidas, qué incluye y qué no, tiempos de respuesta, rango de precios, proceso paso a
    paso, 3–5 preguntas frecuentes en texto plano.
15. Publicar 2 artículos al mes desde el nivel 4, con autor visible y fecha de actualización.
16. Convertir 2 o 3 clientes de la lista en casos de estudio con cifras
    (equipos intervenidos, puntos de red instalados, tiempo del proyecto).
17. Enlazado interno contextual dentro del cuerpo (M3).
18. Pedir reseñas en Google de forma sistemática — la página `/resena/` ya existe pero usa
    el enlace por CID; sustituirlo por el enlace corto `https://g.page/r/.../review`
    del panel de GBP (ya marcado como TODO en `consts.ts:44`).
19. Citaciones locales con NAP idéntico: Páginas Amarillas Colombia, Cylex, cámara de
    comercio de Medellín, directorios sectoriales de TI.

### Fase 4 — Seguimiento (continuo)

20. Búsquedas de marca y posiciones para las 6 keywords de nivel 1 en Search Console.
21. Capturar una línea base de deriva SEO tras la migración para detectar regresiones.
22. Vigilar Core Web Vitals con datos de campo (CrUX) una vez haya tráfico suficiente;
    hasta entonces solo hay estimación de laboratorio.

---

## 8. Limitaciones de esta auditoría

- **Sin datos de campo.** No hay CrUX ni Search Console porque el sitio no está indexado.
  La nota de rendimiento (92) es una estimación sobre peso de assets, formatos, cacheo y
  ausencia de terceros, no una medición de LCP/INP/CLS con usuarios reales.
- **Sin volúmenes de búsqueda.** La estrategia de keywords se basa en el análisis de la SERP
  y del posicionamiento competitivo, no en cifras de volumen. Conviene validarla con
  Keyword Planner o DataForSEO antes de invertir mucho en contenido.
- **Sin perfil de enlaces.** No se analizaron backlinks; el dominio `mipc.com.co` tiene
  histórico desde al menos 2009 y puede conservar enlaces que valga la pena inventariar
  antes de migrar.
- El runtime de Python de `claude-seo` no está instalado en este equipo, así que no se
  ejecutaron Lighthouse ni las capturas de Playwright. Se puede habilitar con `/seo setup`.
