import { GymPassItem } from "./GymPassTypes";

export const defaultPasses: GymPassItem[] = [
  {
    id: "day-pass",
    name: "Day Pass",
    type: "day",
    price: 799,
    soldCount: 845,
    activeCount: 520,
    revenueText: "₹ 6.7L",
    status: "active",
    color: "emerald",
    durationDays: 1,
    maxVisits: "1 Visit",
    access: "Registered Gyms",
    activationRule: "On First Use",
  },
  {
    id: "monthly-pass",
    name: "Monthly Pass",
    type: "monthly",
    price: 4999,
    soldCount: 1470,
    activeCount: 860,
    revenueText: "₹ 73.4L",
    status: "active",
    color: "purple",
    durationDays: 30,
    maxVisits: "1 Visit",
    access: "Registered Gyms",
    activationRule: "On First Use",
  },
];

const STORAGE_KEY = "gk_fitness_gym_passes_v2";

export function getStoredGymPasses(): GymPassItem[] {
  if (typeof window === "undefined") return defaultPasses;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPasses));
      return defaultPasses;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultPasses;
  } catch {
    return defaultPasses;
  }
}

export function getGymPassById(id: string): GymPassItem | undefined {
  const passes = getStoredGymPasses();
  return passes.find((p) => p.id === id);
}

export function saveGymPass(newPass: Omit<GymPassItem, "id" | "soldCount">): GymPassItem {
  const passes = getStoredGymPasses();
  const created: GymPassItem = {
    ...newPass,
    id: `pass-${Date.now()}`,
    soldCount: 0,
    activeCount: 0,
    revenueText: "₹ 0",
  };
  const updated = [...passes, created];
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return created;
}

export function updateGymPass(id: string, updates: Partial<GymPassItem>): GymPassItem[] {
  const passes = getStoredGymPasses();
  const updated = passes.map((p) => (p.id === id ? { ...p, ...updates } : p));
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function removeGymPass(id: string): GymPassItem[] {
  const passes = getStoredGymPasses();
  const updated = passes.filter((p) => p.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
  return updated;
}
