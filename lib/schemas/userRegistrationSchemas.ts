import { z } from 'zod';

export const trainerRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  alternatePhone: z.string().optional(),
  email: z.string().email("Valid email is required"),
  specialization: z.string().min(2, "Specialization is required"),
  experienceYears: z.string().min(1, "Experience is required"),
  dateOfJoining: z.string().min(1, "Date of joining is required"),
  qualification: z.string().min(2, "Qualification is required"),
  bio: z.string().optional(),
  languagesSpeaks: z.array(z.string()).min(1, "Select at least one language"),
  shiftPreference: z.string().min(1, "Shift preference is required"),
  workingDays: z.array(z.string()).min(1, "Select at least one working day"),
  personalTrainingFee: z.union([z.string(), z.number()]).optional(),
  groupTrainingFee: z.union([z.string(), z.number()]).optional(),
});

export type TrainerRegistrationData = z.infer<typeof trainerRegistrationSchema>;

export const customerRegistrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  emergencyContactName: z.string().min(2, "Emergency contact name is required"),
  relationship: z.string().min(2, "Relationship is required"),
  emergencyContactNumber: z.string().min(10, "Valid emergency contact number is required"),
  membershipPlanId: z.string().min(1, "Membership plan is required"),
  planStartDate: z.string().min(1, "Start date is required"),
  planExpiryDate: z.string().min(1, "Expiry date is required"),
});

export type CustomerRegistrationData = z.infer<typeof customerRegistrationSchema>;
