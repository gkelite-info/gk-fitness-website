export type GymLocationStatus = "added" | "not_added";

export interface GymLocationItem {
  id: string;
  name: string;
  ownerName: string;
  location: string;
  status: GymLocationStatus;
  imageUrl: string;
  logoBg?: string;
  logoTextColor?: string;
  logoText?: {
    primary: string;
    secondary?: string;
    tertiary?: string;
  };
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  latitude?: number;
  longitude?: number;
}

export interface GymLocationsKpiStats {
  totalGyms: number;
  locationsAdded: number;
  locationsPending: number;
}
