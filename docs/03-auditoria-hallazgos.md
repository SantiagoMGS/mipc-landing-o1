# 03 — Auditoría de hallazgos

> **Sitio auditado:** https://mipc.com.co/
> **Fecha:** 2026-08-14
> **Alcance:** 9 páginas + 3 entradas de blog, robots.txt, sitemap XML, métricas de red, render desktop (1440×900) y móvil (390×844)
> **Método:** inspección automatizada con navegador — DOM, estilos computados, Resource Timing API, códigos de respuesta HTTP

---

## Resumen ejecutivo

El sitio **se ve bien pero está técnicamente abandonado**. La capa visual es correcta y la marca es reconocible; todo lo demás acumula deuda desde 2023.

| Área | Estado | Severidad |
|---|---|---|
| Seguridad / plataforma | Software desactualizado con vulnerabilidades públicas | 🔴 Crítica |
| SEO técnico | Sin configurar. Cero meta descriptions, idioma erróneo | 🔴 Crítica |
| SEO de contenido | Blog irrelevante y congelado, páginas de 34 palabras | 🔴 Crítica |
| Rendimiento | 3.3 MB, 79 peticiones, 43 archivos CSS/JS | 🟠 Alta |
| UX móvil | Hero invisible, teléfono ilegible | 🟠 Alta |
| Riesgo legal | Distribución de software sin licencia | 🔴 Crítica |
| Diseño desktop | Correcto y con identidad clara | 🟢 OK |

---

## 1. Plataforma y seguridad

### 1.1 Stack detectado

| Componente | Versión | Estado |
|---|---|---|
| WordPress | **6.1.12** | 🔴 Rama de finales de 2022 |
| Elementor (free) | 3.23.4 | 🟡 Ago 2024 |
| Elementor **Pro** | **3.7.7** | 🔴 Jul 2022 |
| Tema | Twenty Twenty-One 1.8 | 🔴 Tema por defecto, sin child theme |
| Plugin funcional | Joinchat (creame-whatsapp-me) 5.1.7 | 🟡 |
| Plugin SEO | **ninguno** | 🔴 |

### 1.2 🔴 Riesgo crítico: Elementor Pro 3.7.7

Este es **el hallazgo más grave de toda la auditoría**.

1. **Vulnerabilidades públicas.** Elementor Pro 3.7.x arrastra fallos de seguridad divulgados y ampliamente explotados de forma automatizada. Es uno de los vectores más usados para inyección de spam y defacement en WordPress.
2. **Desfase de versiones.** Correr Pro `3.7.7` junto a free `3.23.4` es una combinación no soportada. Ya está produciendo errores en producción (ver §1.3).
3. **Bloqueo de actualización.** Elementor Pro requiere licencia activa para actualizarse. Si la licencia venció, **no pueden parchear aunque quieran** — la vulnerabilidad es permanente.
4. **Sin administrador.** No hay quien monitoree, parchee ni responda ante un incidente.

> **La combinación de los cuatro puntos convierte esto en una cuenta regresiva, no en un riesgo hipotético.**

### 1.3 Error de JavaScript en producción

En `/recursos/`:

```
TypeError: Failed to execute 'observe' on 'IntersectionObserver':
parameter 1 is not of type 'Element'.
  at LoadMore.handleInfiniteScroll (elementor-pro 3.7.7)
```

Síntoma directo del desfase de versiones. Confirma que el problema ya no es teórico.

### 1.4 Otros

| Hallazgo | Detalle |
|---|---|
| Tema por defecto sin personalizar | `twentytwentyone` cargando CSS que Elementor luego sobrescribe. Peso muerto |
| `wp-emoji-release.min.js` | Script de emojis cargando sin necesidad |
| jQuery + jQuery Migrate | Cargando en un sitio que no lo necesita |
| Versiones expuestas | Todas las versiones visibles en query strings — facilita el reconocimiento automatizado |

