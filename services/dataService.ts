
import * as Notifications from 'expo-notifications';

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'doctor' | 'patient';
    coins?: number;
    languages?: string[];
    specialization?: string;
    rating?: number;
    profileDetails?: string;
    consultantCategory?: string[]; // Anxiety, OCD, etc.
    lifeStages?: string[]; // Teens, Family, etc.
    specialityTherapies?: string[]; // Traumatized, LGBTQ+, etc.
    topics?: string[]; // Patient areas of focus
}

export interface Session {
    id: string;
    patientId: string;
    therapistId: string;
    therapistName: string;
    patientName: string;
    date: Date;
    time: string;
    status: 'pending' | 'scheduled' | 'completed' | 'canceled' | 'rejected';
    notes?: string;
    feedback?: string;
    report?: string;
    suggestions?: string;
    rating?: number;
    patientTopics?: string[];
}

// Initial Mock Data
let users: User[] = [
    { id: 'admin-1', name: 'System Admin', email: 'admin@claritymind.com', role: 'admin' },
    {
        id: 'doc-1',
        name: 'Dr. Evelyn Reed',
        email: 'evelyn@claritymind.com',
        role: 'doctor',
        languages: ['English', 'Spanish'],
        specialization: 'CBT Specialist',
        rating: 4.8,
        profileDetails: 'Expert in Anxiety & Depression with 10+ years experience.',
        consultantCategory: ['Anxiety', 'Depression', 'OCD'],
        lifeStages: ['Teens', 'Family'],
        specialityTherapies: ['Traumatized']
    },
    {
        id: 'doc-2',
        name: 'Dr. Samuel Chen',
        email: 'samuel@claritymind.com',
        role: 'doctor',
        languages: ['English', 'Mandarin'],
        specialization: 'Mindfulness Expert',
        rating: 4.9,
        profileDetails: 'Guiding mindfulness and stress reduction techniques.',
        consultantCategory: ['Management', 'AD.HD'],
        lifeStages: ['Work', 'Teens'],
        specialityTherapies: ['LGBTQ+']
    },
    { id: 'pat-1', name: 'John Doe', email: 'john@example.com', role: 'patient', coins: 1500, topics: ['Stress and anxiety', 'Sleep problem'] },
];

let sessions: Session[] = [
    {
        id: 's-1',
        patientId: 'pat-1',
        therapistId: 'doc-1',
        therapistName: 'Dr. Evelyn Reed',
        patientName: 'John Doe',
        date: new Date(Date.now() + 86400000), // Tomorrow
        time: '10:00 AM',
        status: 'pending',
        patientTopics: ['Stress and anxiety', 'Sleep problem']
    },
    {
        id: 's-2',
        patientId: 'pat-1',
        therapistId: 'doc-2',
        therapistName: 'Dr. Samuel Chen',
        patientName: 'John Doe',
        date: new Date(Date.now() - (40 * 24 * 60 * 60 * 1000)), // 40 days ago - AUTO-DELETE TARGET
        time: '2:00 PM',
        status: 'completed',
        feedback: 'Very calm session.',
        rating: 5,
        patientTopics: ['Stress and anxiety', 'Sleep problem']
    },
    {
        id: 's-3',
        patientId: 'pat-1',
        therapistId: 'doc-1',
        therapistName: 'Dr. Evelyn Reed',
        patientName: 'John Doe',
        date: new Date(Date.now() - (25 * 24 * 60 * 60 * 1000)), // 25 days ago - SHOULD STAY
        time: '11:00 AM',
        status: 'completed',
        feedback: 'Helpful coping strategies.',
        rating: 4,
        patientTopics: ['Stress and anxiety', 'Sleep problem']
    }
];

class DataService {
    private autoDeleteLogs: string[] = [];

    getAutoDeleteLogs() {
        return this.autoDeleteLogs;
    }

    // --- Admin Features ---
    createDoctor(data: {
        name: string;
        email: string;
        consultantCategory?: string[];
        lifeStages?: string[];
        specialityTherapies?: string[]
    }) {
        const newDoc: User = {
            id: `doc-${Date.now()}`,
            name: data.name,
            email: data.email,
            role: 'doctor',
            languages: ['English'],
            rating: 0,
            profileDetails: '',
            consultantCategory: data.consultantCategory || [],
            lifeStages: data.lifeStages || [],
            specialityTherapies: data.specialityTherapies || []
        };
        users.push(newDoc);
        return newDoc;
    }

    // --- Doctor Features ---
    getDoctorSessions(doctorId: string) {
        this.runAutoDelete();
        return sessions.filter(s => s.therapistId === doctorId);
    }

