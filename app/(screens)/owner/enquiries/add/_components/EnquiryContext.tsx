"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface EnquiryFormData {
  fullName: string;
  mobile: string;
  email: string;
  gender: string;
  interestedIn: string;
  planId: string;
  planName: string;
  addedThrough: string;
  enquirySource: string;
  notes: string;
  enquiryCategory: string;
  followUpDate: string;
}

interface EnquiryContextType {
  formData: EnquiryFormData;
  updateFormData: (data: Partial<EnquiryFormData>) => void;
}

const defaultFormData: EnquiryFormData = {
  fullName: "",
  mobile: "",
  email: "",
  gender: "",
  interestedIn: "membership",
  planId: "",
  planName: "",
  addedThrough: "owner",
  enquirySource: "google",
  notes: "",
  enquiryCategory: "cold",
  followUpDate: "",
};

const EnquiryContext = createContext<EnquiryContextType>({
  formData: defaultFormData,
  updateFormData: () => {},
});

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<EnquiryFormData>(defaultFormData);

  const updateFormData = (data: Partial<EnquiryFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <EnquiryContext.Provider value={{ formData, updateFormData }}>
      {children}
    </EnquiryContext.Provider>
  );
}

export function useEnquiryForm() {
  return useContext(EnquiryContext);
}
