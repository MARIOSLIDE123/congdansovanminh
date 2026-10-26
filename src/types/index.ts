export interface StudentInfo {
  fullName: string;
  grade: string;
  school: string;
  avatarId: string;
  loginTime?: string;
}

export type AppSection = 'home' | 'learning' | 'mindmap' | 'practice' | 'arena';

export interface QuestionOption {
  id: string; // e.g. 'A', 'B', 'C', 'D'
  text: string;
}

export interface PracticeQuestion {
  id: number;
  scenario?: string;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
  icon?: string;
}

export interface ArenaQuestion {
  id: number;
  stage: 1 | 2 | 3;
  stageName: string;
  question: string;
  options: { key: string; text: string }[];
  correctKey: string;
  explanation: string;
}

export interface ShuffledArenaQuestion {
  id: number;
  stage: 1 | 2 | 3;
  stageName: string;
  question: string;
  options: { key: string; text: string; originalKey: string }[];
  correctIndex: number; // 0, 1, 2, 3
  explanation: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'learning' | 'mindmap' | 'practice' | 'arena' | 'master';
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ArenaHistoryRecord {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  durationSeconds?: number;
  rankTitle: string;
}

export interface AppState {
  student: StudentInfo | null;
  currentSection: AppSection;
  soundEnabled: boolean;
  learningCompleted: {
    part1: boolean;
    part2: boolean;
  };
  mindmapViewed: boolean;
  practiceAnswers: Record<number, { selectedKey: string; isCorrect: boolean }>;
  practiceScore: number;
  practiceCompleted: boolean;
  arenaBestScore: number;
  arenaLastScore: number;
  arenaHistory: ArenaHistoryRecord[];
  unlockedBadges: string[];
}
