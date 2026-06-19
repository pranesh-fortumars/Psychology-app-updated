
// Mock services for auth, user, session, and payment management

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
}

class AuthService {
  login(email: string, password: string): Promise<User | null> {
    console.log(`Attempting to log in with ${email}`);
    // In a real app, you\'d call your backend here
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate a successful login for any non-empty email/password
        if (email && password) {
          const user: User = {
            id: email.includes("admin") ? "admin-789" : (email.includes("doctor") ? "doctor-456" : "patient-123"),
            name: email.split('@')[0].replace(/\./g, ' ').replace(/(?:\b\w)/g, l => l.toUpperCase()),
            email: email,
            role: email.includes("admin") ? "admin" : (email.includes("doctor") ? "doctor" : "patient"),
          };
          console.log("Login successful", user);
          resolve(user);
        } else {
          console.log("Login failed");
          resolve(null);
        }
      }, 500);
    });
  }
}

class UserService {
  getUsers() {
    return Promise.resolve([
      { id: "patient-123", name: "John Doe", email: "john.doe@example.com", role: "patient" },
      { id: "patient-456", name: "Jane Smith", email: "jane.smith@example.com", role: "patient" },
      { id: "doctor-789", name: "Dr. Alice Johnson", email: "alice.johnson@example.com", role: "doctor" },
      { id: "doctor-101", name: "Dr. Bob Williams", email: "bob.williams@example.com", role: "doctor" },
      { id: "admin-112", name: "Admin User", email: "admin@example.com", role: "admin" },
    ]);
  }

  deleteUser(userId: string) {
    console.log(`Deleting user ${userId}`);
    return Promise.resolve();
  }
}

class SessionService {
  getSessions(userType: 'doctor' | 'patient', userId: string) {
    console.log(`Fetching sessions for ${userType} ${userId}`);
    const allSessions = {
      scheduled: [
        { id: "1", patientName: "John Doe", therapistName: "Dr. Alice Johnson", date: "2023-11-02", time: "10:00 AM", status: "Scheduled" },
        { id: "2", patientName: "Jane Smith", therapistName: "Dr. Bob Williams", date: "2023-11-03", time: "2:00 PM", status: "Scheduled" },
        { id: "5", patientName: "John Doe", therapistName: "Dr. Bob Williams", date: "2023-11-05", time: "11:00 AM", status: "Scheduled" },
      ],
      completed: [
        { id: "3", patientName: "Peter Jones", therapistName: "Dr. Alice Johnson", date: "2023-10-25", time: "11:00 AM", status: "Completed" },
        { id: "6", patientName: "Jane Smith", therapistName: "Dr. Alice Johnson", date: "2023-10-28", time: "3:00 PM", status: "Completed" },
      ],
      canceled: [
        { id: "4", patientName: "Mary Brown", therapistName: "Dr. Bob Williams", date: "2023-10-20", time: "3:00 PM", status: "Canceled" },
      ],
    };
    if (userType === 'patient') {
      return Promise.resolve(Object.values(allSessions).flat());
    }
    return Promise.resolve(allSessions);
  }

  createSession(patientId: string, therapistId: string, sessionTime: string) {
    console.log(`Creating session for patient ${patientId} with therapist ${therapistId} at ${sessionTime}`);
    return Promise.resolve();
  }
}

class PaymentService {
  getCoinBalance(userId: string) {
    console.log(`Fetching coin balance for user ${userId}`);
    return Promise.resolve({ balance: 1250 });
  }
}

export const authService = new AuthService();
export const userService = new UserService();
export const sessionService = new SessionService();
export const paymentService = new PaymentService();
