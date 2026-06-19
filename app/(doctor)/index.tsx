
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors, Shadows, Spacing } from '../../constants/theme';
import { dataService, Session } from '../../services/dataService';
import AnimatedEntrance from '../_components/AnimatedEntrance';

const { width } = Dimensions.get('window');

const MOOD_INSIGHTS = [
    { name: 'John', mood: '😌', trend: 'Improving', color: Colors.info },
    { name: 'Sarah', mood: '😰', trend: 'Needs Care', color: Colors.warning },
    { name: 'Mike', mood: '😊', trend: 'Stable', color: Colors.success },
];

export default function TherapistDashboard() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [stats, setStats] = useState({
        totalRevenue: 0,
        pendingPayments: 0,
        activePatients: 0,
        completedSessions: 0
    });

    const doctorId = 'doc-1';

    useEffect(() => {
        const list = dataService.getDoctorSessions(doctorId);
        setSessions(list.filter(s => s.status === 'scheduled').slice(0, 3));

        const completed = list.filter(s => s.status === 'completed');
        setStats({
            totalRevenue: completed.length * 1500,
            pendingPayments: list.filter(s => s.status === 'scheduled').length * 1500,
            activePatients: new Set(list.map(s => s.patientId)).size,
            completedSessions: completed.length
        });
    }, []);

    const StatCard = ({ title, value, icon, color, subValue }: any) => (
        <View style={StyleSheet.flatten([styles.statCard, Shadows.glass])}>
            <View style={StyleSheet.flatten([styles.statIconBadge, { backgroundColor: color + '20' }])}>
                <Ionicons name={icon} size={22} color={color} />
            </View>
            <View>
                <Text style={styles.statLabel}>{title}</Text>
                <Text style={styles.statValue}>{value}</Text>
                {subValue && <Text style={StyleSheet.flatten([styles.statSubValue, { color }])}>{subValue}</Text>}
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <AnimatedEntrance delay={100} direction="none">
                    <View style={styles.welcomeHeader}>
                        <View>
                            <Text style={styles.greetingText}>Good Morning,</Text>
                            <Text style={styles.doctorNameText}>Dr. Evelyn Reed</Text>
                        </View>
                        <TouchableOpacity style={styles.notificationButton}>
                            <Ionicons name="notifications-outline" size={24} color={Colors.text} />
                            <View style={styles.notificationDot} />
                        </TouchableOpacity>
                    </View>
                </AnimatedEntrance>

                {/* Patient Insights Horizontal Bar */}
                <AnimatedEntrance delay={200}>
                    <View style={styles.insightsSection}>
                        <Text style={styles.sectionTitle}>Patient Insights</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.insightsScroll}>
                            {MOOD_INSIGHTS.map((insight, idx) => (
                                <View key={idx} style={StyleSheet.flatten([styles.insightCard, Shadows.glass, { borderLeftColor: insight.color }])}>
                                    <Text style={styles.insightEmoji}>{insight.mood}</Text>
                                    <View>
                                        <Text style={styles.insightName}>{insight.name}</Text>
                                        <Text style={styles.insightTrend}>{insight.trend}</Text>
                                    </View>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </AnimatedEntrance>

                {/* Revenue Overview */}
                <AnimatedEntrance delay={300} scale>
                    <View style={StyleSheet.flatten([styles.revenueMainCard, Shadows.soft])}>
                        <View style={styles.revenueHeader}>
                            <Text style={styles.revenueTitle}>Platform Earnings</Text>
                            <Ionicons name="trending-up" size={20} color="rgba(255,255,255,0.6)" />
                        </View>
                        <View style={styles.revenueRow}>
                            <Text style={styles.revenueAmount}>₹{stats.totalRevenue.toLocaleString('en-IN')}</Text>
                            <View style={styles.growthBadge}>
                                <Text style={styles.growthText}>+12%</Text>
                            </View>
                        </View>

                        <View style={styles.revenueGrid}>
                            <View style={styles.miniStat}>
                                <Text style={styles.miniStatLabel}>Pending</Text>
                                <Text style={styles.miniStatValue}>₹{stats.pendingPayments.toLocaleString('en-IN')}</Text>
                            </View>
                            <View style={styles.miniStat}>
                                <Text style={styles.miniStatLabel}>Active Patients</Text>
                                <Text style={styles.miniStatValue}>{stats.activePatients}</Text>
                            </View>
                        </View>
                    </View>
                </AnimatedEntrance>

                <AnimatedEntrance delay={400} direction="up">
                    <View style={styles.statsGrid}>
                        <StatCard
                            title="Booked"
                            value={sessions.length}
                            icon="calendar"
                            color={Colors.primary}
                            subValue="Sessions today"
                        />
                        <StatCard
                            title="Rating"
                            value="4.9"
                            icon="star"
                            color={Colors.star}
                            subValue="Avg. Score"
                        />
                    </View>
                </AnimatedEntrance>

                <AnimatedEntrance delay={500}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Agenda Today</Text>
                        <TouchableOpacity onPress={() => { }}>
                            <Text style={styles.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>

                    {sessions.map((session, index) => (
                        <AnimatedEntrance key={session.id} delay={600 + (index * 100)} direction="up">
                            <View style={StyleSheet.flatten([styles.sessionCard, Shadows.glass])}>
                                <View style={styles.sessionTimeCol}>
                                    <Text style={styles.sessionHour}>{session.time.split(' ')[0]}</Text>
                                    <Text style={styles.sessionPeriod}>{session.time.split(' ')[1]}</Text>
                                </View>

                                <View style={styles.sessionDivider} />

                                <View style={styles.sessionInfo}>
                                    <Text style={styles.patientName}>{session.patientName}</Text>
                                    <Text style={styles.sessionType}>Video Consultation • 50m</Text>
                                    <View style={styles.sessionActions}>
                                        <TouchableOpacity style={styles.actionIconBtn}>
                                            <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
                                            <Text style={styles.actionIconText}>Notes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.actionIconBtn}>
                                            <Ionicons name="share-outline" size={18} color={Colors.textLight} />
                                            <Text style={styles.actionIconText}>Share</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <TouchableOpacity style={styles.joinButton}>
                                    <Ionicons name="videocam" size={20} color={Colors.surface} />
                                </TouchableOpacity>
                            </View>
                        </AnimatedEntrance>
                    ))}
                </AnimatedEntrance>

                {sessions.length === 0 && (
                    <View style={styles.emptySessions}>
                        <Ionicons name="calendar-clear-outline" size={48} color={Colors.textLight} />
                        <Text style={styles.emptyText}>Rest up! No sessions scheduled.</Text>
                    </View>
                )}
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
    welcomeHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },
    greetingText: {
        fontSize: 16,
        color: Colors.textLight,
        fontWeight: '500',
    },
    doctorNameText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        marginTop: 4,
    },
    notificationButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.surface,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    notificationDot: {
        position: 'absolute',
        top: 15,
        right: 15,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.star,
        borderWidth: 1.5,
        borderColor: Colors.surface,
    },
    insightsSection: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.md,
    },
    insightsScroll: {
        paddingRight: Spacing.lg,
    },
    insightCard: {
        backgroundColor: Colors.surface,
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.md,
        borderRadius: 20,
        marginRight: Spacing.md,
        borderLeftWidth: 4,
        width: 160,
    },
    insightEmoji: {
        fontSize: 24,
        marginRight: 10,
    },
    insightName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.text,
    },
    insightTrend: {
        fontSize: 10,
        color: Colors.textLight,
        marginTop: 2,
    },
    revenueMainCard: {
        backgroundColor: Colors.text, // Using our 'Deep Slate' for a strong contrast header
        padding: Spacing.xl,
        borderRadius: 32,
        marginBottom: Spacing.xl,
    },
    revenueHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    revenueTitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.6)',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    revenueRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    revenueAmount: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.surface,
    },
    growthBadge: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 10,
    },
    growthText: {
        color: Colors.surface,
        fontSize: 12,
        fontWeight: 'bold',
    },
    revenueGrid: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.1)',
        paddingTop: 15,
    },
    miniStat: {
        flex: 1,
    },
    miniStatLabel: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.5)',
        marginBottom: 4,
    },
    miniStatValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.surface,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginBottom: Spacing.xl,
    },
    statCard: {
        flex: 1,
        backgroundColor: Colors.surface,
        padding: Spacing.lg,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
    },
    statIconBadge: {
        width: 44,
        height: 44,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    statLabel: {
        fontSize: 12,
        color: Colors.textLight,
        fontWeight: '500',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginVertical: 2,
    },
    statSubValue: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.lg,
    },
    viewAllText: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: 'bold',
    },
    sessionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.surface,
        padding: Spacing.md,
        borderRadius: 28,
        marginBottom: Spacing.md,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    sessionTimeCol: {
        alignItems: 'center',
        width: 50,
    },
    sessionHour: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
    },
    sessionPeriod: {
        fontSize: 10,
        color: Colors.textLight,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    sessionDivider: {
        width: 1,
        height: 40,
        backgroundColor: Colors.border,
        marginHorizontal: Spacing.md,
    },
    sessionInfo: {
        flex: 1,
    },
    patientName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    sessionType: {
        fontSize: 12,
        color: Colors.textLight,
        marginTop: 2,
    },
    sessionActions: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 8,
    },
    actionIconBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionIconText: {
        fontSize: 11,
        color: Colors.textLight,
        marginLeft: 4,
    },
    joinButton: {
        width: 44,
        height: 44,
        borderRadius: 14,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptySessions: {
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        color: Colors.textLight,
        marginTop: 12,
    }
});
