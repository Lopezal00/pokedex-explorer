//Hook de la lista: guardamos el estado de la peticion  y controla  la paginacion.
// No tiene JSX  ni estilos: Solo logica  (regla del taller)

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchPokemonList } from "../services/pokeApi";

//CONCEPTO: paginacion  de 20 en 20
const  PAGE_SIZE = 20;

export default function usePokemonList(){
    //CONCEPTO: useState para cada dato que cambia la interfaz
    const [pokemons, setPokemons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [hasmore, setHasMore] = useState(true);
    const [status, setStatus] = useState('loading'); // 'loading' | 'error' | 'success'
    const [loadingMore, setLoadingMore] = useState(false);
    const [pageError, setPageError] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

    // Evita pedir dos paginas  a la vez 
    const isFetching = useRef(false);

    //CONCEPTO: useEffect  con array de dependecias.
    // solo se ejecuta cuando cambia offset (siguiente pagina) o reloadKey
    // si no tuviera  dependencias , la peticion se repetiria sin parar.
    useEffect(()=>{
        //Concepto: AbortController/signal para cancelar  la peticion  si el componente se desmonta
        const controller = new AbortController();
        const isFirstPage = offset === 0;

        async function load() {
            isFetching.current = true;
            if (isFirstPage){
                setStatus('loading');
            }
            else{
                setLoadingMore(true);
            }
            
            try {
                //Concepto: async/await
                const page = await  fetchPokemonList(PAGE_SIZE, offset, controller.signal);
                setPokemons((prev) => (isFirstPage ? page.items : [...prev, ...page.items]));
                setHasMore(page.hasMore);
                setPageError(false);
                setStatus('success');                
            } catch (error) {
                if (error.name === 'AbortError') return; // La cancelamos nosotros, no es un error
                if (isFirstPage){
                    setStatus('Error')
                }else{
                    setPageError(true);
                }
            }finally{
                isFetching.current = false;
                if(!controller.signal.aborted) setLoadingMore(false);
            }
        }
        load();

        //Limpieza : cancelar  la peticion pendiente antes de la siguiente o al salir
        return () => controller.abort();
    }, [offset, reloadKey]);


    //Scroll infinito: pide la siguiente pagina al llegar al final
    const loadMore = useCallback(()=>{
        if(isFetching.current || !hasmore || pageError || status !== 'success') return;
        setOffset((prev) => + PAGE_SIZE);
    },[hasmore, pageError, status]);

    //Boton  "Reintentar" : vuelve  a pedir  la misma pagina
    const retry = useCallback(()=>{
        setPageError(false);
        setReloadKey((prev) => prev + 1);
    },[]);

    return {pokemons, status, loadingMore, pageError, loadMore, retry};
    
}