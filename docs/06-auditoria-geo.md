# Auditoría GEO — Visibilidad en búsqueda con IA

**Empresa:** MiPC Tecnología (MI PC TECNOLOGÍA S.A.S.)
**URL auditada:** `https://f330ce5d-mipc-landing-o1.santiago-martinez.workers.dev/`
**Fecha:** 14 de agosto de 2026
**Complementa:** `docs/05-auditoria-seo.md`

> **GEO = Generative Engine Optimization.** Optimización para AI Overviews y AI Mode de
> Google, ChatGPT Search, Perplexity y Bing Copilot. No confundir con SEO geográfico, que
> se cubre en la auditoría anterior.

---

## Marco: qué dice Google

La guía oficial de Google sobre optimización para IA (Search Central, actualizada el
29-06-2026) es explícita:

> «Optimizar para la búsqueda generativa con IA **sigue siendo SEO**. AEO y GEO son
> etiquetas nuevas para el mismo trabajo.»

Esto tiene dos consecuencias prácticas para este informe:

1. No hay una palanca «GEO» separada. Lo que mueve la aguja son fundamentos de SEO
   aplicados a superficies nuevas.
2. Google afirma que **no** hace falta `llms.txt` ni archivos de texto para IA, y que
   tenerlos «no perjudica (ni ayuda) la visibilidad en Google Search, porque Google Search
   los ignora». Por tanto, en este informe `llms.txt` se reporta pero **no se le asigna
   peso de ranking**.

Donde sí hay diferencia real es en **quién te cita**. Y ahí MiPC tiene un problema que el
SEO clásico no detecta.

---

## 1. Puntuación GEO: **38 / 100**

| Criterio | Peso | Nota | Aporte |
|---|---:|---:|---:|
| Citabilidad de pasajes | 25 % | 35 | 8,8 |
| Legibilidad estructural | 20 % | 55 | 11,0 |
| Contenido multimodal | 15 % | 30 | 4,5 |
| Autoridad y señales de marca | 20 % | 25 | 5,0 |
| Accesibilidad técnica | 20 % | 45 | 9,0 |
| **Total** | | | **38** |

### Desglose por plataforma

| Plataforma | Nota | Qué la determina hoy |
|---|---:|---|
| Google AI Overviews | 30 | Muy correlacionada con ranking clásico. Sin indexar, es 0 real |
| Google AI Mode | 25 | Pool más amplio; pesan frescura y autoridad de entidad — el punto débil |
| ChatGPT Search | 15 | Cita Wikipedia (47,9 %) y Reddit (11,3 %). Presencia nula en ambas |
| Perplexity | 15 | Cita Reddit (46,7 %). Presencia nula |
| Bing Copilot | 20 | Depende del índice de Bing. El sitio no está en Bing Webmaster ni usa IndexNow |

Google AI Overviews y AI Mode llegan a la misma conclusión el ~86 % de las veces pero
**citan las mismas URLs solo el 13,7 %** (Ahrefs, 540 000 pares de consultas). Son dos
motores de citación distintos y hay que puntuarlos por separado.

---

## 2. El hallazgo crítico: la entidad «MiPC» está colisionada

Esto es lo más grave del informe y no aparece en ninguna auditoría SEO tradicional.

Al buscar la marca, los motores devuelven **al menos cinco entidades distintas** con
nombre casi idéntico:

| Entidad | Qué es | Dónde |
|---|---|---|
| **MiPC Tecnología** | El cliente: soporte TI y reparación | Medellín |
| Mi PC Soluciones IT S.A.S. | Otra empresa de TI | `mipc-soluciones.com` |
| Mi PC Equipos S.A.S. | Tienda gamer, 18 K seguidores | Barranquilla |
| MiPC (ecommerce) | Tienda online de tecnología | México |
| MiPC Comunicaciones | Otra empresa distinta | — |
| mipc.com.mx | Sitio mexicano | México |

**Evidencia directa de que los modelos ya se confunden.** Al pedir un resumen de
«MiPC Tecnología Medellín», una respuesta generada devolvió esto:

> «MiPC es una empresa que se especializa en vender tecnología a través de un sitio de
> ecommerce donde ofrecen computadores, portátiles, tablets… la información de envíos
> (tiempos y opciones) no es clara.»

