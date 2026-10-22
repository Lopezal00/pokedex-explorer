// Funciones de ayuda puras (sin React ni red). Fáciles de reutilizar y probar.

// "https://pokeapi.co/api/v2/pokemon/25/" --> 25
export function getIdFromUrl(url) {
  const parts = url.split('/').filter(Boolean);
  return Number(parts[parts.length - 1]);
}

// 25 --> "#025"
export function formatId(id) {
  return `#${String(id).padStart(3, '0')}`;
}

// "pikachu" --> "Pikachu"
export function capitalize(text = '') {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Nombres de las estadísticas en español (código en inglés, interfaz en español)
export const STAT_LABELS = {
  hp: 'PS',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'At. Esp.',
  'special-defense': 'Def. Esp.',
  speed: 'Velocidad',
};

// Valor máximo posible de una estadística base (para el ancho de la barra)
export const MAX_STAT = 255;