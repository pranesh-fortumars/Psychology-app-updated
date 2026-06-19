
import { UserRoles } from '@/constants/user-roles';

// A mock user database
const users = [
  {
    id: 1,
    email: 'admin@claritymind.com',
    password: 'adminpassword',
    role: UserRoles.ADMIN,
  },
  {
    id: 2,
    email: 'therapist@claritymind.com',
    password: 'therapistpassword',
    role: UserRoles.THERAPIST,
  },
  {
    id: 3,
    email: 'patient@claritymind.com',
    password: 'patientpassword',
    role: UserRoles.PATIENT,
  },
];

export const login = (email: string, password: string) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    return { id: user.id, email: user.email, role: user.role };
  }
  return null;
};

export const register = (email: string, password: string) => {
  // For simplicity, we're allowing open registration for patients.
  // In a real application, you'd want to handle this more securely.
  const newUser = {
    id: users.length + 1,
    email,
    password,
    role: UserRoles.PATIENT,
  };
  users.push(newUser);
  return { id: newUser.id, email: newUser.email, role: newUser.role };
};

export const createTherapist = (email: string, password: string, currentUserRole: string) => {
  // This function should only be accessible to an admin.
  if (currentUserRole !== UserRoles.ADMIN) {
    // In a real application, you would want to throw an error or handle this more robustly.
    console.error("Unauthorized: Only admins can create therapists.");
    return null;
  }

  const newTherapist = {
    id: users.length + 1,
    email,
    password,
    role: UserRoles.THERAPIST,
  };
  users.push(newTherapist);
  return {
    id: newTherapist.id,
    email: newTherapist.email,
    role: newTherapist.role,
  };
};