Eso **no es el cliente**. Es la tienda mexicana. Un modelo mezcló las dos entidades y le
atribuyó a MiPC Tecnología una crítica negativa sobre envíos de un negocio con el que no
tiene relación.

### Por qué importa más que cualquier otra cosa de este informe

Los modelos de lenguaje no rankean páginas, **resuelven entidades**. Si el modelo no puede
separar «MiPC Tecnología, servicio técnico en Laureles, Medellín» de «MiPC, tienda de
ecommerce», entonces:

- Ninguna cantidad de contenido bien escrito en el sitio se atribuirá correctamente.
- Las menciones positivas que se ganen podrán asignarse a otra empresa.
- Las críticas negativas de otras empresas podrán asignarse a MiPC.

**Cómo saber si falló:** preguntar cada mes a ChatGPT, Perplexity y AI Mode
«¿quién es MiPC Tecnología en Medellín?» y verificar que la respuesta menciona Laureles,
2009 y servicios TI empresariales, sin mezclar con tiendas de ecommerce.

### Cómo se arregla: desambiguación de entidad

1. **Usar siempre la razón social completa** junto al nombre comercial en el sitio:
   «MiPC Tecnología (MI PC TECNOLOGÍA S.A.S.)». Aparece en el schema pero casi nunca en
   el texto visible.
2. **Añadir el NIT** al schema y a la página de contacto. Es el identificador único e
   inequívoco en Colombia. Ya está marcado como `TODO` en `consts.ts:38`.
3. **Ampliar `sameAs`** con todos los perfiles verificables: Google Business Profile,
   LinkedIn de empresa, canal de YouTube, y el registro en la Cámara de Comercio de
   Medellín.
4. **Añadir `identifier` y `vatID`/`taxID`** al nodo `LocalBusiness`.
5. **Crear un ítem en Wikidata** para la empresa. No es Wikipedia y no exige notabilidad
   editorial: basta con referencias verificables (registro mercantil, sitio propio,
   perfiles). Wikidata alimenta el grafo de conocimiento del que beben todos los modelos.
6. **Siempre acompañar el nombre de la ciudad y el sector**: «MiPC Tecnología, soporte TI
   en Medellín» funciona como desambiguador natural en cada mención.

---

## 3. Enlace roto en las señales de entidad

`SOCIAL.shop` en `consts.ts:52` apunta a `https://mipctecnologia.com/shop`, que devuelve
**404**. Verificado:

```
https://www.facebook.com/mipctecnologiasas  -> 200
https://www.instagram.com/mipc.com.co       -> 200
https://mipctecnologia.com/shop             -> 404
```

Un enlace muerto en las señales de marca debilita la resolución de entidad y, si llega a
entrar en `sameAs`, es una señal contradictoria. Hoy no está en el `sameAs` del schema
—solo Facebook e Instagram— pero sí vive en el código y puede renderizarse en el pie.

Nota adicional: existe una página de Facebook con URL de vanidad `facebook.com/esteek/`
titulada «MI PC Tecnología | Medellín» que también resuelve. Conviene verificar cuál es la
página oficial vigente y consolidar o eliminar la duplicada — dos páginas de Facebook para
el mismo negocio dividen las señales.

---

## 4. Citabilidad de pasajes: **35 / 100**

La longitud óptima de un pasaje citable por IA es de **134 a 167 palabras**, y ~44 % de las
citaciones salen del **primer 30 % de la página** (estudio de SE Ranking).

### Longitud media de párrafo por página

| Página | Párrafos | Media (palabras) | Máximo |
|---|---:|---:|---:|
| `/servicios/redes-de-datos/` | 5 | 34,4 | 71 |
| `/servicios/camaras-de-seguridad/` | 5 | 29,8 | 49 |
| `/servicios/reparacion-de-computadores/` | 6 | 27,0 | 57 |
| `/servicios/alquiler-de-computadores/` | 5 | 26,6 | 44 |
| `/servicios/mesa-de-ayuda/` | 6 | 24,5 | 43 |
| `/blog/senales-disco-duro-fallando/` | 15 | 20,7 | 37 |
| `/` | 14 | 16,2 | 25 |