---

## 2. SEO técnico

### 2.1 Errores bloqueantes

| # | Problema | Detalle | Impacto |
|---|---|---|---|
| 1 | **`lang="en-US"`** | Sitio 100 % en español declarado como inglés | 🔴 Señal de idioma/mercado equivocada |
| 2 | **0 meta descriptions** | **Las 9 páginas** sin `<meta name="description">` | 🔴 Google inventa el snippet |
| 3 | **Home sin `<h1>`** | Solo `<h2>` sueltos | 🔴 Sin señal de tema principal |
| 4 | **`/recursos/` sin `<h1>`** | Idem | 🔴 |
| 5 | **0 datos estructurados** | Sin JSON-LD. Sin `LocalBusiness`, `Service` ni `BreadcrumbList` | 🔴 Mata el SEO local |
| 6 | **0 Open Graph** | Sin `og:title`, `og:description`, `og:image` | 🔴 Compartir en WhatsApp/FB sale sin preview |
| 7 | **Sin plugin SEO** | Sitemap nativo de WP, sin control editorial | 🔴 |
| 8 | **Sin "Medellín" en títulos** | Ningún título menciona ciudad | 🔴 Local SEO inexistente |

### 2.2 Títulos actuales

Todos terminan en `– mipc.com.co`, desperdiciando el espacio más valioso del resultado de búsqueda.

| URL | Título actual | Propuesta |
|---|---|---|
| `/` | `mipc.com.co – Tecnología, reparación de computadores` | `Reparación de Computadores en Medellín \| MiPC Tecnología` |
| `/home/servicios/` | `Servicios MIPC Tecnología – mipc.com.co` | `Soporte TI, Redes y Cámaras en Medellín \| MiPC` |
| `/home/servicios-mipc-tecnologia-copy/` | `Nosotros MIPC Tecnología – mipc.com.co` | `Sobre Nosotros — 15 años en TI en Medellín \| MiPC` |
| `/home/experiencia/` | `Experiencia MIPC Tecnología – mipc.com.co` | `Casos y Clientes — Proyectos TI en Medellín \| MiPC` |
| `/home/contacto/` | `Contacto – mipc.com.co` | `Contacto — Cotiza tu servicio TI en Medellín \| MiPC` |
| `/garantias/` | `Políticas y garantías – mipc.com.co` | `Políticas y Garantías \| MiPC Tecnología` |
| `/recursos/` | `Recursos – mipc.com.co` | `Recursos y Herramientas de Soporte \| MiPC` |

### 2.3 🔴 Estructura de URLs

```
https://mipc.com.co/home/servicios/                        ← prefijo /home/ sin sentido
https://mipc.com.co/home/servicios-mipc-tecnologia-copy/   ← "copy" en URL pública
https://mipc.com.co/home/experiencia/
https://mipc.com.co/home/actualidad/
https://mipc.com.co/home/contacto/
https://mipc.com.co/garantias/                             ← sin /home/, inconsistente
https://mipc.com.co/recursos/                              ← sin /home/, inconsistente
```

La página **"Nosotros"** del menú principal vive en una URL llamada `servicios-mipc-tecnologia-**copy**`. Es un duplicado de Elementor que nunca se limpió y quedó publicado como página oficial de la empresa.

### 2.4 Enlaces internos inconsistentes

| Origen | Destino enlazado | Resuelve a |
|---|---|---|
| Home (tarjetas de servicio) | `/servicios/#repara` | → `/home/servicios/` (redirect) |
| Footer (todas las páginas) | `/servicios-mipc-tecnologia/#repara` | → `/home/servicios-mipc-tecnologia-copy/` (redirect) |

> 🔴 **El footer envía a "Reparación", "Mantenimiento" y "Alquiler" hacia la página de _Nosotros_, no hacia Servicios.** Los tres enlaces del footer están rotos funcionalmente. Además, cada uno pasa por un redirect que diluye autoridad.

