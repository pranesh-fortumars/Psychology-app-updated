
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { ClinicalCategories, Colors, Shadows, Spacing } from "../../constants/theme";
import { dataService, User } from "../../services/dataService";
import AnimatedEntrance from "../_components/AnimatedEntrance";

const CONSULTANT_CATEGORIES = ClinicalCategories.consultant;
const LIFE_STAGES = ClinicalCategories.lifeStages;
const SPECIALITY_THERAPIES = ClinicalCategories.speciality;

export default function TherapistDiscovery() {
  const router = useRouter();
  const [therapists, setTherapists] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    consultantCategory: '',
    lifeStage: '',
    specialityTherapy: ''
  });

  const loadTherapists = () => {
    const list = dataService.getTherapists({
      search,
      consultantCategory: filters.consultantCategory,
      lifeStage: filters.lifeStage,
      specialityTherapy: filters.specialityTherapy
    });
    setTherapists(list);
  };

  useEffect(() => {
    loadTherapists();
  }, [search, filters]);

  const FilterSection = ({ title, options, current, onSelect }: any) => (
    <View style={styles.filterSection}>
      <Text style={styles.filterSectionTitle}>{title}</Text>
      <View style={styles.filterChips}>
        {options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={StyleSheet.flatten([
              styles.chip,
              current === opt && styles.activeChip
            ])}
            onPress={() => onSelect(current === opt ? '' : opt)}
          >
            <Text style={StyleSheet.flatten([
              styles.chipText,
              current === opt && styles.activeChipText
            ])}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTherapist = ({ item, index }: { item: User, index: number }) => (
    <AnimatedEntrance delay={100 + (index * 50)} direction="up">
      <Pressable
        onPress={() => router.push(`/(patient)/therapistDetails?id=${item.id}` as any)}
        style={StyleSheet.flatten([styles.therapistCard, Shadows.glass])}
      >
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>
        <View style={styles.therapistInfo}>
          <Text style={styles.therapistName}>{item.name}</Text>
          <Text style={styles.therapistSpecialty}>{item.specialization || 'Clinical Psychologist'}</Text>
          <View style={styles.tagRow}>
            {item.consultantCategory?.slice(0, 2).map(tag => (
              <View key={tag} style={styles.miniTag}>
                <Text style={styles.miniTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={Colors.star} />
          <Text style={styles.ratingText}>{item.rating || '5.0'}</Text>
        </View>
      </Pressable>
    </AnimatedEntrance>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find Expertise</Text>
        <View style={styles.searchRow}>
          <View style={StyleSheet.flatten([styles.searchContainer, Shadows.soft])}>
            <Ionicons name="search" size={20} color={Colors.textLight} />
            <TextInput
              style={styles.searchInput}
              placeholder="Symptoms, name or therapy..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor={Colors.textLight}
            />
          </View>
          <TouchableOpacity
            style={StyleSheet.flatten([styles.filterBtn, Shadows.soft])}
            onPress={() => setShowFilters(true)}
          >
            <Ionicons name="options-outline" size={24} color={Colors.primary} />
            {(filters.consultantCategory || filters.lifeStage || filters.specialityTherapy) && (
              <View style={styles.filterDot} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={therapists}
        renderItem={renderTherapist}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>No consultants found for these criteria.</Text>
          </View>
        }
      />

      <Modal visible={showFilters} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Consultation Filters</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FilterSection
                title="Mental Health Consultant"
                options={CONSULTANT_CATEGORIES}
                current={filters.consultantCategory}
                onSelect={(val: string) => setFilters(f => ({ ...f, consultantCategory: val }))}
              />
              <FilterSection
                title="Life Stages & Family Dynamics"
                options={LIFE_STAGES}
                current={filters.lifeStage}
                onSelect={(val: string) => setFilters(f => ({ ...f, lifeStage: val }))}
              />
              <FilterSection
                title="Speciality Therapies"
                options={SPECIALITY_THERAPIES}
                current={filters.specialityTherapy}
                onSelect={(val: string) => setFilters(f => ({ ...f, specialityTherapy: val }))}
              />

              <TouchableOpacity
                style={styles.applyBtn}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetBtn}
                onPress={() => setFilters({ consultantCategory: '', lifeStage: '', specialityTherapy: '' })}
              >
                <Text style={styles.resetBtnText}>Reset All</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    gap: 12,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 52,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: Colors.text,
  },
  filterBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterDot: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.surface,
  },
  listContent: {
    padding: Spacing.lg,
  },
  therapistCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 24,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatarWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.text,
  },
  therapistSpecialty: {
    fontSize: 13,
    color: Colors.textLight,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 6,
  },
  miniTag: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  miniTagText: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '600',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(27, 38, 59, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  filterSection: {
    marginBottom: Spacing.lg,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  filterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '500',
  },
  activeChipText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
  applyBtn: {
    backgroundColor: Colors.primary,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
    boxShadow: '0px 8px 12px rgba(33, 158, 188, 0.2)',
    elevation: 4,
  },
  applyBtnText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetBtn: {
    marginTop: 16,
    alignItems: 'center',
    padding: 8,
  },
  resetBtnText: {
    color: Colors.textLight,
    fontSize: 14,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    color: Colors.textLight,
    textAlign: 'center',
    fontSize: 15,
  }
});
