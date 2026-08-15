# 04 — Inventario de contenido

> Mapa completo de lo que existe hoy en mipc.com.co, para no perder nada en la migración.
> Verificado el 2026-08-14 contra el sitemap XML y navegación directa.

---

## 1. Páginas (8)

| # | URL actual | Título | Palabras | Rescatar |
|---|---|---|---|---|
| 1 | `/` | Home | 278 | ✅ Estructura + textos |
| 2 | `/home/servicios/` | Servicios MIPC Tecnología | 568 | ✅ **Alto valor** — texto completo de los 5 servicios |
| 3 | `/home/servicios-mipc-tecnologia-copy/` | Nosotros MIPC Tecnología | 278 | ✅ Historia, cifras, listado "Qué hacemos" |
| 4 | `/home/experiencia/` | Experiencia MIPC Tecnología | 38 | 🟡 Solo los logos de clientes |
| 5 | `/home/actualidad/` | Actualidad (listado de blog) | 158 | 🟡 Estructura, no el contenido |
| 6 | `/home/contacto/` | Contacto | 34 | 🟡 Solo el formulario (1 form) |
| 7 | `/garantias/` | Políticas y garantías | **1.642** | ✅ **Máximo valor** — migrar íntegro |
| 8 | `/recursos/` | Recursos | 122 | ⚠️ Migrar **sin** el "Pack Office" |

## 2. Entradas de blog (3)

| URL | Fecha | Decisión |
|---|---|---|
| `/google-anuncia-actualizaciones-de-sus-productos-de-realidad-virtual-y-aumentada/` | 2023-04-04 | ❌ Despublicar |
| `/amazon-anuncia-la-adquisicion-de-la-empresa-de-tecnologia-cuantica-psiquantum/` | 2023-04-04 | ❌ Despublicar |
| `/intel-anuncia-nuevos-procesadores-de-escritorio-core-de-12a-generacion/` | 2023-04-04 | ❌ Despublicar |

> Contenido genérico de noticias tecnológicas globales, sin relación con el negocio ni con Medellín. Mantener las URLs vivas con un 301 hacia `/blog/` para no generar 404 en enlaces externos que pudieran existir.

---

## 3. Navegación actual

**Menú principal:** Nosotros · Servicios · Experiencia · Actualidad · Contacto · Recursos

**Footer:**
- Columna 1: logo + "Políticas y garantías"
- Columna 2: COMPUTADORES → Reparación · Mantenimiento · Alquiler · Compra
- Columna 3: Facebook · Instagram · `Cel: 314 888 90 78` · `Medellín – Colombia`

> 🔴 Los enlaces "Reparación", "Mantenimiento" y "Alquiler" del footer apuntan a `/servicios-mipc-tecnologia/`, que redirige a la página de **Nosotros**, no a Servicios. Los tres están rotos funcionalmente. "Compra" sale del dominio hacia `mipctecnologia.com/shop`.

---

## 4. Arquitectura propuesta

```
/                                          Home
/nosotros/                                 Historia, cifras, qué hacemos
/servicios/                                Hub de servicios
/servicios/reparacion-de-computadores/     Landing
/servicios/redes-de-datos/                 Landing
/servicios/camaras-de-seguridad/           Landing
/servicios/alquiler-de-computadores/       Landing
/servicios/mesa-de-ayuda/                  Landing
/experiencia/                              Casos, clientes, testimonios
/blog/                                     Listado
/blog/[slug]/                              Entrada
/contacto/                                 Formulario + NAP + mapa
/garantias/                                Políticas y garantías
/recursos/                                 Herramientas de soporte
```

---

## 5. Mapa de redirecciones 301

**Crítico para no perder posicionamiento.** Toda URL actual debe resolver.

| Origen | Destino |
|---|---|
| `/home/servicios/` | `/servicios/` |
| `/servicios/` | *(se mantiene — ya resuelve aquí)* |
| `/home/servicios-mipc-tecnologia-copy/` | `/nosotros/` |
| `/servicios-mipc-tecnologia/` | `/nosotros/` |
| `/home/experiencia/` | `/experiencia/` |
| `/experiencia/` | *(se mantiene)* |
| `/home/actualidad/` | `/blog/` |
| `/home/contacto/` | `/contacto/` |
| `/garantias/` | *(se mantiene)* |
| `/recursos/` | *(se mantiene)* |
| `/google-anuncia-actualizaciones.../` | `/blog/` |
| `/amazon-anuncia-la-adquisicion.../` | `/blog/` |
| `/intel-anuncia-nuevos-procesadores.../` | `/blog/` |

**Anclas del sitio actual a preservar como redirect:**

