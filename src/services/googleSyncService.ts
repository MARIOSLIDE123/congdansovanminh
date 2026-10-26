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
 * High-quality National Leaderboard seed data (Top học sinh lớp 8 toàn quốc)
 */
const SEED_NATIONAL_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    fullName: 'Trần Gia Bảo',
    grade: '8A1',
    school: 'THCS Giảng Võ (Hà Nội)',
    avatarId: 'phi_hanh_gia',
    totalScore: 290,
    arenaScore: 200,
    studyMinutes: 85,
    badgeCount: 8,
    rankTitle: 'SIÊU SAO CÔNG DÂN SỐ',
    lastActive: 'Vừa xong'
  },
  {
    rank: 2,
    fullName: 'Lê Thảo Vy',
    grade: '8A2',
    school: 'THCS Lê Quý Đôn (TP.HCM)',
    avatarId: 'nu_thong_thai',
    totalScore: 280,
    arenaScore: 190,
    studyMinutes: 72,
    badgeCount: 8,
    rankTitle: 'SIÊU SAO CÔNG DÂN SỐ',
    lastActive: '5 phút trước'
  },
  {
    rank: 3,
    fullName: 'Nguyễn Đăng Khoa',
    grade: '8B1',
    school: 'THCS Trưng Vương (Đà Nẵng)',
    avatarId: 'nam_nang_dong',
    totalScore: 270,
    arenaScore: 190,
    studyMinutes: 65,
    badgeCount: 7,
    rankTitle: 'SIÊU SAO CÔNG DÂN SỐ',
    lastActive: '12 phút trước'
  },
  {
    rank: 4,
    fullName: 'Phạm Minh Châu',
    grade: '8A3',
    school: 'THCS Trần Phú (Hải Phòng)',
    avatarId: 'nghe_si_so',
    totalScore: 260,
    arenaScore: 180,
    studyMinutes: 58,
    badgeCount: 7,
    rankTitle: 'SIÊU SAO CÔNG DÂN SỐ',
    lastActive: '25 phút trước'
  },
  {
    rank: 5,
    fullName: 'Hoàng Quốc Tuấn',
    grade: '8C',
    school: 'THCS Đặng Thai Mai (Nghệ An)',
    avatarId: 'tham_hiem',
    totalScore: 250,
    arenaScore: 170,
    studyMinutes: 50,
    badgeCount: 6,
    rankTitle: 'CHUYÊN GIA CÔNG DÂN SỐ',
    lastActive: '1 giờ trước'
  },
  {
    rank: 6,
    fullName: 'Đỗ Phương Linh',
    grade: '8A4',
    school: 'THCS Nguyễn Tri Phương (Huế)',
    avatarId: 'nu_thong_thai',
    totalScore: 240,
    arenaScore: 160,
    studyMinutes: 45,
    badgeCount: 6,
    rankTitle: 'CHUYÊN GIA CÔNG DÂN SỐ',
    lastActive: '2 giờ trước'
  },
  {
    rank: 7,
    fullName: 'Vũ Đức Thịnh',
    grade: '8B2',
    school: 'THCS Đoàn Thị Điểm (Cần Thơ)',
    avatarId: 'nam_nang_dong',
    totalScore: 230,
    arenaScore: 160,
    studyMinutes: 40,
    badgeCount: 5,
    rankTitle: 'CHUYÊN GIA CÔNG DÂN SỐ',
    lastActive: '3 giờ trước'
  },
  {
    rank: 8,
    fullName: 'Bùi Anh Thư',
    grade: '8A1',
    school: 'THCS Quang Trung (Lâm Đồng)',
    avatarId: 'nghe_si_so',
    totalScore: 210,
    arenaScore: 150,
    studyMinutes: 38,
    badgeCount: 5,
    rankTitle: 'CHUYÊN GIA CÔNG DÂN SỐ',
    lastActive: 'Hôm nay'
  }
];

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
