"use client";

import { Briefcase } from "@phosphor-icons/react";
import { useFormContext } from "react-hook-form";

export default function ProfessionalInformation() {
  const { register, watch, setValue, formState: { errors } } = useFormContext();
  const specialization = watch("specialization");

  const handleSpecializationSelect = (value: string) => {
    setValue("specialization", value, { shouldValidate: true });
  };

  return (
    <div className="flex flex-col items-start p-4 md:p-5 gap-[15px] w-full bg-[#161B22] border border-[#14161A] shadow-[0_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex-1">
      <div className="flex flex-row items-center pb-4 w-full border-b border-[rgba(35,42,53,0.6)]">
        <Briefcase weight="fill" className="text-[#D4FF32]" size={14} />
        <div className="pl-2.5">
          <h2 className="font-sans font-bold text-xs leading-4 tracking-[0.6px] uppercase text-[#D4FF32]">
            Professional Information
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-start gap-[15px] w-full">
        <div className="flex flex-col items-start gap-2 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Specialization <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-row flex-wrap items-start gap-2 w-full">
            {["Strength Training", "Fat Loss", "Cross Fit"].map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => handleSpecializationSelect(spec)}
                className={`flex flex-col justify-center items-center px-3 py-1.5 border rounded-full transition-colors cursor-pointer ${specialization === spec
                    ? "bg-[#D4FF32] border-[#D4FF32] shadow-[0_1px_2px_rgba(0,0,0,0.05)] text-black font-semibold"
                    : "border-[#303744] hover:bg-[#303744]/50 text-[#D1D5DB] font-normal"
                  }`}
              >
                <span className="font-sans text-xs leading-4 text-center">
                  {spec}
                </span>
              </button>
            ))}
          </div>
          {errors.specialization && <span className="text-red-500 text-[10px]">{errors.specialization.message as string}</span>}
        </div>

        <div className="flex flex-col md:flex-row items-start gap-[15px] w-full">
          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Experience (Years) <span className="text-red-500">*</span>
            </label>
            <div className={`flex flex-row justify-center items-start px-3 py-[9px] w-full bg-[#1A2029] border rounded-lg ${errors.experienceYears ? "border-red-500" : "border-[#14161A]"}`}>
              <input
                type="number"
                {...register("experienceYears")}
                placeholder="e.g. 5"
                className="w-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
            {errors.experienceYears && <span className="text-red-500 text-[10px]">{errors.experienceYears.message as string}</span>}
          </div>

          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Joining Date <span className="text-red-500">*</span>
            </label>
            <div className={`relative flex flex-row items-center px-3 py-[9px] w-full bg-[#1A2029] border rounded-lg h-[34px] ${errors.dateOfJoining ? "border-red-500" : "border-[#14161A]"}`}>
              <input
                type="date"
                {...register("dateOfJoining")}
                className="w-full h-full bg-transparent outline-none font-sans font-normal text-xs leading-4 text-[#D1D5DB] [color-scheme:dark]"
              />
            </div>
            {errors.dateOfJoining && <span className="text-red-500 text-[10px]">{errors.dateOfJoining.message as string}</span>}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-[15px] w-full">
          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Personal Training Fee
            </label>
            <div className="flex flex-row items-stretch w-full h-[34px] bg-[#1A2029] border border-[#14161A] rounded-lg overflow-hidden">
              <div className="flex flex-col items-start justify-center px-3 py-2 bg-[rgba(17,22,29,0.6)] border-r border-[#14161A] min-w-[31px]">
                <span className="font-[FreeSans] font-normal text-xs leading-4 text-[#9CA3AF]">
                  ₹
                </span>
              </div>
              <input
                type="number"
                {...register("personalTrainingFee")}
                className="flex-1 bg-transparent px-3 outline-none font-sans font-normal text-xs leading-[14px] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex flex-col items-end justify-center pr-3 py-2">
                <span className="font-sans font-normal text-xs leading-4 text-[#6B7280] whitespace-nowrap">
                  / month
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1.5 w-full md:w-1/2">
            <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
              Group Training Fee
            </label>
            <div className="flex flex-row items-stretch w-full h-[34px] bg-[#1A2029] border border-[#14161A] rounded-lg overflow-hidden">
              <div className="flex flex-col items-start justify-center px-3 py-2 bg-[rgba(17,22,29,0.6)] border-r border-[#14161A] min-w-[31px]">
                <span className="font-[FreeSans] font-normal text-xs leading-4 text-[#9CA3AF]">
                  ₹
                </span>
              </div>
              <input
                type="number"
                {...register("groupTrainingFee")}
                className="flex-1 bg-transparent px-3 outline-none font-sans font-normal text-xs leading-[14px] text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <div className="flex flex-col items-end justify-center pr-3 py-2">
                <span className="font-sans font-normal text-xs leading-4 text-[#6B7280] whitespace-nowrap">
                  0 / day
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-1.5 w-full">
          <label className="w-full font-sans font-medium text-[11px] leading-4 text-[#D1D5DB]">
            Qualification / Certification <span className="text-red-500">*</span>
          </label>
          <div className={`flex flex-row justify-center items-start px-3 py-[9px] w-full bg-[#1A2029] border rounded-lg ${errors.qualification ? "border-red-500" : "border-[#14161A]"}`}>
            <input
              type="text"
              {...register("qualification")}
              placeholder="NASM Certified Trainer, BSc Sports Science"
              className="w-full bg-transparent outline-none font-sans font-normal text-xs leading-[14px] text-white placeholder:text-[#6B7280]"
            />
          </div>
          {errors.qualification && <span className="text-red-500 text-[10px]">{errors.qualification.message as string}</span>}
        </div>
      </div>
    </div>
  );
}
