

import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ClinicalCategories, Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService, User } from '../../services/dataService';

export default function AdminUserManagement() {
  const [doctors, setDoctors] = useState<User[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newDocName, setNewDocName] = useState('');
  const [newDocEmail, setNewDocEmail] = useState('');

  const [selectedConsultants, setSelectedConsultants] = useState<string[]>([]);
  const [selectedLifeStages, setSelectedLifeStages] = useState<string[]>([]);
  const [selectedTherapies, setSelectedTherapies] = useState<string[]>([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = () => {
    const list = dataService.getTherapists();
    setDoctors(list);
  };

  const toggleSelection = (list: string[], setList: any, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleCreateDoctor = () => {
    if (!newDocName || !newDocEmail) {
      Alert.alert("Error", "Name and email are required.");
      return;
    }

    dataService.createDoctor({
      name: newDocName,
      email: newDocEmail,
      consultantCategory: selectedConsultants,
      lifeStages: selectedLifeStages,
      specialityTherapies: selectedTherapies
    });

    Alert.alert("Success", `Doctor ID created for ${newDocName}.`);
    setModalVisible(false);
    setNewDocName('');
    setNewDocEmail('');
    setSelectedConsultants([]);
    setSelectedLifeStages([]);
    setSelectedTherapies([]);
    fetchDoctors();
  };

  const MultiSelectSection = ({ title, options, selected, onToggle }: any) => (
    <View style={styles.formSection}>
      <Text style={styles.formSectionTitle}>{title}</Text>
      <View style={styles.chipGrid}>
        {options.map((opt: string) => (
          <TouchableOpacity
            key={opt}
            style={StyleSheet.flatten([
              styles.adminChip,
              selected.includes(opt) && styles.adminActiveChip
            ])}
            onPress={() => onToggle(opt)}
          >
            <Text style={StyleSheet.flatten([
              styles.adminChipText,
              selected.includes(opt) && styles.adminActiveChipText
            ])}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderDoctorItem = ({ item }: { item: User }) => (
    <View style={StyleSheet.flatten([styles.card, Shadows.glass])}>
      <View style={styles.cardInfo}>
        <Text style={styles.docName}>{item.name}</Text>
        <Text style={styles.docEmail}>{item.email}</Text>
        <View style={styles.tagRow}>
          {item.consultantCategory?.slice(0, 3).map(cat => (
            <View key={cat} style={styles.tag}>
              <Text style={styles.tagText}>{cat}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.roleBadge}>
        <Text style={styles.roleText}>DOCTOR</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Consultant Mgt</Text>
          <Text style={styles.subtitle}>Admin: Creation of Therapist IDs</Text>
        </View>
        <TouchableOpacity
          style={StyleSheet.flatten([styles.addButton, Shadows.soft])}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={24} color={Colors.surface} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={doctors}
        renderItem={renderDoctorItem}
        keyExtractor={(item: User) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Active Clinical Registry</Text>}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Register New Consultant</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formContainer}>
                <Text style={styles.label}>Professional Identity</Text>
                <TextInput
                  style={styles.adminInput}
                  placeholder="Dr. Full Name"
                  value={newDocName}
                  onChangeText={setNewDocName}
                  placeholderTextColor={Colors.textLight}
                />

                <TextInput
                  style={styles.adminInput}
                  placeholder="Professional Email"
                  value={newDocEmail}
                  onChangeText={setNewDocEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={Colors.textLight}
                />

                <MultiSelectSection
                  title="Mental Health Categories"
                  options={ClinicalCategories.consultant}
                  selected={selectedConsultants}
                  onToggle={(item: string) => toggleSelection(selectedConsultants, setSelectedConsultants, item)}
                />

                <MultiSelectSection
                  title="Life Stages & Dynamics"
                  options={ClinicalCategories.lifeStages}
                  selected={selectedLifeStages}
                  onToggle={(item: string) => toggleSelection(selectedLifeStages, setSelectedLifeStages, item)}
                />

                <MultiSelectSection
                  title="Specialty Therapies"
                  options={ClinicalCategories.speciality}
                  selected={selectedTherapies}
                  onToggle={(item: string) => toggleSelection(selectedTherapies, setSelectedTherapies, item)}
                />

                <TouchableOpacity
                  style={styles.confirmBtn}
                  onPress={handleCreateDoctor}
                >
                  <Text style={styles.confirmBtnText}>Authorize & Register</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
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
  header: {
    paddingTop: 60,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 2,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  card: {
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    borderRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardInfo: {
    flex: 1,
  },
  docName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.text,
  },
  docEmail: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 2,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8,
  },
  tag: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 10,
    color: Colors.textLight,
    fontWeight: '600',
  },
  roleBadge: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleText: {
    fontSize: 10,
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
    width: '100%',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: Spacing.lg,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
  },
  formContainer: {
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  adminInput: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: 12,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  formSectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.textLight,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  adminChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  adminActiveChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  adminChipText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  adminActiveChipText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
  confirmBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 30,
    boxShadow: '0px 8px 15px rgba(33, 158, 188, 0.2)',
    elevation: 4,
  },
  confirmBtnText: {
    color: Colors.surface,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
