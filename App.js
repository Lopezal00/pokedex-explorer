import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import DetailScreen from './src/screens/DetailScreen';
import ListScreen from './src/screens/ListScreen';
import SearchBar from './src/components/SearchBar';

export default function App() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <View style={styles.container}>
      {selectedPokemon === null ? (
        <ListScreen
          onSelectPokemon={setSelectedPokemon}
          header={<SearchBar onSearch={setSelectedPokemon} />}
        />
      ) : (
        <DetailScreen
          query={selectedPokemon}
          onBack={() => setSelectedPokemon(null)}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
