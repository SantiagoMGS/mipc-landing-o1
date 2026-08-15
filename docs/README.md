# Documentación — Proyecto MiPC Tecnología

Base de conocimiento para la migración de [mipc.com.co](https://mipc.com.co/) desde WordPress/Elementor hacia un sitio estático en código.

## Índice

| # | Documento | Contenido |
|---|---|---|
| 01 | [Perfil de la empresa](01-perfil-empresa.md) | Quién es MI PC TECNOLOGÍA S.A.S., qué vende, a quién, datos de contacto verificados |
| 02 | [Identidad visual](02-identidad-visual.md) | Logo, paleta de color, tipografías, componentes y tokens de diseño extraídos del sitio actual |
| 03 | [Auditoría de hallazgos](03-auditoria-hallazgos.md) | Diagnóstico técnico, SEO, rendimiento, UX y riesgos del sitio actual |
| 04 | [Inventario de contenido](04-inventario-contenido.md) | Mapa de páginas, URLs actuales, activos y plan de redirecciones 301 |

Para instrucciones de desarrollo y despliegue, ver el [README del proyecto](../README.md).

## Origen de los datos

Todo lo documentado fue **extraído directamente del sitio en producción** el **2026-08-14** mediante inspección automatizada con navegador (DOM, estilos computados, métricas de red, sitemap y robots.txt).

No hay suposiciones sin marcar: cuando un dato está pendiente de confirmar con el cliente aparece señalado como `⚠️ POR CONFIRMAR`.

## Principio rector de la migración

> **Continuidad visual, ruptura técnica.**
>
> El usuario que ya conoce mipc.com.co debe reconocer el sitio nuevo de inmediato. Se conservan logo, paleta, tipografías y estructura de secciones. Lo que cambia es todo lo que el usuario no ve: plataforma, rendimiento, SEO y seguridad.
