// Servicio de API: todas las peticiones a la PokéAPI viven aquí.
// Las pantallas y componentes nunca llaman a fetch directamente
// (regla del taller: la API separada del JSX y los estilos).
import { getIdFromUrl } from '../utils/format';

// CONCEPTO: constante con la URL base de la API.
// La PokéAPI es pública: no necesita llave de acceso y responde en formato JSON.
const BASE_URL = 'https://pokeapi.co/api/v2';
const ARTWORK_URL =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork';

// Error propio para que la interfaz distinga "no existe" (estado vacío) de otros errores.
export class NotFoundError extends Error {
  constructor(query) {
    super(`Pokemon "${query}" not found`);
    this.name = 'NotFoundError';
  };
};

// CONCEPTO: método asincrónico con async/await y fetch.
// Toda petición (request) tiene una respuesta (response).
// CONCEPTO: signal permite cancelar la petición si el usuario se arrepiente
// o sale de la pantalla, para no saturar la API.
async function request(path, signal) {
  const response = await fetch(`${BASE_URL}${path}`, { signal });

  // CONCEPTO: códigos HTTP. 200 = todo salió bien.
  // 4xx = error del cliente (ej. 404: el Pokémon no existe).
  // 5xx = error del servidor.
  if (response.status === 404) {
    throw new NotFoundError(path);
  };

  // CONCEPTO: si la respuesta no es ok, lanzamos una excepción (throw new Error)
  // con el código que trae response.status.
  // Se revisa ANTES de response.json(), porque un 404 responde texto, no JSON.
  if (!response.ok) {
    throw new Error(`HTTP error ${response.status}`);
  };

  const data = await response.json();
  return data;
};

// Arma la URL de la imagen a partir del id, sin pedir la ficha completa
export function getArtworkUrl(id) {
  return `${ARTWORK_URL}/${id}.png`;
};

// Limpia el texto de búsqueda: trim() quita espacios, toLowerCase() pasa a minúsculas,
// y se quitan "#" y ceros a la izquierda ("#025" --> "25")
export function normalizeQuery(query) {
  const clean = String(query).trim().toLowerCase().replace(/^#/, '');
  return /^\d+$/.test(clean) ? String(Number(clean)) : clean;
};

// GET /pokemon?limit={n}&offset={m}  --> lista paginada
// CONCEPTO: paginación. Cargamos de 20 en 20 para no traer miles de
// registros de una vez y no "reventar" la app.
export async function fetchPokemonList(limit = 20, offset = 0, signal) {
  const data = await request(`/pokemon?limit=${limit}&offset=${offset}`, signal);

  // CONCEPTO: mapeo. Del JSON tomamos solo los campos que la app necesita.
  return {
    hasMore: data.next !== null, // si hay más páginas para el scroll infinito
    items: data.results.map(({ name, url }) => {
      const id = getIdFromUrl(url);
      return { id, name, image: getArtworkUrl(id) };
    }),
  };
};

// GET /pokemon/{nombre o id}  --> ficha de un Pokémon
export async function fetchPokemonDetail(nameOrId, signal) {
  const query = normalizeQuery(nameOrId);
  if (!query) {
    throw new NotFoundError(nameOrId);
  };

  // CONCEPTO: encodeURIComponent. El texto se envía codificado en la URL;
  // un id numérico no necesita codificarse.
  const isId = /^\d+$/.test(query);
  const path = isId ? `/pokemon/${query}` : `/pokemon/${encodeURIComponent(query)}`;

  const data = await request(path, signal);

  // CONCEPTO: mapeo. Devolvemos solo los campos que usa la app, ya transformados.
  return {
    id: data.id,
    name: data.name,
    image:
      data.sprites?.other?.['official-artwork']?.front_default ?? getArtworkUrl(data.id),
    types: data.types.map((item) => item.type.name),
    heightM: data.height / 10, // decímetros --> metros
    weightKg: data.weight / 10, // hectogramos --> kilogramos
    stats: data.stats.map((item) => ({
      name: item.stat.name,
      value: item.base_stat,
    })),
  };
};