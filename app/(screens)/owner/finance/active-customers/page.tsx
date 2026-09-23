import ActiveCustomersView from "@/app/(screens)/components/reusable/ActiveCustomersView";
import { createClient } from '@/app/api/supabase/server';
import { getOwnerGymId } from '@/lib/helpers/trainers/trainerHelper';
import { fetchGymCustomerMembershipPlansPaginated } from '@/lib/helpers/gymCustomerMembershipPlans/gymCustomerMembershipPlans';

export default async function ActiveCustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id || null;
  
  const params = await searchParams;
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;
  const search = typeof params.search === 'string' ? params.search : '';
  const sort = typeof params.sort === 'string' && ['newest', 'oldest'].includes(params.sort) ? params.sort as 'newest' | 'oldest' : 'newest';
  
  let plansData: { data: any[], total: number } = { data: [], total: 0 };
  
  if (userId) {
    const gymId = await getOwnerGymId(userId, supabase);
    if (gymId) {
      plansData = await fetchGymCustomerMembershipPlansPaginated(gymId, page, 10, search, sort, undefined, supabase);
    }
  }

  return <ActiveCustomersView initialData={plansData} currentPage={page} search={search} sort={sort} />;
}
