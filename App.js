// Punto de entrada: decide si se ve la lista o la ficha de un Pokémon.
// No usamos librerías de navegación: el cambio de vista se hace con un useState.
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './src/components/SearchBar';
import DetailScreen from './src/screens/DetailScreen';
import ListScreen from './src/screens/ListScreen';

export default function App() {
  // CONCEPTO: useState. null = vista de lista; nombre o número = vista de detalle
  const [selected, setSelected] = useState(null);

  return (
    <SafeAreaProvider>
      {/* CONCEPTO: SafeAreaView  se evita que el contenido quede debajo de la barra de estado */}
      <SafeAreaView style={styles.container} edges={['top']}>
        <StatusBar style="dark" />
        {/* La lista se oculta pero no se desmonta: al volver conserva
            los Pokémon cargados y la posición del scroll */}
        <View style={[styles.container, selected !== null && styles.hidden]}>
          <ListScreen
            onSelectPokemon={setSelected}
            header={<SearchBar onSearch={setSelected} />}
          />
        </View>
        {selected !== null && (
          <DetailScreen query={selected} onBack={() => setSelected(null)} />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  hidden: {
    display: 'none',
  },
});