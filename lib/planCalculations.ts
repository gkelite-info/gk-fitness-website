export function parseLocalDate(dateInput?: string | Date | null): Date {
  if (!dateInput) return new Date();
  if (dateInput instanceof Date) {
    return new Date(dateInput.getFullYear(), dateInput.getMonth(), dateInput.getDate(), 0, 0, 0, 0);
  }
  if (typeof dateInput === "string") {
    const trimmed = dateInput.trim();
    const match = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match && !trimmed.includes("T")) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day, 0, 0, 0, 0);
    }
    const parsed = new Date(trimmed);
    if (!isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 0, 0, 0, 0);
    }
  }
  return new Date();
}

export function getLocalDateString(d: Date = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getCalendarDaysDifference(
  endDateInput?: string | Date | null,
  fromDateInput?: string | Date | null
): number {
  if (!endDateInput) return 0;
  const end = parseLocalDate(endDateInput);
  const start = parseLocalDate(fromDateInput || new Date());
  const diffMs = end.getTime() - start.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function parseDurationMonths(duration?: string | number | null): number {
  if (!duration) return 1;
  const str = String(duration).toLowerCase().trim();
  if (str.includes("year")) {
    const m = str.match(/\d+/);
    return m ? parseInt(m[0], 10) * 12 : 12;
  }
  const m = str.match(/\d+/);
  return m ? parseInt(m[0], 10) : 1;
}

export function calculatePlanExpiryDate(
  startDateInput?: string | Date | null,
  durationMonthsInput: string | number | null = 1
): string {
  const start = parseLocalDate(startDateInput || new Date());
  const months = parseDurationMonths(durationMonthsInput);
  const end = new Date(start);
  const targetDay = start.getDate();
  end.setMonth(end.getMonth() + months);
  if (end.getDate() !== targetDay) {
    end.setDate(0);
  }
  return getLocalDateString(end);
}

export function calculatePlanStats({
  planPrice,
  durationMonths,
  startDate,
  endDate,
  isActive = true,
}: {
  planPrice: number;
  durationMonths?: string | number | null;
  startDate?: string | Date | null;
  endDate?: string | Date | null;
  isActive?: boolean;
}) {
  const months = parseDurationMonths(durationMonths);

  const hasDates = Boolean(startDate && endDate);
  const totalDays = hasDates
    ? Math.max(1, getCalendarDaysDifference(endDate, startDate))
    : Math.max(1, months * 30);

  const daysPassed = startDate
    ? Math.max(0, getCalendarDaysDifference(new Date(), startDate))
    : 0;

  const calendarDaysLeft = endDate ? getCalendarDaysDifference(endDate, new Date()) : 0;
  const remainingDays = endDate ? Math.max(0, calendarDaysLeft) : Math.max(0, totalDays - daysPassed);

  const isExpired = endDate ? calendarDaysLeft < 0 : false;
  const isPlanActive = Boolean(isActive && !isExpired && remainingDays > 0);

  const dailyRate = Number((planPrice / totalDays).toFixed(2));

  let unusedCredit = 0;
  if (isPlanActive && planPrice > 0) {
    const rawCredit = (remainingDays / totalDays) * planPrice;
    unusedCredit = Math.min(planPrice, Math.max(0, Number(rawCredit.toFixed(1))));
  }

  return {
    planPrice,
    months,
    totalStandardDays: totalDays,
    dailyRate,
    daysPassed,
    standardRemainingDays: remainingDays,
    remainingDays,
    unusedCredit,
    isPlanActive,
    isExpired,
  };
}

export function calculateUpgradePayable({
  newPlanPrice,
  unusedCredit,
}: {
  newPlanPrice: number;
  unusedCredit: number;
}) {
  const payableAmount = Math.max(0, Number((newPlanPrice - unusedCredit).toFixed(1)));
  return {
    newPlanPrice,
    unusedCredit,
    payableAmount,
  };
}
