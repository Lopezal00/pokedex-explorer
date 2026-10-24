// Botón propio de la app. Reemplaza al Button de React Native, que se ve como texto plano.
// Se usa en "Buscar", "Volver a la lista" y "Reintentar", así el estilo queda en un solo lugar.
import { Pressable, StyleSheet, Text } from 'react-native';

export default function AppButton({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      // pressed: true mientras el dedo está sobre el botón
      style={({ pressed }) => [styles.button, pressed && styles.pressed, style]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E3350D',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    backgroundColor: '#B82A0A',
    transform: [{ scale: 0.97 }],
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});