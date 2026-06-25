
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService, Session } from '../../services/dataService';

export default function DoctorSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [activeTab, setActiveTab] = useState<'scheduled' | 'completed'>('scheduled');
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [reportText, setReportText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const doctorId = 'doc-1';

  useEffect(() => {
    const list = dataService.getDoctorSessions(doctorId);
    const filtered = list.filter(s => s.status === (activeTab as any));
    if (searchQuery) {
      setSessions(filtered.filter(s => s.patientName.toLowerCase().includes(searchQuery.toLowerCase())));
    } else {
      setSessions(filtered);
    }
  }, [activeTab, searchQuery]);

  const handleUpdateSession = () => {
    if (selectedSession) {
      dataService.updateSessionDetails(selectedSession.id, {
        report: reportText,
        suggestions: suggestionText,
        status: 'completed'
      });
      Alert.alert("Session Detailed", "Report saved and status updated to completed.");
      setSelectedSession(null);
      // Refresh list
      const list = dataService.getDoctorSessions(doctorId);
      setSessions(list.filter(s => s.status === activeTab));
    }
  };

  const renderSessionItem = ({ item }: { item: Session }) => (
    <TouchableOpacity
      style={StyleSheet.flatten([styles.card, Shadows.glass])}
      onPress={() => {
        setSelectedSession(item);
        setReportText(item.report || '');
        setSuggestionText(item.suggestions || '');
      }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.personIcon}>
          <Text style={styles.initials}>{item.patientName.charAt(0)}</Text>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.patientName}>{item.patientName}</Text>
          <Text style={styles.sessionTime}>
            {item.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} • {item.time}
          </Text>
        </View>
        <View style={styles.typeBadge}>
          <Text style={styles.typeText}>CBT</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={styles.durationHint}>
          <Ionicons name="time-outline" size={12} color={Colors.textLight} />
          <Text style={styles.durationText}>50 Mins</Text>
        </View>
        {item.status === 'completed' ? (
          <View style={StyleSheet.flatten([styles.statusBadge, { backgroundColor: Colors.success }])}>
            <Ionicons name="checkmark-done" size={12} color={Colors.text} />
            <Text style={styles.statusBadgeText}>Done</Text>
          </View>
        ) : (
          <TouchableOpacity style={styles.actionLink}>
            <Text style={styles.actionLinkText}>Details</Text>
            <Ionicons name="arrow-forward" size={12} color={Colors.primary} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Session Records</Text>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={18} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search patient name..."
            placeholderTextColor={Colors.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.tab, activeTab === 'scheduled' && styles.activeTab])}
            onPress={() => setActiveTab('scheduled')}
          >
            <Text style={[styles.tabLabel, activeTab === 'scheduled' && styles.activeTabLabel]}>Upcoming</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.tab, activeTab === 'completed' && styles.activeTab])}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabLabel, activeTab === 'completed' && styles.activeTabLabel]}>History</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={sessions}
        renderItem={renderSessionItem}
        keyExtractor={(item: Session) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" size={48} color={Colors.border} />
            <Text style={styles.emptyText}>No session records found.</Text>
          </View>
        }
      />

      <Modal visible={!!selectedSession} animationType="slide">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setSelectedSession(null)} style={styles.closeModal}>
              <Ionicons name="chevron-down" size={24} color={Colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Session Intelligence</Text>
            <TouchableOpacity onPress={handleUpdateSession} style={styles.saveBtn}>
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
            <View style={styles.patientHero}>
              <View style={styles.heroAvatar}>
                <Text style={styles.heroInitials}>{selectedSession?.patientName.charAt(0)}</Text>
              </View>
              <Text style={styles.heroName}>{selectedSession?.patientName}</Text>
              <Text style={styles.heroSub}>{selectedSession?.date.toDateString()} • {selectedSession?.time}</Text>
              {selectedSession?.patientTopics && selectedSession.patientTopics.length > 0 && (
                <View style={styles.heroTags}>
                  {selectedSession.patientTopics.map(t => (
                    <View key={t} style={styles.heroTag}>
                      <Text style={styles.heroTagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.inputSection}>
              <View style={styles.labelRow}>
                <Ionicons name="clipboard-outline" size={16} color={Colors.primary} />
                <Text style={styles.label}>Clinical Notes</Text>
              </View>
              <TextInput
                style={styles.textArea}
                placeholder="Confidential observations and clinical progress..."
                multiline
                value={reportText}
                onChangeText={setReportText}
                placeholderTextColor={Colors.textLight}
              />
            </View>

            <View style={styles.inputSection}>
              <View style={styles.labelRow}>
                <Ionicons name="bulb-outline" size={16} color={Colors.star} />
                <Text style={styles.label}>Patient Guidance</Text>
              </View>
              <TextInput
                style={styles.textArea}
                placeholder="Exercises, suggestions or homework for the patient..."
                multiline
                value={suggestionText}
                onChangeText={setSuggestionText}
                placeholderTextColor={Colors.textLight}
              />
            </View>

            {selectedSession?.feedback && (
              <View style={styles.feedbackSection}>
                <Text style={styles.feedbackTitle}>Patient Review</Text>
                <View style={StyleSheet.flatten([styles.feedbackCard, Shadows.glass])}>
                  <Text style={styles.feedbackText}>"{selectedSession.feedback}"</Text>
                  <View style={styles.starsRow}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <Ionicons
                        key={s}
                        name={s <= (selectedSession.rating || 0) ? "star" : "star-outline"}
                        size={14}
                        color={Colors.star}
                        style={{ marginRight: 2 }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            )}

            <View style={{ height: 40 }} />
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: Spacing.lg,
    height: 44,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
    fontSize: 14,
    color: Colors.text,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    borderRadius: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  activeTab: {
    backgroundColor: Colors.surface,
  },
  tabLabel: {
    fontSize: 14,
    color: Colors.textLight,
    fontWeight: '600',
  },
  activeTabLabel: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  listContent: {
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 28,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  personIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  initials: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  cardInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.text,
  },
  sessionTime: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.background,
    borderRadius: 10,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.textLight,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  durationHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  durationText: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '500',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.text,
  },
  actionLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionLinkText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
    opacity: 0.5,
  },
  emptyText: {
    color: Colors.textLight,
    marginTop: 15,
    fontSize: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  saveBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10,
  },
  saveText: {
    color: Colors.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalContent: {
    padding: Spacing.lg,
  },
  patientHero: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  heroAvatar: {
    width: 80,
    height: 80,
    borderRadius: 30,
    backgroundColor: Colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  heroInitials: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  heroName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  heroSub: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
  },
  heroTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  heroTag: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  heroTagText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '600',
  },
  inputSection: {
    marginBottom: Spacing.xl,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
  },
  textArea: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    height: 140,
    textAlignVertical: 'top',
    fontSize: 15,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  feedbackSection: {
    marginTop: Spacing.sm,
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  feedbackCard: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  feedbackText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: Colors.text,
    lineHeight: 22,
  },
  starsRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  closeModal: {
    padding: 4,
  },
});
