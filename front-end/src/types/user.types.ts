export type UserRole = 'user' | 'admin';

export interface ISolvedProblemStats {
  easy: number;
  medium: number;
  hard: number;
  all: number;
}

export interface ISubmissionStats {
  totalSubmissions: number;
  acceptedSubmissions: number;
}

export interface IStreakInfo {
  currentStreak: number;
  maxStreak: number;
  lastSolvedDate?: string;
}

export interface IContestStats {
  rating: number;
  globalRanking?: number;
  attendedContests: number;
  topPercentage?: number;
}

export interface ILanguageStat {
  language: string;
  problemsSolved: number;
}

export interface IBadge {
  badgeId: string;
  name: string;
  icon: string;
  category: 'daily_challenge' | 'contest' | 'study_plan' | 'achievement';
  description?: string;
  earnedAt: string;
}

export interface IUserProfile {
  realName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  school?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
  profile: IUserProfile;
  stats: {
    solved: ISolvedProblemStats;
    submissions: ISubmissionStats;
    streak: IStreakInfo;
    contest: IContestStats;
    languages: ILanguageStat[];
  };
  badges: IBadge[];
  starredProblems: string[];
  bookmarkedSolutions: string[];
  submissionCalendar: Record<string, number>;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

