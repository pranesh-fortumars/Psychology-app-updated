
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from './themed-text';

const CoinRecharge = () => {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Coin Recharge</ThemedText>
      <ThemedText>This feature is not yet implemented.</ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CoinRecharge;
