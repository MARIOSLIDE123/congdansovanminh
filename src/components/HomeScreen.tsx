import React from 'react';
import { 
  BookOpen, Brain, Target, Trophy, Sparkles, CheckCircle2, 
  ChevronRight, Award, Flame, HeartHandshake, History, Clock, 
  ShieldCheck, Copyright, EyeOff, Lock
} from 'lucide-react';
import { StudentInfo, AppSection, ArenaHistoryRecord } from '../types';
import { MascotBeSo } from './MascotBeSo';
import { soundManager } from '../utils/sound';
import { STUDENT_AVATARS } from '../data/badgeData';
import { formatStudyTime } from '../services/googleSyncService';

interface HomeScreenProps {
  student: StudentInfo;
  onNavigate: (section: AppSection) => void;
  totalScore: number;
  totalCorrectQuestions: number;
  unlockedBadgeCount: number;
  totalBadgeCount: number;
  learningProgressPercent: number;
  arenaBestScore: number;
  onOpenBadgesModal: () => void;
  arenaHistory?: ArenaHistoryRecord[];
  onOpenCertificate?: () => void;
  studyDurationSeconds?: number;
  onOpenLeaderboard?: () => void;
  onOpenProfile?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  student,
  onNavigate,
  totalScore,
  totalCorrectQuestions,
  unlockedBadgeCount,
  totalBadgeCount,
  learningProgressPercent,
  arenaBestScore,
  onOpenBadgesModal,
  arenaHistory = [],
  onOpenCertificate,
  studyDurationSeconds = 0,
  onOpenLeaderboard,
  onOpenProfile
}) => {
  const avatar = STUDENT_AVATARS.find((a) => a.id === student.avatarId) || STUDENT_AVATARS[0];

  const handleCardClick = (sec: AppSection) => {
    soundManager.playClick();
    onNavigate(sec);
  };

  return (
    <div className="w-full max-w-[1700px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 sm:space-y-8 animate-fadeIn">
      
      {/* Welcome Banner Card */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        {/* Subtle background circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-yellow-300/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black border border-white/30 text-yellow-200">
              <Sparkles className="w-3.5 h-3.5" />
              CHÀO MỪNG ĐẾN VỚI CÔNG DÂN SỐ VĂN MINH!
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight drop-shadow-xs">
              Chào {student.fullName}! 👋
            </h1>
            
            <p className="text-emerald-100 text-sm sm:text-base font-semibold max-w-2xl">
              Sẵn sàng trở thành Công dân số văn minh thông thái, trung thực và trách nhiệm chưa? Hãy cùng Robot Tin học khám phá hành trình hôm nay nhé!
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1">
              <span className="bg-white/25 px-2.5 py-1 rounded-xl text-xs font-bold">
                Lớp: {student.grade}
              </span>
              <span className="bg-white/25 px-2.5 py-1 rounded-xl text-xs font-bold">
                Trường: {student.school}
              </span>
              <span className="bg-white/25 px-2.5 py-1 rounded-xl text-xs font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-yellow-300" />
                Thời lượng học: {formatStudyTime(studyDurationSeconds)}
              </span>
            </div>

            {/* Quick Access to Leaderboard & Profile */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-3">
              {onOpenLeaderboard && (
                <button
                  type="button"
                  onClick={onOpenLeaderboard}
                  className="px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <Trophy className="w-4 h-4 text-amber-900 fill-amber-900" />
                  <span>BẢNG XẾP HẠNG TOÀN QUỐC</span>
                </button>
              )}
              {onOpenProfile && (
                <button
                  type="button"
                  onClick={onOpenProfile}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 transition-all active:scale-95 flex items-center gap-1.5"
                >
                  <span>📊 Xem Hồ Sơ & Lịch Sử Hoạt Động</span>
                </button>
              )}
            </div>
          </div>

          {/* Interactive Mascot with Speech */}
          <div className="flex-shrink-0">
            <MascotBeSo 
              mood="happy"
              message={`Chào ${student.fullName}! Hãy bắt đầu với bài Học tập hoặc thử sức ngay tại Đấu trường nhé!`}
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* 4 Main Core Sections */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-black text-slate-800 flex items-center gap-2">
            <span>4 KHU VỰC HỌC TẬP & TRANH TÀI</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              Khám phá ngay
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          {/* Card 1: Học tập */}
          <div
            onClick={() => handleCardClick('learning')}
            className="group relative bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-200">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase text-emerald-600 tracking-wider">
                  Khám phá kiến thức
                </span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-emerald-600 transition-colors">
                  1. 📚 HỌC TẬP
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                  Bám sát SGK Kết nối tri thức. Nhận diện 8 hành vi vi phạm & 8 nguyên tắc tạo sản phẩm số trung thực.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-emerald-600">
              <span>Bắt đầu học</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Sơ đồ tư duy */}
          <div
            onClick={() => handleCardClick('mindmap')}
            className="group relative bg-white rounded-3xl p-5 sm:p-6 border-2 border-sky-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-sky-200">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase text-sky-600 tracking-wider">
                  Tổng hợp trực quan
                </span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-sky-600 transition-colors">
                  2. 🧠 SƠ ĐỒ TƯ DUY
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                  Sơ đồ tương tác 4 nhánh: Trách nhiệm, Bản quyền, Trung thực sản phẩm số và Quyền riêng tư.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-sky-600">
              <span>Xem sơ đồ</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Luyện tập tương tác */}
          <div
            onClick={() => handleCardClick('practice')}
            className="group relative bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-200">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-black uppercase text-amber-600 tracking-wider">
                  Rèn luyện phản xạ
                </span>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-amber-600 transition-colors">
                  3. 🎯 LUYỆN TẬP
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                  10 câu trắc nghiệm tình huống thực tế & Mini-game Phân loại Hành vi Đúng - Sai cực vui!
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-amber-600">
              <span>Luyện tập ngay</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Đấu trường trí tuệ */}
          <div
            onClick={() => handleCardClick('arena')}
            className="group relative bg-white rounded-3xl p-5 sm:p-6 border-2 border-purple-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between overflow-hidden ring-2 ring-purple-100"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-purple-200/50 to-transparent rounded-bl-full -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-purple-200">
                <Trophy className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black uppercase text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">
                    Trọng tâm ★ 200 điểm
                  </span>
                </div>
                <h3 className="text-lg font-black text-slate-800 group-hover:text-purple-600 transition-colors mt-1">
                  4. 🏆 ĐẤU TRƯỜNG
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                  20 câu hỏi qua 3 chặng gay cấn: Khởi động, Tăng tốc & Về đích. Xáo trộn đáp án độc lập!
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs font-black text-purple-600">
              <span>Vào Đấu trường</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

      {/* 16:9 Widescreen & Mobile Dashboard Layout: Thành Tích + Lịch Sử & Cẩm Nang */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Thành tích & Lịch sử thi (7 cols on lg, 8 cols on xl) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* Bảng Thành Tích Cá Nhân */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-slate-200/80 shadow-md space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  BẢNG THÀNH TÍCH CÔNG DÂN SỐ CỦA BẠN
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Ghi nhận tiến trình học tập và nỗ lực thực tế của học sinh {student.fullName}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {arenaBestScore > 0 && onOpenCertificate && (
                  <button
                    type="button"
                    onClick={onOpenCertificate}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-900 font-black text-xs transition-transform hover:scale-102 cursor-pointer shadow-xs"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Xem Giấy Khen</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={onOpenBadgesModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 font-black text-xs border border-amber-200 transition-colors cursor-pointer shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mở Kho Huy Hiệu</span>
                </button>

                {onOpenProfile && (
                  <button
                    type="button"
                    onClick={onOpenProfile}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-black text-xs border border-emerald-200 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>📊 Xem Chi Tiết Chỉ Số</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Total score */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4">
                <span className="text-[11px] font-bold text-emerald-700 uppercase">Tổng điểm</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-emerald-800">{totalScore}</span>
                  <span className="text-xs font-bold text-emerald-600">điểm</span>
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold mt-1 truncate">
                  Luyện tập + Đấu trường
                </p>
              </div>

              {/* Correct count */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4">
                <span className="text-[11px] font-bold text-sky-700 uppercase">Câu đúng</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-sky-800">{totalCorrectQuestions}</span>
                  <span className="text-xs font-bold text-sky-600">câu</span>
                </div>
                <p className="text-[10px] text-sky-600 font-semibold mt-1 truncate">
                  Chính xác thực tế
                </p>
              </div>

              {/* Badges unlocked */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                <span className="text-[11px] font-bold text-amber-700 uppercase">Huy hiệu</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-amber-800">{unlockedBadgeCount}</span>
                  <span className="text-xs font-bold text-amber-600">/{totalBadgeCount}</span>
                </div>
                <p className="text-[10px] text-amber-600 font-semibold mt-1 truncate">
                  Danh hiệu đã mở
                </p>
              </div>

              {/* Arena Best */}
              <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-4">
                <span className="text-[11px] font-bold text-purple-700 uppercase">Kỷ lục Đấu trường</span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl sm:text-3xl font-black text-purple-800">{arenaBestScore}</span>
                  <span className="text-xs font-bold text-purple-600">/200đ</span>
                </div>
                <p className="text-[10px] text-purple-600 font-semibold mt-1 truncate">
                  Điểm cao nhất
                </p>
              </div>

            </div>

            {/* Progress bar */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-xs font-black text-slate-700 mb-1.5">
                <span>Tiến độ hoàn thành bài học:</span>
                <span className="text-emerald-600">{learningProgressPercent}%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                  style={{ width: `${learningProgressPercent}%` }}
                />
              </div>
            </div>

          </div>

          {/* Lịch sử Đấu trường gần đây */}
          {arenaHistory.length > 0 && (
            <div className="bg-white rounded-3xl p-6 border-2 border-purple-100 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <History className="w-5 h-5 text-purple-600" />
                  <span>LỊCH SỬ THI ĐẤU TRƯỜNG CỦA BẠN</span>
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  {arenaHistory.length} lượt thi gần nhất
                </span>
              </div>

              <div className="divide-y divide-slate-100 overflow-x-auto">
                {arenaHistory.map((rec) => (
                  <div key={rec.id} className="py-2.5 flex items-center justify-between gap-3 text-xs min-w-[320px]">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="font-bold text-slate-700">{rec.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-black text-purple-700 bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-200">
                        {rec.score} / 200 điểm
                      </span>
                      <span className="font-semibold text-emerald-700">
                        {rec.correctCount}/20 câu đúng
                      </span>
                      <span className="font-black text-slate-800">
                        {rec.rankTitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Cẩm nang bỏ túi 4 nguyên tắc cốt lõi (5 cols on lg, 4 cols on xl) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-4">
          <div className="bg-gradient-to-br from-amber-50 via-sky-50 to-emerald-50 rounded-3xl p-6 border-2 border-amber-200/80 shadow-md space-y-4 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-2xl">💡</span>
                <div>
                  <h3 className="font-black text-base text-slate-800">
                    CẨM NANG BỎ TÚI CÔNG DÂN SỐ VĂN MINH
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    4 điều cần nhớ mỗi ngày khi dùng công nghệ số:
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2 text-xs">
                <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-emerald-200 space-y-1 shadow-xs hover:border-emerald-300 transition-colors">
                  <span className="font-black text-emerald-700 flex items-center gap-1.5 text-xs sm:text-sm">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> 1. Tuân thủ nội quy
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Không quay phim chụp ảnh nơi có biển cấm. Luôn xin phép trước khi ghi âm.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-sky-200 space-y-1 shadow-xs hover:border-sky-300 transition-colors">
                  <span className="font-black text-sky-700 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Copyright className="w-4 h-4 text-sky-600" /> 2. Tôn trọng bản quyền
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Ghi nguồn và tên tác giả. Không dùng phần mềm bẻ khoá (crack) hay tải lậu.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-200 space-y-1 shadow-xs hover:border-amber-300 transition-colors">
                  <span className="font-black text-amber-700 flex items-center gap-1.5 text-xs sm:text-sm">
                    <HeartHandshake className="w-4 h-4 text-amber-600" /> 3. Trung thực sáng tạo
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Tự làm bài, ưu tiên nội dung tự tạo. Không sao chép rồi nhận là của mình.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-purple-200 space-y-1 shadow-xs hover:border-purple-300 transition-colors">
                  <span className="font-black text-purple-700 flex items-center gap-1.5 text-xs sm:text-sm">
                    <Lock className="w-4 h-4 text-purple-600" /> 4. Bảo vệ quyền riêng tư
                  </span>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    Không chia sẻ ảnh, số điện thoại người khác. Nói không với bạo lực học đường!
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-bold text-slate-500">
              <span>Đồng hành cùng Robot Tin học</span>
              <span className="text-emerald-700">Tin học lớp 8</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
