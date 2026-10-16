import { GymLocationItem } from "./gymLocationsTypes";

export const initialGymLocations: GymLocationItem[] = [
  {
    id: "loc-1",
    name: "Gold Fitness",
    ownerName: "Karan Patel",
    location: "Delhi, India",
    status: "added",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&auto=format&fit=crop&q=80",
    address: "Plot 42, Connaught Place",
    city: "Delhi",
    state: "Delhi",
    pincode: "110001",
    latitude: 28.6315,
    longitude: 77.2167,
  },
  {
    id: "loc-2",
    name: "PowerHouse Gym",
    ownerName: "Priya Sharma",
    location: "Bangalore, Karnataka",
    status: "not_added",
    imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&auto=format&fit=crop&q=80",
    address: "12, Residency Road, Ashok Nagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560025",
    latitude: 12.9716,
    longitude: 77.5946,
  },
  {
    id: "loc-3",
    name: "Iron Fitness Hub",
    ownerName: "Arjun Mehta",
    location: "Mumbai, Maharashtra",
    status: "added",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=300&auto=format&fit=crop&q=80",
    address: "88, Linking Road, Bandra West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400050",
    latitude: 19.0607,
    longitude: 72.8362,
  },
  {
    id: "loc-4",
    name: "FitZone Fitness",
    ownerName: "Neha Singh",
    location: "Pune, Maharashtra",
    status: "not_added",
    imageUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&auto=format&fit=crop&q=80",
    address: "24, FC Road, Shivajinagar",
    city: "Pune",
    state: "Maharashtra",
    pincode: "411005",
    latitude: 18.5284,
    longitude: 73.8443,
  },
  {
    id: "loc-5",
    name: "Core Strength Gym",
    ownerName: "Amit Khanna",
    location: "Chennai, Tamil Nadu",
    status: "added",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&auto=format&fit=crop&q=80",
    address: "105, Anna Salai, T. Nagar",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600017",
    latitude: 13.0418,
    longitude: 80.2341,
  },
  {
    id: "loc-6",
    name: "Muscle Arena",
    ownerName: "Rohan Verma",
    location: "Hyderabad, Telangana",
    status: "added",
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=300&auto=format&fit=crop&q=80",
    address: "36, Road No. 10, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    latitude: 17.4319,
    longitude: 78.4073,
  },
  {
    id: "loc-7",
    name: "Titan Fitness Studio",
    ownerName: "Vikram Sengupta",
    location: "Kolkata, West Bengal",
    status: "added",
    imageUrl: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?w=300&auto=format&fit=crop&q=80",
    address: "15, Park Street",
    city: "Kolkata",
    state: "West Bengal",
    pincode: "700016",
    latitude: 22.5535,
    longitude: 88.3533,
  },
  {
    id: "loc-8",
    name: "Apex Performance Club",
    ownerName: "Devang Shah",
    location: "Ahmedabad, Gujarat",
    status: "not_added",
    imageUrl: "https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=300&auto=format&fit=crop&q=80",
    address: "50, SG Highway, Bodakdev",
    city: "Ahmedabad",
    state: "Gujarat",
    pincode: "380054",
    latitude: 23.0373,
    longitude: 72.5119,
  },
  {
    id: "loc-9",
    name: "Elevate Wellness Gym",
    ownerName: "Sunita Meena",
    location: "Jaipur, Rajasthan",
    status: "added",
    imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&auto=format&fit=crop&q=80",
    address: "7, MI Road, C Scheme",
    city: "Jaipur",
    state: "Rajasthan",
    pincode: "302001",
    latitude: 26.9157,
    longitude: 75.8016,
  },
];

const STORAGE_KEY = "gk_fitness_gym_locations_v1";

let memoryGymLocations: GymLocationItem[] = [...initialGymLocations];

export function getGymLocations(): GymLocationItem[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryGymLocations = parsed;
          return parsed;
        }
      }
    } catch {
      // storage read fallback
    }
  }
  return memoryGymLocations;
}

export function getGymLocationById(id: string): GymLocationItem {
  const all = getGymLocations();
  return all.find((g) => g.id === id) || all[0] || initialGymLocations[1];
}

export function updateGymLocation(
  id: string,
  updates: Partial<GymLocationItem>
): GymLocationItem | null {
  const all = [...getGymLocations()];
  const index = all.findIndex((g) => g.id === id);
  if (index === -1) return null;

  const updatedLocationString =
    updates.city && updates.state
      ? `${updates.city}, ${updates.state}`
      : updates.location || all[index].location;

  const updatedItem: GymLocationItem = {
    ...all[index],
    ...updates,
    location: updatedLocationString,
  };

  all[index] = updatedItem;
  memoryGymLocations = [...all];

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
      window.dispatchEvent(new Event("gymLocationsUpdated"));
    } catch {
      // storage write fallback
    }
  }

  return updatedItem;
}

