import React, { useState } from 'react';
import { Sparkles, Shield, User, GraduationCap, School, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { StudentInfo } from '../types';
import { STUDENT_AVATARS } from '../data/badgeData';
import { soundManager } from '../utils/sound';

interface LoginScreenProps {
  onLogin: (student: StudentInfo) => void;
  initialData?: StudentInfo | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, initialData }) => {
  const [fullName, setFullName] = useState(initialData?.fullName || '');
  const [grade, setGrade] = useState(initialData?.grade || '8A1');
  const [school, setSchool] = useState(initialData?.school || '');
  const [avatarId, setAvatarId] = useState(initialData?.avatarId || 'be_so');
  const [errorMessage, setErrorMessage] = useState('');

  const gradeOptions = ['8A1', '8A2', '8A3', '8A4', '8B1', '8B2', '8C', '8D', 'Khác'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanGrade = grade.trim();
    const cleanSchool = school.trim();

    if (!cleanName) {
      setErrorMessage('Bạn ơi, hãy điền đầy đủ Họ và tên của mình nhé!');
      soundManager.playIncorrect();
      return;
    }
    if (cleanName.length < 2) {
      setErrorMessage('Họ và tên cần có ít nhất 2 ký tự bạn nhé!');
      soundManager.playIncorrect();
      return;
    }
    if (!cleanGrade) {
      setErrorMessage('Hãy cho Robot Tin học biết bạn đang học Lớp nào nhé!');
      soundManager.playIncorrect();
      return;
    }
    if (!cleanSchool) {
      setErrorMessage('Đừng quên ghi tên Trường thân yêu của bạn nha!');
      soundManager.playIncorrect();
      return;
    }

    setErrorMessage('');
    soundManager.playCorrect();

    onLogin({
      fullName: cleanName,
      grade: cleanGrade,
      school: cleanSchool,
      avatarId: avatarId,
      loginTime: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-50 to-amber-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden">
      {/* Playful background decorative shapes */}
      <div className="absolute top-10 left-10 w-48 h-48 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-sky-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-12 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />

      {/* Main Container - 16:9 and Mobile Responsive */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-200 overflow-hidden relative z-10 transition-all grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Hero Column on Desktop / Top Banner on Mobile */}
        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-600 p-6 sm:p-8 text-white flex flex-col justify-between relative">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-xs font-black text-yellow-200 border border-white/30">
              <Sparkles className="w-4 h-4 animate-spin" />
              TIN HỌC LỚP 8 • BỘ KẾT NỐI TRI THỨC
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight drop-shadow-sm uppercase">
                CÔNG DÂN SỐ VĂN MINH
              </h1>
              <p className="text-emerald-100 font-extrabold text-xs sm:text-sm mt-1 tracking-wide">
                ĐẤU TRƯỜNG TRÍ TUỆ • DIGITAL CITIZENS
              </p>
              <p className="text-[11px] sm:text-xs text-white/90 mt-2 font-medium leading-relaxed">
                Bài 4: Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số
              </p>
            </div>

            {/* Feature highlights for 16:9 view */}
            <div className="hidden lg:block space-y-3 pt-4 border-t border-white/20 text-xs">
              <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-xs p-2.5 rounded-xl">
                <span className="text-lg">🤖</span>
                <span className="font-bold">Đồng hành cùng Robot Tin học thông thái</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-xs p-2.5 rounded-xl">
                <span className="text-lg">🏆</span>
                <span className="font-bold">Đấu trường 20 câu hỏi 3 chặng gay cấn</span>
              </div>
              <div className="flex items-center gap-2.5 bg-white/15 backdrop-blur-xs p-2.5 rounded-xl">
                <span className="text-lg">📜</span>
                <span className="font-bold">Cấp Giấy khen & Kho 8 huy hiệu danh giá</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-4 mt-4 border-t border-white/15 text-[11px] text-emerald-100 hidden sm:block">
            🌟 Sẵn sàng trở thành Công dân số văn minh, trung thực & trách nhiệm!
          </div>
        </div>

        {/* Right Form Column */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 p-6 sm:p-8 space-y-5 bg-white">
          
          {/* Avatar selector */}
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-700 mb-2">
              1. Chọn nhân vật đồng hành của bạn:
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {STUDENT_AVATARS.map((avatar) => {
                const isSelected = avatarId === avatar.id;
                return (
                  <button
                    key={avatar.id}
                    type="button"
                    onClick={() => {
                      setAvatarId(avatar.id);
                      soundManager.playClick();
                    }}
                    className={`flex flex-col items-center p-2 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-emerald-500 bg-emerald-50/80 scale-105 shadow-sm ring-2 ring-emerald-300'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="text-2xl sm:text-3xl mb-1">{avatar.emoji}</span>
                    <span className="text-[10px] font-black text-slate-700 truncate w-full text-center">
                      {avatar.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Student Name */}
          <div>
            <label className="block text-xs sm:text-sm font-extrabold text-slate-700 mb-1.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-emerald-600" />
                2. Họ và tên của bạn <span className="text-rose-500">*</span>
              </span>
              <span className="text-[11px] text-slate-400 font-normal">Bắt buộc</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Ví dụ: Nguyễn Minh Anh"
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none text-slate-800 font-bold text-sm sm:text-base placeholder:text-slate-400 transition-all bg-slate-50 focus:bg-white"
            />
          </div>

          {/* Grade & School row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-sky-600" />
                  3. Lớp học <span className="text-rose-500">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => {
                    setGrade(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Ví dụ: 8A1"
                  className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 outline-none text-slate-800 font-bold text-sm sm:text-base placeholder:text-slate-400 transition-all bg-slate-50 focus:bg-white"
                />
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {['8A1', '8A2', '8A3', '8B', '8C'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => {
                      setGrade(g);
                      soundManager.playClick();
                    }}
                    className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 cursor-pointer"
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <School className="w-4 h-4 text-amber-600" />
                  4. Trường THCS / Trường học <span className="text-rose-500">*</span>
                </span>
              </label>
              <input
                type="text"
                value={school}
                onChange={(e) => {
                  setSchool(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Ví dụ: THCS Chu Văn An"
                className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 outline-none text-slate-800 font-bold text-sm sm:text-base placeholder:text-slate-400 transition-all bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          {/* Friendly Error alert */}
          {errorMessage && (
            <div className="p-3 bg-rose-50 border-2 border-rose-200 rounded-2xl flex items-center gap-2.5 text-rose-700 text-xs sm:text-sm font-bold animate-shake">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Privacy pledge */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-[11px] sm:text-xs text-emerald-900 flex items-start gap-2 font-medium">
            <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Bảo mật thông tin:</strong> Ứng dụng tôn trọng quyền riêng tư học sinh theo đúng bài học. Thông tin lưu trên máy phiên học, không thu thập mật khẩu hay số điện thoại!
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-black text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>BẮT ĐẦU HÀNH TRÌNH</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

      </div>
    </div>
  );
};
