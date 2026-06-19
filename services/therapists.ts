
export interface Therapist {
  id: number;
  name: string;
  specialization: string;
  languages: string[];
  rating: number;
  feedback: { patient: string; comment: string }[];
  profileDetails: string;
}

const therapists: Therapist[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    specialization: 'Cognitive Behavioral Therapy (CBT)',
    languages: ['English', 'Spanish'],
    rating: 4.8,
    feedback: [
        { patient: 'John D.', comment: 'Very understanding and helpful.' },
        { patient: 'Jane S.', comment: 'Provided great coping strategies.' },
    ],
    profileDetails: 'Dr. Reed specializes in CBT and has over 10 years of experience helping patients with anxiety and depression.',
  },
  {
    id: 2,
    name: 'Dr. Samuel Chen',
    specialization: 'Mindfulness-Based Stress Reduction (MBSR)',
    languages: ['English', 'Mandarin'],
    rating: 4.9,
    feedback: [
        { patient: 'Alice W.', comment: 'Excellent at guiding mindfulness exercises.' },
    ],
    profileDetails: 'Dr. Chen is an expert in mindfulness techniques and helps clients manage stress and improve focus.',
  },
  {
    id: 3,
    name: 'Dr. Maria Garcia',
    specialization: 'Psychodynamic Therapy',
    languages: ['Spanish', 'Portuguese'],
    rating: 4.7,
    feedback: [
        { patient: 'Carlos R.', comment: 'Helped me understand my past.' },
    ],
    profileDetails: 'Dr. Garcia focuses on psychodynamic therapy to explore unconscious emotions and their impact on behavior.',
  },
    {
    id: 4,
    name: 'Dr. Ben Carter',
    specialization: 'Anxiety & Stress Management',
    languages: ['English'],
    rating: 4.5,
    feedback: [
        { patient: 'Emily B.', comment: 'Dr. Carter is very patient and knowledgeable.' },
    ],
    profileDetails: 'With a focus on evidence-based practices, Dr. Carter helps individuals overcome anxiety and build resilience.',
  },
];

export const getTherapists = () => {
  return therapists;
};

export const findTherapists = (language: string): Therapist[] => {
    if (!language) {
        return [];
    }
    return therapists.filter(therapist =>
        therapist.languages.map(l => l.toLowerCase()).includes(language.toLowerCase())
    );
};
