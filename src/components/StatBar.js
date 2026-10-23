// Una estadística base: nombre, valor y barra de ancho proporcional (máximo 255).
import { StyleSheet, Text, View } from 'react-native';
import { MAX_STAT, STAT_LABELS } from '../utils/format';

export default function StatBar({ name, value, color = '#E3350D' }) {
  // Ancho en porcentaje: 255 = barra llena
  const percent = Math.min(value / MAX_STAT, 1) * 100;

  return (
    <View style={styles.row}>
      <Text style={styles.label}>{STAT_LABELS[name] ?? name}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percent}%`, backgroundColor: color }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    width: 80,
    fontSize: 14,
    color: '#555555',
  },
  value: {
    width: 36,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    color: '#222222',
  },
  track: {
    flex: 1,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EEEEEE',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 5,
  },
});