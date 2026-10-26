import React, { useState, useEffect, useRef } from 'react';
import { 
  Trophy, ArrowLeft, ArrowRight, RotateCcw, Clock, 
  Sparkles, CheckCircle2, XCircle, Flame, Crown, Star, 
  HelpCircle, Volume2, ShieldCheck, Zap
} from 'lucide-react';
import { generateArenaSession } from '../data/arenaData';
import { ShuffledArenaQuestion, StudentInfo } from '../types';
import { MascotBeSo } from './MascotBeSo';
import { soundManager } from '../utils/sound';
import { speechService } from '../utils/speech';
import confetti from 'canvas-confetti';

interface ArenaSectionProps {
  student: StudentInfo;
  onNavigateHome: () => void;
  onFinishGame: (result: {
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
  }) => void;
}

export const ArenaSection: React.FC<ArenaSectionProps> = ({
  student,
  onNavigateHome,
  onFinishGame
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [questions, setQuestions] = useState<ShuffledArenaQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, {
    chosenIndex: number;
    chosenKey: string;
    chosenText: string;
    isCorrect: boolean;
  }>>({});
  
  // Timer states
  const [timerEnabled, setTimerEnabled] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize fresh game session with randomized options and questions
  const startNewGame = () => {
    soundManager.playClick();
    const freshSession = generateArenaSession();
    setQuestions(freshSession);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setElapsedSeconds(0);
    setIsPlaying(true);
  };

  // Timer effect
  useEffect(() => {
    if (isPlaying && timerEnabled) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timerEnabled]);

  const currentQ: ShuffledArenaQuestion | undefined = questions[currentIndex];
  const currentAnswer = currentQ ? selectedAnswers[currentQ.id] : undefined;

  // Handle student clicking an option
  const handleSelectOption = (index: number) => {
    if (!currentQ || currentAnswer) return; // Prevent double-clicking

    const isCorrect = index === currentQ.correctIndex;
    const chosenOpt = currentQ.options[index];

    if (isCorrect) {
      soundManager.playCorrect();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.65 }
      });
    } else {
      soundManager.playIncorrect();
    }

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        chosenIndex: index,
        chosenKey: chosenOpt.key,
        chosenText: chosenOpt.text,
        isCorrect: isCorrect
      }
    }));
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Game completed! Calculate results
      if (timerRef.current) clearInterval(timerRef.current);

      const answeredDetails = questions.map((q) => {
        const userAns = selectedAnswers[q.id];
        const correctOpt = q.options[q.correctIndex];
        return {
          questionId: q.id,
          question: q.question,
          stageName: q.stageName,
          chosenText: userAns ? userAns.chosenText : 'Chưa chọn',
          chosenKey: userAns ? userAns.chosenKey : '-',
          correctText: correctOpt.text,
          correctKey: correctOpt.key,
          isCorrect: userAns ? userAns.isCorrect : false,
          explanation: q.explanation
        };
      });

      const correctCount = answeredDetails.filter((d) => d.isCorrect).length;
      const score = correctCount * 10;
      const wrongCount = questions.length - correctCount;

      onFinishGame({
        score,
        correctCount,
        wrongCount,
        durationSeconds: elapsedSeconds,
        answeredDetails
      });
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Pre-game Start Screen
  if (!isPlaying) {
    return (
      <div className="w-full max-w-[1500px] mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-6 animate-fadeIn">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-purple-200 shadow-xl text-center space-y-6 relative overflow-hidden">
          {/* Decorative badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs sm:text-sm font-black px-4 py-1.5 rounded-full shadow-md">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
            ĐẤU TRƯỜNG TRÍ TUỆ • THỬ THÁCH CÔNG DÂN SỐ VĂN MINH
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight leading-tight">
              20 CÂU HỎI • 3 CHẶNG THỬ THÁCH
            </h1>
            <p className="text-sm sm:text-base text-slate-600 font-semibold max-w-2xl mx-auto">
              Bạn đã sẵn sàng trở thành chuyên gia công nghệ số văn minh chưa? Hãy vượt qua 3 chặng đua để chạm tay vào Cúp Vàng danh giá!
            </p>
          </div>

          {/* 3 Stage Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            
            <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-5 text-left space-y-2">
              <span className="text-[10px] font-black uppercase text-sky-700 bg-white px-2.5 py-1 rounded-full border border-sky-200">
                Chặng 1
              </span>
              <h4 className="font-black text-base text-sky-900">1. Khởi Động</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Câu 1 đến câu 7 • Làm quen các khái niệm cơ bản về sản phẩm số & nội quy.
              </p>
            </div>

            <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 text-left space-y-2">
              <span className="text-[10px] font-black uppercase text-amber-700 bg-white px-2.5 py-1 rounded-full border border-amber-200">
                Chặng 2
              </span>
              <h4 className="font-black text-base text-amber-900">2. Tăng Tốc</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Câu 8 đến câu 14 • Xử lí tình huống bản quyền, quyền riêng tư và phần mềm lậu.
              </p>
            </div>

            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-5 text-left space-y-2">
              <span className="text-[10px] font-black uppercase text-purple-700 bg-white px-2.5 py-1 rounded-full border border-purple-200">
                Chặng 3
              </span>
              <h4 className="font-black text-base text-purple-900">3. Về Đích</h4>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Câu 15 đến câu 20 • Khẳng định bản lĩnh Công dân số văn minh, mẫu mực!
              </p>
            </div>

          </div>

          {/* Rules & Scoring details */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium space-y-2 text-left max-w-4xl mx-auto">
            <h4 className="font-black text-slate-800 flex items-center gap-1.5 text-xs uppercase tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Quy tắc thi đấu công bằng:
            </h4>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>Mỗi câu trả lời đúng được cộng <strong>10 điểm</strong> (tối đa <strong>200 điểm</strong>).</li>
              <li>Trả lời sai không bị trừ điểm, bạn vẫn tiếp tục thi đấu bình thường.</li>
              <li>Các phương án A, B, C, D được xáo trộn ngẫu nhiên hoàn toàn ở mỗi lượt chơi mới.</li>
              <li>Sau khi chọn đáp án, hệ thống sẽ khoá câu hỏi và hiển thị lời giải thích ngay lập tức.</li>
            </ul>
          </div>

          {/* Optional Timer Switch */}
          <div className="flex items-center justify-center gap-3 py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm font-extrabold text-slate-700">
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded border-slate-300 focus:ring-purple-400 cursor-pointer"
              />
              <Clock className="w-4 h-4 text-purple-600" />
              <span>Bật đồng hồ bấm giờ (Tùy chọn, không bắt buộc)</span>
            </label>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateHome();
              }}
              className="px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-extrabold text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại Trang Chủ</span>
            </button>

            <button
              type="button"
              onClick={startNewGame}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-black text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-3 cursor-pointer animate-pulse-glow"
            >
              <Trophy className="w-6 h-6 text-yellow-300 fill-yellow-300" />
              <span>BẮT ĐẦU VÀO ĐẤU TRƯỜNG</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  // Active Game Screen
  if (!currentQ) return null;

  const currentScore = Object.values(selectedAnswers).filter((a) => a.isCorrect).length * 10;
  const progressPercent = Math.round(((currentIndex + (currentAnswer ? 1 : 0)) / questions.length) * 100);

  // Option colors for A, B, C, D
  const optionThemeStyles = [
    {
      default: 'border-sky-300 bg-sky-50/70 hover:bg-sky-100/80 text-sky-950',
      badge: 'bg-sky-500 text-white'
    },
    {
      default: 'border-emerald-300 bg-emerald-50/70 hover:bg-emerald-100/80 text-emerald-950',
      badge: 'bg-emerald-500 text-white'
    },
    {
      default: 'border-amber-300 bg-amber-50/70 hover:bg-amber-100/80 text-amber-950',
      badge: 'bg-amber-500 text-white'
    },
    {
      default: 'border-purple-300 bg-purple-50/70 hover:bg-purple-100/80 text-purple-950',
      badge: 'bg-purple-500 text-white'
    }
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 animate-fadeIn">
      
      {/* Top Status Header */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-purple-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setIsPlaying(false);
            }}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            title="Thoát khỏi đấu trường"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                currentQ.stage === 1 
                  ? 'bg-sky-100 text-sky-800' 
                  : currentQ.stage === 2 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-purple-100 text-purple-800'
              }`}>
                {currentQ.stageName}
              </span>
              <span className="text-xs font-extrabold text-slate-400">
                Câu {currentIndex + 1}/20
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-slate-800 truncate max-w-xs sm:max-w-md">
              Đấu Trường Trí Tuệ • Tin học 8
            </h2>
          </div>
        </div>

        {/* Current Score & Optional Timer */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          
          {timerEnabled && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 text-slate-700 rounded-xl font-mono text-xs font-bold">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>{formatTime(elapsedSeconds)}</span>
            </div>
          )}

          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl shadow-xs">
            <Trophy className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <div className="flex items-baseline gap-1">
              <span className="font-black text-base">{currentScore}</span>
              <span className="text-[10px] text-purple-200 font-bold">/ 200 điểm</span>
            </div>
          </div>

          <MascotBeSo 
            mood={currentAnswer ? (currentAnswer.isCorrect ? 'cheering' : 'waving') : 'thinking'}
            size="sm"
            showSpeech={false}
          />
        </div>

      </div>

      {/* Progress Bar with 3 Stage Indicators */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-slate-700">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-purple-500 fill-purple-500" />
            Tiến độ thi đấu: Câu {currentIndex + 1}/20
          </span>
          <span className="text-purple-600 font-bold">{progressPercent}%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stage step indicators */}
        <div className="flex justify-between text-[10px] font-black text-slate-400 px-1 pt-0.5">
          <span className={currentQ.stage === 1 ? 'text-sky-600 font-extrabold' : ''}>Chặng 1 (1 - 7)</span>
          <span className={currentQ.stage === 2 ? 'text-amber-600 font-extrabold' : ''}>Chặng 2 (8 - 14)</span>
          <span className={currentQ.stage === 3 ? 'text-purple-600 font-extrabold' : ''}>Chặng 3 (15 - 20)</span>
        </div>
      </div>

      {/* 16:9 Widescreen Two-Column Layout & Mobile Stacking */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Question & Mascot Reaction (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-800 font-black text-sm flex items-center justify-center">
                    {currentIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {currentQ.stageName}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const text = `${currentQ.question}. Các phương án là: ${currentQ.options.map(o => `${o.key}: ${o.text}`).join('. ')}`;
                    speechService.speak(text);
                  }}
                  className="p-2 px-3 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                  title="Nghe đọc câu hỏi này"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Đọc câu hỏi</span>
                </button>
              </div>

              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 leading-snug pt-1">
                {currentQ.question}
              </h3>
            </div>

            {/* Mascot reaction card */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 bg-purple-50/60 p-4 rounded-2xl border border-purple-100">
              <MascotBeSo 
                mood={currentAnswer ? (currentAnswer.isCorrect ? 'cheering' : 'waving') : 'thinking'}
                size="sm"
                showSpeech={false}
              />
              <div className="text-xs text-slate-700">
                <p className="font-extrabold text-purple-900">
                  {currentAnswer 
                    ? (currentAnswer.isCorrect ? '🎉 Bạn giỏi quá, rất chuẩn xác!' : '💡 Đừng nản, đọc kĩ giải thích nhé!')
                    : '🤖 Robot Tin học đang đợi đáp án của bạn...'}
                </p>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  {currentAnswer ? 'Bấm "Câu tiếp theo" để đi tiếp' : 'Chọn 1 trong 4 phương án bên cạnh'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 4 Options & Feedback & Next Button (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Options Grid: 2 columns on sm/md/lg, stacked on xs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQ.options.map((opt, idx) => {
              const isChosen = currentAnswer?.chosenIndex === idx;
              const isTheCorrectIndex = idx === currentQ.correctIndex;
              const theme = optionThemeStyles[idx % optionThemeStyles.length];

              let cardStyle = `${theme.default} border-2`;
              let badgeStyle = theme.badge;

              if (currentAnswer) {
                if (isTheCorrectIndex) {
                  cardStyle = 'bg-emerald-100 border-2 border-emerald-500 text-emerald-950 ring-2 ring-emerald-300 font-bold';
                  badgeStyle = 'bg-emerald-600 text-white';
                } else if (isChosen && !currentAnswer.isCorrect) {
                  cardStyle = 'bg-rose-100 border-2 border-rose-400 text-rose-950 line-through';
                  badgeStyle = 'bg-rose-600 text-white';
                } else {
                  cardStyle = 'bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60';
                  badgeStyle = 'bg-slate-300 text-slate-600';
                }
              }

              return (
                <button
                  key={opt.key}
                  type="button"
                  disabled={!!currentAnswer}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all flex items-start gap-3.5 min-h-[76px] cursor-pointer ${cardStyle} ${
                    !currentAnswer ? 'hover:scale-101 hover:shadow-md' : 'cursor-default'
                  }`}
                >
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs ${badgeStyle}`}>
                    {opt.key}
                  </span>
                  <span className="font-bold text-xs sm:text-sm leading-snug mt-1.5 flex-1">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Feedback and Explanation */}
          {currentAnswer && (
            <div
              className={`p-4 sm:p-5 rounded-2xl border-2 space-y-2 animate-fadeIn ${
                currentAnswer.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm">
                {currentAnswer.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span className="text-emerald-700">XUẤT SẮC! +10 ĐIỂM ĐẤU TRƯỜNG 🎉</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span className="text-rose-700">CHƯA CHÍNH XÁC RỒI BẠN ƠI!</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                <strong>Giải thích kiến thức:</strong> {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Next Question Navigation */}
          {currentAnswer && (
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={handleNext}
                className="w-full sm:w-auto py-3.5 px-8 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-black text-sm sm:text-base shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer animate-bounce-gentle"
              >
                <span>{currentIndex === questions.length - 1 ? 'Hoàn thành & Xem kết quả' : 'Câu tiếp theo'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
