"use server";

export interface ConsultationFormData {
  fullName: string;
  gymName: string;
  phone: string;
  city: string;
  memberCount: string;
  notes?: string;
}

export async function submitConsultationRequest(data: ConsultationFormData) {
  try {
    if (!data.fullName?.trim() || !data.phone?.trim() || !data.gymName?.trim()) {
      return { success: false, error: "Please fill in all required fields." };
    }

    const phoneRegex = /^[0-9+\s()-]{7,15}$/;
    if (!phoneRegex.test(data.phone.trim())) {
      return { success: false, error: "Please provide a valid phone number." };
    }

    return {
      success: true,
      message: "Consultation request received! A GK Fitness specialist will connect with you within 24 hours.",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to submit request. Please try again.",
    };
  }
}
