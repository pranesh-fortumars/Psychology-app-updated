

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService } from '../../services/dataService';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Input Required", "Please enter your credentials.");
            return;
        }

        setLoading(true);
        try {
            const user = await dataService.login(email);
            if (user) {
                if (user.role === 'admin') router.replace('/(admin)/users');
                else if (user.role === 'doctor') router.replace('/(doctor)/sessions');
                else router.replace('/(patient)');
            } else {
                Alert.alert("Login Failed", "Invalid email or password.");
            }
        } catch (error) {
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <View style={[styles.logoContainer, Shadows.soft]}>
                        <Ionicons name="leaf-outline" size={50} color={Colors.primary} />
                    </View>
                    <Text style={styles.title}>ClarityMind</Text>
                    <Text style={styles.subtitle}>Your path to peace begins here</Text>
                </View>

                <View style={styles.form}>
                    <View style={styles.inputWrapper}>
                        <Ionicons name="mail-outline" size={20} color={Colors.textLight} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Email Address"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor={Colors.textLight}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Ionicons name="lock-closed-outline" size={20} color={Colors.textLight} style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor={Colors.textLight}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, { opacity: loading ? 0.7 : 1 }]}
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerLink} onPress={() => router.push('/(auth)/signup')}>
                        <Text style={styles.footerText}>New here? <Text style={styles.link}>Create an account</Text></Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        flex: 1,
        padding: Spacing.xl,
        justifyContent: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacing.xl * 2,
    },
    logoContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: Colors.text,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.textLight,
        marginTop: 4,
    },
    form: {
        width: '100%',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        borderRadius: 16,
        paddingHorizontal: Spacing.md,
        height: 60,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    inputIcon: {
        marginRight: Spacing.sm,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: Colors.text,
    },
    button: {
        backgroundColor: Colors.primary,
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing.lg,
        ...Shadows.soft,
    },
    buttonText: {
        color: Colors.surface,
        fontSize: 18,
        fontWeight: 'bold',
    },
    footerLink: {
        marginTop: Spacing.xl,
        alignItems: 'center',
    },
    footerText: {
        color: Colors.textLight,
        fontSize: 14,
    },
    link: {
        color: Colors.primary,
        fontWeight: 'bold',
    },
});
