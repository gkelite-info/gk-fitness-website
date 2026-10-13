export interface MemberProfileDetails {
  id: string;
  codeId: string;
  name: string;
  role: "customer" | "trainer" | "owner";
  status: "active" | "inactive";
  avatarSrc?: string;
  gender: "male" | "female";
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  joinedDate: string;
  currentGym: string;
  highlightLabel: string;
  highlightValue: string;
  renewalOrCert: string;
  assignedPersonOrBatches: string;
}

export function getMemberProfile(
  role: string,
  memberId: string
): MemberProfileDetails {
  const isTrainer = role.includes("trainer");
  const isOwner = role.includes("owner");

  if (isOwner) {
    return {
      id: memberId,
      codeId: "OWN-00002",
      name: "Radhika Reddy",
      role: "owner",
      status: "active",
      gender: "female",
      dateOfBirth: "14 Jul 1988",
      phone: "+91 99880 11224",
      email: "radhika.reddy@goldfitness.in",
      address: "Villa 45, Jubilee Greens, Road No. 36, Hyderabad - 500033",
      joinedDate: "05 Jan 2024",
      currentGym: "Gold Fitness - Jubilee Hills",
      highlightLabel: "Ownership Role",
      highlightValue: "Managing Director (Partner)",
      renewalOrCert: "Partnership Stake: 35%",
      assignedPersonOrBatches: "Direct Operations Manager",
      avatarSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    };
  }

  if (isTrainer) {
    return {
      id: memberId,
      codeId: "TRN-00018",
      name: "Farhan Akhtar",
      role: "trainer",
      status: "active",
      gender: "male",
      dateOfBirth: "18 Aug 1992",
      phone: "+91 97200 30000",
      email: "farhan.akhtar@goldfitness.in",
      address: "Plot 89, Hitec City Phase 2, Madhapur, Hyderabad - 500081",
      joinedDate: "10 Jan 2024",
      currentGym: "Gold Fitness - Hitec City",
      highlightLabel: "Specialization",
      highlightValue: "Certified Strength & Crossfit Lead",
      renewalOrCert: "Certification: ACE & ISSA Master Trainer",
      assignedPersonOrBatches: "18 Active Trainees (Morning & Evening)",
      avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    };
  }

  return {
    id: memberId,
    codeId: "CUS-00124",
    name: "Arjun Mehta",
    role: "customer",
    status: "active",
    gender: "male",
    dateOfBirth: "24 Mar 1995",
    phone: "+91 98765 43210",
    email: "arjunmehta@gmail.com",
    address: "Flat 12B, Sunrise Towers, Hyderabad, Telangana - 500081",
    joinedDate: "12 Jan 2024",
    currentGym: "Gold Fitness",
    highlightLabel: "Membership Plan",
    highlightValue: "Annual Pro Elite",
    renewalOrCert: "11 Jan 2025",
    assignedPersonOrBatches: "Vikram Rao",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  };
}
