export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'alumni';
  batch?: string;
  company?: string;
  skills: string[];
  points: number;
  badges: Badge[];
  avatar?: string;
  bio?: string;
  location?: string;
  linkedin?: string;
  github?: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  pointsRequired: number;
}

export interface Query {
  id: string;
  studentId: string;
  question: string;
  tags: string[];
  answers: Answer[];
  createdAt: string;
  upvotes: number;
}

export interface Answer {
  id: string;
  alumniId: string;
  answer: string;
  upvotes: number;
  createdAt: string;
}

export interface Resource {
  id: string;
  alumniId: string;
  title: string;
  description: string;
  link: string;
  category: string;
  downloadCount: number;
  createdAt: string;
}

export interface LeaderboardEntry {
  user: User;
  rank: number;
  pointsThisMonth: number;
}