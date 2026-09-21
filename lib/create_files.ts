import * as fs from 'fs';
import * as path from 'path';

interface FileDefinition {
  path: string;
  content: string;
}

const files: FileDefinition[] = [
  {
    path: 'helpers/trainers/trainerHelper.ts',
    content: `"use server";\nimport { createClient } from "@/app/api/supabase/server";\nexport async function getOwnerGymId(userId: string) { const supabase = await createClient(); const { data } = await supabase.from("gym_owners").select("gymId").eq("userId", userId).single(); return data?.gymId; }\nexport async function getGymTrainers(gymId: string) { const supabase = await createClient(); const { data } = await supabase.from("gym_trainers").select("*").eq("gymId", gymId).eq("is_deleted", false); return data || []; }`
  },
  {
    path: 'helpers/customers/customerHelper.ts',
    content: `"use server";\nimport { createClient } from "@/app/api/supabase/server";\nexport async function getGymCustomers(gymId: string) { const supabase = await createClient(); const { data } = await supabase.from("gym_customers").select("*").eq("gymId", gymId).eq("is_deleted", false).order("createdAt", { ascending: false }); return data || []; }`
  },
  {
    path: 'helpers/attendance/attendanceHelper.ts',
    content: `"use server";\nimport { createClient } from "@/app/api/supabase/server";\nexport async function getGymAttendanceToday(gymId: string, dateStr: string) { const supabase = await createClient(); const { data } = await supabase.from("gym_attendance").select("*").eq("gymId", gymId).eq("date", dateStr); return data || []; }`
  },
  {
    path: 'helpers/gymPayments.ts',
    content: `"use server";\nimport { createClient } from "@/app/api/supabase/server";\nimport { getOwnerGymId } from "@/lib/helpers/trainers/trainerHelper";\nexport async function getGymPayments(userId: string) { const gymId = await getOwnerGymId(userId); if (!gymId) return []; const supabase = await createClient(); const { data } = await supabase.from("gym_payments").select("*").eq("gymId", gymId).order("paymentDate", { ascending: false }); return data || []; }`
  },
  {
    path: 'helpers/gymCustomerMembershipPlans/membershipPlansHelper.ts',
    content: `"use server";\nimport { createClient } from "@/app/api/supabase/server";\nimport { getOwnerGymId } from "@/lib/helpers/trainers/trainerHelper";\nexport async function getGymCustomerMembershipPlans(userId: string) { const gymId = await getOwnerGymId(userId); if (!gymId) return []; const supabase = await createClient(); const { data } = await supabase.from("gym_customer_membership_plans").select("*, customer:gym_customers(*), plan:gym_membership_plans(*)").eq("gymId", gymId).eq("is_deleted", false); return data || []; }`
  },
  {
    path: 'helpers/customerTrainers/customerTrainersHelper.ts',
    content: `"use server";\nimport { createClient } from "@/app/api/supabase/server";\nexport async function getCustomerTrainersByGym(gymId: string) { const supabase = await createClient(); const { data } = await supabase.from("customer_trainers").select("*").eq("gymId", gymId).eq("is_deleted", false); return data || []; }`
  },
  {
    path: 'hooks/customers/useGymCustomers.ts',
    content: `import { useQuery } from '@tanstack/react-query';\nimport { getGymCustomers } from '@/lib/helpers/customers/customerHelper';\nexport function useGymCustomers(gymId?: string) { return useQuery({ queryKey: ['customers', gymId], queryFn: async () => { if (!gymId) return []; return await getGymCustomers(gymId); }, enabled: !!gymId }); }`
  },
  {
    path: 'hooks/attendance/useGymAttendanceToday.ts',
    content: `import { useQuery } from '@tanstack/react-query';\nimport { getGymAttendanceToday } from '@/lib/helpers/attendance/attendanceHelper';\nexport function useGymAttendanceToday(gymId?: string, dateStr?: string) { return useQuery({ queryKey: ['attendanceToday', gymId, dateStr], queryFn: async () => { if (!gymId || !dateStr) return []; return await getGymAttendanceToday(gymId, dateStr); }, enabled: !!gymId && !!dateStr }); }`
  },
  {
    path: 'hooks/useGymPayments.ts',
    content: `import { useQuery } from '@tanstack/react-query';\nimport { getGymPayments } from '@/lib/helpers/gymPayments';\nexport function useGymPayments(userId?: string | null) { return useQuery({ queryKey: ['gymPayments', userId], queryFn: async () => { if (!userId) return []; return await getGymPayments(userId); }, enabled: !!userId }); }`
  },
  {
    path: 'hooks/useGymCustomerMembershipPlans.ts',
    content: `import { useQuery } from '@tanstack/react-query';\nimport { getGymCustomerMembershipPlans } from '@/lib/helpers/gymCustomerMembershipPlans/membershipPlansHelper';\nexport function useGymCustomerMembershipPlans(userId?: string | null) { return useQuery({ queryKey: ['gymCustomerMembershipPlans', userId], queryFn: async () => { if (!userId) return []; return await getGymCustomerMembershipPlans(userId); }, enabled: !!userId }); }`
  },
  {
    path: 'hooks/customerTrainers/useCustomerTrainers.ts',
    content: `import { useQuery } from '@tanstack/react-query';\nimport { getCustomerTrainersByGym } from '@/lib/helpers/customerTrainers/customerTrainersHelper';\nexport function useCustomerTrainersByGym(gymId?: string) { return useQuery({ queryKey: ['customerTrainers', gymId], queryFn: async () => { if (!gymId) return []; return await getCustomerTrainersByGym(gymId); }, enabled: !!gymId }); }`
  },
  {
    path: 'hooks/trainers/useGymTrainers.ts',
    content: `import { useQuery } from '@tanstack/react-query';\nimport { getGymTrainers } from '@/lib/helpers/trainers/trainerHelper';\nexport function useGymTrainers(gymId?: string) { return useQuery({ queryKey: ['gymTrainers', gymId], queryFn: async () => { if (!gymId) return []; return await getGymTrainers(gymId); }, enabled: !!gymId }); }`
  }
];

files.forEach((f: FileDefinition) => {
  const fullPath = path.join('d:/gk_fitness/gk_fitness_website', f.path);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, f.content);
});