Los párrafos cortos son **buenos para lectura humana** — y en la auditoría SEO los conté
como acierto. Para citación por IA el problema es distinto: **no existe ningún bloque
autocontenido de 134-167 palabras** en todo el sitio. Cada página está compuesta de
fragmentos de 20-35 palabras que necesitan el contexto de los que están alrededor para
significar algo. Un modelo no puede extraer ninguno y usarlo como respuesta.

### Lo que falta específicamente

- **Cero definiciones.** Ni un solo «X es…» o «X se refiere a…». Un pasaje como
  «El cableado estructurado categoría 6 es…» es exactamente lo que un modelo extrae.
- **Cero datos propios.** No hay precios orientativos, tiempos de respuesta, plazos de
  entrega ni porcentajes. Los modelos citan lo específico y descartan lo genérico.
- **Cero atribución a fuentes.** Ninguna afirmación remite a un estudio, norma técnica
  (TIA/EIA-568 para cableado, por ejemplo) o dato oficial.
- **La respuesta no está al principio.** Las páginas de servicio abren con narrativa de
  marca; el dato útil, cuando existe, está en la lista de `features` a mitad de página.

### Excepción: el artículo del blog

`senales-disco-duro-fallando` **sí está bien construido para IA**: cinco encabezados
numerados, cada uno con síntoma concreto + acción («**Qué hacer:** apaga el equipo»),
lenguaje específico («clic rítmico indica que el cabezal de lectura está fallando»). Es el
modelo a replicar. Le falta solo llegar a 134-167 palabras por bloque y citar una fuente.

---

## 5. Legibilidad estructural: **55 / 100**

**A favor:** jerarquía H1→H2→H3 limpia en las 16 páginas, sin saltos de nivel. Un solo H1
por página. Párrafos de 2-4 frases. Listas presentes (las `features` de cada servicio).

**En contra:**

- **Los encabezados en forma de pregunta no sirven para búsqueda.** Cada página de
  servicio tiene exactamente 1 de 7 encabezados con signo de interrogación, pero todos son
  llamadas a la acción, no consultas: *«¿Necesitas equipos por temporada o por proyecto?»*,
  *«¿Tu computador falla? Escríbenos»*. Ninguno coincide con lo que alguien escribiría en
  un buscador.

  Lo que sí funcionaría: *«¿Cuánto cuesta reparar un computador en Medellín?»*,
  *«¿Cada cuánto hacer mantenimiento preventivo a un PC?»*, *«¿Qué incluye un servicio de
  mesa de ayuda?»*.

- **Cero tablas en todo el sitio.** Los modelos extraen datos comparativos de tablas con
  mucha más fiabilidad que de prosa. Una tabla de «qué incluye cada plan de mantenimiento»
  o «tiempos de respuesta por tipo de incidente» sería directamente citable.

- **Sin bloques de preguntas frecuentes.** No en schema —Google retiró los resultados
  enriquecidos de FAQ en mayo de 2026, así que el marcado ya no da resultado en la SERP—
  sino **en texto plano visible**, que es lo que los modelos leen.

---

## 6. Contenido multimodal: **30 / 100**

Los contenidos con elementos multimodales tienen un **156 % más de tasa de selección** en
respuestas generadas.

| Elemento | Estado |
|---|---|
| Texto + imágenes | Presente, pero las imágenes son ilustraciones decorativas con `alt` vacío |
| Vídeo | Ninguno |
| Infografías o diagramas | Ninguno |
| Tablas de datos | Ninguna |
| Herramientas interactivas | Ninguna |

La página `/recursos/` se acerca: enlaza AnyDesk, DeskIn y CrystalDiskInfo. Pero es una
lista de enlaces, no una herramienta.

**Oportunidades concretas y realistas para este negocio:**

- Fotos reales del taller y de trabajos hechos, con `alt` descriptivo. Hoy no hay ninguna
  foto real de la operación, solo ilustraciones.
- Un diagrama del proceso de diagnóstico (recepción → diagnóstico → cotización →
  reparación → entrega).
- Vídeos cortos: «cómo saber si tu disco duro está fallando», «qué revisamos en un
  mantenimiento preventivo». **Además, las menciones en YouTube son la señal con mayor
  correlación con citaciones por IA (~0,737 según Ahrefs, frente a ~0,266 de los
  backlinks).** Un canal con 10 vídeos vale más aquí que 10 enlaces conseguidos.

