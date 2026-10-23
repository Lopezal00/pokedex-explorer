// Distintivo de un tipo (fuego, agua, planta...) con su color propio.
import { StyleSheet, Text, View } from 'react-native';
import { DEFAULT_TYPE_COLOR, TYPE_COLORS, TYPE_LABELS } from '../constants/typeColors';

export default function TypeBadge({ type }) {
  const backgroundColor = TYPE_COLORS[type] ?? DEFAULT_TYPE_COLOR;
  const label = TYPE_LABELS[type] ?? type;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 999,
  },
  text: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});