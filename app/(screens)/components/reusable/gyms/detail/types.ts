export interface MemberItem {
  id: string;
  name: string;
  role: "customer" | "trainer" | "owner";
  membershipTier?: "Gold" | "Platinum" | "Elite";
  phone: string;
  attendancePct: number;
  lastCheckedIn: string;
  status: "active" | "inactive";
  avatarSrc?: string;
  gender?: "male" | "female";
}

export type DetailTab = "customers" | "trainers" | "owners";
export type DetailStatus = "all" | "active" | "inactive";

export const INITIAL_CUSTOMERS: MemberItem[] = [
  {
    id: "cust-1",
    name: "Arjun Mehta",
    role: "customer",
    membershipTier: "Gold",
    phone: "+91 98765 43210",
    attendancePct: 88,
    lastCheckedIn: "Today, 7:15 AM",
    status: "active",
    gender: "male",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80",
  },
  {
    id: "cust-2",
    name: "Sneha Kapoor",
    role: "customer",
    membershipTier: "Platinum",
    phone: "+91 91234 56789",
    attendancePct: 94,
    lastCheckedIn: "Yesterday",
    status: "active",
    gender: "female",
    avatarSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80",
  },
  {
    id: "cust-3",
    name: "Vikram Singh",
    role: "customer",
    membershipTier: "Elite",
    phone: "+91 99887 66554",
    attendancePct: 79,
    lastCheckedIn: "2 days ago",
    status: "active",
    gender: "male",
    avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80",
  },
  {
    id: "cust-4",
    name: "Pooja Nair",
    role: "customer",
    membershipTier: "Gold",
    phone: "+91 90909 11223",
    attendancePct: 12,
    lastCheckedIn: "24 days ago",
    status: "inactive",
    gender: "female",
    avatarSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&q=80",
  },
  {
    id: "cust-5",
    name: "Rohit Verma",
    role: "customer",
    membershipTier: "Platinum",
    phone: "+91 93456 77881",
    attendancePct: 0,
    lastCheckedIn: "45 days ago",
    status: "inactive",
    gender: "male",
    avatarSrc: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&q=80",
  },
  {
    id: "cust-6",
    name: "Ananya Reddy",
    role: "customer",
    membershipTier: "Gold",
    phone: "+91 87985 44321",
    attendancePct: 91,
    lastCheckedIn: "Today, 9:30 AM",
    status: "active",
    gender: "female",
    avatarSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&q=80",
  },
];

export function getFullCustomersList(): MemberItem[] {
  const list: MemberItem[] = [...INITIAL_CUSTOMERS];
  const names = ["Karan Sharma", "Deepika Roy", "Nikhil Joshi", "Riya Sen", "Amit Patel", "Simran Kaur", "Harsh Vardhan", "Meera Pillai"];
  const tiers: ("Gold" | "Platinum" | "Elite")[] = ["Gold", "Platinum", "Elite", "Gold", "Gold", "Platinum"];
  for (let i = INITIAL_CUSTOMERS.length; i < 324; i++) {
    const isAct = i < 286;
    list.push({
      id: `cust-${i + 1}`,
      name: `${names[i % names.length]} #${i + 1}`,
      role: "customer",
      membershipTier: tiers[i % tiers.length],
      phone: `+91 98${Math.floor(1000 + (i * 27) % 9000)} ${Math.floor(10000 + (i * 137) % 90000)}`,
      attendancePct: isAct ? 75 + (i % 25) : (i % 15),
      lastCheckedIn: isAct ? (i % 2 === 0 ? "Today, 8:00 AM" : "Yesterday") : `${15 + (i % 30)} days ago`,
      status: isAct ? "active" : "inactive",
      gender: i % 2 === 0 ? "male" : "female",
    });
  }
  return list;
}

export function getTrainersList(): MemberItem[] {
  const list: MemberItem[] = [];
  const trainerNames = ["Farhan Akhtar", "Sunita Rao", "Devraj Patil", "Kavita Das", "Aditya Rawat", "Monika Gill"];
  for (let i = 0; i < 18; i++) {
    const isAct = i < 16;
    list.push({
      id: `trainer-${i + 1}`,
      name: `${trainerNames[i % trainerNames.length]} (Trainer ${i + 1})`,
      role: "trainer",
      phone: `+91 97${Math.floor(2000 + i * 40)} ${Math.floor(30000 + i * 200)}`,
      attendancePct: isAct ? 95 : 10,
      lastCheckedIn: isAct ? "Today, 6:30 AM" : "12 days ago",
      status: isAct ? "active" : "inactive",
      gender: i % 2 === 0 ? "male" : "female",
    });
  }
  return list;
}

export const INITIAL_OWNERS: MemberItem[] = [
  {
    id: "owner-1",
    name: "Suresh Reddy",
    role: "owner",
    phone: "+91 99880 11223",
    attendancePct: 100,
    lastCheckedIn: "Active Manager",
    status: "active",
    gender: "male",
    avatarSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&q=80",
  },
  {
    id: "owner-2",
    name: "Radhika Reddy",
    role: "owner",
    phone: "+91 99880 11224",
    attendancePct: 100,
    lastCheckedIn: "Managing Director",
    status: "active",
    gender: "female",
    avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&q=80",
  },
];
