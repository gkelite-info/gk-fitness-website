"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import AddTrainerHeader from "./AddTrainerHeader";
import PersonalInfoSection from "./PersonalInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import ProfessionalInfoSection from "./ProfessionalInfoSection";
import AdditionalInfoSection from "./AdditionalInfoSection";
import AccountInfoSection from "./AccountInfoSection";
import { TrainerItem } from "../types";

interface AddGlobalTrainerViewProps {
  initialTrainer?: TrainerItem;
  isEditMode?: boolean;
}

export default function AddGlobalTrainerView({
  initialTrainer,
  isEditMode = false,
}: AddGlobalTrainerViewProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fullName, setFullName] = useState(initialTrainer?.name || "");
  const [trainerId, setTrainerId] = useState(
    initialTrainer
      ? `TRN-${initialTrainer.id.replace("global-tr-", "").padStart(6, "0")}`
      : ""
  );
  const [dob, setDob] = useState(initialTrainer ? "1994-08-15" : "");
  const [gender, setGender] = useState(initialTrainer?.gender || "");

  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState(
    initialTrainer?.phone || (initialTrainer ? "+91 98765 43210" : "")
  );
  const [email, setEmail] = useState(
    initialTrainer?.email ||
      (initialTrainer
        ? `${initialTrainer.name.toLowerCase().replace(/\s+/g, ".")}@gmail.com`
        : "")
  );

  const [specializations, setSpecializations] = useState<string[]>(
    initialTrainer?.skills || []
  );
  const [experienceYears, setExperienceYears] = useState(
    initialTrainer ? `${initialTrainer.experienceYears}` : ""
  );
  const [joiningDate, setJoiningDate] = useState(
    initialTrainer ? "2023-01-12" : ""
  );
  const [qualification, setQualification] = useState(
    initialTrainer ? "NASM Certified Trainer, BSc Sports Science" : ""
  );

  const [bio, setBio] = useState(
    initialTrainer
      ? "Passionate about helping people become the best version of themselves. Specializes in strength training and muscle building with a focus on technique, consistency and long-term results."
      : ""
  );
  const [languages, setLanguages] = useState<string[]>(
    initialTrainer ? ["English", "Hindi"] : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleSpecialization = (spec: string) => {
    setSpecializations((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const handleCancel = () => {
    const from = searchParams.get("from");
    if (from === "users") {
      router.push("/superadmin/users?tab=global-trainers");
    } else {
      router.back();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      toast.error("Please enter the trainer's full name");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      toast.success(
        isEditMode
          ? `Trainer "${fullName}" updated successfully!`
          : "Global Trainer created successfully!"
      );
      if (isEditMode && initialTrainer) {
        const from = searchParams.get("from");
        router.push(
          `/superadmin/trainers/${initialTrainer.id}${from ? `?from=${from}` : ""}`
        );
      } else {
        router.push("/superadmin/trainers");
      }
    }, 600);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-full overflow-x-hidden min-w-0"
    >
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        <AddTrainerHeader
          title={isEditMode ? "Edit Global Trainer" : "Add New Global Trainer"}
          subtitle={
            isEditMode
              ? `Edit details and profile for ${fullName || "trainer"}`
              : "Add trainer details and create their account"
          }
          onBack={handleCancel}
        />

        <PersonalInfoSection
          fullName={fullName}
          onFullNameChange={setFullName}
          trainerId={trainerId}
          onTrainerIdChange={setTrainerId}
          dob={dob}
          onDobChange={setDob}
          gender={gender}
          onGenderChange={setGender}
        />

        <ContactInfoSection
          countryCode={countryCode}
          onCountryCodeChange={setCountryCode}
          phone={phone}
          onPhoneChange={setPhone}
          email={email}
          onEmailChange={setEmail}
        />

        <ProfessionalInfoSection
          specializations={specializations}
          onToggleSpecialization={handleToggleSpecialization}
          experienceYears={experienceYears}
          onExperienceYearsChange={setExperienceYears}
          joiningDate={joiningDate}
          onJoiningDateChange={setJoiningDate}
          qualification={qualification}
          onQualificationChange={setQualification}
        />

        <AdditionalInfoSection
          bio={bio}
          onBioChange={setBio}
          languages={languages}
          onLanguagesChange={setLanguages}
        />

        <AccountInfoSection />

        <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#141A24] border border-[#202939] text-[#94A3B8] hover:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#D4FF32] text-black font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-[0_2px_14px_rgba(212,255,50,0.25)] cursor-pointer disabled:opacity-50 text-center"
          >
            {isSubmitting
              ? isEditMode
                ? "Saving..."
                : "Creating..."
              : isEditMode
              ? "Save Changes"
              : "Create Global Trainer"}
          </button>
        </div>
      </div>
    </form>
  );
}
