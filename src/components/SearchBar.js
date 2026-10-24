// Buscador por nombre o número. Solo maneja el texto; la búsqueda la hace quien lo usa.
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AppButton from './AppButton';

export default function SearchBar({ onSearch }) {
  // CONCEPTO: useState para el texto del TextInput (componente controlado)
  const [text, setText] = useState('');
  // Para pintar el borde de rojo mientras el usuario escribe
  const [focused, setFocused] = useState(false);


  function handleSearch() {
    // trim() ignora los espacios al inicio y al final
    const query = text.trim();
    if (!query) return;
    onSearch(query);
  }

  return (
    <View style={styles.container}>
      <View style={[styles.field, focused && styles.fieldFocused]}>
        {/* Lupa dibujada con dos view: un circulo y un mangito inclinado */}
        <View style={styles.icon}>
          <View style={styles.iconCircle}/>
          <View style={styles.iconHandle}/>
        </View>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Busca por nombre o número..."
          placeholderTextColor="#999999"
          // Sin mayúsculas ni autocorrector: los nombres de la API van en minúsculas
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={handleSearch}
        />
      </View>
      <AppButton title="Buscar" onPress={handleSearch}/>
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
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderWidth: 1.5,
    borderColor: '#E4E4E4',
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    // Sombra suave (iOS usa shadow*, Android usa elevation)
    shadowColor: '#000000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  fieldFocused: {
    borderColor: '#E3350D',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
  },
  iconCircle: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#999999',
  },
  iconHandle: {
    position: 'absolute',
    width: 2,
    height: 7,
    borderRadius: 1,
    backgroundColor: '#999999',
    right: 2,
    bottom: 0,
    transform: [{ rotate: '-45deg' }],
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#222222',
  },
});