
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Alert } from "react-native";
import { Colors, Shadows, Spacing } from "../../constants/theme";
import { dataService, Session } from "../../services/dataService";

export default function PatientProfile() {
  const [patient, setPatient] = useState<any>(null);
  const [sessionHistory, setSessionHistory] = useState<Session[]>([]);
  const [feedbackModalVisible, setFeedbackModalVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');

  const fetchProfile = async () => {
    const user = await dataService.login("john@example.com");
    if (user) {
      setPatient(user);
      const sessions = dataService.getPatientSessions(user.id);
      setSessionHistory(sessions);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleOpenFeedback = (session: Session) => {
    setSelectedSession(session);
    setRating(session.rating || 0);
    setFeedbackText(session.feedback || '');
    setFeedbackModalVisible(true);
  };

  const handleSubmitFeedback = () => {
    if (selectedSession && rating > 0) {
      dataService.updateSessionDetails(selectedSession.id, { rating, feedback: feedbackText });
      Alert.alert("Feedback Submitted", "Thank you for rating your session!");
      setFeedbackModalVisible(false);
      fetchProfile();
    } else {
      Alert.alert("Error", "Please provide a star rating.");
    }
  };

  const renderSession = ({ item }: { item: Session }) => (
    <View style={[styles.sessionCard, Shadows.soft]}>
      <View style={styles.sessionIcon}>
        <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
      </View>
      <View style={styles.sessionInfo}>
        <Text style={styles.sessionTherapist}>{item.therapistName}</Text>
        <Text style={styles.sessionDate}>{new Date(item.date).toLocaleDateString()} • {item.time}</Text>
      </View>
      <View style={{ alignItems: 'flex-end', gap: 8 }}>
        <View style={[styles.statusBadge, { backgroundColor: item.status === 'completed' ? Colors.success : Colors.accent }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
        {item.status === 'completed' && !item.feedback && (
          <TouchableOpacity style={styles.rateBtn} onPress={() => handleOpenFeedback(item)}>
            <Text style={styles.rateBtnText}>Rate Session</Text>
          </TouchableOpacity>
        )}
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

              {patient.topics && patient.topics.length > 0 && (
                <View style={styles.topicsRow}>
                  {patient.topics.map((t: string) => (
                    <View key={t} style={styles.topicChip}>
                      <Text style={styles.topicText}>{t}</Text>
                    </View>
                  ))}
                </View>
              )}

              <View style={styles.coinBadge}>
                <Ionicons name="wallet" size={16} color={Colors.text} />
                <Text style={styles.coinBalanceText}>{patient.coins || 0} Credits</Text>
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

      <Modal visible={feedbackModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Rate Your Session</Text>
              <TouchableOpacity onPress={() => setFeedbackModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalSubtitle}>How was your session with {selectedSession?.therapistName}?</Text>
            
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity key={star} onPress={() => setRating(star)}>
                  <Ionicons name={star <= rating ? "star" : "star-outline"} size={36} color={Colors.star} style={{ marginHorizontal: 4 }} />
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={styles.textArea}
              placeholder="Write an optional review..."
              multiline
              value={feedbackText}
              onChangeText={setFeedbackText}
              placeholderTextColor={Colors.textLight}
            />

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitFeedback}>
              <Text style={styles.submitBtnText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    marginBottom: Spacing.sm,
  },
  topicsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginBottom: Spacing.md,
  },
  topicChip: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  topicText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
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
  },
  rateBtn: {
    backgroundColor: Colors.star,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  rateBtnText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.surface,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.xl,
    minHeight: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: Spacing.xl,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.xl,
  },
  textArea: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: Spacing.lg,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: Spacing.xl,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  submitBtnText: {
    color: Colors.surface,
    fontWeight: 'bold',
    fontSize: 16,
  }
});