    async updateSessionDetails(sessionId: string, details: Partial<Session>) {
        const idx = sessions.findIndex(s => s.id === sessionId);
        if (idx > -1) {
            sessions[idx] = { ...sessions[idx], ...details };
            
            if (details.status === 'scheduled') {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Appointment Accepted! 🎉",
                        body: `Dr. ${sessions[idx].therapistName} has accepted your appointment.`,
                    },
                    trigger: null,
                });
            } else if (details.status === 'rejected' || details.status === 'canceled') {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: "Appointment Update",
                        body: `Your session with Dr. ${sessions[idx].therapistName} was ${details.status}.`,
                    },
                    trigger: null,
                });
            }
        }
    }

    // --- Patient Features ---
    getPatients() {
        return users.filter(u => u.role === 'patient');
    }

    getTherapists(filters?: {
        language?: string;
        search?: string;
        consultantCategory?: string;
        lifeStage?: string;
        specialityTherapy?: string;
    }) {
        let list = users.filter(u => u.role === 'doctor');

        if (filters?.language) {
            list = list.filter(d => d.languages?.includes(filters.language!));
        }

        if (filters?.consultantCategory) {
            list = list.filter(d => d.consultantCategory?.includes(filters.consultantCategory!));
        }

        if (filters?.lifeStage) {
            list = list.filter(d => d.lifeStages?.includes(filters.lifeStage!));
        }

        if (filters?.specialityTherapy) {
            list = list.filter(d => d.specialityTherapies?.includes(filters.specialityTherapy!));
        }

        if (filters?.search) {
            const search = filters.search.toLowerCase();
            list = list.filter(d =>
                d.name.toLowerCase().includes(search) ||
                d.specialization?.toLowerCase().includes(search) ||
                d.consultantCategory?.join(' ').toLowerCase().includes(search)
            );
        }
        return list;
    }

    getPatientSessions(patientId: string) {
        this.runAutoDelete();
        return sessions.filter(s => s.patientId === patientId);
    }

    getUpcomingSessionsCount(userId: string, role: string) {
        const now = new Date();
        const userSessions = role === 'doctor'
            ? sessions.filter(s => s.therapistId === userId)
            : sessions.filter(s => s.patientId === userId);

        return userSessions.filter(s => s.status === 'scheduled' && s.date > now).length;
    }

    bookSession(patientId: string, therapistId: string, date: Date, time: string) {
        const therapist = users.find(u => u.id === therapistId);
        const patient = users.find(u => u.id === patientId);
        if (!therapist || !patient) return null;

        if ((patient.coins || 0) < 500) throw new Error('Insufficient coins');

        patient.coins = (patient.coins || 0) - 500;

        const newSession: Session = {
            id: `s-${Date.now()}`,
            patientId,
            therapistId,
            therapistName: therapist.name,
            patientName: patient.name,
            patientTopics: patient.topics || [],
            date,
            time,
            status: 'pending'
        };
        sessions.push(newSession);
        return newSession;
    }

    cancelSession(sessionId: string) {
        const idx = sessions.findIndex(s => s.id === sessionId);
        if (idx > -1) {
            sessions[idx].status = 'canceled';
        }
    }

    rechargeCoins(patientId: string, amount: number) {
        const patient = users.find(u => u.id === patientId);
        if (patient) {
            patient.coins = (patient.coins || 0) + amount;
            return patient.coins;
        }
        return 0;
    }

    // --- CRITICAL: DM-402 Auto-Delete Feature ---
    private runAutoDelete() {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const initialCount = sessions.length;
        sessions = sessions.filter(s => s.date >= thirtyDaysAgo);

        if (sessions.length < initialCount) {
            const count = initialCount - sessions.length;
            const logMsg = `[${new Date().toLocaleString()}] CRON: Permanently removed ${count} sessions older than 30 days.`;
            console.log(logMsg);
            this.autoDeleteLogs.push(logMsg);
        }
    }

    getSystemAnalytics() {
        const patients = users.filter(u => u.role === 'patient').length;
        const doctors = users.filter(u => u.role === 'doctor').length;
        const completed = sessions.filter(s => s.status === 'completed').length;
        const canceled = sessions.filter(s => s.status === 'canceled').length;
        // Mock revenue: 1500 per completed session
        const revenue = completed * 1500;
        
        return {
            users: { total: users.length, patients, doctors },
            sessions: { total: sessions.length, completed, canceled },
            revenue: { total: `₹${(revenue/1000)}K`, lastMonth: `₹${(revenue * 0.4 / 1000).toFixed(1)}K`, lastWeek: `₹${(revenue * 0.1 / 1000).toFixed(1)}K` }
        };
    }

    // Help for auth (mimic login)
    async login(email: string) {
        const user = users.find(u => u.email === email);
        return user || null;
    }

    async signup(name: string, email: string, password: string, role: 'patient' | 'doctor' | 'admin', topics?: string[]) {
        const exists = users.find(u => u.email === email);
        if (exists) return false;

        const newUser: User = {
            id: `${role}-${Date.now()}`,
            name,
            email,
            role,
            topics: topics || [],
            coins: role === 'patient' ? 500 : undefined, // Start with some free coins
            languages: role === 'doctor' ? ['English'] : undefined,
            rating: role === 'doctor' ? 0 : undefined,
        };
        users.push(newUser);
        return true;
    }
}

export const dataService = new DataService();
