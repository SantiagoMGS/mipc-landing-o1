import type { ImageMetadata } from 'astro';

import reparacion from '@/assets/servicios/reparacion.png';
import redes from '@/assets/servicios/redes.png';
import camaras from '@/assets/servicios/camaras.png';
import alquiler from '@/assets/servicios/alquiler.png';
import mesaAyuda from '@/assets/servicios/mesa-ayuda.png';
import heroTecnico from '@/assets/servicios/hero-tecnico.png';
import cotizacion from '@/assets/servicios/cotizacion.png';

/** Clave = id del archivo en src/content/servicios/. */
export const IMAGENES_SERVICIO: Record<string, ImageMetadata> = {
  'reparacion-de-computadores': reparacion,
  'redes-de-datos': redes,
  'camaras-de-seguridad': camaras,
  'alquiler-de-computadores': alquiler,
  'mesa-de-ayuda': mesaAyuda,
};

export { heroTecnico, cotizacion };

const logos = import.meta.glob<{ default: ImageMetadata }>('../assets/clientes/*.png', {
  eager: true,
});

export const LOGOS_CLIENTE: Record<string, ImageMetadata> = Object.fromEntries(
  Object.entries(logos).map(([ruta, mod]) => [
    ruta.split('/').pop()!.replace('.png', ''),
    mod.default,
  ])
);
