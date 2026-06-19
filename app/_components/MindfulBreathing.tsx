
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';

export default function MindfulBreathing({ visible, onClose }: { visible: boolean; onClose: () => void }) {
    const [phase, setPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
    const [isActive, setIsActive] = useState(false);
    const breathAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        let interval: any;
        if (isActive) {
            runBreathCycle();
            interval = setInterval(runBreathCycle, 12000); // 4s inhale, 4s hold, 4s exhale
        } else {
            breathAnim.setValue(1);
            opacityAnim.setValue(0.4);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const runBreathCycle = () => {
        setPhase('Inhale');
        Animated.parallel([
            Animated.timing(breathAnim, {
                toValue: 2,
                duration: 4000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setPhase('Hold');
            setTimeout(() => {
                setPhase('Exhale');
                Animated.parallel([
                    Animated.timing(breathAnim, {
                        toValue: 1,
                        duration: 4000,
                        easing: Easing.in(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0.4,
                        duration: 4000,
                        useNativeDriver: true,
                    }),
                ]).start();
            }, 4000);
        });
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={StyleSheet.flatten([styles.container, Shadows.soft])}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => { setIsActive(false); onClose(); }}>
                        <Ionicons name="close" size={24} color={Colors.textLight} />
                    </TouchableOpacity>

                    <Text style={styles.title}>Mindful Minute</Text>
                    <Text style={styles.subtitle}>Take a moment to center yourself</Text>

                    <View style={styles.breathArea}>
                        <Animated.View
                            style={[
                                styles.circle,
                                {
                                    transform: [{ scale: breathAnim }],
                                    opacity: opacityAnim,
                                },
                            ]}
                        />
                        <View style={styles.phaseContainer}>
                            <Text style={styles.phaseText}>{isActive ? phase : 'Ready?'}</Text>
                        </View>
                    </View>

                    {!isActive ? (
                        <TouchableOpacity style={styles.startBtn} onPress={() => setIsActive(true)}>
                            <Text style={styles.startBtnText}>Start Breathing</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.stopBtn} onPress={() => setIsActive(false)}>
                            <Text style={styles.stopBtnText}>End Session</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(45, 64, 89, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacing.xl,
    },
    container: {
        width: '100%',
        backgroundColor: Colors.surface,
        borderRadius: 32,
        padding: Spacing.xl,
        alignItems: 'center',
    },
    closeBtn: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: Spacing.md,
    },
    subtitle: {
        fontSize: 14,
        color: Colors.textLight,
        marginTop: 4,
    },
    breathArea: {
        height: 300,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: Spacing.xl,
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: Colors.primary,
    },
    phaseContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    phaseText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
    },
    startBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 20,
        marginTop: Spacing.md,
    },
    startBtnText: {
        color: Colors.surface,
        fontWeight: 'bold',
        fontSize: 18,
    },
    stopBtn: {
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.textLight,
        marginTop: Spacing.md,
    },
    stopBtnText: {
        color: Colors.textLight,
        fontSize: 16,
    },
});
