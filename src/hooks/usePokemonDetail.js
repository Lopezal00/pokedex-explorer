// Hook de la ficha: pide un Pokémon por nombre o número y guarda su estado.
// No tiene JSX ni estilos: solo lógica
import { useCallback, useEffect, useState } from 'react';
import { fetchPokemonDetail, NotFoundError } from '../services/pokeApi';

export default function usePokemonDetail(nameOrId) {
  // CONCEPTO: useState
  const [pokemon, setPokemon] = useState(null);
  const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'empty' | 'success'
  const [reloadKey, setReloadKey] = useState(0);

  // CONCEPTO: useEffect con array de dependencias.
  // Se ejecuta solo cuando cambia el Pokémon buscado o cuando se pulsa "Reintentar".
  useEffect(() => {
    // CONCEPTO: signal para cancelar la petición si el usuario vuelve a la lista
    const controller = new AbortController();

    async function load() {
      setStatus('loading');
      setPokemon(null);
      try {
        // CONCEPTO: async/await
        const data = await fetchPokemonDetail(nameOrId, controller.signal);
        setPokemon(data);
        setStatus('success');
      } catch (error) {
        if (error.name === 'AbortError') return;
        // 404: el nombre no existe -> estado "sin resultados", no es un error de conexión
        setStatus(error instanceof NotFoundError ? 'empty' : 'error');
      }
    }

    load();

    return () => controller.abort();
  }, [nameOrId, reloadKey]);

  const retry = useCallback(() => setReloadKey((prev) => prev + 1), []);

  return { pokemon, status, retry };
}