### 2.5 Contenido

| Página | Palabras | Diagnóstico |
|---|---|---|
| `/garantias/` | 1.642 | 🟢 Único contenido sustancial |
| `/home/servicios/` | 568 | 🟡 Aceptable, pero para 5 servicios es poco |
| `/` (home) | 278 | 🔴 Insuficiente para competir |
| `/home/servicios-...-copy/` | 278 | 🔴 |
| `/home/actualidad/` | 158 | 🔴 |
| `/recursos/` | 122 | 🔴 |
| `/home/experiencia/` | **38** | 🔴 Prácticamente vacía |
| `/home/contacto/` | **34** | 🔴 Prácticamente vacía |

### 2.6 🔴 Blog muerto

3 entradas, **todas del 4 de abril de 2023**:

1. *"Google anuncia actualizaciones de sus productos de realidad virtual y aumentada"*
2. *"Amazon anuncia la adquisición de la empresa de tecnología cuántica PsiQuantum"*
3. *"Intel anuncia nuevos procesadores de escritorio Core de 12ª generación"*

**Cero relación con reparar computadores en Medellín.** Son noticias de tecnología global copiadas para "tener blog". No atraen a un solo cliente potencial y las fechas visibles ("April 4, 2023" — además **en inglés**) comunican abandono.

> **Recomendación:** despublicar y reemplazar por contenido de intención local y comercial: *"Cuánto cuesta reparar un portátil en Medellín"*, *"Señales de que tu disco duro está fallando"*, *"Qué necesita una pyme para montar su red de datos"*.

### 2.7 🔴 Servicios sin landing propia

Los 5 servicios comparten una sola URL con anclas (`#repara`, `#camaras`, `#redes`, `#alquiler`, `#mesa`).

Son **5 intenciones de búsqueda distintas** compitiendo por una única página. Cada una debería ser su propia URL con su propio título, meta description, H1 y schema `Service`.

---

## 3. Rendimiento

### 3.1 Métricas

```
Peso total ......... 3.3 MB      ← objetivo: < 1 MB
Peticiones ......... 79
Archivos CSS ....... 21          ← objetivo: 1
Archivos JS ........ 22          ← objetivo: 0-1
Imágenes ........... 1.7 MB
CSS ................ 1.3 MB      ← absurdo para 9 páginas
JS ................. 191 KB
TTFB ............... 590 ms
DOMContentLoaded ... 1.44 s
Load ............... 2.86 s
HTML ............... 117 KB
```

### 3.2 Recursos más pesados

| Recurso | Peso | Problema |
|---|---|---|
| `men-3.png` | **768 KB** | PNG usado como fotografía. En WebP: ~40 KB |
| `Intel_core12-1.jpg` | **640 KB** | Se muestra a 378×250, se descarga a 821×543 |
| `amazon-psiquantum.jpg` | **490 KB** | Idem |
| `MIPC_Alquiler-de-Computadores2.jpg` | 144 KB | Sin optimizar |
| `Google-Daydream-1.jpg` | 143 KB | Sin optimizar |
| `eicons.woff2` | 95 KB | Iconos de Elementor completos |
| `fa-brands-400.woff2` | 80 KB | Font Awesome Brands completo |
| `fa-solid-900.woff2` | 77 KB | Font Awesome Solid completo |

### 3.3 Causas raíz

| Causa | Detalle | Ahorro estimado |
|---|---|---|
| **Google Fonts sin filtrar** | 4 familias × 18 variantes (100-900 + itálicas) | ~1 MB |
| **Font Awesome completo** | 3 sets completos para ~6 iconos visibles | ~250 KB |
| **Imágenes sin optimizar** | PNG donde va WebP, sin `srcset` responsive | ~1.4 MB |
| **Elementor** | 43 archivos CSS/JS entre core, pro y widgets | ~400 KB |
| **Bloat de WordPress** | jQuery, jQuery Migrate, emojis, tema sin usar | ~150 KB |