---

## 7. Autoridad y señales de marca: **25 / 100**

**La correlación entre menciones de marca y visibilidad en IA es 3 veces más fuerte que la
de los backlinks** (Ahrefs, estudio de 75 000 marcas, diciembre 2025).

| Plataforma | Presencia | Peso en citaciones |
|---|---|---|
| Wikipedia | ❌ ninguna | 47,9 % de las fuentes de ChatGPT |
| Wikidata | ❌ ninguna | Alimenta el grafo de conocimiento |
| Reddit | ❌ ninguna | 46,7 % de las fuentes de Perplexity · 11,3 % de ChatGPT |
| YouTube | ❌ ninguna | Correlación más fuerte (~0,737) |
| LinkedIn | ❌ no encontrada | Moderada |
| Instagram | ✅ `@mipc.com.co` | Baja |
| Facebook | ⚠️ dos páginas posibles | Baja |
| Google Business Profile | ✅ existe (CID en `consts.ts`) | Alta para consultas locales |

**Autoría del contenido:** el `BlogPosting` declara `author` como `Organization`, no como
`Person` (`src/pages/blog/[id].astro:20`). Para E-E-A-T y para citación por IA, un autor con
nombre, cargo y credenciales pesa considerablemente más que una organización anónima.

**Frescura:** aquí hay una ventaja real. El único artículo se publicó el 14-08-2026, y el
contenido de menos de 3 meses tiene **~3 veces más probabilidad de ser citado**; a partir
de 6 meses sin actualizar, una página pierde elegibilidad. El esquema de contenido ya
soporta `updatedDate` pero no se usa. Un programa de refresco programado es de las palancas
más rentables que existen en GEO.

---

## 8. Accesibilidad técnica: **45 / 100**

### Lo excelente: renderizado en servidor

**Los rastreadores de IA no ejecutan JavaScript.** Este sitio es Astro estático: todo el
contenido —texto, encabezados, JSON-LD— está en el HTML crudo. Lo verifiqué extrayendo
todos los encabezados y párrafos directamente del HTML sin renderizar, y salieron completos.

Esto es una ventaja competitiva real. Muchos competidores usan WordPress con constructores
que inyectan contenido por JS, y los rastreadores de IA ven páginas medio vacías.

### Acceso de rastreadores de IA

`robots.txt` dice `User-agent: * / Allow: /`, así que **todos los rastreadores de IA están
permitidos**: GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot.
Correcto para máxima visibilidad. Si en algún momento se quiere excluir el entrenamiento
sin perder la búsqueda, se bloquea `CCBot` y `anthropic-ai` dejando pasar el resto.

### Lo que lo hunde

- **`X-Robots-Tag: noindex` en toda la respuesta.** Google es explícito: la aparición en
  AI Overviews y AI Mode se gobierna por las directivas estándar de indexación y vista
  previa (`noindex`, `nosnippet`, `max-snippet`), **no** por un control específico de IA.
  Un `noindex` excluye el sitio de las superficies de IA de Google igual que de la SERP.
- **Sin `llms.txt`.** Se reporta por completitud, sin peso: Google lo ignora
  explícitamente y Mueller llamó al caso de uso de descubrimiento «un callejón sin salida».
  Puede añadirse para rastreadores no-Google, pero no como palanca de ranking.
- **Sin IndexNow ni Bing Webmaster Tools.** Bing Copilot depende del índice de Bing, e
  IndexNow es el mecanismo de notificación instantánea. Es configuración de una tarde.

---

## 9. Los 5 cambios de mayor impacto

Ordenados por retorno, no por esfuerzo.

1. **Desambiguar la entidad** (§2). Razón social y NIT visibles, `sameAs` ampliado, ítem en
   Wikidata. Sin esto, todo lo demás se le puede atribuir a otra empresa.
2. **Abrir cada página de servicio con un bloque autocontenido de 134-167 palabras** que
   responda la pregunta central del servicio, con un dato concreto (precio orientativo,
   plazo, alcance). Va en el primer 30 % de la página.
