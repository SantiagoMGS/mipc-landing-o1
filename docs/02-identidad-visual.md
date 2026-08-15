# 02 — Identidad visual

> Todos los valores fueron extraídos de los **estilos computados del sitio en producción** (mipc.com.co) el 2026-08-14. No son aproximaciones: son los colores y tipografías que el navegador está renderizando hoy.
>
> **Objetivo:** que la migración conserve la identidad reconocible y solo corrija lo que está inconsistente.

---

## 1. Logo

**Archivo:** `src/assets/marca/logo-mipc.png` (374 × 180 px, con transparencia)

### Anatomía

```
┌─────────────────────────┐
│   m i P C      ◜        │   "mi" → minúsculas, gris oscuro con degradado
│   T e c n o l o g í a   │   "PC" → MAYÚSCULAS, naranja con degradado
└─────────────────────────┘   ◜    → chispa/llama naranja sobre la C
                              "Tecnología" → gris, tracking amplio
```

- **Tipo:** logotipo (wordmark) con descriptor
- **Wordmark:** `miPC` — el contraste entre minúsculas y mayúsculas separa visualmente
  "**mi**" de "**PC**", reforzando la lectura de la marca
- **Bicromía:** gris oscuro + naranja, ambos con degradado vertical
- **Símbolo:** forma de **chispa o llama** inclinada, en naranja, sobre la `C`. Aporta la nota de
  energía y movimiento del conjunto
- **Descriptor:** `Tecnología` en gris, letterspacing amplio, alineado al ancho del wordmark
- **Tipografía:** grotesca redondeada muy pesada, de trazo geométrico

> ⚠️ **Corrección respecto a la primera versión de este documento.** El análisis inicial se hizo
> sobre el logo renderizado a 121 × 58 px en el sitio, y describió el wordmark como `mipc` en
> minúsculas con un *check* sobre la `c`. Al revisar el archivo original se confirma que es
> **`miPC`** con `PC` en mayúsculas, y que el símbolo es una **chispa**, no un check.

### Estado y acciones

| Aspecto | Estado | Acción |
|---|---|---|
| Formato | 🟡 PNG con transparencia, 374 × 180 | Vectorizar a **SVG** |
| Versión monocromática | 🔴 No existe | Crear versión 1 tinta |
| Versión para fondo oscuro | 🔴 No existe | El gris no contrasta sobre `#28303D`; hoy se resuelve poniendo el logo sobre placa blanca en el footer |
| Versión reducida / isotipo | 🔴 No existe | Crear marca reducida para favicon y avatares |
| Zona de protección | 🔴 No definida | Definir (sugerido: altura de la `m`) |
| Tamaño mínimo | 🔴 No definido | Definir (sugerido: 100 px de ancho) |
| Degradado | 🟡 Envejece la marca | Considerar aplanar a color sólido |
| `loading="lazy"` en el logo (WordPress) | ✅ Corregido | Ahora `eager` + `fetchpriority=high` |

> **Un JPEG del logo no sirve.** Se descartó un `LogoMipc.jpeg` de la misma resolución
> (374 × 180) porque el formato aplana la transparencia sobre `#F7F7F7` e introduce artefactos de
> compresión en los bordes del texto. Para logotipos: SVG > PNG > todo lo demás.

### Favicon

**Actual:** `cropped-profile2-32x32.jpg` — 🔴 un **JPG** recortado, no el logo.

Un favicon en JPG no soporta transparencia y se ve con artefactos de compresión a 32 px. **Reemplazar por un SVG + PNG generados desde la marca reducida.**

---

## 2. Paleta de color

### 2.1 Colores de marca

| Rol | HEX | RGB | Uso observado |
|---|---|---|---|
| **Primario — Rojo MiPC** | `#EB3A00` | `235, 58, 0` | Logo, fondos de CTA, ondas decorativas, acentos |
| **Primario oscuro** | `#D64700` | `214, 71, 0` | Variante de texto/enlace, estados hover |
| **Neutro oscuro — Grafito** | `#28303D` | `40, 48, 61` | Títulos, texto de alto contraste |
| **Texto base** | `#54595F` | `84, 89, 95` | Párrafos (uso más frecuente del sitio) |
| **Fondo cálido** | `#FEF2EA` | `254, 242, 234` | Fondos de sección alternos |
| **Blanco** | `#FFFFFF` | `255, 255, 255` | Fondo principal |

