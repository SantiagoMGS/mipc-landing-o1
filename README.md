# mipc.com.co

Sitio corporativo de **MI PC TECNOLOGÍA S.A.S.** (Medellín, Colombia), migrado desde WordPress/Elementor a un sitio estático.

📄 El diagnóstico completo, la identidad de marca y el inventario de contenido están en [`docs/`](docs/README.md).

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Astro 7 (salida estática) |
| Estilos | Tailwind CSS 4 con tokens de marca |
| Contenido | Content Collections (Markdown + Zod) |
| Tipografías | Fontsource, auto-hospedadas (subset latin) |
| Formulario | Web3Forms |
| Hosting sugerido | Cloudflare Pages |

## Comandos

```powershell
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo -> http://localhost:4321
npm run build      # astro check + build de producción -> dist/
npm run preview    # servir dist/ localmente
```

## Configuración

Copia `.env.example` a `.env` y define las variables que necesites. **Todas son opcionales**: sin
ellas el sitio funciona igual, solo se desactiva la función correspondiente.

| Variable | Para qué |
|---|---|
| `PUBLIC_WEB3FORMS_KEY` | Activa el envío del formulario de contacto |
| `PUBLIC_GA4_ID` | Google Analytics 4 (`G-XXXXXXXXXX`) |
| `PUBLIC_GOOGLE_ADS_ID` | Google Ads (`AW-XXXXXXXXXX`) |
| `PUBLIC_ADS_CONVERSION_SEND_TO` | Etiqueta de conversión de Ads (opcional) |

La clave de Web3Forms se obtiene gratis en [web3forms.com](https://web3forms.com) registrando
`soporte@mipc.com.co`. No es un secreto (identifica el buzón destino), pero se mantiene fuera del
repositorio.

## Analítica y publicidad

**Sin `PUBLIC_GA4_ID` ni `PUBLIC_GOOGLE_ADS_ID` no se emite una sola línea de Google en el HTML**,
ni aparece el banner de cookies. Verificado en cada build.

Con los IDs configurados:

- Se aplica **Consent Mode v2** con todo denegado por defecto
- El banner solicita consentimiento y persiste la decisión en `localStorage`
- Al rechazar se activa `ads_data_redaction` (pings sin cookies)

### Conversiones que se registran

| Acción | Evento GA4 | Parámetro |
|---|---|---|
| Clic en WhatsApp | `generate_lead` | `metodo: whatsapp` |
| Clic en teléfono | `generate_lead` | `metodo: llamada` |
| Envío del formulario | `generate_lead` | `metodo: formulario` |
| Clic en correo | `generate_lead` | `metodo: correo` |

**Ruta recomendada para Google Ads:** marcar `generate_lead` como evento clave en GA4 e importarlo
como conversión en Ads. Así no hace falta `PUBLIC_ADS_CONVERSION_SEND_TO`.

## Estructura

```
src/
  components/     Header, Footer, Seo, Wave, Button, Stats, CtaQuote...
  content/
    servicios/    5 landings de servicio en Markdown
    blog/         Entradas del blog
  layouts/        BaseLayout, MarkdownLayout
  pages/          Rutas del sitio
  styles/         global.css con los tokens de diseño
  consts.ts       Datos de la empresa (NAP, redes, indicadores)
public/
  _redirects      301 desde las URLs de WordPress
  _headers        Cabeceras de seguridad y caché
```

## Dónde se cambian las cosas

| Quiero cambiar... | Archivo |
|---|---|
| Teléfono, correo, dirección, horarios | [src/consts.ts](src/consts.ts) |
| Colores o tipografías | [src/styles/global.css](src/styles/global.css) |
| Texto de un servicio | `src/content/servicios/*.md` |
| Publicar un artículo | crear `src/content/blog/mi-articulo.md` |
| Menú de navegación | `NAV` en [src/consts.ts](src/consts.ts) |
| Política de garantías | [src/pages/garantias.md](src/pages/garantias.md) |
| Política de datos y cookies | [src/pages/privacidad.md](src/pages/privacidad.md) |
| Texto del banner de cookies | [src/components/ConsentBanner.astro](src/components/ConsentBanner.astro) |

## Publicar un artículo

Crea un archivo en `src/content/blog/`:

```markdown
---
title: Título del artículo
description: Resumen de 1-2 frases que aparece en Google.
pubDate: 2026-08-20
---

Contenido en Markdown.
```

Se publica solo al hacer build. Usa `draft: true` para dejarlo sin publicar.

## Despliegue en Cloudflare Pages

| Ajuste | Valor |
|---|---|
| Build command | `npm run build` |
| Output directory | `dist` |
| Variable de entorno | `PUBLIC_WEB3FORMS_KEY` |

Los archivos `public/_redirects` y `public/_headers` se aplican automáticamente.

## Pendientes antes de salir a producción

- [ ] Vectorizar el logo real (hoy hay un SVG provisional en `public/`)
- [x] ~~Migrar las ilustraciones de servicio a WebP~~ — en `src/assets/`, optimizadas por Astro
- [x] ~~Añadir los logos reales de clientes~~ — 10 logos identificados en `src/assets/clientes/`
- [ ] Confirmar autorización de uso de marca de los logos de clientes
- [ ] Identificar los 4 logos restantes (`Capa-4`, `Capa-5`, `Capa-8`, `6ae2c4ff…`)
- [ ] Generar la imagen `public/og-default.jpg` (1200×630)
- [ ] Confirmar horarios de atención y NIT
- [ ] Revisión jurídica de `garantias.md` (ver aviso dentro del archivo)
- [ ] Revisión jurídica de `privacidad.md` (borrador, ver aviso dentro del archivo)
- [ ] Configurar `PUBLIC_WEB3FORMS_KEY`
- [ ] Crear propiedad de GA4 y configurar `PUBLIC_GA4_ID`
- [ ] Verificar propiedad en Google Search Console y enviar el sitemap

## Imágenes

Los originales viven en `src/assets/` y **no se sirven tal cual**: Astro los convierte a WebP con
variantes responsive en cada build. Para añadir una imagen nueva, colócala ahí e impórtala desde
[src/lib/imagenes.ts](src/lib/imagenes.ts) — nunca desde `public/`.
