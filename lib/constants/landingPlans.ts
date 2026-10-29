import {
  Sparkle,
  Medal,
  Crown,
  SketchLogo,
  Diamond,
  Star
} from "@phosphor-icons/react";
import { DynamicSubscriptionPlan } from "@/lib/helpers/subscriptions/subscriptionsHelper";

export const DEFAULT_GYM_PLANS: DynamicSubscriptionPlan[] = [
  {
    id: "default-gym-basic",
    name: "Basic",
    label: null,
    price: null,
    planFor: "gyms",
    features: [
      "Customer Management",
      "Attendance Tracking",
      "Basic Reports",
      "Member App Access",
      "Standard Support",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-gym-silver",
    name: "Silver",
    label: null,
    price: null,
    planFor: "gyms",
    features: [
      "Everything in Basic",
      "Biometric & QR Management",
      "Inventory Management",
      "Multiple Owner Login",
      "Advanced Reports",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-gym-gold",
    name: "Gold",
    label: null,
    price: null,
    planFor: "gyms",
    features: [
      "Everything in Silver",
      "Own Gym Branding",
      "Multiple Owner Login",
      "Advanced Analytics",
      "Priority Support",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-gym-platinum",
    name: "Platinum",
    label: null,
    price: null,
    planFor: "gyms",
    features: [
      "Everything in Gold",
      "Advanced Analytics",
      "Premium Support",
      "Dedicated Account Support",
      "All Premium Features",
    ],
    createdAt: new Date().toISOString(),
  },
];

export const DEFAULT_CUSTOMER_PLANS: DynamicSubscriptionPlan[] = [
  {
    id: "default-cust-basic",
    name: "Basic",
    label: null,
    price: 499,
    planFor: "customer",
    features: [
      "Personalized Workout Plans",
      "Attendance & QR Check-in",
      "Water & Hydration Tracker",
      "Community Access",
      "Standard Member Support",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-cust-silver",
    name: "Silver",
    label: null,
    price: 999,
    planFor: "customer",
    features: [
      "Everything in Basic",
      "Personalized Nutrition & Diet Plans",
      "Healthy Recipe Library Access",
      "Weekly Workout Split Schedules",
      "Trainer Guidance & Form Tips",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-cust-gold",
    name: "Gold",
    label: null,
    price: 1499,
    planFor: "customer",
    features: [
      "Everything in Silver",
      "1-on-1 PT Session Booking",
      "Body Transformation & Progress Photos",
      "Dynamic Macro & Calorie Tracking",
      "Priority Trainer Assistance",
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: "default-cust-platinum",
    name: "Platinum",
    label: null,
    price: 2499,
    planFor: "customer",
    features: [
      "Everything in Gold",
      "Dedicated Personal Fitness Coach",
      "Custom Monthly Diet Consultations",
      "VIP Priority Floor Access",
      "All Premium Features Included",
    ],
    createdAt: new Date().toISOString(),
  },
];

const PLAN_VISUALS = [
  { match: "basic", icon: Sparkle, iconColor: "text-[#D4FF32]" },
  { match: "silver", icon: Medal, iconColor: "text-blue-400" },
  { match: "gold", icon: Crown, iconColor: "text-amber-400" },
  { match: "platinum", icon: SketchLogo, iconColor: "text-purple-400" },
  { match: "diamond", icon: Diamond, iconColor: "text-cyan-400" },
];

export function getPlanVisual(name: string, index: number) {
  const lower = (name || "").toLowerCase().trim();
  const found = PLAN_VISUALS.find((v) => lower.includes(v.match));
  if (found) return found;
  const fallbacks = [
    { icon: Sparkle, iconColor: "text-[#D4FF32]" },
    { icon: Medal, iconColor: "text-blue-400" },
    { icon: Crown, iconColor: "text-amber-400" },
    { icon: SketchLogo, iconColor: "text-purple-400" },
    { icon: Star, iconColor: "text-[#D4FF32]" },
  ];
  return fallbacks[index % fallbacks.length];
}