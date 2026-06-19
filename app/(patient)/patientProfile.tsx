
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Colors, Shadows, Spacing } from "../../constants/theme";
import { authService, paymentService, sessionService } from "../../services";

export default function PatientProfile() {
  const [patient, setPatient] = useState<any>(null);
  const [coinBalance, setCoinBalance] = useState<number>(0);
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, you would get the user's ID from your auth context
    const userId = "patient-123";

    authService.login("patient@example.com", "password").then(setPatient);
    paymentService.getCoinBalance(userId).then((data) => setCoinBalance(data.balance));

    // Cast to any to bypass the union type mismatch with setSessionHistory
    sessionService.getSessions("patient", userId).then((res: any) => {
      setSessionHistory(Array.isArray(res) ? res : []);
    });
  }, []);

  const renderSession = ({ item }: { item: any }) => (
    <View style={[styles.sessionCard, Shadows.soft]}>
      <View style={styles.sessionIcon}>
        <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
      </View>
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTherapist}>{item.therapistName}</Text>
        <Text style={styles.sessionDate}>{item.date}</Text>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: item.status === 'Completed' ? Colors.success : Colors.accent }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  if (!patient) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={sessionHistory}
        renderItem={renderSession}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <>
            <View style={[styles.profileHeader, Shadows.soft]}>
              <View style={styles.avatarPlaceholder}>
                <Ionicons name="person" size={60} color={Colors.primary} />
              </View>
              <Text style={styles.patientName}>{patient.name}</Text>
              <Text style={styles.patientEmail}>{patient.email}</Text>

              <View style={styles.coinBadge}>
                <Ionicons name="wallet" size={16} color={Colors.text} />
                <Text style={styles.coinBalanceText}>{coinBalance} Credits</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Session History</Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No previous sessions found.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  loadingText: {
    color: Colors.textLight,
  },
  listContent: {
    paddingBottom: Spacing.xl,
  },
  profileHeader: {
    alignItems: "center",
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: Spacing.xl,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  patientName: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  patientEmail: {
    fontSize: 16,
    color: Colors.textLight,
    marginBottom: Spacing.md,
  },
  coinBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  coinBalanceText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    padding: Spacing.md,
    borderRadius: 20,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sessionIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  sessionInfo: {
    flex: 1,
  },
  sessionTherapist: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  sessionDate: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    color: Colors.text,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: Colors.textLight,
  }
});
