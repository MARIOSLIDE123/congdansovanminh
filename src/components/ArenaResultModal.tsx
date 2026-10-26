import React, { useState } from 'react';
import { 
  Trophy, RotateCcw, Home, Award, CheckCircle2, 
  XCircle, Clock, Percent, Sparkles, AlertCircle, ChevronDown, 
  ChevronUp, Printer, FileText, ArrowLeft, Star
} from 'lucide-react';
import { StudentInfo } from '../types';
import { getRankDetails } from '../data/badgeData';
import { soundManager } from '../utils/sound';

interface ArenaResultModalProps {
  student: StudentInfo;
  result: {
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
  };
  onPlayAgain: () => void;
  onGoHome: () => void;
  onOpenCertificate: () => void;
}

export const ArenaResultModal: React.FC<ArenaResultModalProps> = ({
  student,
  result,
  onPlayAgain,
  onGoHome,
  onOpenCertificate
}) => {
  const [viewMode, setViewMode] = useState<'summary' | 'review'>('summary');
  const [filterWrongOnly, setFilterWrongOnly] = useState(true);

  const rank = getRankDetails(result.score);
  const total = result.correctCount + result.wrongCount || 20;
  const accuracy = Math.round((result.correctCount / total) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m > 0 ? `${m} phút ` : ''}${s} giây`;
  };

  const wrongQuestions = result.answeredDetails.filter((d) => !d.isCorrect);
  const displayedQuestions = filterWrongOnly ? wrongQuestions : result.answeredDetails;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-purple-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Banner Header */}
        <div className={`p-6 text-center text-white bg-gradient-to-r ${rank.bgGrad} relative flex-shrink-0`}>
          <div className="inline-flex items-center gap-1.5 bg-black/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-black mb-2 text-yellow-200">
            <Sparkles className="w-3.5 h-3.5" />
            TỔNG KẾT ĐẤU TRƯỜNG TRÍ TUỆ
          </div>

          <div className="text-4xl sm:text-5xl my-1">{rank.emoji}</div>
          <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight">
            {rank.rankTitle}
          </h2>

          <p className="text-white/90 text-xs sm:text-sm font-bold mt-1">
            Học sinh: {student.fullName} • Lớp {student.grade} • {student.school}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {viewMode === 'summary' ? (
            <>
              {/* Score highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                <div className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-purple-700 block">Tổng Điểm</span>
                  <div className="text-2xl sm:text-3xl font-black text-purple-900 mt-0.5">
                    {result.score}
                    <span className="text-xs text-purple-700 font-semibold">/200</span>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 block">Số Câu Đúng</span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-900 mt-0.5">
                    {result.correctCount}
                    <span className="text-xs text-emerald-700 font-semibold">/20</span>
                  </div>
                </div>

                <div className="bg-rose-50 p-3.5 rounded-2xl border border-rose-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-rose-700 block">Số Câu Sai</span>
                  <div className="text-2xl sm:text-3xl font-black text-rose-900 mt-0.5">
                    {result.wrongCount}
                    <span className="text-xs text-rose-700 font-semibold">/20</span>
                  </div>
                </div>

                <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-200 text-center">
                  <span className="text-[10px] uppercase font-bold text-sky-700 block">Tỉ Lệ Đúng</span>
                  <div className="text-2xl sm:text-3xl font-black text-sky-900 mt-0.5">
                    {accuracy}%
                  </div>
                </div>

              </div>

              {/* Time display if enabled */}
              {result.durationSeconds > 0 && (
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600 bg-slate-50 py-2 rounded-xl border border-slate-200">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span>Thời gian hoàn thành 20 câu: <strong>{formatTime(result.durationSeconds)}</strong></span>
                </div>
              )}

              {/* Pedagogy Positive Feedback Box */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-4 sm:p-5 text-amber-950 space-y-1.5">
                <div className="flex items-center gap-2 font-black text-xs sm:text-sm text-amber-800">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Lời nhận xét từ Hội đồng & Robot Tin học:</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed text-slate-700">
                  {rank.feedback}
                </p>
              </div>

              {/* Certificate & Review Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playBadgeUnlock();
                    onOpenCertificate();
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-102"
                >
                  <Award className="w-4 h-4" />
                  <span>Nhận Giấy Khen Công Dân Số</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('review');
                  }}
                  className="w-full py-3 px-4 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-800 font-extrabold text-xs sm:text-sm border border-purple-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <FileText className="w-4 h-4 text-purple-600" />
                  <span>Xem Lại {wrongQuestions.length > 0 ? `${wrongQuestions.length} Câu Sai` : 'Tất Cả Câu Hỏi'}</span>
                </button>
              </div>
            </>
          ) : (
            /* Review Questions Mode */
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setViewMode('summary');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-purple-600"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Quay lại Bảng tổng kết</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFilterWrongOnly(!filterWrongOnly)}
                  className="text-xs font-extrabold text-purple-700 hover:underline"
                >
                  {filterWrongOnly ? 'Xem tất cả 20 câu' : 'Chỉ xem câu sai'}
                </button>
              </div>

              {displayedQuestions.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <p className="font-bold text-sm">Tuyệt vời! Bạn không làm sai câu nào cả!</p>
                </div>
              ) : (
                <div className="space-y-3.5 max-h-[50vh] overflow-y-auto pr-1">
                  {displayedQuestions.map((q, idx) => (
                    <div
                      key={q.questionId}
                      className={`p-4 rounded-2xl border-2 space-y-2 text-xs sm:text-sm ${
                        q.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-rose-50/50 border-rose-200'
                      }`}
                    >
                      <div className="flex items-center justify-between font-black">
                        <span className="text-slate-700">Câu {q.questionId}:</span>
                        <span className={q.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                          {q.isCorrect ? '✓ Trả lời đúng' : '✗ Trả lời sai'}
                        </span>
                      </div>

                      <p className="font-extrabold text-slate-800 leading-snug">{q.question}</p>

                      <div className="space-y-1 pt-1 text-xs font-medium">
                        <p className={q.isCorrect ? 'text-emerald-800' : 'text-rose-800'}>
                          <strong>Bạn đã chọn:</strong> {q.chosenKey}. {q.chosenText}
                        </p>
                        {!q.isCorrect && (
                          <p className="text-emerald-800 font-bold">
                            <strong>Đáp án đúng là:</strong> {q.correctKey}. {q.correctText}
                          </p>
                        )}
                        <p className="text-slate-600 pt-1">
                          <strong>Giải thích:</strong> {q.explanation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Action Buttons Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3 flex-shrink-0">
          <button
            type="button"
            onClick={onPlayAgain}
            className="py-2.5 px-5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại (Đề Mới)</span>
          </button>

          <button
            type="button"
            onClick={onGoHome}
            className="py-2.5 px-5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-extrabold text-xs sm:text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Về Trang Chủ</span>
          </button>
        </div>

      </div>
    </div>
  );
};