### 2.2 Muestras

| | Color | HEX |
|---|---|---|
| 🟥 | Rojo MiPC | `#EB3A00` |
| 🟧 | Rojo oscuro | `#D64700` |
| ⬛ | Grafito | `#28303D` |
| ⬜ | Fondo cálido | `#FEF2EA` |

### 2.3 ⚠️ El logotipo y el sitio no usan exactamente el mismo color

Muestreo de los píxeles del archivo original del logo (`logo-mipc.png`), ordenado por frecuencia:

| Color en el logo | HEX | Píxeles |
|---|---|---|
| Naranja dominante | `#E54D00` | 3.672 |
| Naranja (rango del degradado) | `#E43B02` → `#E54D00` | ~7.500 |
| Gris dominante | `#535153` | 4.806 |
| Gris (extremo oscuro del degradado) | `#423E3F` | 877 |

Contrastado con lo que define el CSS del sitio:

| Rol | Logotipo | Sitio | ¿Coinciden? |
|---|---|---|---|
| Naranja | `#E54D00` | `#EB3A00` | ❌ El del sitio es más rojo y saturado |
| Gris oscuro | `#535153` (neutro) | `#28303D` (azulado) | ❌ Matices distintos |

**Ninguna de las dos está "mal"**: son decisiones tomadas en momentos distintos que fueron
divergiendo. La diferencia es sutil y nadie la nota de forma aislada, pero se vuelve visible
cuando el logo queda junto a un botón naranja.

**Recomendación:** al vectorizar el logo, decidir explícitamente cuál manda. Lo habitual es que
mande el logotipo, por ser el activo de marca. Ambos naranjas tienen un contraste sobre blanco
prácticamente idéntico (~3,9:1), así que la decisión no tiene consecuencias de accesibilidad.

**Decisión provisional:** se conserva `#EB3A00` como color de interfaz —es el que el sitio ha
usado durante años y el que reconoce el usuario recurrente— hasta que se resuelva la
vectorización.

### 2.4 🔴 Problema detectado: proliferación de grises

El sitio usa **siete grises distintos, prácticamente indistinguibles entre sí**:

```
#54595F   ← el más usado (default de Elementor)
#5E5E5E
#595959
#777777
#7A7A7A
#868686
#ADADAD
```

Esto es ruido acumulado por edición manual en Elementor, no una decisión de diseño. **Nadie puede notar la diferencia entre `#595959` y `#5E5E5E`.**

**Acción:** colapsar a una escala neutral de 4 pasos.

### 2.5 Paleta racionalizada propuesta

Conserva exactamente los colores de marca y ordena los neutros:

| Token | HEX | Uso |
|---|---|---|
| `brand-500` | `#EB3A00` | Color de marca. **No modificar** |
| `brand-600` | `#D64700` | Hover, enlaces sobre fondo claro |
| `brand-700` | `#B33200` | Estados activos / pressed |
| `brand-50` | `#FEF2EA` | Fondos de sección |
| `ink-900` | `#28303D` | Títulos |
| `ink-700` | `#54595F` | Texto de cuerpo |
| `ink-500` | `#7A7A7A` | Texto secundario, metadatos |
| `ink-300` | `#ADADAD` | Bordes, texto deshabilitado |
| `surface` | `#FFFFFF` | Fondo base |

> Los tonos `brand-700`, `ink-500` y `ink-300` son consolidaciones o extensiones derivadas de los valores existentes. Los cuatro colores que definen la identidad (`#EB3A00`, `#D64700`, `#28303D`, `#FEF2EA`) se conservan **sin alteración**.

### 2.6 ⚠️ Nota de accesibilidad

`#EB3A00` sobre blanco tiene un ratio de contraste de aproximadamente **3.9:1**.

