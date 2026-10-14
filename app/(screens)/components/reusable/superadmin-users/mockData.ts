import { PlatformUser } from "./types";

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80",
  "",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&q=80",
];

const NAMES = [
  "Karan Patel",
  "Arjun Mehta",
  "Priya Sharma",
  "Amit Khanna",
  "Sneha Kapoor",
  "Vikram Singh",
  "Rahul Verma",
  "Neha Deshmukh",
  "Rohan Gupta",
  "Ananya Iyer",
  "Sameer Joshi",
  "Pooja Nair",
];

const GYMS = [
  { name: "IronCore Fitness", location: "Delhi, India" },
  { name: "FitZone Fitness", location: "Mumbai, Maharashtra" },
  { name: "PowerHouse Gym", location: "Bangalore, Karnataka" },
  { name: "A1 & Wellness", location: "Chennai, Tamil Nadu" },
  { name: "Gold Fitness", location: "Hyderabad, Telangana" },
  { name: "Muscle Arena", location: "Pune, Maharashtra" },
  { name: "Titanium Strength", location: "Kolkata, West Bengal" },
  { name: "Zenith Gym", location: "Ahmedabad, Gujarat" },
];

const DATES = [
  { text: "08 May 2026", ts: 1778284800000 },
  { text: "12 May 2026", ts: 1778630400000 },
  { text: "10 May 2026", ts: 1778457600000 },
  { text: "30 Apr 2026", ts: 1777593600000 },
  { text: "25 Apr 2026", ts: 1777161600000 },
  { text: "18 Apr 2026", ts: 1776556800000 },
  { text: "05 Apr 2026", ts: 1775433600000 },
  { text: "22 Mar 2026", ts: 1774224000000 },
];

