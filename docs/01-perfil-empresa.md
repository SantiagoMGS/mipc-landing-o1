# 01 — Perfil de la empresa

> Fuente: contenido publicado en mipc.com.co (páginas *Nosotros*, *Servicios*, *Políticas y garantías*), verificado el 2026-08-14.

---

## 1. Identificación

| Campo | Valor |
|---|---|
| **Razón social** | MI PC TECNOLOGÍA S.A.S. |
| **Marca comercial** | MiPC Tecnología |
| **Dominio principal** | `mipc.com.co` |
| **Dominio secundario** | `mipctecnologia.com` (tienda online — `/shop`) |
| **Año de fundación** | 2009 |
| **Trayectoria declarada** | +15 años en el sector tecnológico |
| **Origen** | Empresa 100 % colombiana |
| **Sede** | Única y principal en Medellín, sector **Laureles - Estadio** |
| **NIT** | ⚠️ POR CONFIRMAR — no publicado en el sitio |

> 🔴 **Erratas a corregir en la migración.** En la página de garantías la razón social aparece escrita **"MI PC TECNOLGIA S.A.S."** (falta la `O`), repetida varias veces. El correo aparece como `soporte@ mipc.com.co` con un espacio que rompe el `mailto:`.

---

## 2. Datos de contacto

