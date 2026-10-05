export type Story = {
  id: string;
  name: string;
  avatar: string;
  segments?: { url: string; type: "image" | "video"; trimStart?: number; trimEnd?: number }[];
  isUser?: boolean;
  hasUnseen?: boolean;
};

export type PostMedia = {
  url: string;
  overlayText?: string;
};

export type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: "Trainer" | "Member" | "Owner";
  };
  timeAgo: string;
  tag?: string;
  content: string;
  media: PostMedia[];
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isUser?: boolean;
};

export const MOCK_STORIES: Story[] = [
  { id: "1", name: "Your story", avatar: "https://i.pravatar.cc/150?u=yourstory", isUser: true, hasUnseen: false },
  { id: "2", name: "Stephen", avatar: "https://i.pravatar.cc/150?u=stephen", hasUnseen: true },
  { id: "3", name: "Sara", avatar: "https://i.pravatar.cc/150?u=sara", hasUnseen: true },
  { id: "4", name: "Jones", avatar: "https://i.pravatar.cc/150?u=jones", hasUnseen: true },
  { id: "5", name: "Vikram", avatar: "https://i.pravatar.cc/150?u=vikram", hasUnseen: true },
  { id: "6", name: "Neha", avatar: "https://i.pravatar.cc/150?u=neha", hasUnseen: true },
  { id: "7", name: "Marcus", avatar: "https://i.pravatar.cc/150?u=marcus", hasUnseen: true },
];

export const MOCK_POSTS: Post[] = [
  {
    id: "p1",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?u=alex",
      role: "Trainer",
    },
    timeAgo: "2h ago",
    tag: "Chest & Triceps",
    content: "Pushed through an intense chest & triceps session today! Consistency is everything. 💪",
    media: [
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1470&auto=format&fit=crop" },
    ],
    likes: 248,
    comments: 18,
    shares: 12,
    isLiked: true,
    isBookmarked: true,
    isUser: true,
  },
  {
    id: "p2",
    author: {
      name: "Sarah Lee",
      avatar: "https://i.pravatar.cc/150?u=sarah",
      role: "Member",
    },
    timeAgo: "5h ago",
    tag: "Progress",
    content: "Day 30 progress! Down 3.5 kg and feeling stronger every day. Small steps, big changes. 🌟",
    media: [
      { url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1470&auto=format&fit=crop", overlayText: "Day 1" },
      { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop", overlayText: "Day 30" },
    ],
    likes: 412,
    comments: 32,
    shares: 5,
  },
  {
    id: "p3",
    author: {
      name: "Marcus Gym",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      role: "Owner",
    },
    timeAgo: "1d ago",
    tag: "Announcements",
    content: "New equipment just arrived! We've added 5 new power racks and 3 new cable machines. Come check them out! 🚀\nAlso testing the multi-image layout with 5 pictures.",
    media: [
      { url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1596357395217-80de13130e92?q=80&w=1471&auto=format&fit=crop" },
      { url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1469&auto=format&fit=crop" },
    ],
    likes: 890,
    comments: 145,
    shares: 45,
  },
];
