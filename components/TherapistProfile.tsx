
import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { ThemedView } from './themed-view';
import { ThemedText } from './themed-text';

const TherapistProfile = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Therapist Profile</ThemedText>
      
      {/* Star Rating */}
      <View style={styles.ratingContainer}>
        <ThemedText style={styles.sectionTitle}>Star Rating</ThemedText>
        {/* Implement a star rating component here */}
        <ThemedText>⭐️⭐️⭐️⭐️⭐️</ThemedText>
      </View>

      {/* Feedback */}
      <View style={styles.feedbackContainer}>
        <ThemedText style={styles.sectionTitle}>Feedback</ThemedText>
        <TextInput
          style={styles.feedbackInput}
          placeholder="Write your feedback..."
          multiline
        />
      </View>

      {/* Suggestions */}
      <View style={styles.suggestionsContainer}>
        <ThemedText style={styles.sectionTitle}>Suggestions</ThemedText>
        <ThemedText>
          - Practice mindfulness for 10 minutes daily.
          - Keep a journal of your thoughts and feelings.
        </ThemedText>
      </View>

    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    marginBottom: 20,
  },
  feedbackContainer: {
    marginBottom: 20,
  },
  feedbackInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    minHeight: 100,
  },
  suggestionsContainer: {
    marginBottom: 20,
  },
});

export default TherapistProfile;
