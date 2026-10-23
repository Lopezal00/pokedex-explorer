// Vista de lista: título, buscador, cuadrícula de 2 columnas y scroll infinito.
// Junta el hook (lógica) con los componentes (interfaz).

import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import PokemonCard from '../components/PokemonCard';
import StatusView from '../components/StatusView';
import usePokemonList from '../hooks/usePokemonList';

//header : el buscador  que se pasa desde APP.JS

export default function ListScreen({onSelectPokemon, header}){
    const { pokemons, status, loadingMore, pageError, loadMore, retry} = usePokemonList();
    
    //Indicador al final  de la lista mientras se cargan mas
    function renderFooter(){
        if(loadingMore){
            return(
                <View style={styles.footer}>
                    <ActivityIndicator color="#E3350D"/>
                    <Text style={styles.footerText}>Cargando más Pokemon...</Text>
                </View>
            );
        }
        if (pageError) {
            return(
                <View style={styles.footer}>
                    <Text style={styles.footerText}>No se puedieron cargar más Pokemones. </Text>
                    <Button title='Reintentar' onPress={retry} color="#E3350D"/>
                </View>
            );
        }
        return null;
    }
     // CONCEPTO: estados de interfaz (cargando / error / éxito)
     let content;
     if (status === 'loading'){
        content = <StatusView status="loading" message="Cargando Pokémon..."/>;
     } else if (status === 'error'){
        content = <StatusView status="error" onRetry={retry}/>;
     }else{
        content = (
            //concepto: Flatlist para listas  largas (no scrollView con map)
            <FlatList
                data={pokemons}
                keyExtractor={(item) => String(item.id)}
                numColumns={2}
                renderItem={({ item }) => <PokemonCard pokemon={item} onPress={onSelectPokemon} />}
                columnWrapperStyle={styles.row}
                contentContainerStyle={styles.list}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
            />
        );
     }
     return (
        <View style={styles.container}>
            <Text style={styles.title}>PokéDex Explorer</Text>
            {header}
            {content}
        </View>
     )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E3350D',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 12,
  },
  list: {
    paddingHorizontal: 12,
    paddingBottom: 24,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  footerText: {
    color: '#555555',
  },
});