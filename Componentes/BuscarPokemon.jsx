import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import axios from 'axios';

export default function BuscarPokemon() { // Cambio de nombre a BuscarPokemon
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setResults([response.data]);
    } catch (error) {
      setError('No se encontró ningún Pokémon con ese nombre.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar Pokémon por nombre"
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />
      {loading && <Text>Cargando...</Text>}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={results}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.result}>
            <Text>Nombre: {item.name}</Text>
            <Text>URL: {item.url}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  error: {
    color: 'red',
    marginBottom: 8,
  },
  result: {
    marginBottom: 16,
  },
});
