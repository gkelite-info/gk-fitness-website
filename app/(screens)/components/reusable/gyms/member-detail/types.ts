import { MOCK_GYM_TRAINERS } from "../../trainers/mockData";
import { generateMockUsers } from "../../superadmin-users/mockData";

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
  gymLocation?: string;
  highlightLabel: string;
  highlightValue: string;
  renewalOrCert: string;
  assignedPersonOrBatches: string;
  specialization?: string;
  addedBy?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  accountCreatedOn?: string;
}

export function getMemberProfile(
  role: string,
  memberId: string
): MemberProfileDetails {
  const isTrainer = role.includes("trainer");
  const isOwner = role.includes("owner");

  if (isOwner) {
    const mockUser = generateMockUsers().find((u) => u.id === memberId);
    if (mockUser) {
      return {
        id: memberId,
        codeId: mockUser.code || "OWN-000124",
        name: mockUser.name,
        role: "owner",
        status: (mockUser.status.toLowerCase() as "active" | "inactive") || "active",
        gender: "male",
        dateOfBirth: mockUser.dob || "24 Mar 1990",
        phone: mockUser.mobileNumber || "+91 98765 43210",
        email: mockUser.email || `${mockUser.name.toLowerCase().replace(/\s+/g, ".")}@gym.com`,
        address: mockUser.address || "Flat 12B, Sunrise Towers, Banjara Hills, Hyderabad - 500034",
        joinedDate: mockUser.joinedDate || "12 Jan 2024",
        currentGym: mockUser.gymName || "Gold Fitness",
        gymLocation: mockUser.location || "Hyderabad, India",
        highlightLabel: "Ownership Role",
        highlightValue: "Managing Director",
        renewalOrCert: "Equity Stake: 100%",
        assignedPersonOrBatches: "Head of Operations",
        accountCreatedOn: mockUser.joinedDate || "12 Jan 2024",
        avatarSrc: mockUser.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      };
    }

    return {
      id: memberId,
      codeId: "OWN-000124",
      name: "Rahul Sharma",
      role: "owner",
      status: "active",
      gender: "male",
      dateOfBirth: "24 Mar 1990",
      phone: "+91 98765 43210",
      email: "rahul.sharma@goldfitness.com",
      address: "Flat 12B, Sunrise Towers, Banjara Hills, Hyderabad - 500034",
      joinedDate: "12 Jan 2024",
      currentGym: "Gold Fitness",
      gymLocation: "Hyderabad, India",
      highlightLabel: "Ownership Role",
      highlightValue: "Managing Director",
      renewalOrCert: "Equity Stake: 100%",
      assignedPersonOrBatches: "Head of Operations",
      accountCreatedOn: "12 Jan 2024",
      avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    };
  }

  if (isTrainer) {
    const mockUser = generateMockUsers().find((u) => u.id === memberId);
    const gymTrainer = MOCK_GYM_TRAINERS.find((t) => t.id === memberId);
    if (mockUser || gymTrainer) {
      const name = mockUser?.name || gymTrainer?.name || "Trainer";
      return {
        id: memberId,
        codeId: mockUser?.code || `TRN-${memberId.replace("gym-tr-", "000")}`,
        name,
        role: "trainer",
        status: (mockUser?.status.toLowerCase() as "active" | "inactive") || (gymTrainer?.status as "active" | "inactive") || "active",
        gender: (gymTrainer?.gender as "male" | "female") || "male",
        dateOfBirth: mockUser?.dob || "28 Mar 1992",
        phone: mockUser?.mobileNumber || gymTrainer?.phone || "+91 98765 43210",
        email: mockUser?.email || gymTrainer?.email || `${name.toLowerCase().replace(/\s+/g, ".")}@gym.com`,
        address: mockUser?.address || "Flat 302, Green Valley Apt, Kondapur, Hyderabad - 500084",
        joinedDate: mockUser?.joinedDate || "12 Jan 2024",
        currentGym: mockUser?.gymName || gymTrainer?.gymName || "Power Fitness",
        gymLocation: mockUser?.location || "Hyderabad, India",
        highlightLabel: "Specialization",
        highlightValue: gymTrainer?.specialization || "Strength & Conditioning",
        specialization: gymTrainer?.specialization || "Strength & Conditioning",
        addedBy: mockUser?.gymName || gymTrainer?.gymName || "Power Fitness",
        renewalOrCert: "ACE Master Trainer",
        assignedPersonOrBatches: `${gymTrainer?.reviewCount || 18} Active Trainees`,
        emergencyContact: "Emergency Contact",
        emergencyPhone: "+91 91234 56789",
        avatarSrc: mockUser?.avatarUrl || gymTrainer?.avatarUrl,
      };
    }

    return {
      id: memberId,
      codeId: "TRN-000124",
      name: "Rahul Verma",
      role: "trainer",
      status: "active",
      gender: "male",
      dateOfBirth: "28 Mar 1992",
      phone: "+91 98765 43210",
      email: "rahul.verma@gym.com",
      address: "Flat 302, Green Valley Apt, Kondapur, Hyderabad - 500084",
      joinedDate: "12 Jan 2024",
      currentGym: "Gold Fitness",
      gymLocation: "Hyderabad, India",
      highlightLabel: "Specialization",
      highlightValue: "Strength & Conditioning",
      specialization: "Strength & Conditioning",
      addedBy: "Gold Fitness",
      renewalOrCert: "ACE Master Trainer",
      assignedPersonOrBatches: "18 Active Trainees",
      emergencyContact: "Ramesh Verma (Father)",
      emergencyPhone: "+91 91234 56789",
      avatarSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    };
  }

  const mockUser = generateMockUsers().find((u) => u.id === memberId);
  if (mockUser) {
    const isFemale =
      mockUser.gender === "Female" ||
      mockUser.id.charCodeAt(mockUser.id.length - 1) % 2 === 0;
    return {
      id: memberId,
      codeId: mockUser.code || "CUS-00124",
      name: mockUser.name,
      role: "customer",
      status: (mockUser.status.toLowerCase() as "active" | "inactive") || "active",
      gender: isFemale ? "female" : "male",
      dateOfBirth: mockUser.dob || "24 Mar 1995",
      phone: mockUser.mobileNumber || "+91 98765 43210",
      email:
        mockUser.email ||
        `${mockUser.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      address:
        mockUser.address ||
        "Flat 12B, Sunrise Towers, Hyderabad, Telangana - 500081",
      joinedDate: mockUser.joinedDate || "12 Jan 2024",
      currentGym: mockUser.gymName || "Gold Fitness",
      gymLocation: mockUser.location || "Hyderabad, India",
      highlightLabel: "Membership Plan",
      highlightValue: mockUser.subscriptionPlan || "Annual Pro Elite",
      renewalOrCert: mockUser.renewalDate || "11 Jan 2025",
      assignedPersonOrBatches: "Vikram Rao",
      accountCreatedOn: mockUser.joinedDate || "12 Jan 2024",
      avatarSrc:
        mockUser.avatarUrl ||
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
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
    gymLocation: "Hyderabad, India",
    highlightLabel: "Membership Plan",
    highlightValue: "Annual Pro Elite",
    renewalOrCert: "11 Jan 2025",
    assignedPersonOrBatches: "Vikram Rao",
    accountCreatedOn: "12 Jan 2024",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  };
}