> **Solo corrigiendo imágenes y fuentes se recortan ~2 MB (≈60 %) sin tocar una línea de diseño.**

### 3.4 Bugs de carga

| Hallazgo | Impacto |
|---|---|
| El **logo** tiene `loading="lazy"` | 🔴 Está en el viewport inicial → penaliza directamente el LCP |
| 3 imágenes con `naturalWidth: 0` al medir | 🟡 Lazy loading de Elementor difiriendo contenido visible |
| Imágenes sin `width`/`height` explícitos | 🟠 Provoca CLS (layout shift) |

---

## 4. UX y diseño

### 4.1 Desktop — 🟢 correcto

Identidad clara, ilustraciones consistentes, buen uso del rojo de marca, ondas que separan secciones con personalidad. **La base visual es sólida y merece conservarse.**

### 4.2 Móvil — 🔴 dos bugs que rompen la conversión

| # | Bug | Impacto |
|---|---|---|
| 1 | **El slider del hero desaparece por completo.** El titular *"¡Nosotros reparamos tu computador!"* y su CTA no se renderizan en móvil | 🔴 El usuario aterriza sin propuesta de valor ni llamada a la acción |
| 2 | **El teléfono se corta.** `Cel: 314 88...` queda tapado por la onda roja del header | 🔴 El dato de conversión más importante, ilegible |

> Para un negocio de reparación, **la mayoría del tráfico es móvil y con intención inmediata**. Estos dos bugs están saboteando la conversión en el canal principal.

### 4.3 Accesibilidad y usabilidad

| Hallazgo | Medición | Severidad |
|---|---|---|
| **Imágenes sin `alt`** | 9 de 11 en el home | 🔴 |
| **Objetivos táctiles < 44 px** | 23 elementos | 🟠 |
| **Texto < 12 px** | 4 nodos | 🟠 |
| Borde de botón transparente | `rgba(122,122,122,0)` | 🟡 |
| Sin overflow horizontal | ✅ 375 px en viewport de 390 px | 🟢 |

### 4.4 Conversión

| Hallazgo | Detalle |
|---|---|
| 🔴 **CTAs falsos** | "SOY PERSONA" y "SOY EMPRESA" apuntan **ambos a la misma URL**. La segmentación es puramente decorativa |
| 🔴 **Sin llamada directa** | El teléfono es texto plano. Sin `tel:` clickeable — la conversión #1 en móvil para este negocio |
| 🔴 **Sin dirección visible** | La dirección solo existe dentro del texto legal de garantías |
| 🔴 **Sin horarios** | No publicados en ninguna parte |
| 🟠 **Experiencia sin sustancia** | Tira de logos sin casos, sin testimonios, sin cifras contextualizadas |
| 🟠 **Contadores en cero** | 3 de 6 indicadores muestran `0` |
| 🟡 **Fechas en inglés** | "April 4, 2023" en un sitio en español |

---

## 5. 🔴 Riesgo legal

La página `/recursos/` ofrece un **"Pack Office"** — instalador de Microsoft Office alojado en un enlace privado de `mega.nz`.

- Es, con alta probabilidad, **distribución de software sin licencia**
- La empresa **vende licenciamiento de software** como servicio (ver perfil §4.4) → contradicción reputacional directa frente a clientes corporativos
- Los demás recursos (AnyDesk, DeskIn, Crystal Disk Info) también se sirven desde Mega en lugar del sitio oficial del fabricante, lo que erosiona la confianza y puede disparar advertencias del navegador

> **Acción inmediata, sin esperar a la migración: retirar el "Pack Office" y reapuntar el resto a las descargas oficiales.**

### 5.1 🔴 La política de garantías es una adaptación de un texto mexicano

