export interface GymItem {
  id: string;
  name: string;
  city: string;
  area: string;
  since: string;
  status: "active" | "inactive";
  imageUrl: string;
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  phone?: string;
  email?: string;
}

export type GymFilterTab = "all" | "active" | "inactive";
export type GymSortOption = "recent" | "name" | "members";
export type ViewMode = "grid" | "list";

export const INITIAL_GYMS: GymItem[] = [
  {
    id: "gym-1",
    name: "Gold Fitness",
    city: "Hyderabad, India",
    area: "Jubilee Hills",
    since: "Since Jan 2024",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80",
    totalMembers: 324,
    activeMembers: 286,
    inactiveMembers: 38,
    phone: "+91 98765 43210",
    email: "jubilee@goldfitness.in",
  },
  {
    id: "gym-2",
    name: "Gold Fitness",
    city: "Hyderabad, India",
    area: "Banjara Hills",
    since: "Since Jan 2024",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&q=80",
    totalMembers: 324,
    activeMembers: 286,
    inactiveMembers: 38,
    phone: "+91 98765 43211",
    email: "banjara@goldfitness.in",
  },
  {
    id: "gym-3",
    name: "Gold Fitness",
    city: "Hyderabad, India",
    area: "Hitec City",
    since: "Since Jan 2024",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&q=80",
    totalMembers: 324,
    activeMembers: 286,
    inactiveMembers: 38,
    phone: "+91 98765 43212",
    email: "hiteccity@goldfitness.in",
  },
  {
    id: "gym-4",
    name: "Gold Fitness",
    city: "Hyderabad, India",
    area: "Gachibowli",
    since: "Since Jan 2024",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&q=80",
    totalMembers: 324,
    activeMembers: 286,
    inactiveMembers: 38,
    phone: "+91 98765 43213",
    email: "gachibowli@goldfitness.in",
  },
  {
    id: "gym-5",
    name: "Gold Fitness",
    city: "Hyderabad, India",
    area: "Madhapur",
    since: "Since Jan 2024",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80",
    totalMembers: 324,
    activeMembers: 286,
    inactiveMembers: 38,
    phone: "+91 98765 43214",
    email: "madhapur@goldfitness.in",
  },
  {
    id: "gym-6",
    name: "Gold Fitness",
    city: "Hyderabad, India",
    area: "Kondapur",
    since: "Since Jan 2024",
    status: "active",
    imageUrl: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&q=80",
    totalMembers: 324,
    activeMembers: 286,
    inactiveMembers: 38,
    phone: "+91 98765 43215",
    email: "kondapur@goldfitness.in",
  },
];

export function getInitialGyms(): GymItem[] {
  const list: GymItem[] = [...INITIAL_GYMS];
  const areas = ["Kukatpally", "Secunderabad", "Begumpet", "Manikonda", "Tolichowki", "Dilsukhnagar", "Somajiguda", "Madhapur Phase 2"];
  for (let i = INITIAL_GYMS.length; i < 120; i++) {
    const isAct = i < 98;
    list.push({
      id: `gym-${i + 1}`,
      name: "Gold Fitness",
      city: "Hyderabad, India",
      area: `${areas[i % areas.length]} #${Math.floor(i / areas.length) + 1}`,
      since: "Since Jan 2024",
      status: isAct ? "active" : "inactive",
      imageUrl: INITIAL_GYMS[i % INITIAL_GYMS.length].imageUrl,
      totalMembers: 324,
      activeMembers: isAct ? 286 : 0,
      inactiveMembers: isAct ? 38 : 324,
    });
  }
  return list;
}
