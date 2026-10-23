// Vista de detalle: imagen grande, nombre, número, tipos, medidas y estadísticas.
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import StatBar from '../components/StatBar';
import StatusView from '../components/StatusView';
import TypeBadge from '../components/TypeBadge';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS } from '../constants/typeColors';
import usePokemonDetail from '../hooks/usePokemonDetail';
import { capitalize, formatId } from '../utils/format';

// query: nombre o número que viene de la tarjeta o del buscador
export default function DetailScreen({ query, onBack }) {
  const { pokemon, status, retry } = usePokemonDetail(query);

  // CONCEPTO: estados de interfaz (cargando / error / sin resultados / éxito)
  let content;
  if (status === 'loading') {
    content = <StatusView status="loading" message="Cargando ficha..." />;
  } else if (status === 'error') {
    content = <StatusView status="error" onRetry={retry} />;
  } else if (status === 'empty') {
    content = (
      <StatusView
        status="empty"
        message={`No encontramos ningún Pokémon llamado "${query}". Revisa el nombre o prueba con un número.`}
      />
    );
  } else {
    const mainColor = TYPE_COLORS[pokemon.types[0]] ?? DEFAULT_TYPE_COLOR;

    content = (
      <ScrollView contentContainerStyle={styles.content}>
        {/* CONCEPTO: Image remota con width y height explícitos */}
        <View style={[styles.imageBox, { backgroundColor: `${mainColor}22` }]}>
          <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={styles.number}>{formatId(pokemon.id)}</Text>
        <Text style={styles.name}>{capitalize(pokemon.name)}</Text>

        <View style={styles.types}>
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </View>

        <View style={styles.measures}>
          <View style={styles.measure}>
            <Text style={styles.measureValue}>{pokemon.heightM} m</Text>
            <Text style={styles.measureLabel}>Altura</Text>
          </View>
          <View style={styles.measure}>
            <Text style={styles.measureValue}>{pokemon.weightKg} kg</Text>
            <Text style={styles.measureLabel}>Peso</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Estadísticas base</Text>
        <View style={styles.stats}>
          {pokemon.stats.map((stat) => (
            <StatBar key={stat.name} name={stat.name} value={stat.value} color={mainColor} />
          ))}
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {content}
      <View style={styles.backButton}>
        <Button title="Volver a la lista" onPress={onBack} color="#E3350D" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    padding: 16,
    paddingBottom: 24,
  },
  imageBox: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 20,
    paddingVertical: 16,
  },
  image: {
    width: 220,
    height: 220,
  },
  number: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: '600',
    color: '#888888',
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222222',
  },
  types: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
  },
  measures: {
    flexDirection: 'row',
    gap: 40,
    marginTop: 20,
  },
  measure: {
    alignItems: 'center',
  },
  measureValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222222',
  },
  measureLabel: {
    fontSize: 13,
    color: '#888888',
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#222222',
  },
  stats: {
    width: '100%',
    gap: 10,
  },
  backButton: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
});