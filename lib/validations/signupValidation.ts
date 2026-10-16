export interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
  gender: "male" | "female" | "other";
  dob?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;
  address?: string;
  gymName?: string;
  memberCount?: string;
  subscriptionPlanId?: string;
}

export type SignupFormErrors = Partial<Record<keyof SignupFormValues, string>>;

export function validateSignupField(field: keyof SignupFormValues, value: any): string | null {
  switch (field) {
    case "name": {
      const trimmed = (value || "").trim();
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) return "Name can only contain letters, spaces, and hyphens.";
      return null;
    }
    case "email": {
      const trimmed = (value || "").trim();
      if (!trimmed) return "Email address is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return "Please enter a valid email address.";
      return null;
    }
    case "password": {
      if (!value) return "Password is required.";
      if (value.length < 6) return "Password must be at least 6 characters.";
      return null;
    }
    case "phone": {
      const digits = (value || "").replace(/\D/g, "");
      if (!digits) return "Mobile number is required.";
      if (digits.length !== 10) return "Mobile number must be exactly 10 digits.";
      if (!/^[6-9]\d{9}$/.test(digits)) return "Must start with 6, 7, 8, or 9.";
      return null;
    }
    case "pincode": {
      const trimmed = (value || "").trim();
      if (trimmed && !/^\d{6}$/.test(trimmed)) {
        return "Pincode must be 6 digits.";
      }
      return null;
    }
    default:
      return null;
  }
}

export function validateSignupForm(values: SignupFormValues): SignupFormErrors {
  const errors: SignupFormErrors = {};
  const fields: (keyof SignupFormValues)[] = ["name", "email", "password", "phone", "pincode"];

  fields.forEach((field) => {
    const err = validateSignupField(field, values[field]);
    if (err) errors[field] = err;
  });

  return errors;
}