- ✅ Cumple AA para **texto grande** (≥ 24 px, o ≥ 19 px en negrita)
- ❌ **No cumple** AA para texto normal (requiere 4.5:1)

**Regla:** el rojo de marca se usa para fondos de botón (con texto blanco encima), títulos grandes e iconografía — **nunca para párrafos**. Para enlaces en línea dentro de texto, usar `brand-700` (`#B33200`), que sí alcanza 4.5:1.

---

## 3. Tipografía

### 3.1 Situación actual

El sitio carga **4 familias** desde Google Fonts, **cada una con las 18 variantes completas** (pesos 100-900 + itálicas):

```
Baloo Chettan 2 · Raleway · Roboto · Poppins
```

Esto es una de las causas directas de los **1.3 MB de CSS**. En la práctica solo se usan estas combinaciones:

| Familia | Pesos realmente usados | Función observada |
|---|---|---|
| **Baloo Chettan 2** | 600, 700 | Botones, CTAs, textos de acento (uso más frecuente) |
| **Raleway** | 400, 500, 700 | Títulos (700/34px) y texto de cuerpo |
| **Roboto** | 500 | Navegación y elementos secundarios |
| **Poppins** | 600 | 🔴 Solo **2 apariciones** en todo el home |

### 3.2 Sistema tipográfico propuesto

**Reducir de 4 familias a 2.** Se conservan las dos que definen el carácter de la marca:

| Rol | Familia | Pesos | Justificación |
|---|---|---|---|
| **Display / CTA** | Baloo Chettan 2 | 600, 700 | Redondeada y amable, hace juego con el logo. Es la firma visual del sitio |
| **Texto / UI** | Raleway | 400, 500, 700 | Ya soporta títulos y cuerpo. Legible y neutra |

**Eliminar:** `Poppins` (uso residual) y `Roboto` (reemplazable por Raleway 500 sin cambio perceptible).

**Además:** auto-hospedar las fuentes en `/fonts/` con `woff2` y `font-display: swap`. Elimina la petición externa a Google, mejora el LCP y evita el problema de privacidad/GDPR de Google Fonts.

> **Impacto estimado:** de ~72 archivos de fuente disponibles a **5 woff2 reales**.

### 3.3 Escala tipográfica

Derivada de los tamaños detectados en producción (34 / 21 / 19 / 18 / 17 / 16 / 12 px):

| Token | Tamaño | Peso | Familia | Uso |
|---|---|---|---|---|
| `display` | 40 px | 700 | Baloo Chettan 2 | Titular del hero |
| `h1` | 34 px | 700 | Raleway | Título de página |
| `h2` | 28 px | 700 | Raleway | Sección |
| `h3` | 21 px | 700 | Raleway | Subsección, tarjetas |
| `body-lg` | 18 px | 400 | Raleway | Entradilla |
| `body` | 17 px | 400 | Raleway | Párrafo base |
| `button` | 18 px | 700 | Baloo Chettan 2 | Botones |
| `nav` | 16 px | 500 | Raleway | Navegación |
| `caption` | 14 px | 400 | Raleway | Metadatos, pies |

> 🔴 Se detectaron textos a **12 px** en el sitio actual (4 nodos). Es el mínimo legible y queda por debajo de lo recomendable en móvil. **Elevar a 14 px** como piso.

---

## 4. Componentes

### 4.1 Botones — especificación actual

Valores computados del botón `+ Información`:

```
font-family : "Baloo Chettan 2"
font-weight : 700
font-size   : 18px
padding     : 20px 40px
border-radius: 5px
border      : 1.6px
```

### 4.2 Variantes propuestas

Conservando radio `5px` y padding `20px 40px`:

| Variante | Fondo | Texto | Borde | Uso |
|---|---|---|---|---|
| **Primario** | `#EB3A00` | `#FFFFFF` | — | CTA principal ("Solicitar servicio") |
| **Primario hover** | `#D64700` | `#FFFFFF` | — | — |
| **Secundario** | transparente | `#EB3A00` | 1.6px `#EB3A00` | Acción alterna ("+ Información") |
| **Fantasma** | transparente | `#54595F` | 1.6px `#ADADAD` | Terciario |
| **WhatsApp** | `#25D366` | `#FFFFFF` | — | Único color externo permitido |

