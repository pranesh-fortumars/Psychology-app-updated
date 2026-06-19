
import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { findTherapists, Therapist } from '@/services/therapists';
import { ThemedText } from './themed-text';

const TherapistDiscovery = () => {
  const [language, setLanguage] = useState('');
  const [therapists, setTherapists] = useState<Therapist[]>([]);

  const handleSearch = () => {
    const results = findTherapists(language);
    setTherapists(results);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="title">Find a Therapist</ThemedText>
      <TextInput
        style={styles.input}
        placeholder="Enter a language"
        value={language}
        onChangeText={setLanguage}
      />
      <Button title="Search" onPress={handleSearch} />
      <FlatList
        data={therapists}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ThemedText type="subtitle">{item.name}</ThemedText>
            <ThemedText>{item.specialization}</ThemedText>
            <ThemedText>Rating: {item.rating}</ThemedText>
            <ThemedText>Languages: {item.languages.join(', ')}</ThemedText>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TherapistDiscovery;
