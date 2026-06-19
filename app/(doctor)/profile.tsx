
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';

const dummyDoctor = {
  name: "Dr. Evelyn Reed",
  email: "evelyn@claritymind.com",
  specialty: "Cognitive Behavioral Therapy",
  experience: "12 Years",
  rating: 4.9,
  patients: "450+",
  bio: "Expert in treating anxiety and depressive disorders through evidence-based cognitive behavioral strategies.",
  upcomingSessions: [
    {
      id: "1",
      patientName: "John Doe",
      date: "2023-11-12",
      time: "10:00 AM",
      type: "Remote"
    },
    {
      id: "2",
      patientName: "Sarah Miller",
      date: "2023-11-12",
      time: "02:00 PM",
      type: "In-Person"
    },
  ],
};

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState<any>(null);

  useEffect(() => {
    setDoctor(dummyDoctor);
  }, []);

  const renderSession = ({ item }: { item: any }) => (
    <View style={[styles.sessionCard, Shadows.soft]}>
      <View style={styles.sessionIcon}>
        <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
      </View>
      <View style={styles.sessionDetails}>
        <Text style={styles.sessionPatient}>{item.patientName}</Text>
        <Text style={styles.sessionDateTime}>{`${item.date} • ${item.time}`}</Text>
      </View>
      <View style={styles.typeBadge}>
        <Text style={styles.typeText}>{item.type}</Text>
      </View>
    </View>
  );

  if (!doctor) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={[styles.profileCard, Shadows.soft]}>
          <View style={styles.headerLayout}>
            <View style={styles.avatarContainer}>
              <Ionicons name="medkit" size={60} color={Colors.primary} />
            </View>
            <View style={styles.mainInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color={Colors.star} />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
                <View style={styles.dot} />
                <Text style={styles.experienceText}>{doctor.experience} Exp</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{doctor.patients}</Text>
              <Text style={styles.statLabel}>Patients</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statValue}>1.2k</Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <TouchableOpacity style={styles.editButton}>
                <Ionicons name="create-outline" size={20} color={Colors.primary} />
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.bioText}>{doctor.bio}</Text>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Sessions</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.textLight} />
          </View>

          <FlatList
            data={doctor.upcomingSessions}
            renderItem={renderSession}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>

        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutText}>Account Settings</Text>
          <Ionicons name="settings-outline" size={20} color={Colors.textLight} />
        </TouchableOpacity>
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
  profileCard: {
    backgroundColor: Colors.surface,
    borderRadius: 32,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerLayout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mainInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  doctorSpecialty: {
    fontSize: 16,
    color: Colors.textLight,
    marginTop: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginLeft: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.textLight,
    marginHorizontal: 8,
  },
  experienceText: {
    fontSize: 14,
    color: Colors.textLight,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  editText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary
  },
  sectionContainer: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    color: Colors.textLight,
    lineHeight: 24,
  },
  sessionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: 20,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sessionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sessionDetails: {
    flex: 1,
  },
  sessionPatient: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  sessionDateTime: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 2,
  },
  typeBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.text,
  },
  signOutButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: Spacing.lg
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text
  }
});