| Ancla actual | Destino |
|---|---|
| `/servicios/#repara` | `/servicios/reparacion-de-computadores/` |
| `/servicios/#redes` | `/servicios/redes-de-datos/` |
| `/servicios/#camaras` | `/servicios/camaras-de-seguridad/` |
| `/servicios/#alquiler` | `/servicios/alquiler-de-computadores/` |
| `/servicios/#mesa` | `/servicios/mesa-de-ayuda/` |

> Las anclas (`#`) no llegan al servidor, así que además hay que resolverlas en cliente con un pequeño script de redirección en `/servicios/`, o mantener esas anclas funcionando dentro del hub.

**Post-migración:** enviar el nuevo sitemap por Google Search Console y monitorear 404 durante las primeras semanas.

---

## 6. Activos a migrar

### 6.1 Marca

| Archivo actual | Acción |
|---|---|
| `2023/02/Logo_MiPc_Computadores.png` | Vectorizar → SVG + PNG @2x |
| `2023/04/cropped-profile2-*.jpg` (favicon) | Reemplazar por SVG/PNG desde marca reducida |

### 6.2 Ilustraciones de servicio

| Archivo | Servicio |
|---|---|
| `MIPC_Reparacion-de-Computadores2-1.png` | Reparación |
| `MIPC_Reparacion-de-Computadores-1.png` | Reparación (fondo) |
| `MIPC_cctv.png` | Cámaras |
| `MIPC_Redes.png` | Redes |
| `Redes_de_datos_MiPc_2.jpg` | Redes (fondo) |
| `MIPC_Alquiler-de-Computadores.png` | Alquiler |
| `MIPC_Alquiler-de-Computadores2.jpg` | Alquiler (fondo) |
| `MIPC_Mesas_de_Ayuda.png` | Mesa de ayuda |
| `MIPC_cotizacion.png` | CTA cotización |

**Acción:** convertir todo a **WebP** con variantes responsive (`srcset`). Evaluar re-exportar a SVG los que sean ilustración vectorial de origen.

### 6.3 Fondos

| Archivo | Peso | Acción |
|---|---|---|
| `men-3.png` | **768 KB** | 🔴 Convertir a WebP (~40 KB) |
| `mipc_background3.jpg` | — | Optimizar |
| `Back_Clientes_MIPC.jpg` | 38 KB | Optimizar |

### 6.4 Logos de clientes (13)

```
Clientes_0000_Capa-8.png                          ⚠️ sin identificar
Clientes_0002_Capa-5.png                          ⚠️ sin identificar
Clientes_0003_Capa-4.png                          ⚠️ sin identificar
Clientes_0004_TRAUMA-CENTRO.png                   Trauma Centro
Clientes_0005_SEISO.png                           SEISO
Clientes_0006_RADIO-TIEMPO.png                    Radio Tiempo
Clientes_0007_OLIMPICA-STEREO.png                 Olímpica Stereo
Clientes_0009_MEPER-SOLUTIONS.png                 MEPER Solutions
Clientes_0010_IPS-SER-INTEGRAL.png                IPS Ser Integral
Clientes_0011_INSTITUCION-EDUCATIVA-PROGRESAR.png I.E. Progresar
Clientes_0013_INGENIERIA-Y-CONTRATOS.png          Ingeniería y Contratos
Clientes_0015_EIP-SAS.png                         EIP S.A.S.
Clientes_0016_Distribuidora-FP.png                Distribuidora FP
Clientes_0017_6ae2c4ff-....png                    ⚠️ sin identificar
```

> ⚠️ Identificar los 4 logos sin nombre y **confirmar autorización de uso de marca** antes de republicar.

---

## 7. Funcionalidad a reimplementar

| Función | Implementación actual | Propuesta |
|---|---|---|
| Formulario de contacto | Elementor Pro Forms | Web3Forms / Formspree, o función serverless |
| WhatsApp flotante | Plugin Joinchat | Componente propio, ~1 KB |
| Slider del hero | Swiper vía Elementor | Swiper standalone, o CSS scroll-snap |
| Contadores animados | Elementor Counter | `IntersectionObserver` propio |
| Tira de logos | Elementor Gallery | Grid CSS |
| Listado de blog | Elementor Posts | Content Collections |
| Sitemap | WordPress nativo | Generado en build |

---

## 8. Checklist de extracción

- [ ] Backup completo de WordPress (BD + `wp-content`)
- [ ] Exportar textos de las 8 páginas a Markdown
- [ ] Descargar los activos de marca en máxima resolución
- [ ] Descargar los 13 logos de clientes
- [ ] Descargar las 9 ilustraciones de servicio
- [ ] Copiar íntegro el texto de `/garantias/` (1.642 palabras) corrigiendo erratas
- [ ] Registrar destino del formulario de contacto actual (¿a qué correo llega?)
- [ ] Verificar propiedad del dominio y acceso al DNS
- [ ] Verificar acceso a Google Search Console y Google Analytics
- [ ] Confirmar si existe ficha de Google Business Profile
