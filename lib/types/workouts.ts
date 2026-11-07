export interface WorkoutVideoItem {
  workoutVideoId: string;
  workoutId: string;
  videoUrl: string;
  exerciseName?: string | null;
  equipment?: string[] | null;
  primaryMuscle?: string | null;
  secondaryMuscles?: string[] | null;
  difficulty?: 'beginner' | 'intermediate' | 'advanced' | string | null;
  defaultSets?: number | null;
  defaultReps?: string | null;
  is_deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  workouts?: {
    workoutId: string;
    workoutType: string;
    role?: 'male' | 'female' | string;
    isStretching?: boolean | null;
  } | null;
}

export interface CreateWorkoutVideoInput {
  workoutVideoId?: string;
  exerciseName: string;
  workoutType: string;
  role: 'male' | 'female';
  videoUrl: string;
  equipment: string[];
  primaryMuscle: string;
  secondaryMuscles: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  defaultSets: number;
  defaultReps: string;
  isStretching?: boolean;
}

export interface WorkoutVideoStats {
  total: number;
  male: number;
  female: number;
  chestUpper: number;
  backArms: number;
  legsCore: number;
}

export const WORKOUT_CATEGORIES = [
  { label: 'Chest', value: 'chest', primaryMuscle: 'CHEST' },
  { label: 'Back', value: 'back', primaryMuscle: 'BACK' },
  { label: 'Shoulders', value: 'shoulder', primaryMuscle: 'SHOULDERS' },
  { label: 'Biceps', value: 'biceps', primaryMuscle: 'BICEPS' },
  { label: 'Triceps', value: 'tricep', primaryMuscle: 'TRICEPS' },
  { label: 'Forearms', value: 'forearms', primaryMuscle: 'FOREARMS' },
  { label: 'Abs / Core', value: 'abs', primaryMuscle: 'ABS' },
  { label: 'Legs / Quads', value: 'legs', primaryMuscle: 'QUADS' },
  { label: 'Glutes / Hips', value: 'hips', primaryMuscle: 'GLUTES' },
  { label: 'Calves', value: 'calves', primaryMuscle: 'CALVES' },
  { label: 'Trapezius', value: 'trapezius', primaryMuscle: 'TRAPS' },
  { label: 'Cardio', value: 'cardio', primaryMuscle: 'CARDIO' },
];

export const EQUIPMENT_OPTIONS = [
  { id: 'BODY_ONLY', label: 'Bodyweight / None' },
  { id: 'DUMBBELL', label: 'Dumbbell' },
  { id: 'BARBELL', label: 'Barbell' },
  { id: 'CABLE', label: 'Cable Machine' },
  { id: 'MACHINE', label: 'Gym Machine' },
  { id: 'BENCH', label: 'Bench' },
  { id: 'PULLUP_BAR', label: 'Pull-up Bar' },
  { id: 'KETTLEBELLS', label: 'Kettlebell' },
  { id: 'BANDS', label: 'Resistance Band' },
  { id: 'WEIGHT_PLATE', label: 'Weight Plate' },
];

export const MUSCLE_OPTIONS = [
  { id: 'CHEST', label: 'Chest' },
  { id: 'BACK', label: 'Back' },
  { id: 'SHOULDERS', label: 'Shoulders' },
  { id: 'BICEPS', label: 'Biceps' },
  { id: 'TRICEPS', label: 'Triceps' },
  { id: 'FOREARMS', label: 'Forearms' },
  { id: 'ABS', label: 'Abs / Core' },
  { id: 'QUADS', label: 'Quads' },
  { id: 'HAMSTRINGS', label: 'Hamstrings' },
  { id: 'GLUTES', label: 'Glutes' },
  { id: 'CALVES', label: 'Calves' },
  { id: 'TRAPS', label: 'Traps' },
  { id: 'CARDIO', label: 'Cardio' },
  { id: 'FULL_BODY', label: 'Full Body' },
];

export const DIFFICULTY_OPTIONS = [
  {
    id: 'beginner',
    label: 'Beginner',
    color: '#34D399',
    bg: 'rgba(52, 211, 153, 0.1)',
    border: 'rgba(52, 211, 153, 0.25)',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    color: '#FBBF24',
    bg: 'rgba(251, 191, 36, 0.1)',
    border: 'rgba(251, 191, 36, 0.25)',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    color: '#FB7185',
    bg: 'rgba(251, 113, 133, 0.1)',
    border: 'rgba(251, 113, 133, 0.25)',
  },
];

export const GENDER_ROLES = [
  { id: 'all', label: 'All Genders' },
  { id: 'male', label: 'Male' },
  { id: 'female', label: 'Female' },
];
