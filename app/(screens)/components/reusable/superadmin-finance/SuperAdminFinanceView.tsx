"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import SuperAdminOverviewView from "./SuperAdminOverviewView";
import SuperAdminRevenueView from "./SuperAdminRevenueView";
import RevenueDetailsView from "./RevenueDetailsView";
import SuperAdminPayoutsView from "./SuperAdminPayoutsView";
import GymOwnerPayoutDetailsView from "./GymOwnerPayoutDetailsView";
import GlobalTrainerPayoutDetailsView from "./GlobalTrainerPayoutDetailsView";
import SuperAdminTransactionsView from "./SuperAdminTransactionsView";
import TransactionDetailsInnerView from "./TransactionDetailsInnerView";
import { REVENUE_TRANSACTIONS } from "./revenueMockData";
import { GYM_OWNER_PAYOUTS, GLOBAL_TRAINER_PAYOUTS } from "./payoutMockData";
import { TRANSACTIONS_MOCK_DATA } from "./transactionsMockData";
import {
  RevenueTransaction,
  GymOwnerPayout,
  GlobalTrainerPayout,
  FinanceTransactionRecord,
} from "./types";

export default function SuperAdminFinanceView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "overview";
  const detailId = searchParams.get("id");

  const handleSelectTransaction = (tx: RevenueTransaction) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "revenue");
    params.set("id", tx.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBackToRevenue = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "revenue");
    params.delete("id");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectGymOwnerPayout = (payout: GymOwnerPayout) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "payouts");
    params.set("id", payout.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectTrainerPayout = (payout: GlobalTrainerPayout) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "payouts");
    params.set("id", payout.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBackToPayouts = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "payouts");
    params.delete("id");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectFinanceTransaction = (tx: FinanceTransactionRecord) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "transactions");
    params.set("id", tx.id);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleBackToTransactions = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "transactions");
    params.delete("id");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  if (tab === "revenue") {
    if (detailId) {
      const tx =
        REVENUE_TRANSACTIONS.find((t) => t.id === detailId) ||
        REVENUE_TRANSACTIONS[0];
      return (
        <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
          <RevenueDetailsView
            transaction={tx}
            onBack={handleBackToRevenue}
          />
        </div>
      );
    }

    return (
      <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
        <SuperAdminRevenueView
          onSelectTransaction={handleSelectTransaction}
        />
      </div>
    );
  }

  if (tab === "payouts") {
    if (detailId) {
      const trainerPayout = GLOBAL_TRAINER_PAYOUTS.find((p) => p.id === detailId);
      if (trainerPayout) {
        return (
          <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
            <GlobalTrainerPayoutDetailsView
              payout={trainerPayout}
              onBack={handleBackToPayouts}
            />
          </div>
        );
      }

      const gymPayout =
        GYM_OWNER_PAYOUTS.find((p) => p.id === detailId) || GYM_OWNER_PAYOUTS[0];

      return (
        <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
          <GymOwnerPayoutDetailsView
            payout={gymPayout}
            onBack={handleBackToPayouts}
          />
        </div>
      );
    }

    return (
      <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
        <SuperAdminPayoutsView
          onSelectGymOwnerPayout={handleSelectGymOwnerPayout}
          onSelectTrainerPayout={handleSelectTrainerPayout}
        />
      </div>
    );
  }

  if (tab === "transactions") {
    if (detailId) {
      const tx =
        TRANSACTIONS_MOCK_DATA.find((t) => t.id === detailId) ||
        TRANSACTIONS_MOCK_DATA[0];
      return (
        <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
          <TransactionDetailsInnerView
            transaction={tx}
            onBack={handleBackToTransactions}
          />
        </div>
      );
    }

    return (
      <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
        <SuperAdminTransactionsView
          onSelectTransaction={handleSelectFinanceTransaction}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#0C0D10] text-white p-4 sm:p-6 lg:p-8 flex flex-col gap-6 sm:gap-7 max-w-full overflow-x-hidden min-w-0">
      <SuperAdminOverviewView />
    </div>
  );
}

