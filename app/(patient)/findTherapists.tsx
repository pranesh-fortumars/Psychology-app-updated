

import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService, User } from '../../services/dataService';

export default function FindTherapists() {
  const [therapists, setTherapists] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const list = dataService.getTherapists({ language, search });
    setTherapists(list);
  }, [search, language]);

  const renderTherapist = ({ item }: { item: User }) => (
    <View style={[styles.card, Shadows.soft]}>
      <View style={styles.cardHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.specialization}>{item.specialization}</Text>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color={Colors.star} />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.languagesRow}>
        {item.languages?.map(lang => (
          <View key={lang} style={styles.langBadge}>
            <Text style={styles.langBadgeText}>{lang}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => {/* Handle booking logic */ }}
      >
        <Text style={styles.bookButtonText}>Schedule Session (500 Coins)</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Find a Therapist</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.textLight} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.textLight}
          />
        </View>


        {/* CF-103: Mandatory Language Selection Filter */}
        <View style={styles.filterSection}>
          <View style={styles.filterHeader}>
            <Ionicons name="language-outline" size={16} color={Colors.primary} />
            <Text style={styles.filterLabel}>Preferred Language (Mandatory)</Text>
          </View>
          <View style={[styles.pickerContainer, Shadows.soft]}>
            <Picker
              selectedValue={language}
              onValueChange={(itemValue: string) => setLanguage(itemValue)}
              style={styles.picker}
              dropdownIconColor={Colors.primary}
            >
              <Picker.Item label="English (Default)" value="English" />
              <Picker.Item label="Spanish" value="Spanish" />
              <Picker.Item label="Mandarin" value="Mandarin" />
              <Picker.Item label="Hindi" value="Hindi" />
              <Picker.Item label="French" value="French" />
            </Picker>
          </View>
        </View>
      </View>

      <FlatList
        data={therapists}
        renderItem={renderTherapist}
        keyExtractor={(item: User) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="sad-outline" size={48} color={Colors.textLight} />
            <Text style={styles.emptyText}>No therapists found matching your filters.</Text>
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
  header: {
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: Spacing.md,
    height: 50,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: 16,
    color: Colors.text,
  },
  filterSection: {
    marginTop: Spacing.sm,
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 4,
  },
  filterLabel: {
    fontSize: 12,
    color: Colors.textLight,
    marginLeft: 6,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  pickerContainer: {
    backgroundColor: Colors.background,
    borderRadius: 16,
    height: 56,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 4,
  },
  picker: {
    height: 56,
    width: '100%',
    color: Colors.text,
  },
  listContent: {
    padding: Spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  specialization: {
    fontSize: 14,
    color: Colors.textLight,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  languagesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Spacing.lg,
  },
  langBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 4,
  },
  langBadgeText: {
    fontSize: 12,
    color: Colors.text,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: Colors.surface,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    color: Colors.textLight,
    marginTop: Spacing.md,
    fontSize: 16,
    textAlign: 'center',
  },
});
