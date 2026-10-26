import React from 'react';
import { Volume2, VolumeX, Home, UserCheck, ShieldCheck, Trophy, Sparkles, Award } from 'lucide-react';
import { StudentInfo, AppSection } from '../types';
import { soundManager } from '../utils/sound';
import { STUDENT_AVATARS } from '../data/badgeData';

interface HeaderProps {
  student: StudentInfo;
  currentSection: AppSection;
  onNavigate: (section: AppSection) => void;
  onLogout: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  totalScore: number;
  unlockedBadgeCount: number;
  onOpenBadgesModal: () => void;
  onOpenSyncModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  student,
  currentSection,
  onNavigate,
  onLogout,
  soundEnabled,
  onToggleSound,
  totalScore,
  unlockedBadgeCount,
  onOpenBadgesModal,
  onOpenSyncModal
}) => {
  const avatar = STUDENT_AVATARS.find((a) => a.id === student.avatarId) || STUDENT_AVATARS[0];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-emerald-100 shadow-sm transition-all">
      <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Brand Logo & Book title */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-sky-500 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="text-xl sm:text-2xl">🤖</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base sm:text-lg md:text-xl tracking-tight bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                CÔNG DÂN SỐ VĂN MINH
              </span>
              <span className="hidden xs:inline-block bg-amber-100 text-amber-800 text-[10px] sm:text-xs font-black px-1.5 py-0.5 rounded-full border border-amber-300">
                Lớp 8
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-500 font-semibold truncate max-w-[150px] sm:max-w-xs">
              Bài 4: Đạo đức & Văn hoá số
            </p>
          </div>
        </div>

        {/* Center/Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          
          {/* Navigation to Home */}
          {currentSection !== 'home' && (
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigate('home');
              }}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs sm:text-sm rounded-xl border border-emerald-200 transition-colors shadow-xs"
              title="Quay lại Trang Chủ"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Trang chủ</span>
            </button>
          )}

          {/* Badges Counter Button */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenBadgesModal();
            }}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs sm:text-sm rounded-xl border border-amber-200 transition-colors shadow-xs"
            title="Xem bảng huy hiệu đạt được"
          >
            <Award className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>{unlockedBadgeCount}</span>
            <span className="hidden md:inline text-[11px] font-semibold text-amber-700">huy hiệu</span>
          </button>

          {/* Total Cumulative Score */}
          <div className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl shadow-xs font-black text-xs sm:text-sm">
            <Trophy className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>{totalScore}</span>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-100">đ</span>
          </div>

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={onToggleSound}
            className={`p-2 rounded-xl border transition-colors ${
              soundEnabled
                ? 'bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100'
                : 'bg-slate-100 text-slate-400 border-slate-200 hover:bg-slate-200'
            }`}
            title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Student Profile & Switch User */}
          <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
            <div 
              onClick={onOpenSyncModal}
              className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity" 
              title="Thông tin học sinh & Đồng bộ"
            >
              <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br ${avatar.bgColor} text-white flex items-center justify-center font-bold text-sm sm:text-base shadow-sm border border-white`}>
                {avatar.emoji}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-black text-slate-800 leading-tight truncate max-w-[110px]">
                  {student.fullName}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold truncate max-w-[110px]">
                  {student.grade} • {student.school}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onLogout}
              className="text-[11px] font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-2 py-1 rounded-lg transition-colors border border-transparent hover:border-rose-200"
              title="Đổi học sinh khác"
            >
              Đổi
            </button>
          </div>

        </div>

      </div>
    </header>
  );
};
