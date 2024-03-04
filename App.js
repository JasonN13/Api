import { useState, useEffect } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BuscarPokemon from './Componentes/BuscarPokemon';

export default function App() {
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {

   

    const fetchPokemon = async () => {
      try {
        const respuesta = await axios.get('https://pokeapi.co/api/v2/pokemon/');
        setData(respuesta.data.results);
        setError(null);
      } catch (error) {
        console.error('Error en obtener datos del servidor', error);
        setError(error);
      } finally {
        setCargando(false);
      }
    };
    fetchPokemon();
  }, []);

  if (cargando) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else if (error) {
    return (
      <View style={styles.container}>
        <Text>Error al obtener datos del servidor: {error.message}</Text>
       
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ padding: 10 }} onPress={() => console.log(item.name)}>
            <PokemonItem item={item} />
            
          </TouchableOpacity>
          
        )}
        keyExtractor={(item) => item.name}
      />
      <StatusBar style="auto" />
    </View>
  );
}

export function PokemonItem({ item }) {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.url}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


