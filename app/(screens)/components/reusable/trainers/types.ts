export type TrainerTab = "global" | "gym";

export type TrainerSortOption = "recent" | "rating" | "experience" | "name";

export interface TrainerItem {
  id: string;
  name: string;
  avatarUrl?: string;
  gender?: "male" | "female" | "other";
  specialization: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  status: "active" | "inactive";
  skills?: string[];
  extraSkillsCount?: number;
  sourceType?: "gym" | "direct";
  gymName?: string;
  phone?: string;
  email?: string;
}

export interface TrainerKpis {
  totalTrainers: number;
  fromGyms: number;
  addedDirectly: number;
  activeTrainers: number;
}

export interface GymTrainerKpis {
  totalTrainers: number;
  activeTrainers: number;
  specializations: number;
  newThisMonth: number;
}