3. **Crear un canal de YouTube** con 8-10 vídeos cortos de diagnóstico y mantenimiento,
   enlazados desde el sitio y en `sameAs`. Es la señal con mayor correlación con citación
   por IA, y ninguno de los competidores locales la está trabajando en serio.
4. **Convertir los encabezados-CTA en encabezados-pregunta reales**, y añadir 3-5 preguntas
   frecuentes en texto plano por página de servicio, redactadas como las escribiría un
   usuario.
5. **Programa de frescura:** publicar 2 artículos al mes y revisar/actualizar los
   existentes cada trimestre usando el campo `updatedDate`, que ya existe en el esquema y
   está sin usar.

---

## 10. Recomendaciones de schema para IA

Sobre el `LocalBusiness` existente (`src/components/Seo.astro`):

```jsonc
{
  "@type": "ProfessionalService",          // más específico que LocalBusiness
  "@id": "https://mipc.com.co/#business",
  "identifier": "NIT 900XXXXXXX-X",        // desambiguador único en Colombia
  "taxID": "900XXXXXXX",
  "geo": { "@type": "GeoCoordinates", "latitude": 6.24, "longitude": -75.59 },
  "address": { "postalCode": "0500XX" },   // completar
  "areaServed": [                          // hoy solo Medellín
    { "@type": "City", "name": "Medellín" },
    { "@type": "City", "name": "Envigado" },
    { "@type": "City", "name": "Itagüí" },
    { "@type": "City", "name": "Bello" }
  ],
  "sameAs": [
    "https://www.facebook.com/mipctecnologiasas",
    "https://www.instagram.com/mipc.com.co",
    "https://www.google.com/maps?cid=15154712519055002689",  // añadir
    "https://www.linkedin.com/company/...",                   // crear y añadir
    "https://www.youtube.com/@...",                           // crear y añadir
    "https://www.wikidata.org/wiki/Q..."                      // crear y añadir
  ],
  "hasOfferCatalog": { /* enlazar los 5 Service */ }
}
```

En el `BlogPosting` (`src/pages/blog/[id].astro`), cambiar el autor de `Organization` a
`Person` con `jobTitle`, `knowsAbout` y `sameAs` a su LinkedIn.

**Lo que NO hay que hacer:** añadir `FAQPage`. Google retiró los resultados enriquecidos de
FAQ para todos los sitios el 7 de mayo de 2026; ya no existe la función en la SERP y no hay
evidencia confirmada de beneficio en citación por IA. Las preguntas frecuentes se ponen en
**texto visible**, que es lo que los modelos leen de verdad.

---

## 11. Superficies nuevas que conviene conocer

- **Preferred Sources.** Los usuarios pueden marcar sitios como fuente preferida y esos
  reciben un distintivo en las respuestas con IA. Disponible en todos los idiomas desde el
  30-04-2026 y Google trabaja para usarlo como señal de ranking. Es una victoria rápida:
  pedir a los clientes de la base que añadan MiPC como fuente preferida.
- **Community Perspectives.** Eleva contenido de Reddit, foros y experiencias en primera
  persona. Refuerza el argumento de §7 sobre Reddit.
- **Agentes de búsqueda.** Google despliega agentes que reservan y llaman en categorías
  seleccionadas (usuarios de EE. UU., verano 2026). Para eso importa que la página tenga
  elementos interactivos reales, árbol de accesibilidad correcto y estabilidad de layout.
  El sitio ya cumple lo técnico; lo que falta es un formulario de agendamiento real más
  allá del enlace a WhatsApp.

---

## 12. Limitaciones

- **No se verificó la visibilidad real en IA.** No hay acceso a herramientas de rastreo de
  menciones en LLM (DataForSEO u Otterly). Las notas por plataforma se derivan de las
  fuentes de citación conocidas de cada una y de la presencia de marca observada, no de
  consultas medidas.
- **El sitio no está indexado**, así que ninguna medición de citación es posible hoy. Esta
  auditoría evalúa preparación, no resultado.
- La evidencia de confusión de entidad de §2 procede de resúmenes generados durante esta
  auditoría. Es indicativa y reproducible, pero no es un muestreo sistemático.
- Los datos de correlación citados (Ahrefs, SE Ranking) son estudios de terceros del sector,
  no fuentes de Google.
