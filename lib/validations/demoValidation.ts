export interface DemoFormValues {
  name: string;
  gymName: string;
  city: string;
  phone: string;
  agreeContact: boolean;
}

export type DemoFormErrors = Partial<Record<keyof DemoFormValues, string>>;

export function capitalizeWords(input: string): string {
  if (!input) return "";
  return input.replace(/(^|[\s.\-'])([a-z])/g, (_, prefix, char) => prefix + char.toUpperCase());
}

export function sanitizeIndianMobile(input: string): string {
  let digits = input.replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) {
    digits = digits.slice(2);
  } else if (digits.length > 10 && digits.startsWith("0")) {
    digits = digits.slice(1);
  }
  return digits.slice(0, 10);
}

export function validateField(field: keyof DemoFormValues, value: any): string | null {
  switch (field) {
    case "name": {
      const trimmed = (value || "").trim();
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      if (!/^[A-Za-z\s.'-]+$/.test(trimmed)) return "Name can only contain letters, spaces, and dots.";
      return null;
    }
    case "gymName": {
      const trimmed = (value || "").trim();
      if (!trimmed) return "Gym name is required.";
      if (trimmed.length < 2) return "Gym name must be at least 2 characters.";
      return null;
    }
    case "city": {
      const trimmed = (value || "").trim();
      if (!trimmed) return "Gym city is required.";
      if (trimmed.length < 2) return "City must be at least 2 characters.";
      if (!/^[A-Za-z\s.-]+$/.test(trimmed)) return "City can only contain letters and spaces.";
      return null;
    }
    case "phone": {
      const digits = (value || "").replace(/\D/g, "");
      if (!digits) return "Indian mobile number is required.";
      if (digits.length !== 10) return "Mobile number must be exactly 10 digits.";
      if (!/^[6-9]\d{9}$/.test(digits)) return "Must start with 6, 7, 8, or 9.";
      return null;
    }
    case "agreeContact": {
      if (!value) return "You must agree to let us contact you.";
      return null;
    }
    default:
      return null;
  }
}

export function validateDemoForm(values: DemoFormValues): DemoFormErrors {
  const errors: DemoFormErrors = {};
  
  const nameErr = validateField("name", values.name);
  if (nameErr) errors.name = nameErr;

  const gymErr = validateField("gymName", values.gymName);
  if (gymErr) errors.gymName = gymErr;

  const cityErr = validateField("city", values.city);
  if (cityErr) errors.city = cityErr;

  const phoneErr = validateField("phone", values.phone);
  if (phoneErr) errors.phone = phoneErr;

  const agreeErr = validateField("agreeContact", values.agreeContact);
  if (agreeErr) errors.agreeContact = agreeErr;

  return errors;
}
