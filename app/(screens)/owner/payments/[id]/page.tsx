"use client";

import { useRouter } from "next/navigation";
import {
  CaretLeft,
  CaretRight,
  User,
  CalendarBlank,
  CurrencyInr,
  CreditCard,
  Hash,
  Clock,
  CheckCircle,
  FileText,
  DownloadSimple,
  ShareNetwork,
  CircleNotch,
} from "@phosphor-icons/react";
import Avatar from "@/app/(screens)/components/reusable/Avatar";
import { useUser } from "@/app/context/UserContext";
import { useFinanceDashboard } from "@/lib/hooks/finance/useFinanceDashboard";
import { use } from "react";

export default function PaymentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  const { user, roleData } = useUser();
  const userId = user?.id || null;
  const gymId = roleData?.[0]?.gymId || null;
  const selectedYear = new Date().getFullYear();

  const { allTransactions, isLoading } = useFinanceDashboard(userId, gymId, selectedYear);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0D0F13]">
        <CircleNotch size={32} className="text-[#CCFF00] animate-spin mb-4" />
        <span className="font-['Sora'] text-[#8590A2]">Loading payment details...</span>
      </div>
    );
  }

  const payment = allTransactions?.find(tx => tx.id === resolvedParams.id || tx.gymPaymentId === resolvedParams.id);

  if (!payment) {
    return (
      <div className="flex flex-col items-center justify-center p-4 md:p-6 lg:p-8 w-full min-h-screen bg-[#0D0F13]">
        <span className="font-['Sora'] text-[#8590A2]">Payment not found.</span>
        <button onClick={() => router.back()} className="mt-4 text-[#CCFF00] underline">Go Back</button>
      </div>
    );
  }

  const name = payment.gym_customers?.users?.name || payment.gym_customers?.fullName || 'Unknown User';
  const plan = payment.gym_membership_plans?.name || payment.gym_membership_plans?.planName || payment.plan?.planName || 'Unknown Plan';
  const gender = payment.gym_customers?.users?.gender || 'male';
  const memberId = payment.gym_customers?.customerCode || 'N/A';
  const profilePic = payment.gym_customers?.userAccount?.profilePhoto || payment.gym_customers?.creator?.profilePhoto || null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(val);
  };

  const exactTimestamp = payment.createdAt || payment.paymentDate;
  const paymentDateObj = new Date(exactTimestamp);
  const formattedDate = paymentDateObj.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' });
  const formattedTime = paymentDateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });

  return (
    <div className="w-full h-full flex flex-col bg-[#0D0F13] overflow-y-auto scrollbar-themed relative">
      <div className="flex flex-col p-6 md:p-8 max-w-[1020px] mx-auto w-full gap-6 pb-6 md:pb-10">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 w-full">
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={() => router.back()}
              className="box-border flex flex-row justify-center items-center w-9 h-9 bg-[#12151B] border border-[#232833] rounded-full shrink-0 cursor-pointer hover:bg-[#1a1e26] transition-colors"
            >
              <CaretLeft size={16} weight="bold" className="text-white" />
            </button>
            <h1 className="font-['Inter'] font-[700] text-[24px] leading-[32px] tracking-[-0.6px] text-white m-0">
              Payment Details
            </h1>
          </div>

          <div className="flex flex-row items-center gap-1.5 pl-12 md:pl-0">
            <span className="font-['Inter'] font-[400] text-[12px] leading-[16px] text-[#7E8797]">
              Payments
            </span>
            <CaretRight size={14} weight="bold" className="text-[#555D6C]" />
            <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#B2BAC9]">
              Payment Details
            </span>
          </div>
        </div>

        <div className="box-border flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start p-6 gap-6 w-full bg-[#13161C] border border-[#202530] rounded-[16px] shadow-[inset_0px_0px_100px_rgba(194,248,38,0.02)] relative overflow-hidden">
          <div className="absolute -bottom-1/2 -right-1/4 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[rgba(194,248,38,0.05)] to-transparent rounded-full pointer-events-none blur-xl"></div>
          <div className="box-border flex flex-row justify-center items-center w-16 h-16 bg-[#171B1E] border-2 border-[#C2F826] shadow-[0px_0px_15px_rgba(194,248,38,0.15)] rounded-full shrink-0 relative z-10">
            <Avatar src={profilePic} gender={gender} className="w-full h-full rounded-full" />
          </div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-1.5 relative z-10">
            <h2 className="font-['Inter'] font-[700] text-[24px] leading-[24px] tracking-[-0.6px] text-white m-0">
              {name}
            </h2>
            {/* <div className="box-border flex flex-row items-center px-3 py-1 gap-1.5 h-[30px] bg-[#171B22] border border-[#262C39] rounded-full">
              <User size={12} weight="fill" className="text-[#C2F826]" />
              <span className="font-['Inter'] font-[600] text-[11px] leading-[20px] text-[#8B95A7]">
                MEMBER ID: {memberId}
              </span>
            </div> */}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
          <div className="box-border flex flex-col items-start p-6 gap-6 w-full lg:col-span-7 xl:col-span-8 bg-[#13161C] border border-[#202530] rounded-[16px]">
            <h3 className="font-['Inter'] font-[700] text-[16px] leading-[24px] text-white w-full m-0">
              Payment Information
            </h3>

            <div className="flex flex-col items-start w-full">
              <div className="flex flex-row justify-between items-center py-3.5 w-full">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <User size={16} weight="bold" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Membership Plan
                  </span>
                </div>
                <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] text-white text-right">
                  {plan}
                </span>
              </div>

              <div className="flex flex-row justify-between items-center py-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <CalendarBlank size={16} weight="fill" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Plan Duration
                  </span>
                </div>
                <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] text-white text-right">
                  {payment.gym_membership_plans?.durationMonths ? `${payment.gym_membership_plans.durationMonths} Month${payment.gym_membership_plans.durationMonths > 1 ? 's' : ''}` : '-'}
                </span>
              </div>

              <div className="flex flex-row justify-between items-center py-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <CurrencyInr size={16} weight="bold" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Amount Paid
                  </span>
                </div>
                <span className="font-['Inter'] font-[700] text-[14px] leading-[20px] tracking-[0.35px] text-white text-right">
                  ₹{formatCurrency(payment.amountPaid || 0)}
                </span>
              </div>

              <div className="flex flex-row justify-between items-center py-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <CreditCard size={16} weight="bold" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Payment Method
                  </span>
                </div>
                <div className="box-border flex flex-col items-center px-2.5 py-0.5 border border-[#C2F826] rounded-full">
                  <span className="font-['Inter'] font-[700] text-[11px] leading-[20px] tracking-[0.55px] text-[#C2F826] capitalize">
                    {payment.paymentMethod || '-'}
                  </span>
                </div>
              </div>

              <div className="flex flex-row justify-between items-center py-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <Hash size={16} weight="fill" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Transaction ID
                  </span>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] tracking-[0.3px] text-white text-right">
                    {payment.transactionId || '-'}
                  </span>
                  {payment.transactionId && (
                    <div
                      className="flex justify-center items-center w-3.5 h-3.5 cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => navigator.clipboard.writeText(payment.transactionId)}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.33333 1.16666H2.33333C1.69333 1.16666 1.16667 1.69333 1.16667 2.33333V9.33333H2.33333V2.33333H9.33333V1.16666ZM11.0833 3.5H4.66667C4.02667 3.5 3.5 4.02666 3.5 4.66666V11.6667C3.5 12.3067 4.02667 12.8333 4.66667 12.8333H11.0833C11.7233 12.8333 12.25 12.3067 12.25 11.6667V4.66666C12.25 4.02666 11.7233 3.5 11.0833 3.5ZM11.0833 11.6667H4.66667V4.66666H11.0833V11.6667Z" fill="#C2F826" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-row justify-between items-center py-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <CalendarBlank size={16} weight="fill" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Payment Date
                  </span>
                </div>
                <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] text-white text-right">
                  {formattedDate}
                </span>
              </div>

              <div className="flex flex-row justify-between items-center py-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 shrink-0 pr-4">
                  <Clock size={16} weight="fill" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Payment Time
                  </span>
                </div>
                <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] text-white text-right">
                  {formattedTime}
                </span>
              </div>

              <div className="flex flex-row justify-between items-start pt-3.5 w-full border-t border-[#1C212B]">
                <div className="flex flex-row items-center gap-3.5 pt-0.5 shrink-0 pr-4">
                  <CheckCircle size={16} weight="fill" className="text-[#CCFF00]" />
                  <span className="font-['Inter'] font-[500] text-[12px] leading-[16px] text-[#9099AA] whitespace-nowrap">
                    Payment Status
                  </span>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex flex-row items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-[#16C784] rounded-full"></div>
                    <span className="font-['Inter'] font-[600] text-[12px] leading-[16px] text-[#16C784]">
                      Recorded
                    </span>
                  </div>
                  <span className="font-['Inter'] font-[400] text-[11px] leading-[20px] text-[#6D7687] mt-1">
                    Payment recorded automatically
                  </span>
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-col items-start gap-4 w-full lg:col-span-5 xl:col-span-4">
            <button className="box-border flex flex-row justify-between items-center p-5 w-full bg-[#13161C] border border-[#202530] rounded-[16px] cursor-pointer hover:bg-[#1a1e26] transition-colors">
              <div className="flex flex-row items-center gap-4">
                <div className="box-border flex flex-row justify-center items-center w-11 h-11 bg-[#161A22] border border-[#242B38] rounded-[12px] shrink-0">
                  <FileText size={20} weight="fill" className="text-[#CCFF00]" />
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="font-['Inter'] font-[700] text-[14px] leading-[18px] text-white text-left">
                    Payment Receipt
                  </span>
                  <span className="font-['Inter'] font-[400] text-[12px] leading-[15px] text-[#778193] text-left">
                    Download receipt for this payment
                  </span>
                </div>
              </div>
              <DownloadSimple size={20} weight="bold" className="text-[#C2F826] ml-2 shrink-0" />
            </button>

            <button className="box-border flex flex-row justify-between items-center p-5 w-full bg-[#13161C] border border-[#C2F826] rounded-[16px] cursor-pointer hover:bg-[#1a1f14] transition-colors shadow-[0px_0px_10px_rgba(194,248,38,0.1)]">
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row justify-center items-center w-6 h-6 shrink-0">
                  <ShareNetwork size={24} weight="fill" className="text-[#CCFF00]" />
                </div>
                <span className="font-['Inter'] font-[700] text-[16px] leading-[24px] tracking-[-0.4px] text-[#C2F826]">
                  Share Payment Receipt
                </span>
              </div>
              <CaretRight size={20} weight="bold" className="text-[#C2F826] ml-2 shrink-0" />
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}
