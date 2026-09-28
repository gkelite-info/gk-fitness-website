export const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();

export const getFirstDayOfMonth = (year: number, month: number) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Convert Sunday (0) to 6, Monday (1) to 0, etc.
};

export const DEMO_TODAY = new Date(2026, 6, 16); // 16 July 2026

// Simple pseudo-random generator based on seed
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

// Generate a mock map of attendances (key: YYYY-MM-DD, value: true/false)
export const generateMockAttendance = (year: number, month: number) => {
  const attendanceRecord: Record<string, boolean> = {};
  const days = getDaysInMonth(year, month);
  
  for (let i = 1; i <= days; i++) {
    const date = new Date(year, month, i);
    const dayOfWeek = date.getDay();
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const seed = year * 10000 + month * 100 + i;
    
    // Deterministic pseudo-random based on the date
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      attendanceRecord[dateStr] = pseudoRandom(seed) > 0.2;
    } else {
      attendanceRecord[dateStr] = pseudoRandom(seed) > 0.8;
    }
  }
  return attendanceRecord;
};

export const formatDateStr = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

export const getWeekDays = (date: Date) => {
  const currentDay = date.getDay();
  const diffToMonday = currentDay === 0 ? 6 : currentDay - 1;
  const monday = new Date(date);
  monday.setDate(date.getDate() - diffToMonday);

  const week = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    week.push(d);
  }
  return week;
};
