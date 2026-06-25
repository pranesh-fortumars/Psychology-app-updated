

import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService } from '../../services/dataService';

const PACKAGES = [
  { id: 'p1', coins: 100, price: '₹99', icon: 'wallet-outline' },
  { id: 'p2', coins: 500, price: '₹399', icon: 'cash-outline', popular: true },
  { id: 'p3', coins: 1000, price: '₹699', icon: 'card-outline' },
];

export default function CoinRecharge() {
  const [balance, setBalance] = useState(1500);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingPkg, setProcessingPkg] = useState<string | null>(null);
  const patientId = 'pat-1';

  const handleRecharge = (pkgId: string, amount: number) => {
    setProcessingPkg(pkgId);
    setIsProcessing(true);

    // Simulate Payment Gateway processing time
    setTimeout(() => {
      const newBalance = dataService.rechargeCoins(patientId, amount);
      setBalance(newBalance);
      setIsProcessing(false);
      setProcessingPkg(null);
      Alert.alert("Payment Successful", `Dummy Gateway processed payment. ${amount} coins added to your wallet!`);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Balance</Text>
          <View style={styles.balanceValueRow}>
            <Ionicons name="sparkles" size={24} color={Colors.star} />
            <Text style={styles.balanceValue}>{balance}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Package</Text>

        {PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[
              styles.pkgCard, 
              pkg.popular && styles.popularCard, 
              isProcessing && processingPkg !== pkg.id && { opacity: 0.5 },
              Shadows.soft
            ]}
            onPress={() => handleRecharge(pkg.id, pkg.coins)}
            disabled={isProcessing}
          >
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>BEST VALUE</Text>
              </View>
            )}
            <View style={styles.pkgIconContainer}>
              <Ionicons name={pkg.icon as any} size={28} color={Colors.primary} />
            </View>
            <View style={styles.pkgInfo}>
              <Text style={styles.pkgTitle}>{pkg.coins} Coins</Text>
              <Text style={styles.pkgSubtitle}>Premium Session Credits</Text>
            </View>
            <View style={StyleSheet.flatten([styles.priceTag, processingPkg === pkg.id && { backgroundColor: Colors.primary }])}>
              <Text style={StyleSheet.flatten([styles.priceText, processingPkg === pkg.id && { color: Colors.surface }])}>
                {processingPkg === pkg.id ? 'Wait...' : pkg.price}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.infoBox}>
          <Ionicons name="information-circle-outline" size={20} color={Colors.textLight} />
          <Text style={styles.infoText}>
            Coins can be used to book sessions with any therapist on the platform. 1 session = 500 Coins.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
  },
  balanceCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.xl,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  balanceValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  pkgCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  popularCard: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: Colors.surface,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  popularText: {
    color: Colors.surface,
    fontSize: 8,
    fontWeight: 'bold',
  },
  pkgIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  pkgInfo: {
    flex: 1,
  },
  pkgTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  pkgSubtitle: {
    fontSize: 12,
    color: Colors.textLight,
  },
  priceTag: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },
  priceText: {
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Colors.accent,
    padding: Spacing.md,
    borderRadius: 16,
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    color: Colors.textLight,
    lineHeight: 18,
  },
});
