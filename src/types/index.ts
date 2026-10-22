export type UserRole = 'school' | 'college' | 'competitive' | 'rural' | 'professional';

export type LanguageCode = 'en' | 'hi' | 'pa' | 'bn' | 'ta' | 'te';

export interface UserProfile {
  id: string;
  name: string;
  avatar: string;
  role: UserRole;
  gradeOrTarget: string;
  language: LanguageCode;
  xp: number;
  coins: number;
  level: number;
  streakDays: number;
  todayMinutes: number;
  weeklyGoalHours: number;
  badges: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  category: 'streak' | 'mastery' | 'speed' | 'explorer';
}

export interface LessonVideo {
  id: string;
  title: string;
  subject: string;
  topic: string;
  duration: string; // e.g., "18:45"
  durationSeconds: number;
  progressPercent: number;
  thumbnail: string;
  videoUrl: string;
  instructor: string;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  summary: string;
  transcript: { time: string; text: string }[];
  isDownloaded?: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'mcq' | 'true_false';
  subject: string;
}

export interface Quiz {
  id: string;
  title: string;
  subject: string;
  timeLimitSeconds: number;
  totalQuestions: number;
  questions: QuizQuestion[];
  xpReward: number;
  coinsReward: number;
}

export interface LeaderboardEntry {
  rank: number;
  userName: string;
  avatar: string;
  xp: number;
  streak: number;
  badge: string;
  isCurrentUser?: boolean;
}

export interface StudyTask {
  id: string;
  title: string;
  subject: string;
  time: string;
  duration: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ExamCountdown {
  id: string;
  examName: string;
  date: string;
  daysRemaining: number;
  targetScore: string;
  readinessPercentage: number;
}

export interface WeakTopic {
  id: string;
  subject: string;
  topic: string;
  accuracy: number;
  recommendedAction: string;
  recommendedVideoId: string;
}

export interface SubjectMastery {
  subject: string;
  masteryPercentage: number;
  color: string;
  hoursSpent: number;
  quizzesTaken: number;
}

export interface CareerPath {
  id: string;
  title: string;
  stream: string;
  matchScore: number;
  salaryRange: string;
  growth: string;
  topColleges: string[];
  keySkills: string[];
  description: string;
}

export interface ParentControlSettings {
  pin: string;
  dailyScreenLimitMinutes: number;
  bedtimeHour: number; // 24hr format e.g. 21 = 9 PM
  aiDoubtMonitoring: boolean;
  weeklyReportEmail: string;
  contentRestricted: boolean;
}

export type PageId =
  | 'landing'
  | 'splash'
  | 'auth'
  | 'home'
  | 'learning'
  | 'ai-assistant'
  | 'quiz'
  | 'analytics'
  | 'planner'
  | 'career'
  | 'parent'
  | 'settings'
  | 'profile';
