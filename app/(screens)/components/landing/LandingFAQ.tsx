"use client";

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";

export default function LandingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Does GK- Gym Life work with standard biometric fingerprint and face scanners?",
      answer: "Yes. GK- Gym Life natively connects with biometric controllers and turnstiles. The system enforces active membership validity and morning/evening shift rules in real time, automatically deauthorizing gate access when a plan expires.",
    },
    {
      question: "How do the automated WhatsApp and SMS renewal alerts function?",
      answer: "Our automated notification scheduler checks expiry thresholds daily. It automatically sends customized alerts with direct UPI payment links and plan summaries at 7 days, 3 days, and on the day of expiry, stopping churn before it happens.",
    },
    {
      question: "Can our trainers assign exercise demonstration videos and custom diet plans?",
      answer: "Yes. Trainers have a dedicated portal to build workout splits with guided exercise demo videos and custom macro meal plans. Members can access these directly through their personal member app.",
    },
    {
      question: "What is the difference between Floor Trainers and Global Trainers?",
      answer: "Floor Trainers manage in-house personal training, client sessions, and physical floor attendance. Global Trainers enable your gym to offer remote online coaching packages and capture international client leads beyond your local city.",
    },
    {
      question: "How difficult is it to migrate our current members from Excel or paper registers?",
      answer: "We provide hassle-free onboarding. Your member lists, plan validity dates, phone numbers, and remaining balances can be uploaded directly so your gym is fully operational within 24 to 48 hours without operational downtime.",
    },
  ];

  return (
    <section id="faq" className="w-full py-10 lg:py-14 bg-[#08090C] border-t border-[#232631]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4FF32] px-3 py-1 rounded-full bg-[#15161C] border border-[#232631]">
            Common Inquiries
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-4">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-[#94A3B8]">
            Everything you need to know about partnering with GK- Gym Life Powered Gyms.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="rounded-xl bg-[#14151A] border border-[#232631] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#181A22] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <CaretDown
                    size={18}
                    weight="bold"
                    className={`text-[#D4FF32] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#94A3B8] leading-relaxed border-t border-[#1C1E26]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
