import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  StudentInfo, AppSection, ArenaHistoryRecord, StudentActivityLog 
} from './types';
import { soundManager } from './utils/sound';
import { Header } from './components/Header';
import { LoginScreen } from './components/LoginScreen';
import { HomeScreen } from './components/HomeScreen';
import { LearningSection } from './components/LearningSection';
import { MindmapSection } from './components/MindmapSection';
import { PracticeSection } from './components/PracticeSection';
import { ArenaSection } from './components/ArenaSection';
import { ArenaResultModal } from './components/ArenaResultModal';
import { BadgesModal } from './components/BadgesModal';
import { CertificateModal } from './components/CertificateModal';
import { StudentProfileModal } from './components/StudentProfileModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { BADGE_DEFINITIONS, getRankDetails } from './data/badgeData';
import { sendSyncToGoogleSheets } from './services/googleSyncService';

export default function App() {
  // 1. Student profile state (mandatory login)
  const [student, setStudent] = useState<StudentInfo | null>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_học_sinh');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 2. Navigation state
  const [currentSection, setCurrentSection] = useState<AppSection>('home');

  // 3. Sound toggle state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_âm_thanh');
      return saved !== null ? saved === 'true' : true;
    } catch {
      return true;
    }
  });

  // 4. Learning progress
  const [learningCompleted, setLearningCompleted] = useState<{ part1: boolean; part2: boolean }>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_bài_học');
      return saved ? JSON.parse(saved) : { part1: false, part2: false };
    } catch {
      return { part1: false, part2: false };
    }
  });

  // 5. Mindmap exploration state
  const [mindmapExplored, setMindmapExplored] = useState<boolean>(() => {
    try {
      return localStorage.getItem('công_dân_số_sơ_đồ') === 'true';
    } catch {
      return false;
    }
  });

  // 6. Practice score
  const [practiceScore, setPracticeScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_điểm_luyện_tập');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [practiceCorrectCount, setPracticeCorrectCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_câu_đúng_luyện_tập');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  // 7. Arena best score & history
  const [arenaBestScore, setArenaBestScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_kỷ_lục_đấu_trường');
      return saved ? Number(saved) : 0;
    } catch {
      return 0;
    }
  });

  const [arenaHistory, setArenaHistory] = useState<ArenaHistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_lịch_sử_đấu_trường');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 8. Badges unlocked
  const [unlockedBadges, setUnlockedBadges] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_huy_hiệu');
      return saved ? JSON.parse(saved) : ['khoi_dong_so'];
    } catch {
      return ['khoi_dong_so'];
    }
  });

  // 9. Real-time study duration in seconds
  const [studyDurationSeconds, setStudyDurationSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_thời_lượng_học');
      return saved ? Number(saved) : 180;
    } catch {
      return 180;
    }
  });

  // 10. Student activity log history
  const [activityLogs, setActivityLogs] = useState<StudentActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem('công_dân_số_nhật_ký_hoạt_động');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'log-seed-1',
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
          action: 'Đăng nhập ứng dụng',
          detail: 'Khởi tạo tài khoản học tập Công dân số văn minh',
          type: 'login'
        }
      ];
    } catch {
      return [];
    }
  });

  // 11. Modals state
  const [showBadgesModal, setShowBadgesModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [arenaResultData, setArenaResultData] = useState<{
    score: number;
    correctCount: number;
    wrongCount: number;
    durationSeconds: number;
    answeredDetails: {
      questionId: number;
      question: string;
      stageName: string;
      chosenText: string;
      chosenKey: string;
      correctText: string;
      correctKey: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  } | null>(null);

  // Sync sound manager enabled flag
  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
    try {
      localStorage.setItem('công_dân_số_âm_thanh', String(soundEnabled));
    } catch {
      // safe fallback
    }
  }, [soundEnabled]);

  // Real-time study duration timer (ticks every 1s when logged in)
  useEffect(() => {
    if (!student) return;

    const timer = setInterval(() => {
      setStudyDurationSeconds((prev) => {
        const next = prev + 1;
        // Persist every 10 seconds to avoid excessive disk I/O
        if (next % 10 === 0) {
          try {
            localStorage.setItem('công_dân_số_thời_lượng_học', String(next));
          } catch {
            // safe
          }
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [student]);

  // Helper to unlock badges
  const unlockBadge = (badgeId: string) => {
    setUnlockedBadges((prev) => {
      if (prev.includes(badgeId)) return prev;
      const updated = [...prev, badgeId];
      try {
        localStorage.setItem('công_dân_số_huy_hiệu', JSON.stringify(updated));
      } catch {
        // safe
      }
      return updated;
    });
  };

  // Helper to log student activities and trigger background sync
  const addActivityLog = useCallback((
    action: string,
    detail: string,
    type: 'login' | 'learning' | 'mindmap' | 'practice' | 'arena',
    scoreChange?: number
  ) => {
    const newLog: StudentActivityLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      action,
      detail,
      type,
      scoreChange
    };

    setActivityLogs((prev) => {
      const updated = [newLog, ...prev.slice(0, 49)];
      try {
        localStorage.setItem('công_dân_số_nhật_ký_hoạt_động', JSON.stringify(updated));
      } catch {
        // safe
      }
      return updated;
    });

    // Background silent sync to Google Sheets
    if (student) {
      const totalScoreCalc = practiceScore + arenaBestScore + (scoreChange || 0);
      const arenaCorrect = arenaResultData?.correctCount || (arenaBestScore > 0 ? Math.round(arenaBestScore / 10) : 0);
      const totalCorrectCalc = practiceCorrectCount + arenaCorrect;

      sendSyncToGoogleSheets({
        student,
        totalScore: totalScoreCalc,
        totalCorrectQuestions: totalCorrectCalc,
        studyDurationSeconds,
        badgesCount: unlockedBadges.length,
        arenaBestScore,
        arenaHistory,
        activityLogs: [newLog]
      });
    }
  }, [student, practiceScore, arenaBestScore, practiceCorrectCount, arenaResultData, studyDurationSeconds, unlockedBadges, arenaHistory]);

  // Handle student login
  const handleLogin = (info: StudentInfo) => {
    setStudent(info);
    try {
      localStorage.setItem('công_dân_số_học_sinh', JSON.stringify(info));
    } catch {
      // safe
    }
    unlockBadge('khoi_dong_so');
    setCurrentSection('home');
    addActivityLog('Đăng nhập ứng dụng', 'Bắt đầu phiên học tập mới', 'login');
  };

  // Handle logout / switch user
  const handleLogout = () => {
    soundManager.playClick();
    if (window.confirm('Bạn có chắc muốn đổi tài khoản học sinh khác không?')) {
      setStudent(null);
      try {
        localStorage.removeItem('công_dân_số_học_sinh');
      } catch {
        // safe
      }
    }
  };

  // Sound toggle
  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev);
  };

  // Navigation
  const handleNavigate = (section: AppSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete learning parts
  const handleCompletePart = (part: 'part1' | 'part2') => {
    const updated = {
      ...learningCompleted,
      [part]: true
    };
    setLearningCompleted(updated);
    try {
      localStorage.setItem('công_dân_số_bài_học', JSON.stringify(updated));
    } catch {
      // safe
    }

    if (part === 'part1') {
      unlockBadge('hoc_gia_part1');
      addActivityLog('Hoàn thành bài học Phần 1', 'Nắm vững 8 hành vi vi phạm đạo đức & văn hoá số', 'learning', 10);
    } else {
      unlockBadge('hoc_gia_part2');
      addActivityLog('Hoàn thành bài học Phần 2', 'Nắm vững 8 nguyên tắc tạo sản phẩm số trung thực', 'learning', 10);
    }
  };

  // Complete mindmap
  const handleExploreMindmapDone = () => {
    setMindmapExplored(true);
    try {
      localStorage.setItem('công_dân_số_sơ_đồ', 'true');
    } catch {
      // safe
    }
    unlockBadge('bac_thay_so_do');
    addActivityLog('Khám phá Sơ đồ tư duy', 'Xem toàn bộ 8 nhánh kiến thức trọng tâm', 'mindmap', 10);
  };

  // Save practice score
  const handleSavePracticeScore = (score: number, correctCount: number) => {
    setPracticeScore(score);
    setPracticeCorrectCount(correctCount);
    try {
      localStorage.setItem('công_dân_số_điểm_luyện_tập', String(score));
      localStorage.setItem('công_dân_số_câu_đúng_luyện_tập', String(correctCount));
    } catch {
      // safe
    }
    if (score === 100) {
      unlockBadge('luyen_tap_xuat_sac');
    }
    addActivityLog('Hoàn thành Luyện tập', `Đạt ${score} điểm (${correctCount} câu trả lời đúng)`, 'practice', score);
  };

  // Finish arena game
  const handleFinishArenaGame = (result: {
    score: number;
    correctCount: number;
    wrongCount: number;
    durationSeconds: number;
    answeredDetails: {
      questionId: number;
      question: string;
      stageName: string;
      chosenText: string;
      chosenKey: string;
      correctText: string;
      correctKey: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  }) => {
    soundManager.playVictory();
    setArenaResultData(result);

    // Update best score
    if (result.score > arenaBestScore) {
      setArenaBestScore(result.score);
      try {
        localStorage.setItem('công_dân_số_kỷ_lục_đấu_trường', String(result.score));
      } catch {
        // safe
      }
    }

    // Rank details
    const rank = getRankDetails(result.score);

    // Add to history
    const newRecord: ArenaHistoryRecord = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      }),
      score: result.score,
      totalQuestions: 20,
      correctCount: result.correctCount,
      wrongCount: result.wrongCount,
      durationSeconds: result.durationSeconds,
      rankTitle: rank.rankTitle
    };

    const updatedHistory = [newRecord, ...arenaHistory.slice(0, 9)];
    setArenaHistory(updatedHistory);
    try {
      localStorage.setItem('công_dân_số_lịch_sử_đấu_trường', JSON.stringify(updatedHistory));
    } catch {
      // safe
    }

    // Unlock badges based on score
    if (result.score >= 180) {
      unlockBadge('dau_truong_sieu_sao');
      unlockBadge('dau_truong_chuyen_gia');
      unlockBadge('dau_truong_chien_binh');
    } else if (result.score >= 150) {
      unlockBadge('dau_truong_chuyen_gia');
      unlockBadge('dau_truong_chien_binh');
    } else if (result.score >= 100) {
      unlockBadge('dau_truong_chien_binh');
    }

    addActivityLog(
      'Thi đấu Đấu trường',
      `Đạt ${result.score}/200 điểm (${result.correctCount}/20 câu đúng) - Danh hiệu: ${rank.rankTitle}`,
      'arena',
      result.score
    );
  };

  // Calculate learning progress
  let progressStep = 0;
  if (learningCompleted.part1) progressStep += 25;
  if (learningCompleted.part2) progressStep += 25;
  if (mindmapExplored) progressStep += 20;
  if (practiceScore > 0) progressStep += 15;
  if (arenaBestScore > 0) progressStep += 15;
  const learningProgressPercent = Math.min(100, progressStep);

  // Total cumulative score
  const totalScore = practiceScore + arenaBestScore;

  // Total correct questions across practice and arena
  const arenaLatestCorrect = arenaResultData?.correctCount || (arenaBestScore > 0 ? Math.round(arenaBestScore / 10) : 0);
  const totalCorrectQuestions = practiceCorrectCount + arenaLatestCorrect;

  // If not logged in, force LoginScreen
  if (!student) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* Top Main Navigation Header */}
      <Header
        student={student}
        currentSection={currentSection}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        totalScore={totalScore}
        unlockedBadgeCount={unlockedBadges.length}
        onOpenBadgesModal={() => setShowBadgesModal(true)}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
      />

      {/* Main Section Content Router */}
      <main className="flex-1 pb-16">
        {currentSection === 'home' && (
          <HomeScreen
            student={student}
            onNavigate={handleNavigate}
            totalScore={totalScore}
            totalCorrectQuestions={totalCorrectQuestions}
            unlockedBadgeCount={unlockedBadges.length}
            totalBadgeCount={BADGE_DEFINITIONS.length}
            learningProgressPercent={learningProgressPercent}
            arenaBestScore={arenaBestScore}
            onOpenBadgesModal={() => setShowBadgesModal(true)}
            arenaHistory={arenaHistory}
            onOpenCertificate={() => setShowCertificateModal(true)}
            studyDurationSeconds={studyDurationSeconds}
            onOpenLeaderboard={() => setShowLeaderboardModal(true)}
            onOpenProfile={() => setShowProfileModal(true)}
          />
        )}

        {currentSection === 'learning' && (
          <LearningSection
            completedPart1={learningCompleted.part1}
            completedPart2={learningCompleted.part2}
            onCompletePart={handleCompletePart}
            onNavigateHome={() => handleNavigate('home')}
            onNavigatePractice={() => handleNavigate('practice')}
          />
        )}

        {currentSection === 'mindmap' && (
          <MindmapSection
            onNavigateHome={() => handleNavigate('home')}
            onExploreDone={handleExploreMindmapDone}
            isExplored={mindmapExplored}
          />
        )}

        {currentSection === 'practice' && (
          <PracticeSection
            onNavigateHome={() => handleNavigate('home')}
            onNavigateArena={() => handleNavigate('arena')}
            onSavePracticeScore={handleSavePracticeScore}
          />
        )}

        {currentSection === 'arena' && (
          <ArenaSection
            student={student}
            onNavigateHome={() => handleNavigate('home')}
            onFinishGame={handleFinishArenaGame}
          />
        )}
      </main>

      {/* Arena Result Modal */}
      {arenaResultData && (
        <ArenaResultModal
          student={student}
          result={arenaResultData}
          onPlayAgain={() => {
            soundManager.playClick();
            setArenaResultData(null);
            setCurrentSection('arena');
          }}
          onGoHome={() => {
            soundManager.playClick();
            setArenaResultData(null);
            setCurrentSection('home');
          }}
          onOpenCertificate={() => {
            setShowCertificateModal(true);
          }}
        />
      )}

      {/* Badges Collection Modal */}
      {showBadgesModal && (
        <BadgesModal
          unlockedBadgeIds={unlockedBadges}
          onClose={() => setShowBadgesModal(false)}
        />
      )}

      {/* Certificate Modal */}
      {showCertificateModal && (
        <CertificateModal
          student={student}
          score={arenaResultData?.score || arenaBestScore || 100}
          onClose={() => setShowCertificateModal(false)}
        />
      )}

      {/* Student Profile & Real-time Metrics Modal */}
      <StudentProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        student={student}
        totalScore={totalScore}
        totalCorrectQuestions={totalCorrectQuestions}
        studyDurationSeconds={studyDurationSeconds}
        unlockedBadgeCount={unlockedBadges.length}
        totalBadgeCount={BADGE_DEFINITIONS.length}
        activityLogs={activityLogs}
        arenaBestScore={arenaBestScore}
        arenaHistoryCount={arenaHistory.length}
        onOpenLeaderboard={() => {
          setShowProfileModal(false);
          setShowLeaderboardModal(true);
        }}
        onOpenBadges={() => {
          setShowProfileModal(false);
          setShowBadgesModal(true);
        }}
      />

      {/* Real-time National Leaderboard Modal */}
      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        currentStudent={student}
        currentScore={totalScore}
        studyDurationSeconds={studyDurationSeconds}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/80 py-4 px-4 text-center text-xs text-slate-500 font-semibold no-print">
        <p>
          CÔNG DÂN SỐ VĂN MINH – ĐẤU TRƯỜNG TRÍ TUỆ • Môn Tin học lớp 8 • Bộ sách Kết nối tri thức với cuộc sống
        </p>
        <p className="text-[11px] text-slate-400 mt-0.5">
          Bài 4: Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số • Đồng hành cùng Robot Tin học
        </p>
      </footer>

    </div>
  );
}
