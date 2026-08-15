/**
 * Datos únicos de la empresa. Fuente: docs/01-perfil-empresa.md
 * Cualquier dato de contacto se cambia SOLO aquí.
 */

export const SITE = {
  url: 'https://mipc.com.co',
  name: 'MiPC Tecnología',
  legalName: 'MI PC TECNOLOGÍA S.A.S.',
  shortName: 'MiPC',
  lang: 'es-CO',
  // No debe coincidir con el seoTitle de ninguna pagina de servicio: se canibalizan.
  defaultTitle: 'MiPC Tecnología | Soporte TI y Reparación de Computadores en Medellín',
  defaultDescription:
    'Reparación y mantenimiento de computadores, redes de datos, cámaras de seguridad y soporte TI en Medellín. Más de 15 años como aliado tecnológico de empresas e instituciones.',
  foundingYear: 2009,
} as const;

export const CONTACT = {
  phone: '3148889078',
  phoneDisplay: '314 888 90 78',
  phoneIntl: '+573148889078',
  whatsapp: '573148889078',
  whatsappMessage: 'Hola, necesito información sobre sus servicios.',
  email: 'soporte@mipc.com.co',
  street: 'Cra 66A #34-48 int 101',
  neighborhood: 'Laureles - Estadio',
  city: 'Medellín',
  region: 'Antioquia',
  country: 'CO',
  // Identificador de la ficha de Google Business Profile.
  googleCid: '15154712519055002689',
  lat: 6.2402418,
  lng: -75.5864735,
  hours: [
    { days: 'Lunes a viernes', time: '8:00 a.m. – 5:00 p.m.' },
    { days: 'Sábados', time: '9:00 a.m. – 1:00 p.m.' },
  ],
  hoursSchema: ['Mo-Fr 08:00-17:00', 'Sa 09:00-13:00'],
  // TODO(cliente): solicitar NIT y código postal para la ficha legal.
  nit: null as string | null,
} as const;

export const mapsUrl = () => `https://www.google.com/maps?cid=${CONTACT.googleCid}`;

/** Enlace para dejar reseña.
 *  TODO(cliente): reemplazar por el enlace corto `https://g.page/r/.../review`
 *  que entrega el panel de Google Business Profile en "Pedir reseñas".
 *  Mientras tanto, el enlace por CID abre la ficha para calificar. */
export const reviewUrl = () => `https://www.google.com/maps?cid=${CONTACT.googleCid}&hl=es`;

export const SOCIAL = {
  facebook: 'https://www.facebook.com/mipctecnologiasas',
  instagram: 'https://www.instagram.com/mipc.com.co',
  shop: 'https://mipctecnologia.com/shop',
} as const;

export const waLink = (msg: string = CONTACT.whatsappMessage) =>
  `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(msg)}`;

export const NAV = [
  { label: 'Nosotros', href: '/nosotros/' },
  { label: 'Servicios', href: '/servicios/' },
  { label: 'Experiencia', href: '/experiencia/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Recursos', href: '/recursos/' },
  { label: 'Contacto', href: '/contacto/' },
] as const;

/** Indicadores mostrados en Nosotros.
 *  TODO(cliente): los 3 últimos aparecían en 0 en el sitio anterior. */
export const STATS = [
  { value: 10000, label: 'Computadores reparados o intervenidos' },
  { value: 8000, label: 'Incidencias de TI solucionadas' },
  { value: 1800, label: 'Cámaras instaladas' },
  { value: null, label: 'Puntos de red instalados' },
  { value: null, label: 'Proyectos de adecuación' },
  { value: null, label: 'Metros de cableado instalado' },
] as const;

/** Logos con nombre identificado. Los 4 sin identificar quedan fuera
 *  hasta confirmar marca y autorización de uso.
 *  `slug` corresponde al archivo en src/assets/clientes/. */
export const CLIENTS = [
  { name: 'Olímpica Stereo', slug: 'olimpica-stereo' },
  { name: 'Radio Tiempo', slug: 'radio-tiempo' },
  { name: 'Trauma Centro', slug: 'trauma-centro' },
  { name: 'IPS Ser Integral', slug: 'ips-ser-integral' },
  { name: 'EIP S.A.S.', slug: 'eip-sas' },
  { name: 'SEISO', slug: 'seiso' },
  { name: 'Distribuidora FP', slug: 'distribuidora-fp' },
  { name: 'Ingeniería y Contratos', slug: 'ingenieria-y-contratos' },
  { name: 'I.E. Progresar', slug: 'ie-progresar' },
  { name: 'MEPER Solutions', slug: 'meper-solutions' },
] as const;
