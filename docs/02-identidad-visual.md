# 02 — Identidad visual

> Todos los valores fueron extraídos de los **estilos computados del sitio en producción** (mipc.com.co) el 2026-08-14. No son aproximaciones: son los colores y tipografías que el navegador está renderizando hoy.
>
> **Objetivo:** que la migración conserve la identidad reconocible y solo corrija lo que está inconsistente.

---

## 1. Logo

**Fuente de verdad:** `src/assets/marca/vector/logo-kit.pdf` — archivo vectorial original
(Illustrator, 128 trazos, sin imágenes incrustadas).

### El kit contiene 4 variantes

| # | Variante | Descriptor | Uso sugerido |
|---|---|---|---|
| 1 | `logo-reparamos` | "Reparamos tu computador" | Publicidad dirigida a persona natural |
| 2 | `logo-tecnologia-espaciado` | "T e c n o l o g í a" | **La que usa el sitio** |
| 3 | `logo-dominio` | "mipc.com.co" | Papelería, firmas de correo |
| 4 | `logo-tecnologia` | "Tecnología" compacto | Espacios reducidos |

Todas comparten el mismo wordmark y proporción (~2,08:1).

### Anatomía

```
┌─────────────────────────┐
│   m i P C      ◜        │   "mi" → minúsculas, gris con degradado
│   T e c n o l o g í a   │   "PC" → MAYÚSCULAS, naranja con degradado
└─────────────────────────┘   ◜    → hoja naranja inclinada sobre la C
                              "Tecnología" → gris, tracking amplio
```

- **Tipo:** logotipo (wordmark) con descriptor intercambiable
- **Wordmark:** `miPC` — el contraste minúscula/mayúscula separa visualmente "**mi**" de "**PC**"
- **Bicromía:** gris + naranja, ambos con degradado vertical
- **Símbolo:** **hoja** inclinada en naranja sobre la `C`, con forma de pétalo
- **Tipografía:** grotesca redondeada muy pesada, con cortes diagonales en la `m` y la `i`

> ⚠️ **Dos correcciones respecto a versiones anteriores de este documento.** El análisis inicial,
> hecho sobre el render de 121 × 58 px del sitio, describía `mipc` en minúsculas con un *check*
> sobre la `c`. La segunda revisión, sobre el PNG de 374 × 180, corrigió a `miPC` pero llamó
> "chispa" al símbolo. El vector confirma que es **`miPC`** y que el símbolo es una **hoja**.

### Estado y acciones

| Aspecto | Estado | Acción |
|---|---|---|
| Fuente vectorial | ✅ Recuperada y archivada en el repo | — |
| Variantes SVG | ✅ Las 4 + isotipo, cada una en archivo propio | — |
| Formato servido | ✅ SVG (2,5 KB con brotli) | — |
| Favicon | ✅ SVG cuadrado del bloque "PC" + PNG de respaldo | — |
| Versión para fondo oscuro | ✅ `logo-tecnologia-blanco.svg` | — |
| Zona de protección | 🔴 No definida | Definir (sugerido: altura de la `m`) |
| Tamaño mínimo | 🔴 No definido | Definir (sugerido: 100 px de ancho) |

### Versión para fondo oscuro

Sobre el grafito `#28303D` del footer, cada parte del logotipo se comporta distinto:

| Elemento | Color | Contraste sobre `#28303D` | Decisión |
|---|---|---|---|
| "mi" y "Tecnología" | `#505358` | 1,4:1 | ❌ Recolorear |
| "PC" y la hoja | `#FF461A` | 3,75:1 | ✅ Conservar |

El naranja funciona sobre oscuro, así que **tocarlo sería perder la marca**. Solo se suben los
grises.

**No se aplanan a blanco puro:** el rango de grises original (`#43454B` → `#505358`) se remapea a
`#D4D4D4` → `#FFFFFF`, conservando la dirección del degradado. Aplanar habría dejado el wordmark
sin volumen.

La selección es por saturación, no por valor exacto: se recolorea cualquier color cuya diferencia
entre canal máximo y mínimo sea menor a 30. Así sigue funcionando si el degradado cambia.

### Peso de cada variante

| Archivo | Crudo | gzip | brotli |
|---|---|---|---|
| `isotipo.svg` | 6,1 KB | 1,6 KB | **1,3 KB** |
| `logo-tecnologia-espaciado.svg` | 10,5 KB | 3,1 KB | **2,5 KB** |
| `logo-tecnologia.svg` | 10,5 KB | 3,1 KB | **2,6 KB** |
| `logo-dominio.svg` | 10,8 KB | 2,7 KB | **2,2 KB** |
| `logo-reparamos.svg` | 15,9 KB | 4,1 KB | **3,3 KB** |
| `favicon.svg` | 3,0 KB | — | — |