| Canal | Dato | Estado |
|---|---|---|
| **Dirección física** | Cra 66A #34-48 int 101, Laureles - Estadio, Medellín | ✅ Confirmada 2026-08-14 |
| **Celular / WhatsApp** | 314 888 90 78 | Visible en header y footer |
| **Correo** | soporte@mipc.com.co | ⚠️ En WordPress solo aparecía en `/garantias/`, con errata |
| **Facebook** | [facebook.com/mipctecnologiasas](https://www.facebook.com/mipctecnologiasas) | 🟡 Perfil inactivo |
| **Instagram** | [instagram.com/mipc.com.co](https://www.instagram.com/mipc.com.co) | 🟡 Perfil inactivo |
| **Google Business Profile** | CID `15154712519055002689` | ✅ Existe |
| **WhatsApp flotante** | Plugin Joinchat — "¿Hola, cómo podemos ayudarte?" | Activo |
| **Horarios** | Lun-Vie 8:00 a.m. – 5:00 p.m. · Sáb 9:00 a.m. – 1:00 p.m. | ✅ Confirmados 2026-08-14 |

> 🔴 **La dirección publicada en WordPress está desactualizada.** El sitio anterior indica
> `Cr 66ª # 34-26` mientras que la ficha de Google registra `Cra 66A #34-48 int 101`.
> Una discrepancia de NAP entre el sitio y Google Business Profile penaliza directamente el
> posicionamiento local: Google no puede confirmar que ambas fichas sean el mismo negocio.
> **Corregido en el sitio nuevo y en `garantias.md`.**

> 🔴 **Hallazgo crítico de negocio (sitio anterior).** La dirección física, el correo y los horarios
> son los tres datos que Google usa para el paquete local (NAP: *Name, Address, Phone*). En
> WordPress la dirección solo existía dentro de un texto legal de 1.642 palabras —y errada— y no
> había horarios. Esto explica buena parte de la invisibilidad en búsquedas locales tipo
> *"reparación de computadores Laureles"*.

**Resuelto en el sitio nuevo:** NAP completo y consistente en el footer de todas las páginas +
JSON-LD `LocalBusiness` con `openingHours` y `hasMap` + mapa de la ficha real en `/contacto/`.

---

## 3. Propuesta de valor

> *"Somos su aliado estratégico en el sector tecnológico."*

> *"Somos un aliado estratégico con una serie de soluciones y servicios que se enfocan en el desarrollo y acompañamiento en el sector tecnológico de nuestros clientes con el fin de aumentar su productividad, garantizar su seguridad informática y automatizar tareas del día a día."*

**Posicionamiento real:** proveedor TI integral de cercanía para pymes e instituciones de Medellín — no es solo un taller de reparación, es un aliado de infraestructura tecnológica.

**Ejes del discurso** (tomados de la página de servicios): Sinergia · Recursividad · Soporte · Actualización

---

## 4. Portafolio de servicios

El sitio agrupa la oferta en **5 líneas**, todas hoy comprimidas en una sola página con anclas.

### 4.1 Reparación y mantenimiento de computadores
Personal capacitado en soporte técnico, servicio rápido y de confianza. Mantenimiento preventivo y correctivo.

- Reparaciones físicas externas e internas
- Limpieza general del equipo
- Ajuste y lubricación de partes
- Verificación de estado del disco duro
- Comprobación de memoria RAM
- Reparación o instalación de sistema operativo
- Instalación y actualización de programas
- Respaldo de información

### 4.2 Redes de datos y eléctricas
Diseño, instalación y administración de redes para adecuar puestos de trabajo y garantizar conectividad.

- Diseño e instalación de cableado estructurado
- Instalación de puntos de red
- Instalación y configuración de Access Point
- Despliegue y administración de red WiFi
- Administración de redes a través de **Mikrotik**
- Implementación de VPN, VLAN y balanceo de cargas
- Montaje y organización de Centro de Datos
- Conexión por radiofrecuencia
- Instalación de redes eléctricas

### 4.3 Cámaras de seguridad y control de acceso
Videovigilancia y control de ingreso para establecimientos.

- Diseño de sistema de videovigilancia y monitoreo
- Instalación de cámaras de seguridad (CCTV)
- Instalación de alarmas
- Instalación y configuración de controles de acceso
- Instalación de videoportero

### 4.4 Alquiler y venta de computadores
Equipos corporativos con distintas configuraciones, con soporte técnico, mantenimiento periódico y servicio a domicilio.

- Alquiler de computadores portátiles y de escritorio
- Venta de equipos (por cotización; no hay ecommerce. La tienda anterior,
  `mipctecnologia.com/shop`, está fuera de servicio y devuelve 404)
- Suministro de partes y accesorios
- Suministro de licenciamiento de software

### 4.5 Mesa de ayuda / Soporte remoto
Soporte remoto, escalamiento y solución de incidentes TI empresariales al usuario final.

- Asistencia remota al usuario
- Escalamiento y gestión de incidentes

> **Nota de arquitectura.** Estas 5 líneas deben convertirse en **5 landings independientes** (`/servicios/reparacion-de-computadores/`, `/servicios/redes-de-datos/`, etc.). Son 5 intenciones de búsqueda distintas compitiendo hoy por una sola URL.

---

## 5. Prueba social

### 5.1 Indicadores declarados

| Indicador | Valor publicado |
|---|---|
| Computadores reparados, actualizados o intervenidos | +10.000 |
| Incidencias de TI solucionadas | +7.999 |
| Cámaras instaladas | +1.799 |
| Puntos de red instalados | ⚠️ Muestra **0** |
| Proyectos de adecuación de instalaciones | ⚠️ Muestra **0** |
| Metros de cableado instalado | ⚠️ Muestra **0** |

> ⚠️ Los tres últimos contadores renderizan **0**. Son contadores animados de Elementor que solo se disparan al entrar en viewport, así que puede ser un artefacto de captura — pero **hay que confirmar las cifras reales con el cliente** antes de migrarlas. Publicar "+0 puntos de red instalados" sería peor que no publicar nada.
>
> El valor **+7.999** también huele a número inventado para parecer preciso. Vale la pena revisarlo.

### 5.2 Clientes con logo publicado

Extraídos de la sección *"Confían en nosotros | Experiencia"*:

- Olímpica Stereo
- Radio Tiempo
- Trauma Centro
- IPS Ser Integral
- EIP S.A.S.
- SEISO
- Distribuidora FP
- Ingeniería y Contratos
- Institución Educativa Progresar
- MEPER Solutions
- (+ 3 logos sin nombre identificable en el archivo: `Capa-4`, `Capa-5`, `Capa-8`)

> **Lectura estratégica:** la cartera mezcla **medios de comunicación, salud, educación, industria y distribución**. Es un activo comercial fuerte que hoy está desaprovechado: aparece como una tira de logos sin contexto, sin casos de éxito ni testimonios. La página `/experiencia/` completa tiene **38 palabras**.
>
> ⚠️ **Verificar autorización de uso de marca** de estos logos antes de republicarlos.

---

## 6. Perfil de cliente

El propio sitio segmenta en dos con los CTAs **"SOY PERSONA"** y **"SOY EMPRESA"** (aunque hoy ambos llevan a la misma URL).

### Persona natural
- **Necesidad:** equipo dañado, lento, con virus, pantalla rota, pérdida de información
- **Urgencia:** alta, resolución inmediata
- **Decisión:** precio, cercanía, confianza, rapidez
- **Canal preferido:** WhatsApp / llamada
- **Búsquedas:** *"reparación de computadores Medellín"*, *"arreglar portátil Laureles"*, *"recuperar información disco duro Medellín"*

### Empresa / institución
- **Necesidad:** infraestructura, continuidad operativa, seguridad, soporte recurrente
- **Urgencia:** media, ciclo de decisión largo
- **Decisión:** experiencia, referencias, capacidad técnica, contratos de soporte
- **Canal preferido:** formulario / correo / cotización
- **Búsquedas:** *"cableado estructurado Medellín"*, *"mesa de ayuda TI empresas"*, *"instalación CCTV empresas Medellín"*

> **Implicación de diseño:** son dos recorridos con lógicas opuestas. El sitio nuevo debe bifurcarlos de verdad — persona natural hacia acción inmediata (botón de llamada + WhatsApp visible siempre), empresa hacia credenciales y formulario de cotización estructurado.

---

## 7. Ecosistema digital

```
mipc.com.co ................ Sitio corporativo (este proyecto)
mipctecnologia.com/shop .... Tienda online de equipos y partes
facebook.com/mipctecnologiasas
instagram.com/mipc.com.co
```

> ⚠️ **Riesgo de marca:** la empresa opera bajo dos dominios distintos. La política de garantías dice *"Atención en línea desde: mipc.com.co y/o mipctecnologia.com"*, lo que confirma que es intencional — pero fragmenta la autoridad SEO y confunde al usuario. **Decisión pendiente:** consolidar en un dominio o definir claramente el rol de cada uno.

---

## 8. Recursos y descargas

La página `/recursos/` ofrece descargas alojadas en **mega.nz**:

| Recurso | Descripción | Riesgo |
|---|---|---|
| AnyDesk | Soporte remoto | 🟡 Debería enlazar al sitio oficial |
| DeskIn | Soporte remoto | 🟡 Debería enlazar al sitio oficial |
| Crystal Disk Info | Diagnóstico de disco | 🟡 Debería enlazar al sitio oficial |
| Comando `wmic csproduct get UUID` | Utilidad de sistema | 🟢 |
| **"Pack Office"** | Instalador de Microsoft Office | 🔴 **Riesgo legal alto** |

> 🔴 **Acción inmediata, independiente de la migración.** Distribuir un instalador de Microsoft Office desde un enlace privado de Mega es, con alta probabilidad, distribución de software sin licencia. Para una empresa que **vende licenciamiento de software a otras empresas** (ver §4.4), la contradicción es además un problema reputacional serio. **Retirar ese recurso ya.**
>
> Los demás deberían apuntar a las descargas oficiales del fabricante, no a Mega — descargar ejecutables desde un enlace anónimo destruye la confianza y puede activar advertencias de seguridad del navegador.

---

## 9. Insumos pendientes del cliente

Para completar el sitio nuevo hace falta:

- [ ] NIT de la sociedad
- [ ] Código postal (para el schema `PostalAddress`)
- [ ] Cifras reales de los 3 contadores en cero
- [x] ~~Horarios de atención~~ — confirmados 2026-08-14
- [x] ~~Dirección exacta~~ — confirmada 2026-08-14
- [ ] Confirmación del correo de contacto (`soporte@mipc.com.co`)
- [ ] Autorización de uso de logos de clientes
- [ ] Decisión sobre el rol de `mipctecnologia.com`
- [ ] Fotos reales del equipo, local y trabajos ejecutados (hoy todo es ilustración genérica)
- [ ] Acceso a la ficha de Google Business Profile para completarla
- [ ] 2-3 testimonios de clientes para la página de experiencia

---

## 10. Estrategia de canales

Análisis realizado el 2026-08-14 a partir de los dos perfiles de cliente (§6).

**Ninguno de los dos recorridos de compra empieza en una red social:**

- La persona con el equipo dañado tiene urgencia → busca en Google o Maps.
- La empresa decide por referencia y credenciales → no llega por Instagram.

### Prioridad recomendada

| # | Canal | Justificación | Esfuerzo |
|---|---|---|---|
| 1 | **Google Business Profile + reseñas** | Punto de entrada del cliente urgente con local físico | Bajo |
| 2 | **WhatsApp** | Ya es el canal real de conversión | Ya operativo |
| 3 | **Contenido propio (blog)** | Activo propio, se acumula en SEO, no depende de algoritmos | Medio |
| 4 | **LinkedIn** | Único relevante para el cliente empresa | Bajo |
| 5 | Instagram / Facebook | Refuerzan la marca, no captan demanda | Alto |

> Las redes sociales quedan de últimas **y son las que más trabajo constante exigen**. Es la peor
> relación esfuerzo/retorno de la lista para este negocio.

### Si se contrata apoyo externo

No buscar "community manager" sino, en este orden:

1. Publicaciones y fotos en **Google Business Profile** (2 al mes son suficientes)
2. Un **proceso sistemático para pedir reseñas** a cada cliente atendido — el de mayor impacto
3. **Reciclar** los artículos del blog hacia redes, en lugar de crear contenido original por plataforma

### Activo desaprovechado

La cartera de 13 clientes reconocibles (§5.2) es el mejor contenido disponible y no se está usando.
**Un caso de éxito documentado con fotos del trabajo real vale más que veinte publicaciones de tips
genéricos.**

### Google Ads

Decisión tomada el 2026-08-14: se avanza hacia publicidad pagada en Google.

**Por qué encaja:** a diferencia de las redes, en Google el usuario ya declaró su intención al
escribir la búsqueda. Para un servicio local con urgencia es de los pocos canales pagos que se
justifican.

**Qué se hizo primero, y por qué importa económicamente.** Google calcula un *Quality Score* que
determina cuánto se paga por clic. Los cuatro factores principales quedaron cubiertos:

| Factor | Estado |
|---|---|
| Relevancia landing ↔ término buscado | ✅ 5 landings independientes, una por servicio |
| Velocidad de carga | ✅ 224 KB frente a 3.300 KB del sitio anterior |
| Experiencia móvil | ✅ Corregida (el hero no se renderizaba) |
| Claridad de la acción siguiente | ✅ WhatsApp, llamada y formulario visibles |

> Separar los servicios en 5 páginas no fue una decisión estética: enviar tráfico pagado de
> *"cámaras de seguridad"* a un home genérico habría implicado pagar una prima por cada clic.

**Medición implementada.** GA4 con Consent Mode v2 y evento `generate_lead` en las tres acciones
que valen como contacto (WhatsApp, llamada, formulario). Sin esto, la inversión publicitaria se
reporta en clics e impresiones —métricas que no permiten decidir nada—.

**Estructura de campaña sugerida:** empezar solo con *reparación de computadores* (mayor volumen y
ciclo de decisión más corto), campañas de Búsqueda con radio geográfico sobre Laureles, y abrir
las demás líneas una vez haya datos. Evitar Performance Max al inicio.

**Antes de invertir:** completar la ficha de Google Business Profile. En las búsquedas locales el
paquete de mapa aparece por encima de varios anuncios y no cobra por clic.