> 🔴 **Bug actual:** el botón `+ Información` tiene `border-color: rgba(122,122,122,0)` — borde **totalmente transparente**. Se definió un borde de 1.6 px que nadie ve. El botón queda flotando sin afordancia visual. **Corregir en el rediseño.**

### 4.3 Elementos gráficos característicos

| Elemento | Descripción | Decisión |
|---|---|---|
| **Ondas divisoras** | Separadores curvos en rojo `#EB3A00` entre secciones | ✅ **Conservar** — es la seña visual más distintiva del sitio |
| **Ilustraciones de servicio** | Ilustraciones planas por línea de negocio | ✅ Conservar, migrar a SVG/WebP |
| **Contadores animados** | Cifras que suben al entrar en viewport | ✅ Conservar, con valores corregidos |
| **Tira de logos de clientes** | Grid de logos en escala de gris | ✅ Conservar, mejorar con contexto |
| **Slider del hero** | Carrusel de 2 slides | ⚠️ **Revisar** — está oculto en móvil (ver auditoría) |
| **Botón WhatsApp flotante** | Plugin Joinchat | ✅ Reimplementar nativo, sin plugin |

---

## 5. Tokens de diseño

### 5.1 CSS Custom Properties

```css
:root {
  /* Marca */
  --brand-50:  #FEF2EA;
  --brand-500: #EB3A00;
  --brand-600: #D64700;
  --brand-700: #B33200;

  /* Neutros */
  --ink-900: #28303D;
  --ink-700: #54595F;
  --ink-500: #7A7A7A;
  --ink-300: #ADADAD;
  --surface: #FFFFFF;

  /* Externo */
  --whatsapp: #25D366;

  /* Tipografía */
  --font-display: "Baloo Chettan 2", system-ui, sans-serif;
  --font-body: "Raleway", system-ui, sans-serif;

  /* Forma */
  --radius: 5px;
  --radius-card: 10px;
  --btn-padding: 20px 40px;
}
```

### 5.2 Tailwind CSS v4

```css
@import "tailwindcss";

@theme {
  --color-brand-50:  #FEF2EA;
  --color-brand-500: #EB3A00;
  --color-brand-600: #D64700;
  --color-brand-700: #B33200;

  --color-ink-900: #28303D;
  --color-ink-700: #54595F;
  --color-ink-500: #7A7A7A;
  --color-ink-300: #ADADAD;

  --color-whatsapp: #25D366;

  --font-display: "Baloo Chettan 2", system-ui, sans-serif;
  --font-body: "Raleway", system-ui, sans-serif;

  --radius-btn: 5px;
}
```

---

## 6. Qué se conserva y qué cambia

Guía rápida para que la migración **no se sienta brusca**:

### ✅ Se conserva intacto

- Logo y bicromía gris + rojo
- `#EB3A00` como color de marca
- Baloo Chettan 2 para CTAs y acentos
- Raleway para títulos y cuerpo
- Ondas rojas como separador de secciones
- Ilustraciones planas por servicio
- Radio de botón de 5 px y su padding generoso
- Estructura de secciones del home (hero → servicios → cotización → blog → clientes)
- Contadores de indicadores
- Tira de logos de clientes
- Botón flotante de WhatsApp

### 🔧 Se corrige sin alterar la identidad

- 7 grises → 4 neutros
- 4 familias tipográficas → 2, auto-hospedadas
- Borde invisible de los botones → borde visible
- Texto de 12 px → 14 px mínimo
- Rojo de marca fuera de párrafos (contraste AA)
- Logo → SVG, con carga prioritaria
- Favicon JPG → SVG/PNG desde la marca reducida
- Degradado metálico del logo → evaluar aplanado

### ➕ Se añade

- Versión monocromática y reducida del logo
- Estados de foco visibles (accesibilidad de teclado)
- Escala tipográfica formalizada
- Tokens de diseño documentados
- Zona de protección y tamaño mínimo del logo
