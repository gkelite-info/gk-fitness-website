"use server";

import {
  createDemoBooking,
  GymRole,
  DemoBookingRecord,
} from "@/lib/helpers/demoBookings/demoBookingsHelper";
import { capitalizeWords } from "@/lib/validations/demoValidation";

export type ConsultationRole = GymRole;

export interface ConsultationFormData {
  fullName: string;
  gymName: string;
  phone: string;
  city: string;
  role?: ConsultationRole | string;
  agreeContact?: boolean;
  agreeMeta?: boolean;
  memberCount?: string;
  notes?: string;
  subscriptionPlanId?: string | null;
}

export async function submitConsultationRequest(data: ConsultationFormData): Promise<{
  success: boolean;
  data?: DemoBookingRecord;
  message?: string;
  error?: string;
}> {
  try {
    const fullName = data.fullName?.trim();
    if (!fullName || fullName.length < 2) {
      return { success: false, error: "Please enter a valid name (minimum 2 characters)." };
    }

    const gymName = data.gymName?.trim();
    if (!gymName || gymName.length < 2) {
      return { success: false, error: "Please enter a valid gym name (minimum 2 characters)." };
    }

    const city = data.city?.trim();
    if (!city || city.length < 2) {
      return { success: false, error: "Please enter a valid gym city." };
    }

    const cleanPhone = (data.phone || "").replace(/\D/g, "");
    const normalizedPhone = cleanPhone.length > 10 && cleanPhone.startsWith("91") ? cleanPhone.slice(2) : cleanPhone;
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
      return { success: false, error: "Please provide a valid 10-digit Indian mobile number starting with 6-9." };
    }

    if (data.agreeContact === false) {
      return { success: false, error: "Please agree to let GK- Gym Life contact you." };
    }

    const bookingRes = await createDemoBooking({
      name: capitalizeWords(fullName),
      gymName: capitalizeWords(gymName),
      gymCity: capitalizeWords(city),
      mobile: normalizedPhone,
      gymRole: data.role || "owner",
      memberCount: data.memberCount || null,
      requirement: data.notes || null,
      subscriptionPlanId: data.subscriptionPlanId || null,
    });

    if (!bookingRes.success) {
      return {
        success: false,
        error: bookingRes.error || "Failed to submit demo booking.",
      };
    }

    return {
      success: true,
      data: bookingRes.data,
      message: "Demo request received! A GK- Gym Life specialist will connect with you within 24 hours.",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error?.message || "Failed to submit request. Please try again.",
    };
  }
}
