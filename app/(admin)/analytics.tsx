
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';

const dummyAnalytics = {
  users: { total: 1540, patients: 1210, doctors: 330 },
  sessions: { total: 4520, completed: 4230, canceled: 290 },
  revenue: { total: '₹54K', lastMonth: '₹12K', lastWeek: '₹3K' },
};

export default function Analytics() {
  const [analytics] = useState(dummyAnalytics);

  const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: any, color: string }) => (
    <View style={[styles.card, Shadows.soft]}>
      <View style={[styles.iconBox, { backgroundColor: color + '20' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardValue}>{value}</Text>
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>System Analytics</Text>
          <Text style={styles.headerSubtitle}>Real-time platform performance metrics</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>User Growth</Text>
          <View style={styles.statsRow}>
            <StatCard title="Total Users" value={analytics.users.total} icon="people" color={Colors.primary} />
            <StatCard title="Patients" value={analytics.users.patients} icon="person" color={Colors.secondary} />
            <StatCard title="Doctors" value={analytics.users.doctors} icon="medkit" color={Colors.accent} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Session Metrics</Text>
          <View style={styles.statsRow}>
            <StatCard title="All Sessions" value={analytics.sessions.total} icon="calendar" color={Colors.primary} />
            <StatCard title="Completed" value={analytics.sessions.completed} icon="checkmark-circle" color={Colors.secondary} />
            <StatCard title="Canceled" value={analytics.sessions.canceled} icon="close-circle" color={Colors.border} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financials</Text>
          <View style={styles.statsGrid}>
            <View style={[styles.revenueCard, Shadows.soft]}>
              <Text style={styles.revenueLabel}>Total Revenue</Text>
              <Text style={styles.revenueValue}>{analytics.revenue.total}</Text>
              <View style={styles.revenueBadge}>
                <Ionicons name="trending-up" size={12} color={Colors.text} />
                <Text style={styles.revenueBadgeText}>+12.5%</Text>
              </View>
            </View>
            <View style={styles.revenueSubGrid}>
              <View style={[styles.revenueSubCard, Shadows.soft]}>
                <Text style={styles.subLabel}>Last Month</Text>
                <Text style={styles.subValue}>{analytics.revenue.lastMonth}</Text>
              </View>
              <View style={[styles.revenueSubCard, Shadows.soft]}>
                <Text style={styles.subLabel}>Last Week</Text>
                <Text style={styles.subValue}>{analytics.revenue.lastWeek}</Text>
              </View>
            </View>
          </View>
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
  scrollContent: {
    padding: Spacing.lg,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: Colors.surface,
    width: '31%',
    padding: Spacing.md,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardContent: {
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  cardTitle: {
    fontSize: 10,
    color: Colors.textLight,
    marginTop: 2,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueCard: {
    backgroundColor: Colors.surface,
    width: '48%',
    padding: Spacing.xl,
    borderRadius: 24,
    justifyContent: 'center',
  },
  revenueLabel: {
    fontSize: 12,
    color: Colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  revenueValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginVertical: 8,
  },
  revenueBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  revenueBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  revenueSubGrid: {
    width: '48%',
    justifyContent: 'space-between',
  },
  revenueSubCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 16,
    height: '47%',
    justifyContent: 'center',
  },
  subLabel: {
    fontSize: 10,
    color: Colors.textLight,
  },
  subValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: 4,
  },
});
