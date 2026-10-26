import { StudentInfo, ArenaHistoryRecord, StudentActivityLog, LeaderboardEntry } from '../types';

// Production Google Apps Script Web App URL
export const DEFAULT_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz1ddpLs9M2QKfC8OiwyYTnwOU-uoTjhAFJbS6pwxZQXPrzRKb_3E2Cdb76-g3B21Em7A/exec';

// Get active Apps Script URL (prioritizes localStorage, then env, then default production URL)
export const getAppsScriptUrl = (): string => {
  try {
    return localStorage.getItem('google_apps_script_url') || import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || DEFAULT_APPS_SCRIPT_URL;
  } catch {
    return DEFAULT_APPS_SCRIPT_URL;
  }
};

export const setAppsScriptUrl = (url: string) => {
  try {
    if (url.trim()) {
      localStorage.setItem('google_apps_script_url', url.trim());
    } else {
      localStorage.removeItem('google_apps_script_url');
    }
  } catch {
    // fallback
  }
};

export interface SyncPayload {
  action?: string;
  student: StudentInfo;
  totalScore: number;
  totalCorrectQuestions?: number;
  studyDurationSeconds?: number;
  badgesCount?: number;
  badgeCount?: number;
  arenaBestScore?: number;
  rankTitle?: string;
  activity?: StudentActivityLog;
  activityLogs?: StudentActivityLog[];
  arenaRecord?: ArenaHistoryRecord;
  arenaHistory?: ArenaHistoryRecord[];
}

/**
 * Format total study seconds into friendly Vietnamese display
 */
export const formatStudyTime = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds} giây`;
  }
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSecs = seconds % 60;

  if (hours > 0) {
    return `${hours} giờ ${minutes} phút`;
  }
  return `${minutes} phút ${remainingSecs > 0 ? `${remainingSecs}s` : ''}`.trim();
};

/**
 * Danh sách rỗng ban đầu, chỉ lấy 100% học sinh thực tế từ Google Sheet
 */
const SEED_NATIONAL_LEADERBOARD: LeaderboardEntry[] = [];

/**
 * Dispatch background sync payload to Google Apps Script silently
 */
export const sendSyncToGoogleSheets = async (payload: SyncPayload): Promise<boolean> => {
  const url = getAppsScriptUrl();
  if (!url) return false;

  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      mode: 'no-cors'
    });
    return true;
  } catch {
    return false;
  }
};

/**
 * Fetch real-time national leaderboard
 * If connected to Google Sheet, queries via GET; otherwise merges current student with seed data.
 */
export const fetchNationalLeaderboard = async (
  currentStudent: StudentInfo | null,
  currentTotalScore: number = 0,
  currentArenaScore: number = 0,
  studySeconds: number = 0,
  badgeCount: number = 1,
  rankTitle: string = 'CHIẾN BINH SỐ TIẾN BỘ'
): Promise<LeaderboardEntry[]> => {
  const url = getAppsScriptUrl();
  let baseList: LeaderboardEntry[] = [...SEED_NATIONAL_LEADERBOARD];

  if (url) {
    try {
      const res = await fetch(`${url}?action=leaderboard`, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          baseList = data;
        }
      }
    } catch {
      // Fallback to seed data seamlessly
    }
  }

  // If student is logged in, insert/update current student entry
  if (currentStudent) {
    const studentEntry: LeaderboardEntry = {
      fullName: currentStudent.fullName,
      grade: currentStudent.grade,
      school: currentStudent.school,
      avatarId: currentStudent.avatarId,
      totalScore: currentTotalScore,
      arenaScore: currentArenaScore,
      studyMinutes: Math.max(1, Math.round(studySeconds / 60)),
      badgeCount: badgeCount,
      rankTitle: rankTitle,
      lastActive: 'Vừa xong',
      isCurrentStudent: true
    };

    // Remove any previous entry with exact same name & school
    const filtered = baseList.filter(
      (item) => !(item.fullName.toLowerCase() === currentStudent.fullName.toLowerCase() && item.school.toLowerCase() === currentStudent.school.toLowerCase())
    );

    // Merge and sort by totalScore descending, then arenaScore descending
    const merged = [...filtered, studentEntry];
    merged.sort((a, b) => b.totalScore - a.totalScore || b.arenaScore - a.arenaScore);

    // Re-assign ranks 1..N
    return merged.map((item, index) => ({
      ...item,
      rank: index + 1
    }));
  }

  return baseList.map((item, index) => ({
    ...item,
    rank: index + 1
  }));
};

/**
 * Alias helper for LeaderboardModal
 */
export const fetchLeaderboard = (
  currentStudent: StudentInfo | null,
  currentTotalScore: number = 0,
  studySeconds: number = 0
): Promise<LeaderboardEntry[]> => {
  return fetchNationalLeaderboard(currentStudent, currentTotalScore, 0, studySeconds);
};
