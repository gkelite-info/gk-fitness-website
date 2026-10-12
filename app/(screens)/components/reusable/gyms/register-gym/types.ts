export interface GymFormData {
  gymName: string;
  gymEmail: string;
  phoneCode: string;
  phoneNumber: string;
  altPhoneCode: string;
  altPhoneNumber: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhoneCode: string;
  ownerPhone: string;
  ownerAltPhoneCode: string;
  ownerAltPhoneNumber: string;
  branches: string;
  establishedYear: string;
  notes: string;
  logoUrl?: string;
  qrCodeGenerated: boolean;
}

export const INITIAL_GYM_FORM: GymFormData = {
  gymName: "",
  gymEmail: "",
  phoneCode: "+91",
  phoneNumber: "",
  altPhoneCode: "+91",
  altPhoneNumber: "",
  address: "",
  city: "Hyderabad",
  state: "Telangana",
  pinCode: "",
  ownerName: "",
  ownerEmail: "",
  ownerPhoneCode: "+91",
  ownerPhone: "",
  ownerAltPhoneCode: "+91",
  ownerAltPhoneNumber: "",
  branches: "",
  establishedYear: "",
  notes: "",
  logoUrl: undefined,
  qrCodeGenerated: true,
};

export const INDIAN_STATES = [
  "Telangana",
  "Andhra Pradesh",
  "Karnataka",
  "Maharashtra",
  "Tamil Nadu",
  "Delhi",
  "Kerala",
  "Gujarat",
  "Madhya Pradesh",
  "West Bengal",
];

export const COUNTRY_CODES = [
  { code: "+91", label: "IND (+91)" },
  { code: "+1", label: "USA (+1)" },
  { code: "+44", label: "UK (+44)" },
  { code: "+971", label: "UAE (+971)" },
  { code: "+65", label: "SGP (+65)" },
];

export function getMockGymEditData(gymId: string): GymFormData {
  const gymProfiles: Record<string, { name: string; logo: string; year: string; phone: string }> = {
    "gym-1": { name: "Gold Fitness - Jubilee Hills", logo: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&q=80", year: "2021", phone: "9876543210" },
    "gym-2": { name: "Gold Fitness - Banjara Hills", logo: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=300&q=80", year: "2020", phone: "9876543211" },
    "gym-3": { name: "Gold Fitness - Hitec City", logo: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=300&q=80", year: "2022", phone: "9876543212" },
    "gym-4": { name: "Gold Fitness - Gachibowli", logo: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=300&q=80", year: "2019", phone: "9876543213" },
    "gym-5": { name: "Gold Fitness - Madhapur", logo: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=300&q=80", year: "2023", phone: "9876543214" },
    "gym-6": { name: "Gold Fitness - Kondapur", logo: "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=300&q=80", year: "2024", phone: "9876543215" },
  };
  const p = gymProfiles[gymId] || gymProfiles["gym-1"];

  return {
    gymName: p.name,
    gymEmail: "info@goldfitness.in",
    phoneCode: "+91",
    phoneNumber: p.phone,
    altPhoneCode: "+91",
    altPhoneNumber: "9876543219",
    address: "Plot No. 45, Hitech City Road, Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pinCode: "500081",
    ownerName: "Vikram Singhania",
    ownerEmail: "vikram.s@goldfitness.in",
    ownerPhoneCode: "+91",
    ownerPhone: p.phone,
    ownerAltPhoneCode: "+91",
    ownerAltPhoneNumber: "",
    branches: "6",
    establishedYear: p.year,
    notes: "Flagship center equipped with state of the art crossfit and recovery steam rooms.",
    logoUrl: p.logo,
    qrCodeGenerated: true,
  };
}
