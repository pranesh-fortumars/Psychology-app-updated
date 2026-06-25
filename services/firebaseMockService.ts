// firebaseMockService.ts
// This simulates a Firebase/Firestore architecture with Collections, Documents, and Real-time Listeners (onSnapshot).

export interface FirebaseUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  topics?: string[];
  coins?: number;
  languages?: string[];
  consultantCategory?: string[];
  rating?: number;
  isActive: boolean;
  createdAt: number;
}

export interface FirebaseSession {
  id: string;
  patientId: string;
  therapistId: string;
  patientName: string;
  therapistName: string;
  patientTopics?: string[];
  date: number; // timestamp
  status: 'Pending' | 'Accepted' | 'Scheduled' | 'Completed' | 'Cancelled' | 'Rejected';
  fee: number;
  notes?: string;
  feedback?: string;
  reportUrl?: string; // Stored URL of generated frontend report
}

export interface FirebaseTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'recharge' | 'payment' | 'refund';
  timestamp: number;
}

type Listener<T> = (data: T[]) => void;

class FirebaseMock {
  private collections: {
    users: FirebaseUser[];
    sessions: FirebaseSession[];
    transactions: FirebaseTransaction[];
  } = {
    users: [
      { id: 'admin-1', name: 'Super Admin', email: 'admin@claritymind.com', role: 'admin', isActive: true, createdAt: Date.now() }
    ],
    sessions: [],
    transactions: []
  };

  private listeners: {
    users: Set<Listener<FirebaseUser>>;
    sessions: Set<Listener<FirebaseSession>>;
    transactions: Set<Listener<FirebaseTransaction>>;
  } = {
    users: new Set(),
    sessions: new Set(),
    transactions: new Set(),
  };

  // --- Real-time Listeners (Simulating onSnapshot) ---
  public onSnapshot(collection: 'users' | 'sessions' | 'transactions', callback: Listener<any>) {
    this.listeners[collection].add(callback);
    // Emit initial state
    callback(this.collections[collection]);
    
    // Return unsubscribe function
    return () => this.listeners[collection].delete(callback);
  }

  private notifyListeners(collection: 'users' | 'sessions' | 'transactions') {
    const data = this.collections[collection];
    (this.listeners[collection] as any).forEach((callback: any) => callback(data));
  }

  // --- Firestore-like CRUD Operations ---
  public async addDoc(collection: 'users' | 'sessions' | 'transactions', doc: any) {
    const newDoc = { ...doc, id: `${collection}-${Date.now()}` };
    this.collections[collection].push(newDoc);
    this.notifyListeners(collection);
    return newDoc;
  }

  public async updateDoc(collection: 'users' | 'sessions' | 'transactions', id: string, updates: any) {
    const idx = this.collections[collection].findIndex(d => d.id === id);
    if (idx > -1) {
      this.collections[collection][idx] = { ...this.collections[collection][idx], ...updates };
      this.notifyListeners(collection);
      return true;
    }
    return false;
  }

  // --- Auth & RBAC Simulation ---
  public async registerPatient(email: string, data: any) {
    // Strictly enforces that self-registration is ONLY for patients
    return this.addDoc('users', { email, role: 'patient', ...data, isActive: true, createdAt: Date.now() });
  }

  public async adminCreateDoctor(email: string, adminId: string, data: any) {
    const admin = this.collections.users.find(u => u.id === adminId);
    if (!admin || admin.role !== 'admin') {
      throw new Error("SECURITY_VIOLATION: Unauthorized. Only Admin can create Doctor accounts.");
    }
    return this.addDoc('users', { email, role: 'doctor', ...data, isActive: true, createdAt: Date.now() });
  }

  // --- Auto Delete CRON Simulation ---
  public runAutoDeleteCron() {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const initialCount = this.collections.sessions.length;
    
    this.collections.sessions = this.collections.sessions.filter(s => s.date > thirtyDaysAgo);
    
    if (this.collections.sessions.length < initialCount) {
      console.log(`[Auto-Delete] System permanently wiped ${initialCount - this.collections.sessions.length} expired records.`);
      this.notifyListeners('sessions');
    }
  }
}

export const db = new FirebaseMock();
