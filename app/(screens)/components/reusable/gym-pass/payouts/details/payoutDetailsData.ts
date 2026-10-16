export interface PayoutHistoryItem {
  id: string;
  date: string;
  time: string;
  amount: number;
  status: "Paid" | "Pending";
  referenceId: string;
}

export interface GymPayoutDetailsData {
  id: string;
  gymName: string;
  ownerName: string;
  location: string;
  payoutAmount: number;
  status: "Paid" | "Pending";
  pendingAmount: number;
  lastPaidAmount: number;
  lastPaidDate: string;
  totalPayouts: number;
  history: PayoutHistoryItem[];
}

export const mockPayoutDetailsMap: Record<string, GymPayoutDetailsData> = {
  "1": {
    id: "1",
    gymName: "Gold Fitness",
    ownerName: "Rahul Sharma",
    location: "Hyderabad, India",
    payoutAmount: 78500,
    status: "Pending",
    pendingAmount: 78500,
    lastPaidAmount: 62300,
    lastPaidDate: "01 Sep 2025",
    totalPayouts: 926950,
    history: [
      {
        id: "h0_1",
        date: "16 Oct 2026",
        time: "10:30 AM",
        amount: 78500,
        status: "Pending",
        referenceId: "GKPLT26101601",
      },
      {
        id: "h0_2",
        date: "01 Oct 2026",
        time: "09:15 AM",
        amount: 45200,
        status: "Paid",
        referenceId: "GKPLT26100109",
      },
      {
        id: "h1",
        date: "01 Sep 2025",
        time: "10:30 AM",
        amount: 62300,
        status: "Paid",
        referenceId: "GKPLT25090123",
      },
      {
        id: "h2",
        date: "15 Sep 2025",
        time: "04:15 PM",
        amount: 16200,
        status: "Paid",
        referenceId: "GKPLT25091544",
      },
      {
        id: "h3",
        date: "01 Aug 2025",
        time: "02:15 PM",
        amount: 54800,
        status: "Paid",
        referenceId: "GKPLT25080117",
      },
      {
        id: "h4",
        date: "18 Aug 2025",
        time: "11:20 AM",
        amount: 21400,
        status: "Paid",
        referenceId: "GKPLT25081822",
      },
      {
        id: "h5",
        date: "01 Jul 2025",
        time: "11:45 AM",
        amount: 48900,
        status: "Paid",
        referenceId: "GKPLT25070145",
      },
      {
        id: "h6",
        date: "01 Jun 2025",
        time: "04:20 PM",
        amount: 78500,
        status: "Pending",
        referenceId: "GKPLT25060188",
      },
      {
        id: "h7",
        date: "01 Dec 2025",
        time: "10:00 AM",
        amount: 74200,
        status: "Paid",
        referenceId: "GKPLT25120101",
      },
      {
        id: "h8",
        date: "01 Jan 2026",
        time: "09:30 AM",
        amount: 81000,
        status: "Paid",
        referenceId: "GKPLT26010155",
      },
    ],
  },
};

export const defaultPayoutDetails: GymPayoutDetailsData = mockPayoutDetailsMap["1"];
