export interface PersonalDetailsData {
  id: string;
  memberCode: string;
  name: string;
  status: "Active" | "Inactive";
  avatarUrl?: string;
  assignedTrainer: string;
  primaryGoal: string;
  personalInfo: {
    fullName: string;
    gender: string;
    dateOfBirth: string;
    age: string;
    email: string;
    phone: string;
  };
  address: {
    fullAddress: string;
    city: string;
    state: string;
    pincode: string;
  };
  healthInfo: {
    height: string;
    weight: string;
  };
  emergencyContact: {
    contactName: string;
    relationship: string;
    phone: string;
  };
  additionalInfo: {
    fitnessGoal: string;
  };
}
