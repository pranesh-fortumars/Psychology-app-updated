
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ClinicalCategories, Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService } from '../../services/dataService';
import AnimatedEntrance from '../_components/AnimatedEntrance';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter(t => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Please fill in all details to continue.");
      return;
    }

    setLoading(true);
    try {
      const success = await dataService.signup(name, email, password, 'patient', selectedTopics);
      if (success) {
        Alert.alert("Welcome!", "Your mental health journey starts here.");
        router.replace('/(auth)/login');
      } else {
        Alert.alert("Signup Failed", "This email might already be registered.");
      }
    } catch (error) {
      Alert.alert("Error", "We encountered a glitch. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative Blur Circle */}
      <View style={styles.decorCircle} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <AnimatedEntrance delay={100} direction="down">
            <View style={styles.header}>
              <View style={StyleSheet.flatten([styles.logoContainer, Shadows.glass])}>
                <Ionicons name="leaf" size={40} color={Colors.primary} />
              </View>
              <Text style={styles.title}>ClarityMind</Text>
              <Text style={styles.subtitle}>A safe space for your thoughts</Text>
            </View>
          </AnimatedEntrance>

          <AnimatedEntrance delay={300} scale>
            <View style={StyleSheet.flatten([styles.form, Shadows.glass])}>
              <Text style={styles.formTitle}>Create Account</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Full Name</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="person-outline" size={18} color={Colors.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="e.g. Jane Doe"
                    value={name}
                    onChangeText={setName}
                    placeholderTextColor={Colors.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email Address</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="mail-outline" size={18} color={Colors.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={Colors.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Create Password</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons name="lock-closed-outline" size={18} color={Colors.textLight} />
                  <TextInput
                    style={styles.input}
                    placeholder="••••••••"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={Colors.textLight}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>What brings you here? (Optional)</Text>
                <View style={styles.chipGrid}>
                  {ClinicalCategories.topics.map((topic) => (
                    <TouchableOpacity
                      key={topic}
                      style={StyleSheet.flatten([
                        styles.chip,
                        selectedTopics.includes(topic) && styles.activeChip
                      ])}
                      onPress={() => toggleTopic(topic)}
                    >
                      <Text style={StyleSheet.flatten([
                        styles.chipText,
                        selectedTopics.includes(topic) && styles.activeChipText
                      ])}>{topic}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={StyleSheet.flatten([styles.signupButton, loading && { opacity: 0.7 }])}
                onPress={handleSignup}
                disabled={loading}
              >
                <Text style={styles.signupButtonText}>
                  {loading ? 'Setting up...' : 'Join as Patient'}
                </Text>
              </TouchableOpacity>

              <View style={styles.footer}>
                <Text style={styles.footerText}>Part of our community? </Text>
                <Link href="/(auth)/login" asChild>
                  <TouchableOpacity>
                    <Text style={styles.linkText}>Sign In</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>
          </AnimatedEntrance>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  decorCircle: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.accent,
    opacity: 0.5,
  },
  scrollContent: {
    padding: Spacing.xl,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textLight,
    marginTop: 4,
    fontWeight: '500',
  },
  form: {
    backgroundColor: Colors.surface,
    borderRadius: 36,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: Colors.text,
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: Colors.primary,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    boxShadow: '0px 10px 20px rgba(33, 158, 188, 0.2)',
    elevation: 5,
  },
  signupButtonText: {
    color: Colors.surface,
    fontSize: 16,
    fontWeight: 'bold',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: Colors.textLight,
    fontSize: 14,
  },
  linkText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomSpace: {
    height: 40,
  }
});
