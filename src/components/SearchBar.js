// Buscador por nombre o número. Solo maneja el texto; la búsqueda la hace quien lo usa.
import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';

export default function SearchBar({ onSearch }) {
  // CONCEPTO: useState para el texto del TextInput (componente controlado)
  const [text, setText] = useState('');

  function handleSearch() {
    // trim() ignora los espacios al inicio y al final
    const query = text.trim();
    if (!query) return;
    onSearch(query);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Busca por nombre o número..."
        placeholderTextColor="#999999"
        // Sin mayúsculas ni autocorrector: los nombres de la API van en minúsculas
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        onSubmitEditing={handleSearch}
      />
      <Button title="Buscar" onPress={handleSearch} color="#E3350D" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
    color: '#222222',
  },
});