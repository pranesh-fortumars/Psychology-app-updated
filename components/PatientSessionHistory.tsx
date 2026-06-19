
import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { getSessionsForPatient, Session } from '@/services/sessions';
import { ThemedText } from './themed-text';

interface Props {
  patientId: number;
}

const PatientSessionHistory: React.FC<Props> = ({ patientId }) => {
  const sessions = getSessionsForPatient(patientId);

  return (
    <View style={styles.container}>
      <ThemedText type="title">Session History</ThemedText>
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <ThemedText type="subtitle">Date: {item.date}</ThemedText>
            <ThemedText>Therapist Notes: {item.notes}</ThemedText>
            <ThemedText>Patient Feedback: {item.feedback}</ThemedText>
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
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PatientSessionHistory;
