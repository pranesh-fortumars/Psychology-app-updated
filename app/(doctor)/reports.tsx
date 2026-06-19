
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';

const { width } = Dimensions.get('window');

const dummyReports = {
  earnings: {
    total: 154500,
    lastMonth: 42000,
    lastWeek: 12500,
  },
  patientDemographics: {
    age: [
      { label: "18-25", value: 35, color: '#B2D8E5' },
      { label: "26-35", value: 45, color: '#D1E8E2' },
      { label: "36-50", value: 15, color: '#F3E5F5' },
      { label: "51+", value: 5, color: '#90A4AE' },
    ],
    gender: [
      { label: "Female", value: 55 },
      { label: "Male", value: 40 },
      { label: "Other", value: 5 },
    ],
  },
  sessionRatings: {
    average: 4.9,
    totalReviews: 124,
    distribution: [
      { label: "5 Stars", percentage: 88 },
      { label: "4 Stars", percentage: 8 },
      { label: "3 Stars", percentage: 3 },
      { label: "2 Stars", percentage: 1 },
    ],
  },
};

export default function Reports() {
  const [reports] = useState(dummyReports);

  const ProgressRow = ({ label, percentage, color }: { label: string, percentage: number, color?: string }) => (
    <View style={styles.progressRow}>
      <View style={styles.progressInfo}>
        <Text style={styles.progressLabel}>{label}</Text>
        <Text style={styles.progressValue}>{percentage}%</Text>
      </View>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${percentage}%`, backgroundColor: color || Colors.primary }]} />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Earnings Section - Fixed to INR */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Performance</Text>
          <View style={StyleSheet.flatten([styles.mainEarningsCard, Shadows.soft])}>
            <View style={styles.earningsHeader}>
              <Ionicons name="wallet-outline" size={24} color={Colors.primary} />
              <Text style={styles.earningsPeriod}>Overall Revenue</Text>
            </View>
            <Text style={styles.earningsAmount}>₹{reports.earnings.total.toLocaleString('en-IN')}</Text>

            <View style={styles.splitRow}>
              <View style={styles.splitItem}>
                <Text style={styles.splitLabel}>Last Month</Text>
                <Text style={styles.splitValue}>₹{reports.earnings.lastMonth.toLocaleString('en-IN')}</Text>
              </View>
              <View style={styles.splitDivider} />
              <View style={styles.splitItem}>
                <Text style={styles.splitLabel}>Last Week</Text>
                <Text style={styles.splitValue}>₹{reports.earnings.lastWeek.toLocaleString('en-IN')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Ratings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Satisfaction</Text>
          <View style={StyleSheet.flatten([styles.ratingCard, Shadows.soft])}>
            <View style={styles.ratingOverview}>
              <View style={styles.avgBox}>
                <Text style={styles.avgValue}>{reports.sessionRatings.average}</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Ionicons key={s} name="star" size={14} color={Colors.star} />
                  ))}
                </View>
                <Text style={styles.totalReviews}>{reports.sessionRatings.totalReviews} Reviews</Text>
              </View>
              <View style={styles.distributionList}>
                {reports.sessionRatings.distribution.map((item, index) => (
                  <View key={index} style={styles.distRow}>
                    <Text style={styles.distLabel}>{item.label}</Text>
                    <View style={styles.distBarBg}>
                      <View style={[styles.distBarFill, { width: `${item.percentage}%` }]} />
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Demographics Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Demographics</Text>
          <View style={StyleSheet.flatten([styles.demographicsCard, Shadows.soft])}>
            <Text style={styles.subTitle}>Age Distribution</Text>
            <View style={styles.demographicsList}>
              {reports.patientDemographics.age.map((item, index) => (
                <ProgressRow
                  key={index}
                  label={item.label}
                  percentage={item.value}
                  color={item.color}
                />
              ))}
            </View>

            <View style={styles.divider} />

            <Text style={styles.subTitle}>Gender Distribution</Text>
            <View style={styles.genderRow}>
              {reports.patientDemographics.gender.map((item, index) => (
                <View key={index} style={styles.genderBox}>
                  <Text style={styles.genderValue}>{item.value}%</Text>
                  <Text style={styles.genderLabel}>{item.label}</Text>
                </View>
              ))}
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
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  mainEarningsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 32,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  earningsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  earningsPeriod: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600',
    marginLeft: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  earningsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  splitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  splitItem: {
    flex: 1,
  },
  splitLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginBottom: 4,
  },
  splitValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  splitDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  ratingCard: {
    backgroundColor: Colors.surface,
    borderRadius: 28,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avgBox: {
    alignItems: 'center',
    paddingRight: Spacing.lg,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
    width: 100,
  },
  avgValue: {
    fontSize: 42,
    fontWeight: 'bold',
    color: Colors.text,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  totalReviews: {
    fontSize: 12,
    color: Colors.textLight,
  },
  distributionList: {
    flex: 1,
    paddingLeft: Spacing.lg,
  },
  distRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  distLabel: {
    fontSize: 11,
    color: Colors.textLight,
    width: 45,
  },
  distBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.background,
    borderRadius: 2,
    marginLeft: 8,
  },
  distBarFill: {
    height: 4,
    backgroundColor: Colors.star,
    borderRadius: 2,
  },
  demographicsCard: {
    backgroundColor: Colors.surface,
    borderRadius: 28,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  demographicsList: {
    marginBottom: Spacing.lg,
  },
  progressRow: {
    marginBottom: 12,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  progressValue: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: 'bold',
  },
  progressBarBg: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    borderRadius: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.lg,
  },
  genderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderBox: {
    alignItems: 'center',
    flex: 1,
  },
  genderValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  genderLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
  },
});
