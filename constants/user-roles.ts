
export const UserRoles = {
  ADMIN: 'Admin',
  THERAPIST: 'Doctor/Therapist',
  PATIENT: 'Patient',
} as const;

export type UserRole = typeof UserRoles[keyof typeof UserRoles];