export function generateMockUsers(): PlatformUser[] {
  const users: PlatformUser[] = [];

  for (let i = 0; i < 120; i++) {
    const nameIndex = i % NAMES.length;
    const gymIndex = i % GYMS.length;
    const dateIndex = i % DATES.length;
    const isInactive = i % 4 === 0 || i % 4 === 3;

    users.push({
      id: `owner-${i + 1}`,
      name: NAMES[nameIndex],
      role: "owners",
      code: `OW${1240 + i}`,
      avatarUrl: AVATARS[nameIndex % AVATARS.length],
      gymName: GYMS[gymIndex].name,
      location: GYMS[gymIndex].location,
      joinedDate: DATES[dateIndex].text,
      joinedTimestamp: DATES[dateIndex].ts - i * 86400000,
      status: isInactive ? "Inactive" : "Active",
    });
  }

  for (let i = 0; i < 30; i++) {
    const nameIndex = (i + 2) % NAMES.length;
    const gymIndex = (i + 1) % GYMS.length;
    const dateIndex = (i + 3) % DATES.length;

    users.push({
      id: `trainer-${i + 1}`,
      name: NAMES[nameIndex],
      role: "trainers",
      code: `TR${2000 + i}`,
      avatarUrl: AVATARS[nameIndex % AVATARS.length],
      gymName: GYMS[gymIndex].name,
      location: GYMS[gymIndex].location,
      joinedDate: DATES[dateIndex].text,
      joinedTimestamp: DATES[dateIndex].ts - i * 86400000,
      status: i % 5 === 0 ? "Inactive" : "Active",
    });
  }

  const FIRST_8_GLOBAL_TRAINERS: {
    name: string;
    mobile: string;
    email: string;
    joinedDate: string;
    status: "Active" | "Inactive";
  }[] = [
    { name: "Rahul Sharma", mobile: "+91 98765 43210", email: "rahul.sharma@gmail.com", joinedDate: "12 Jan 2025", status: "Active" },
    { name: "Sneha Kapoor", mobile: "+91 91234 56789", email: "sneha.kapoor@gmail.com", joinedDate: "28 Jan 2025", status: "Active" },
    { name: "Vikram Singh", mobile: "+91 99887 66554", email: "vikram.singh@gmail.com", joinedDate: "05 Feb 2025", status: "Active" },
    { name: "Pooja Nair", mobile: "+91 90099 11223", email: "pooja.nair@gmail.com", joinedDate: "18 Feb 2025", status: "Inactive" },
    { name: "Rohit Verma", mobile: "+91 93456 77881", email: "rohit.verma@gmail.com", joinedDate: "10 Mar 2025", status: "Active" },
    { name: "Ananya Reddy", mobile: "+91 87965 44321", email: "ananya.reddy@gmail.com", joinedDate: "22 Mar 2025", status: "Active" },
    { name: "Suresh Kumar", mobile: "+91 99876 54321", email: "suresh.kumar@gmail.com", joinedDate: "02 Apr 2025", status: "Inactive" },
    { name: "Neha Kapoor", mobile: "+91 90123 45678", email: "neha.kapoor@gmail.com", joinedDate: "15 Apr 2025", status: "Active" },
  ];

  for (let i = 0; i < 186; i++) {
    if (i < 8) {
      const g = FIRST_8_GLOBAL_TRAINERS[i];
      users.push({
        id: `global-tr-${i + 1}`,
        name: g.name,
        role: "global-trainers",
        code: `GT${3000 + i}`,
        avatarUrl: AVATARS[i % AVATARS.length],
        gymName: "Global GK Network",
        location: "Worldwide",
        mobileNumber: g.mobile,
        email: g.email,
        joinedDate: g.joinedDate,
        joinedTimestamp: 1736640000000 - i * 86400000 * 5,
        status: g.status,
      });
    } else {
      const name = `${NAMES[i % NAMES.length]} ${Math.floor(i / NAMES.length) + 1}`;
      const email = `${NAMES[i % NAMES.length].toLowerCase().replace(/\s+/g, ".")}${Math.floor(i / NAMES.length) + 1}@gmail.com`;
      const mobile = `+91 ${90000 + (i % 1000)} ${40000 + (i % 1000)}`;
      const dateIndex = i % DATES.length;
      const isInactive = i % 5 === 0;

      users.push({
        id: `global-tr-${i + 1}`,
        name,
        role: "global-trainers",
        code: `GT${3000 + i}`,
        avatarUrl: AVATARS[i % AVATARS.length],
        gymName: "Global GK Network",
        location: "Worldwide",
        mobileNumber: mobile,
        email,
        joinedDate: DATES[dateIndex].text,
        joinedTimestamp: DATES[dateIndex].ts - i * 86400000,
        status: isInactive ? "Inactive" : "Active",
      });
    }
  }

  for (let i = 0; i < 40; i++) {
    const nameIndex = (i + 5) % NAMES.length;
    const gymIndex = (i + 2) % GYMS.length;
    const dateIndex = (i + 4) % DATES.length;

    users.push({
      id: `gym-customer-${i + 1}`,
      name: NAMES[nameIndex],
      role: "gym-customers",
      code: `GC${4000 + i}`,
      avatarUrl: AVATARS[nameIndex % AVATARS.length],
      gymName: GYMS[gymIndex].name,
      location: GYMS[gymIndex].location,
      joinedDate: DATES[dateIndex].text,
      joinedTimestamp: DATES[dateIndex].ts - i * 86400000,
      status: i % 3 === 0 ? "Inactive" : "Active",
    });
  }

  const FIRST_8_INDIVIDUAL_CUSTOMERS = [
    { name: "Priya Sharma", code: "CUS1001", mobile: "+91 98765 43210", email: "priya.sharma@gmail.com", joinedDate: "12 Oct 2026", status: "Active" as const, gender: "Female" },
    { name: "Rahul Verma", code: "CUS1002", mobile: "+91 91234 56789", email: "rahul.verma@gmail.com", joinedDate: "10 Oct 2026", status: "Active" as const, gender: "Male" },
    { name: "Sneha Kapoor", code: "CUS1003", mobile: "+91 99876 54321", email: "sneha.kapoor@gmail.com", joinedDate: "08 Oct 2026", status: "Active" as const, gender: "Female" },
    { name: "Amit Reddy", code: "CUS1004", mobile: "+91 90012 34567", email: "amit.reddy@gmail.com", joinedDate: "05 Oct 2026", status: "Inactive" as const, gender: "Male" },
    { name: "Neha Singh", code: "CUS1005", mobile: "+91 93456 77881", email: "neha.singh@gmail.com", joinedDate: "28 Sep 2026", status: "Active" as const, gender: "Female" },
    { name: "Vikram Nair", code: "CUS1006", mobile: "+91 87965 44321", email: "vikram.nair@gmail.com", joinedDate: "25 Sep 2026", status: "Active" as const, gender: "Male" },
    { name: "Ananya Gupta", code: "CUS1007", mobile: "+91 98877 66554", email: "ananya.gupta@gmail.com", joinedDate: "20 Sep 2026", status: "Inactive" as const, gender: "Female" },
    { name: "Suresh Kumar", code: "CUS1008", mobile: "+91 90123 45678", email: "suresh.kumar@gmail.com", joinedDate: "18 Sep 2026", status: "Active" as const, gender: "Male" },
  ];

  for (let i = 0; i < 486; i++) {
    if (i < 8) {
      const c = FIRST_8_INDIVIDUAL_CUSTOMERS[i];
      users.push({
        id: `ind-customer-${i + 1}`,
        name: c.name,
        role: "individual-customers",
        code: c.code,
        avatarUrl: AVATARS[i % AVATARS.length],
        gymName: "Individual App User",
        location: "Worldwide",
        mobileNumber: c.mobile,
        email: c.email,
        joinedDate: c.joinedDate,
        joinedTimestamp: 1791888000000 - i * 86400000 * 2,
        status: c.status,
        dob: "24 Mar 1995",
        gender: c.gender,
        address: "Flat 12B, Sunrise Towers, Hyderabad, Telangana - 500081",
        accountType: "Individual Customer",
        subscriptionPlan: "Annual Pro Elite",
        renewalDate: "11 Jan 2025",
        paymentStatus: "Paid",
      });
    } else {
      const name = `${NAMES[i % NAMES.length]} ${Math.floor(i / NAMES.length) + 1}`;
      const email = `${NAMES[i % NAMES.length].toLowerCase().replace(/\s+/g, ".")}${Math.floor(i / NAMES.length) + 1}@gmail.com`;
      const mobile = `+91 ${98000 + (i % 1000)} ${50000 + (i % 1000)}`;
      const dateIndex = i % DATES.length;
      const isInactive = i % 5 === 0;
      const isFemale = (i % NAMES.length) % 2 === 0;

      users.push({
        id: `ind-customer-${i + 1}`,
        name,
        role: "individual-customers",
        code: `CUS${1009 + (i - 8)}`,
        avatarUrl: AVATARS[i % AVATARS.length],
        gymName: "Individual App User",
        location: "Worldwide",
        mobileNumber: mobile,
        email,
        joinedDate: DATES[dateIndex].text,
        joinedTimestamp: DATES[dateIndex].ts - i * 86400000,
        status: isInactive ? "Inactive" : "Active",
        dob: "24 Mar 1995",
        gender: isFemale ? "Female" : "Male",
        address: "Flat 12B, Sunrise Towers, Hyderabad, Telangana - 500081",
        accountType: "Individual Customer",
        subscriptionPlan: "Annual Pro Elite",
        renewalDate: "11 Jan 2025",
        paymentStatus: "Paid",
      });
    }
  }

  return users;
}