Al migrar el contenido de `/garantias/` (1.642 palabras) aparecieron dos enlaces que apuntan a un **dominio mexicano ajeno a la empresa**:

| Texto visible | Enlace real |
|---|---|
| "mipc.com.co y/o mipctecnologia.com" | `http://www.mipc.com.mx/` |
| "soporte@ mipc.com.co" | `mailto:contacto@mipc.com.mx` |

Además, la redacción usa terminología legal **mexicana**: *"días naturales"*, *"ticket"*, *"nota de crédito"*, *"identificación oficial vigente"*.

**Implicaciones:**

1. La política que rige las garantías de la empresa **no fue redactada para el marco legal colombiano**. En Colombia aplica la **Ley 1480 de 2011 (Estatuto del Consumidor)**, que fija garantía legal mínima, derecho de retracto y reversión del pago en ventas no presenciales.
2. Los dos enlaces envían al cliente a un tercero sin relación con MiPC.
3. El correo de contacto para trámites de garantía **no llega a la empresa**.

> **Acción:** en la migración se corrigieron los enlaces y la razón social, pero **el texto requiere revisión de un abogado** antes de publicarse. El aviso queda registrado dentro de `src/pages/garantias.md`.

---

## 6. Lo que está bien

No todo es deuda. Vale la pena registrar los activos:

- ✅ **HTTPS** correctamente configurado
- ✅ **`robots.txt`** bien formado, con sitemap declarado
- ✅ **Sitemap XML** presente y funcional
- ✅ **Canonical** correcto en todas las páginas
- ✅ **Sin overflow horizontal** en móvil
- ✅ **Viewport meta** correcto
- ✅ **TTFB de 590 ms** — el hosting responde razonablemente
- ✅ **Identidad visual** clara, coherente y con personalidad
- ✅ **Contenido de servicios** bien redactado y detallado
- ✅ **Cartera de clientes** de peso (medios, salud, educación, industria)
- ✅ **Política de garantías** completa y sustancial
- ✅ **WhatsApp** integrado, canal correcto para el mercado

---

## 7. Priorización

### 🔴 P0 — Inmediato, sin esperar a la migración

1. Retirar el **"Pack Office"** de `/recursos/`
2. Actualizar **Elementor Pro** o desactivarlo si la licencia venció
3. **Backup completo** (base de datos + `wp-content`)
4. Corregir los **3 enlaces rotos del footer**

### 🟠 P1 — Base del sitio nuevo

5. `lang="es-CO"`
6. Meta description en las 9 páginas
7. `<h1>` único por página
8. JSON-LD `LocalBusiness` con NAP completo
9. Open Graph completo
10. Hero visible en móvil + teléfono legible + `tel:` clickeable
11. Optimizar imágenes a WebP con `srcset`
12. Reducir a 2 familias tipográficas auto-hospedadas

### 🟡 P2 — Crecimiento

13. Reestructurar URLs y aplicar redirects 301
14. 5 landings de servicio independientes
15. Despublicar el blog actual, redactar contenido local
16. Expandir `/experiencia/` con casos y testimonios
17. Diferenciar los flujos Persona / Empresa
18. Publicar horarios + Google Maps + ficha de Google Business Profile

---

## 8. Conclusión sobre la migración

> Con **8 páginas de contenido estático**, sin catálogo ni usuarios (la tienda vive en otro dominio) y **sin nadie que administre WordPress**, mantener la plataforma actual significa pagar todos los costos de WordPress sin recibir ninguno de sus beneficios.
>
> El blog lleva desde abril de 2023 sin tocarse y hay una página con `copy` en la URL: **la capacidad de "editar sin programador" que justifica WordPress no se está usando**.
>
> **Migrar a un sitio estático elimina el riesgo de seguridad, reduce el hosting a $0, permite corregir el SEO desde la raíz y multiplica el rendimiento.** El esfuerzo de reconstrucción es menor que el de mantener WordPress parchado indefinidamente sin administrador.
