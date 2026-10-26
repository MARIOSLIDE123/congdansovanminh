import React, { useState } from 'react';
import { 
  CheckCircle2, XCircle, RotateCcw, Trophy, Sparkles, 
  ThumbsUp, ThumbsDown, ArrowRight, ShieldCheck, AlertTriangle,
  Volume2
} from 'lucide-react';
import { BEHAVIOR_CARDS, BehaviorCard } from '../data/behaviorData';
import { soundManager } from '../utils/sound';
import { speechService } from '../utils/speech';
import confetti from 'canvas-confetti';

interface BehaviorSortGameProps {
  onAddScore: (points: number) => void;
  onFinish: () => void;
}

export const BehaviorSortGame: React.FC<BehaviorSortGameProps> = ({
  onAddScore,
  onFinish
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<{
    card: BehaviorCard;
    userChoice: 'correct' | 'violation';
    isCorrect: boolean;
  }[]>([]);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    text: string;
  } | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentCard = BEHAVIOR_CARDS[currentIndex];

  const handleChoice = (choice: 'correct' | 'violation') => {
    if (feedback) return; // Prevent clicking while feedback is showing

    const isMatch = choice === currentCard.category;
    if (isMatch) {
      soundManager.playCorrect();
      onAddScore(10);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else {
      soundManager.playIncorrect();
    }

    setFeedback({
      isCorrect: isMatch,
      text: currentCard.explanation
    });

    setHistory((prev) => [
      ...prev,
      { card: currentCard, userChoice: choice, isCorrect: isMatch }
    ]);
  };

  const handleNext = () => {
    soundManager.playClick();
    setFeedback(null);
    if (currentIndex < BEHAVIOR_CARDS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsCompleted(true);
      soundManager.playVictory();
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setCurrentIndex(0);
    setHistory([]);
    setFeedback(null);
    setIsCompleted(false);
  };

  const handleSpeak = (text: string) => {
    speechService.speak(text);
  };

  const correctAnswersCount = history.filter((h) => h.isCorrect).length;
  const progressPercent = Math.round(((currentIndex + (feedback ? 1 : 0)) / BEHAVIOR_CARDS.length) * 100);

  if (isCompleted) {
    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-200 shadow-xl text-center space-y-5 animate-fadeIn">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-emerald-400 to-teal-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-200 animate-bounce-gentle">
          <Trophy className="w-10 h-10 text-yellow-200 fill-yellow-200" />
        </div>

        <div>
          <span className="text-xs font-black uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            KẾT THÚC THỬ THÁCH PHÂN LOẠI
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
            Bạn Thật Xuất Sắc! 🎉
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Đã nhận diện chuẩn xác các hành vi đúng – sai trong không gian số.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 max-w-sm mx-auto">
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase">Phân loại đúng</span>
            <div className="text-3xl font-black text-emerald-600 mt-0.5">
              {correctAnswersCount} / {BEHAVIOR_CARDS.length}
            </div>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-600 uppercase">Điểm thưởng</span>
            <div className="text-3xl font-black text-amber-600 mt-0.5">
              +{correctAnswersCount * 10} đ
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={handleRestart}
            className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi lại trò phân loại</span>
          </button>

          <button
            type="button"
            onClick={onFinish}
            className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Quay lại Trắc Nghiệm 10 Câu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Mini Progress */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between text-xs font-black text-slate-700">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Tình huống {currentIndex + 1} / {BEHAVIOR_CARDS.length}
          </span>
          <span className="text-emerald-600">{progressPercent}%</span>
        </div>

        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Target Card to Classify */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-200 shadow-md space-y-5 text-center relative overflow-hidden">
        
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            Chủ đề: {currentCard.badge}
          </span>

          <button
            type="button"
            onClick={() => handleSpeak(currentCard.situation)}
            className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 transition-colors cursor-pointer"
            title="Nghe đọc tình huống"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">
            Đọc kĩ tình huống và phân loại:
          </span>
          <p className="text-lg sm:text-2xl font-black text-slate-800 leading-snug">
            &ldquo;{currentCard.situation}&rdquo;
          </p>
        </div>

        {/* Feedback area */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border-2 space-y-1 animate-fadeIn text-left ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-black text-xs sm:text-sm">
              {feedback.isCorrect ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="text-emerald-700">CHÍNH XÁC! +10 ĐIỂM</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <span className="text-rose-700">CHƯA ĐÚNG RỒI!</span>
                </>
              )}
            </div>
            <p className="text-xs sm:text-sm font-semibold">{feedback.text}</p>
          </div>
        )}

        {/* 2 Big Choice Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          
          <button
            type="button"
            disabled={!!feedback}
            onClick={() => handleChoice('correct')}
            className={`p-5 rounded-2xl border-3 transition-all flex items-center justify-center gap-3 font-black text-base sm:text-lg cursor-pointer ${
              feedback
                ? currentCard.category === 'correct'
                  ? 'bg-emerald-500 text-white border-emerald-600 scale-102 ring-4 ring-emerald-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-400 text-emerald-800 hover:scale-102 shadow-sm'
            }`}
          >
            <ThumbsUp className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <span>🟢 ĐÚNG / NÊN LÀM</span>
          </button>

          <button
            type="button"
            disabled={!!feedback}
            onClick={() => handleChoice('violation')}
            className={`p-5 rounded-2xl border-3 transition-all flex items-center justify-center gap-3 font-black text-base sm:text-lg cursor-pointer ${
              feedback
                ? currentCard.category === 'violation'
                  ? 'bg-rose-500 text-white border-rose-600 scale-102 ring-4 ring-rose-200'
                  : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
                : 'bg-rose-50 hover:bg-rose-100 border-rose-400 text-rose-800 hover:scale-102 shadow-sm'
            }`}
          >
            <ThumbsDown className="w-6 h-6 text-rose-600 flex-shrink-0" />
            <span>🔴 SAI / KHÔNG NÊN</span>
          </button>

        </div>

        {/* Next Button */}
        {feedback && (
          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleNext}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer animate-bounce-gentle"
            >
              <span>{currentIndex === BEHAVIOR_CARDS.length - 1 ? 'Xem kết quả' : 'Tình huống tiếp theo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
