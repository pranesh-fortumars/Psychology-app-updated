
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService, Session } from '../../services/dataService';
import AnimatedEntrance from '../_components/AnimatedEntrance';
import MindfulBreathing from '../_components/MindfulBreathing';

const MOODS = [
  { emoji: '😌', label: 'Calm', color: '#D1E8FF' },
  { emoji: '😊', label: 'Happy', color: '#D4EBD0' },
  { emoji: '😔', label: 'Sad', color: '#F8F9FA' },
  { emoji: '😰', label: 'Anxious', color: '#FFF4E0' },
  { emoji: '😤', label: 'Stressed', color: '#E2E8F0' },
];

export default function PatientDashboard() {
  const router = useRouter();
  const [sessionCount, setSessionCount] = useState(0);
  const [upcomingSessions, setUpcomingSessions] = useState<Session[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showBreathing, setShowBreathing] = useState(false);
  const patientId = 'pat-1';

  useEffect(() => {
    const count = dataService.getUpcomingSessionsCount(patientId, 'patient');
    setSessionCount(count);

    const sessions = dataService.getPatientSessions(patientId)
      .filter(s => s.status === 'scheduled')
      .sort((a, b) => a.date.getTime() - b.date.getTime());
    setUpcomingSessions(sessions);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <AnimatedEntrance delay={100} direction="none">
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>Hello, John</Text>
              <Text style={styles.subtitle}>Let's focus on your balance today</Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => router.push('/(patient)/patientProfile')}
            >
              <View style={styles.avatarMini}>
                <Ionicons name="person-outline" size={24} color={Colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
        </AnimatedEntrance>

        {/* Daily Pulse - Mood Tracker */}
        <AnimatedEntrance delay={200}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Pulse</Text>
            <View style={StyleSheet.flatten([styles.moodContainer, Shadows.glass])}>
              <Text style={styles.moodPrompt}>How are you feeling right now?</Text>
              <View style={styles.moodRow}>
                {MOODS.map((mood) => (
                  <TouchableOpacity
                    key={mood.label}
                    style={StyleSheet.flatten([
                      styles.moodItem,
                      selectedMood === mood.label && { backgroundColor: mood.color, borderColor: Colors.primary }
                    ])}
                    onPress={() => setSelectedMood(mood.label)}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text style={styles.moodLabel}>{mood.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </AnimatedEntrance>

        {/* Mindful Minute Trigger */}
        <AnimatedEntrance delay={300} scale>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.breathingBanner, Shadows.soft])}
            onPress={() => setShowBreathing(true)}
          >
            <View style={styles.breathingIcon}>
              <Ionicons name="leaf-outline" size={28} color={Colors.surface} />
            </View>
            <View style={styles.breathingTextCol}>
              <Text style={styles.breathingTitle}>Take a Mindful Minute</Text>
              <Text style={styles.breathingSub}>Short exercise to reduce stress</Text>
            </View>
            <Ionicons name="play-circle" size={32} color={Colors.surface} />
          </TouchableOpacity>
        </AnimatedEntrance>

        {/* Upcoming Status Tracker */}
        <AnimatedEntrance delay={400}>
          <View style={StyleSheet.flatten([styles.statsCard, Shadows.soft])}>
            <View style={styles.statsIconContainer}>
              <Ionicons name="calendar" size={24} color={Colors.primary} />
            </View>
            <View style={styles.statsTextContainer}>
              <Text style={styles.statsValue}>{sessionCount}</Text>
              <Text style={styles.statsLabel}>Upcoming Sessions</Text>
            </View>
            <TouchableOpacity
              style={styles.viewAllButton}
              onPress={() => router.push('/(patient)/therapistDiscovery')}
            >
              <Text style={styles.viewAllText}>Details</Text>
            </TouchableOpacity>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={500}>
          <View style={styles.actionSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.actionGrid}>
              <TouchableOpacity
                style={StyleSheet.flatten([styles.actionCard, { backgroundColor: Colors.accent }])}
                onPress={() => router.push('/(patient)/findTherapists')}
              >
                <Ionicons name="search" size={24} color={Colors.text} />
                <Text style={styles.actionText}>Find Therapist</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={StyleSheet.flatten([styles.actionCard, { backgroundColor: Colors.secondary }])}
                onPress={() => router.push('/(patient)/coinRecharge')}
              >
                <Ionicons name="sparkles-outline" size={24} color={Colors.text} />
                <Text style={styles.actionText}>Top up Credits</Text>
              </TouchableOpacity>
            </View>
          </View>
        </AnimatedEntrance>

        <AnimatedEntrance delay={600}>
          <Text style={styles.sectionTitle}>Next Appointment</Text>
          {upcomingSessions.length > 0 ? (
            <View style={StyleSheet.flatten([styles.sessionCard, Shadows.glass])}>
              <View style={styles.sessionLeft}>
                <Text style={styles.sessionTherapist}>{upcomingSessions[0].therapistName}</Text>
                <Text style={styles.sessionTime}>
                  {upcomingSessions[0].date.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })} • {upcomingSessions[0].time}
                </Text>
              </View>
              <TouchableOpacity style={styles.joinBtn}>
                <Text style={styles.joinText}>Join</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>Your journal is quiet...</Text>
              <TouchableOpacity
                onPress={() => router.push('/(patient)/findTherapists')}
                style={styles.bookNowAction}
              >
                <Text style={styles.bookNowText}>Book your first session</Text>
              </TouchableOpacity>
            </View>
          )}
        </AnimatedEntrance>

        <MindfulBreathing visible={showBreathing} onClose={() => setShowBreathing(false)} />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    marginTop: Spacing.md,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textLight,
  },
  avatarMini: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.surface,
  },
  profileButton: {
    padding: Spacing.xs,
  },
  section: {
    marginBottom: Spacing.xl,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  moodContainer: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  moodPrompt: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodItem: {
    alignItems: 'center',
    padding: Spacing.sm,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
    flex: 1,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 10,
    color: Colors.text,
    fontWeight: '600',
  },
  breathingBanner: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 32,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  breathingIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  breathingTextCol: {
    flex: 1,
  },
  breathingTitle: {
    color: Colors.surface,
    fontSize: 18,
    fontWeight: 'bold',
  },
  breathingSub: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  statsCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statsIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  statsTextContainer: {
    flex: 1,
  },
  statsValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statsLabel: {
    fontSize: 13,
    color: Colors.textLight,
  },
  viewAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  viewAllText: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
  actionSection: {
    marginBottom: Spacing.xl,
  },
  actionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionCard: {
    flex: 1,
    padding: Spacing.lg,
    borderRadius: 24,
    alignItems: 'center',
  },
  actionText: {
    marginTop: Spacing.sm,
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: 13,
    textAlign: 'center'
  },
  sessionCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sessionLeft: {
    flex: 1,
  },
  sessionTherapist: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  sessionTime: {
    fontSize: 13,
    color: Colors.textLight,
  },
  joinBtn: {
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 14,
  },
  joinText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    padding: Spacing.xl,
    backgroundColor: Colors.surface,
    borderRadius: 28,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyText: {
    color: Colors.textLight,
    marginBottom: Spacing.sm,
    fontSize: 15,
  },
  bookNowAction: {
    padding: Spacing.sm,
  },
  bookNowText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
