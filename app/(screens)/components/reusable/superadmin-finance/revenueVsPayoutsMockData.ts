import {
  RevenueVsPayoutsKpi,
  MonthlyComparisonPoint,
  HighlightCardData,
} from "./revenueVsPayoutsTypes";

export const REVENUE_VS_PAYOUTS_KPIS: RevenueVsPayoutsKpi[] = [
  {
    id: "total-revenue",
    title: "Total Revenue",
    amount: "₹1,39,20,000",
    comparisonText: "↑ 12.5% vs last year",
    trend: "up",
    variant: "revenue",
  },
  {
    id: "total-payouts",
    title: "Total Payouts",
    amount: "₹96,40,000",
    comparisonText: "↑ 14.2% vs last year",
    trend: "up",
    variant: "payouts",
  },
  {
    id: "net-revenue",
    title: "Net Revenue",
    amount: "₹42,80,000",
    comparisonText: "↑ 8.3% vs last year",
    trend: "up",
    variant: "net",
  },
  {
    id: "pending-payouts",
    title: "Pending Payouts",
    amount: "₹8,75,000",
    comparisonText: "For 24 gyms",
    trend: "neutral",
    variant: "pending",
  },
];

export const REVENUE_VS_PAYOUTS_MONTHLY: MonthlyComparisonPoint[] = [
  { month: "Jan", revenue: 820000, payouts: 520000 },
  { month: "Feb", revenue: 980000, payouts: 640000 },
  { month: "Mar", revenue: 1040000, payouts: 680000 },
  { month: "Apr", revenue: 990000, payouts: 660000 },
  { month: "May", revenue: 1120000, payouts: 720000 },
  { month: "Jun", revenue: 1180000, payouts: 750000 },
  { month: "Jul", revenue: 1350000, payouts: 840000 },
  { month: "Aug", revenue: 1260000, payouts: 830000 },
  { month: "Sep", revenue: 1310000, payouts: 890000 },
  { month: "Oct", revenue: 1560000, payouts: 1140000 },
  { month: "Nov", revenue: 1320000, payouts: 870000 },
  { month: "Dec", revenue: 1270000, payouts: 940000 },
];

export const MONTHLY_HIGHLIGHTS: HighlightCardData[] = [
  {
    title: "Highest Revenue Month",
    month: "October",
    amount: "₹ 15,60,000",
    type: "revenue",
  },
  {
    title: "Highest Payout Month",
    month: "October",
    amount: "₹ 11,40,000",
    type: "payout",
  },
  {
    title: "Best Net Month",
    month: "October",
    amount: "₹ 4,20,000",
    type: "net",
  },
];