> **Por qué el primer intento pesaba 96 KB.** La conversión directa del PDF produce un SVG que
> contiene **las cuatro variantes**, recortadas solo por `viewBox`. SVGO apenas quitaba un 3,4 %
> porque, formalmente, todo el contenido seguía en uso.
>
> La solución fue **filtrar los trazos por posición**: calcular la caja de cada grupo de dibujo
> como *contenido ∩ recorte* (el rectángulo de un degradado se sale a propósito, y el recorte de
> un texto suele ser la página entera), descartar los trazos de fondo del tamaño de la hoja, y
> conservar solo las definiciones referenciadas. De 96 KB a 10,5 KB.
>
> **Un JPEG del logo no sirve.** Se descartó un `LogoMipc.jpeg` de 374 × 180 porque el formato
> aplana la transparencia sobre `#F7F7F7` e introduce artefactos en los bordes del texto.

### Favicon

**Anterior (WordPress):** `cropped-profile2-32x32.jpg` — un JPG recortado que ni siquiera era el logo.

**Actual:** el bloque **"PC" + hoja** en SVG cuadrado, más PNG de 32 y 192 px como respaldo y
`apple-touch-icon` de 180 px. Se usó solo el bloque naranja porque el wordmark completo
(proporción 2,6:1) resulta ilegible a 32 px. Los trazos se seleccionaron por color, no por
coordenada: se conservan los grupos cuyo relleno tiene componente rojo alto y verde bajo.

---

## 2. Paleta de color

> **Fuente autoritativa:** los valores salen de los `stop-color` declarados dentro del archivo
> vectorial de marca (`src/assets/marca/vector/logo-kit.pdf`), no de un muestreo rasterizado.

### 2.1 Colores de marca

| Rol | HEX | Origen |
|---|---|---|
| **Naranja MiPC** | `#FF461A` | Degradado del logotipo (extremo claro) |
| **Naranja MiPC — extremo oscuro** | `#FF4019` | Degradado del logotipo |
| **Gris MiPC** | `#505358` | Sólido del descriptor "Tecnología" |
| **Gris MiPC — extremo oscuro** | `#484A50` | Degradado del wordmark |
| **Fondo cálido** | `#FEF2EA` | Heredado del sitio |
| **Blanco** | `#FFFFFF` | Fondo principal |

### 2.2 Muestras

| | Color | HEX | Contraste sobre blanco |
|---|---|---|---|
| 🟧 | Naranja de marca | `#FF461A` | 3,42:1 |
| 🟥 | Naranja accesible (botones) | `#D63F0F` | 4,59:1 |
| 🟫 | Naranja para texto | `#B33200` | 6,23:1 |
| ⬛ | Grafito | `#28303D` | 13,29:1 |

### 2.3 Historia del color: tres versiones distintas

Durante la migración aparecieron **tres valores distintos para el mismo naranja**, según dónde se
mirara:

| Fuente | Naranja | Gris | Fiabilidad |
|---|---|---|---|
| **Vector de marca** (`logo-kit.pdf`) | `#FF461A` | `#505358` | ✅ Autoritativa |
| PNG del sitio WordPress | `#E54D00` | `#535153` | 🟡 Export degradado |
| CSS del sitio WordPress | `#EB3A00` | `#28303D` | 🟡 Elegido a ojo |

El PNG que servía WordPress era un export apagado del original, y el CSS del sitio se configuró
con un naranja aún más rojo. Ninguno coincidía con el archivo de marca.

**Decisión tomada:** manda el vector. `brand-500` pasa a ser `#FF461A`.

### 2.4 ⚠️ El color de marca no sirve como fondo de botón

Al adoptar el naranja real apareció un problema medible:

| Fondo | Texto blanco a 17 px | ¿Cumple AA (4,5:1)? |
|---|---|---|
| `#FF461A` (marca) | 3,42:1 | ❌ |
| `#EB3A00` (sitio anterior) | 4,09:1 | ❌ |
| `#D63F0F` | 4,59:1 | ✅ |

> **Los botones del sitio anterior tampoco cumplían.** No es un problema que introdujera el cambio
> de color: ya existía y pasó desapercibido porque nadie lo había medido.

**Solución aplicada** — separar el color de marca del color de acción:

| Token | HEX | Uso |
|---|---|---|
| `brand-500` | `#FF461A` | Logotipo, ondas, iconos, bordes, elementos decorativos |
| `brand-600` | `#D63F0F` | **Fondo de botones** con texto blanco |
| `brand-700` | `#B33200` | Texto y enlaces en línea sobre fondo claro |

La identidad se mantiene: el naranja que el usuario asocia a la marca sigue presente en el logo y
en los elementos gráficos. Solo los fondos que llevan texto encima usan la variante oscurecida.

### 2.5 🔴 Problema detectado: proliferación de grises

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
  --brand-500: #FF461A;  /* color del logotipo */
  --brand-600: #D63F0F;  /* fondo de boton, cumple AA con texto blanco */
  --brand-700: #B33200;  /* texto y enlaces */

  /* Neutros */
  --ink-900: #28303D;
  --ink-700: #54595F;
  --ink-500: #7A7A7A;
  --ink-300: #ADADAD;
  --surface: #FFFFFF;

  /* Externo */
  --whatsapp: #25D366;

  /* Tipografia */
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
  --color-brand-500: #FF461A;
  --color-brand-600: #D63F0F;
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
