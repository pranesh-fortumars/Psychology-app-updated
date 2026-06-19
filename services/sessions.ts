
export interface Session {
  id: number;
  patientId: number;
  therapistId: number;
  date: string;
  notes: string;
  feedback: string;
}

const sessions: Session[] = [
  {
    id: 1,
    patientId: 1,
    therapistId: 1,
    date: '2023-10-26',
    notes: 'Patient reported feeling anxious about work.',
    feedback: 'Session was helpful, but I need more coping strategies.',
  },
  {
    id: 2,
    patientId: 1,
    therapistId: 1,
    date: '2023-11-02',
    notes: 'We worked on mindfulness exercises.',
    feedback: 'The mindfulness exercises were very effective.',
  },
  {
    id: 3,
    patientId: 2,
    therapistId: 2,
    date: '2023-11-01',
    notes: 'Patient is making good progress with stress management.',
    feedback: 'Feeling much better now.',
  },
];

export const getSessionsForPatient = (patientId: number) => {
  return sessions.filter((session) => session.patientId === patientId);
};
