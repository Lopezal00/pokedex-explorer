//Tarjeta de la cuadricula : imagen, numero y nombre. solo recibe datos por props.
import {memo} from 'react';
import { Image, Pressable, StyleSheet, Text } from 'react-native';
import { capitalize, formatId } from '../utils/format';

function PokemonCard({ pokemon, onPress}){
    return(
        <Pressable 
            style={({pressed}) => [styles.card, pressed && styles.pressed]}
            onPress={()=> onPress(pokemon.id)}>

            {/* Concepto: image con URL remota  necesita  width y height explicitos*/}
            <Image source={{ uri: pokemon.image }} style={styles.image} resizeMode='contain'/>
            <Text style={styles.number}>{formatId(pokemon.id)}</Text>
            <Text style={styles.name} numberOfLines={1}>
                {capitalize(pokemon.name)}
            </Text>
            </Pressable>
    );
}

// memo evita volver a dibujar tarjetas que no cambiaron al cargar más
export default memo(PokemonCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    width: 96,
    height: 96,
  },
  number: {
    marginTop: 6,
    fontSize: 13,
    color: '#888888',
    fontWeight: '600',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222222',
  },
});
