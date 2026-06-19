
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PatientSessionHistory from './PatientSessionHistory';
import { ThemedText } from './themed-text';

const PatientProfile = () => {
  // In a real app, the patient ID would come from authentication.
  const patientId = 1;

  return (
    <View style={styles.container}>
      <ThemedText type="title">My Profile</ThemedText>
      <PatientSessionHistory patientId={patientId} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default PatientProfile;
