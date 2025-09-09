import { User, Query, Resource, Badge } from '../types';

export const badges: Badge[] = [
  { id: '1', name: 'Bronze Helper', icon: '🥉', description: 'Earned 0-50 points', pointsRequired: 0 },
  { id: '2', name: 'Silver Mentor', icon: '🥈', description: 'Earned 51-150 points', pointsRequired: 51 },
  { id: '3', name: 'Gold Champion', icon: '🥇', description: 'Earned 151+ points', pointsRequired: 151 },
  { id: '4', name: 'Knowledge Seeker', icon: '📚', description: 'Asked 10+ questions', pointsRequired: 0 },
  { id: '5', name: 'Resource Contributor', icon: '📊', description: 'Shared 5+ resources', pointsRequired: 0 },
];

export const users: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@college.edu',
    role: 'alumni',
    batch: '2020',
    company: 'Google',
    skills: ['React', 'Node.js', 'Python', 'Machine Learning'],
    points: 285,
    badges: [badges[2], badges[4]],
    bio: 'Software Engineer passionate about mentoring students',
    location: 'San Francisco, CA',
    linkedin: 'alice-johnson',
    github: 'alicej'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@college.edu',
    role: 'alumni',
    batch: '2019',
    company: 'Microsoft',
    skills: ['C#', '.NET', 'Azure', 'DevOps'],
    points: 192,
    badges: [badges[2], badges[4]],
    bio: 'Cloud Solutions Architect helping the next generation',
    location: 'Seattle, WA',
    linkedin: 'bob-smith-dev'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@college.edu',
    role: 'student',
    batch: '2025',
    company: undefined,
    skills: ['JavaScript', 'React', 'HTML', 'CSS'],
    points: 45,
    badges: [badges[0], badges[3]],
    bio: 'Computer Science student eager to learn',
    location: 'College Town, ST'
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@college.edu',
    role: 'alumni',
    batch: '2021',
    company: 'Amazon',
    skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes'],
    points: 156,
    badges: [badges[2]],
    bio: 'Backend engineer with expertise in distributed systems',
    location: 'Austin, TX'
  },
  {
    id: '5',
    name: 'Emma Thompson',
    email: 'emma@college.edu',
    role: 'student',
    batch: '2024',
    company: undefined,
    skills: ['Python', 'Data Science', 'SQL'],
    points: 78,
    badges: [badges[1], badges[3]],
    bio: 'Data Science major passionate about analytics',
    location: 'College Town, ST'
  }
];

export const queries: Query[] = [
  {
    id: '1',
    studentId: '3',
    question: 'What are the best practices for React state management?',
    tags: ['React', 'JavaScript', 'Frontend'],
    answers: [
      {
        id: '1',
        alumniId: '1',
        answer: 'For small to medium apps, React\'s built-in useState and useContext are sufficient. For larger apps, consider Redux Toolkit or Zustand. Always lift state up only when necessary and use local state when possible.',
        upvotes: 15,
        createdAt: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        alumniId: '2',
        answer: 'I\'d also recommend looking into React Query for server state management. It handles caching, synchronization, and background updates beautifully.',
        upvotes: 8,
        createdAt: '2024-01-15T14:20:00Z'
      }
    ],
    createdAt: '2024-01-15T09:15:00Z',
    upvotes: 23
  },
  {
    id: '2',
    studentId: '5',
    question: 'How to prepare for data science interviews at FAANG companies?',
    tags: ['Data Science', 'Interview', 'Career'],
    answers: [
      {
        id: '3',
        alumniId: '1',
        answer: 'Focus on statistics fundamentals, SQL, Python/R, and machine learning concepts. Practice coding problems on LeetCode and do mock interviews. Also, prepare case studies showing your analytical thinking.',
        upvotes: 12,
        createdAt: '2024-01-16T11:45:00Z'
      }
    ],
    createdAt: '2024-01-16T08:30:00Z',
    upvotes: 18
  },
  {
    id: '3',
    studentId: '3',
    question: 'What cloud certifications are most valuable for backend developers?',
    tags: ['AWS', 'Cloud', 'Backend', 'Certification'],
    answers: [
      {
        id: '4',
        alumniId: '4',
        answer: 'AWS Solutions Architect Associate is a great starting point. For backend focus, also consider AWS Developer Associate. Google Cloud Professional Cloud Architect is valuable too if your company uses GCP.',
        upvotes: 20,
        createdAt: '2024-01-17T16:15:00Z'
      }
    ],
    createdAt: '2024-01-17T13:20:00Z',
    upvotes: 25
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    alumniId: '1',
    title: 'Complete React Interview Guide',
    description: 'Comprehensive guide covering React concepts, hooks, performance optimization, and common interview questions with detailed answers.',
    link: '#',
    category: 'Interview Prep',
    downloadCount: 156,
    createdAt: '2024-01-10T12:00:00Z'
  },
  {
    id: '2',
    alumniId: '2',
    title: 'Azure DevOps Best Practices',
    description: 'Enterprise-level best practices for CI/CD pipelines, infrastructure as code, and automated testing in Azure DevOps.',
    link: '#',
    category: 'DevOps',
    downloadCount: 89,
    createdAt: '2024-01-12T15:30:00Z'
  },
  {
    id: '3',
    alumniId: '4',
    title: 'System Design Templates',
    description: 'Collection of system design templates and architecture patterns for scalable applications, including microservices and distributed systems.',
    link: '#',
    category: 'System Design',
    downloadCount: 234,
    createdAt: '2024-01-14T10:45:00Z'
  },
  {
    id: '4',
    alumniId: '1',
    title: 'Machine Learning Cheat Sheets',
    description: 'Quick reference guides for popular ML algorithms, feature engineering techniques, and model evaluation metrics.',
    link: '#',
    category: 'Machine Learning',
    downloadCount: 178,
    createdAt: '2024-01-16T09:20:00Z'
  }
];