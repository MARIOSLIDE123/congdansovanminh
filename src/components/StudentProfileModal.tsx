import React, { useState } from 'react';
import { 
  User, X, Clock, Trophy, Award, CheckCircle2, 
  Calendar, Activity, Sparkles, ShieldCheck, Flame, 
  Layers, School, GraduationCap, ChevronRight, Settings2, Check
} from 'lucide-react';
import { StudentInfo, ArenaHistoryRecord, StudentActivityLog } from '../types';
import { STUDENT_AVATARS } from '../data/badgeData';
import { formatStudyTime, getAppsScriptUrl, setAppsScriptUrl } from '../services/googleSyncService';
import { soundManager } from '../utils/sound';

interface StudentProfileModalProps {
  isOpen?: boolean;
  student: StudentInfo;
  studyDurationSeconds: number;
  totalScore: number;
  totalCorrectQuestions: number;
  arenaBestScore: number;
  unlockedBadgeCount: number;
  totalBadgeCount: number;
  activityLogs: StudentActivityLog[];
  arenaHistory?: ArenaHistoryRecord[];
  arenaHistoryCount?: number;
  onClose: () => void;
  onOpenBadgesModal?: () => void;
  onOpenBadges?: () => void;
  onOpenLeaderboard: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen = true,
  student,
  studyDurationSeconds,
  totalScore,
  totalCorrectQuestions,
  arenaBestScore,
  unlockedBadgeCount,
  totalBadgeCount,
  activityLogs,
  onClose,
  onOpenBadgesModal,
  onOpenBadges,
  onOpenLeaderboard
}) => {
  if (!isOpen) return null;

  const handleOpenBadges = () => {
    if (onOpenBadges) onOpenBadges();
    else if (onOpenBadgesModal) onOpenBadgesModal();
  };
  const avatar = STUDENT_AVATARS.find((a) => a.id === student.avatarId) || STUDENT_AVATARS[0];
  const [showConfigUrl, setShowConfigUrl] = useState(false);
  const [customUrl, setCustomUrl] = useState(() => getAppsScriptUrl());
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setAppsScriptUrl(customUrl);
    setSavedSuccess(true);
    soundManager.playClick();
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const loginTimeDisplay = student.loginTime 
    ? new Date(student.loginTime).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })
    : 'Hôm nay';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 p-5 sm:p-6 text-white flex items-center justify-between flex-shrink-0 relative">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${avatar.bgColor} text-white flex items-center justify-center text-2xl sm:text-3xl shadow-md border-2 border-white/80`}>
              {avatar.emoji}
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase text-yellow-200 border border-white/25">
                <Sparkles className="w-3 h-3" />
                HỒ SƠ HỌC SINH & CHỈ SỐ HỌC TẬP
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight mt-0.5">
                {student.fullName}
              </h2>
              <p className="text-xs text-emerald-100 font-semibold flex items-center gap-2 mt-0.5">
                <span>Lớp: {student.grade}</span>
                <span>•</span>
                <span>{student.school}</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-colors cursor-pointer text-white flex-shrink-0"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
          
          {/* Key Metrics Grid */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-emerald-600" />
                CHỈ SỐ THỰC TẾ THEO THỜI GIAN THỰC
              </h3>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                ● Đang ghi nhận
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Total study duration */}
              <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-sky-700 text-xs font-bold">
                  <Clock className="w-4 h-4 text-sky-600" />
                  <span>Thời lượng học</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-sky-950">
                  {formatStudyTime(studyDurationSeconds)}
                </div>
                <p className="text-[10px] text-sky-600 font-medium">
                  Tổng thời gian tương tác
                </p>
              </div>

              {/* Total Score */}
              <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 text-xs font-bold">
                  <Trophy className="w-4 h-4 text-emerald-600" />
                  <span>Tổng điểm</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-emerald-950">
                  {totalScore} <span className="text-xs font-bold text-emerald-700">điểm</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-medium">
                  Luyện tập + Đấu trường
                </p>
              </div>

              {/* Correct answers count */}
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  <span>Câu trả lời đúng</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-amber-950">
                  {totalCorrectQuestions} <span className="text-xs font-bold text-amber-800">câu</span>
                </div>
                <p className="text-[10px] text-amber-700 font-medium">
                  Chính xác thực tế
                </p>
              </div>

              {/* Badges unlocked */}
              <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-3.5 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-700 text-xs font-bold">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>Huy hiệu</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-purple-950">
                  {unlockedBadgeCount} <span className="text-xs font-bold text-purple-700">/{totalBadgeCount}</span>
                </div>
                <p className="text-[10px] text-purple-600 font-medium">
                  Đã mở khóa
                </p>
              </div>

            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenLeaderboard();
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 hover:border-amber-300 transition-all flex items-center justify-between text-left cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
                  🏆
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block group-hover:text-amber-700 transition-colors">
                    XEM BẢNG XẾP HẠNG TOÀN QUỐC
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    Xem vị trí thứ hạng của bạn so với cả nước
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                handleOpenBadges();
              }}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 hover:border-emerald-300 transition-all flex items-center justify-between text-left cursor-pointer group shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                  🎖️
                </div>
                <div>
                  <span className="text-xs font-black text-slate-800 block group-hover:text-emerald-700 transition-colors">
                    KHO HUY HIỆU DANH GIÁ
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {unlockedBadgeCount} huy hiệu đã sẵn sàng
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Activity Log Timeline */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600" />
                NHẬT KÝ HOẠT ĐỘNG GẦN ĐÂY CỦA BẠN
              </h3>
              <span className="text-[11px] font-semibold text-slate-400">
                {activityLogs.length} sự kiện
              </span>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 divide-y divide-slate-200/80 max-h-56 overflow-y-auto">
              {activityLogs.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-xs">
                  Chưa có lịch sử hoạt động ghi nhận. Hãy bắt đầu học hoặc tham gia Đấu trường nhé!
                </div>
              ) : (
                activityLogs.map((log) => (
                  <div key={log.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3 text-xs">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 font-bold text-slate-800">
                        <span className={`w-2 h-2 rounded-full ${
                          log.type === 'arena' ? 'bg-purple-500' :
                          log.type === 'practice' ? 'bg-amber-500' :
                          log.type === 'learning' ? 'bg-emerald-500' : 'bg-sky-500'
                        }`} />
                        <span>{log.action}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium pl-4">
                        {log.detail}
                      </p>
                    </div>

                    <div className="text-right flex-shrink-0">
                      {log.scoreChange && log.scoreChange > 0 && (
                        <span className="font-black text-emerald-600 bg-emerald-100/70 px-1.5 py-0.5 rounded text-[10px] block">
                          +{log.scoreChange}đ
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-medium">
                        {log.timestamp}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Real-time Cloud Sync Info (Automatic) */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 rounded-2xl p-4 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-black text-slate-800">
                    Hệ Thống Lưu Trữ & Đồng Bộ Thời Gian Thực
                  </h4>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Toàn bộ thời lượng học, điểm số và hoạt động được tự động ghi nhận liên tục.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowConfigUrl(!showConfigUrl)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-white/80 transition-colors cursor-pointer"
                title="Cấu hình Google Apps Script Web App (Tùy chọn dành cho Quản trị viên/Thầy cô)"
              >
                <Settings2 className="w-4 h-4" />
              </button>
            </div>

            {/* Optional URL connection panel for teachers */}
            {showConfigUrl && (
              <form onSubmit={handleSaveUrl} className="pt-2 border-t border-emerald-200/80 space-y-2 animate-fadeIn">
                <label className="block text-[11px] font-bold text-slate-700">
                  URL Google Apps Script Web App (Tùy chọn kết nối Google Sheet riêng):
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3 py-1.5 text-xs bg-white rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 font-mono text-slate-800"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {savedSuccess ? <Check className="w-3.5 h-3.5 text-white" /> : null}
                    <span>{savedSuccess ? 'Đã lưu' : 'Lưu URL'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
          <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Phiên học: {student.fullName} ({student.grade})</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors cursor-pointer"
          >
            Đóng hồ sơ
          </button>
        </div>

      </div>
    </div>
  );
};
