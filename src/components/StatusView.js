// Estados reutilizables de la interfaz: cargando, error y vacío.
// Lo van usar tanto la lista como la ficha de detalle.
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import AppButton from './AppButton';

// CONCEPTO: estados de interfaz (cargando / error / vacío / éxito)
// Uso: <StatusView status="loading" />  |  <StatusView status="error" onRetry={reload} />
export default function StatusView({ status, message, onRetry }) {
  // Cargando: indicador + texto
  if (status === 'loading') {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#E3350D" />
        <Text style={styles.text}>{message ?? 'Cargando...'}</Text>
      </View>
    );
  }

  // Error: mensaje claro + botón "Reintentar"
  if (status === 'error') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>¡Ups! Algo salió mal</Text>
        <Text style={styles.text}>
          {message ?? 'No pudimos conectarnos. Revisa tu conexión a internet.'}
        </Text>
        {onRetry && <AppButton title="Reintentar" onPress={onRetry} color="#E3350D" />}
      </View>
    );
  }

  // Sin resultados: el nombre buscado no existe
  if (status === 'empty') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Sin resultados</Text>
        <Text style={styles.text}>
          {message ?? 'No encontramos ningún Pokémon con ese nombre o número.'}
        </Text>
      </View>
    );
  }

  // Éxito: no muestra nada, la pantalla pinta la lista o la ficha
  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  text: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
});