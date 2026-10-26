import React, { useState } from 'react';
import { 
  Target, ArrowLeft, ArrowRight, RotateCcw, CheckCircle2, 
  XCircle, Sparkles, Trophy, Star, ChevronRight, HelpCircle,
  Volume2, Shuffle, Layers
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../data/practiceData';
import { PracticeQuestion } from '../types';
import { MascotBeSo } from './MascotBeSo';
import { soundManager } from '../utils/sound';
import { speechService } from '../utils/speech';
import { BehaviorSortGame } from './BehaviorSortGame';
import confetti from 'canvas-confetti';

interface PracticeSectionProps {
  onNavigateHome: () => void;
  onNavigateArena: () => void;
  onSavePracticeScore: (score: number, correctCount: number) => void;
}

export const PracticeSection: React.FC<PracticeSectionProps> = ({
  onNavigateHome,
  onNavigateArena,
  onSavePracticeScore
}) => {
  const [practiceMode, setPracticeMode] = useState<'quiz' | 'sort'>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, { selectedKey: string; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState(false);

  const totalQuestions = PRACTICE_QUESTIONS.length;
  const currentQ: PracticeQuestion = PRACTICE_QUESTIONS[currentIndex];
  const currentAnswer = userAnswers[currentQ.id];

  const handleSelectOption = (key: string) => {
    // If already answered for this question, lock to prevent double scoring
    if (currentAnswer) return;

    const isCorrect = key === currentQ.correctKey;
    if (isCorrect) {
      soundManager.playCorrect();
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.7 } });
    } else {
      soundManager.playIncorrect();
    }

    const updated = {
      ...userAnswers,
      [currentQ.id]: { selectedKey: key, isCorrect }
    };
    setUserAnswers(updated);

    // Calculate updated score immediately
    const correctCount = Object.values(updated).filter((a) => a.isCorrect).length;
    const score = correctCount * 10;
    onSavePracticeScore(score, correctCount);
  };

  const handleNext = () => {
    soundManager.playClick();
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
      soundManager.playVictory();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    }
  };

  const handlePrev = () => {
    soundManager.playClick();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleRestart = () => {
    soundManager.playClick();
    setUserAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const handleSpeakQuestion = () => {
    const textToSpeak = `${currentQ.question}. Các phương án là: ${currentQ.options.map(o => `${o.key}: ${o.text}`).join('. ')}`;
    speechService.speak(textToSpeak);
  };

  const correctCount = Object.values(userAnswers).filter((a) => a.isCorrect).length;
  const score = correctCount * 10;
  const progressPercent = Math.round(((currentIndex + (currentAnswer ? 1 : 0)) / totalQuestions) * 100);

  // If finished quiz mode, show summary screen
  if (isFinished && practiceMode === 'quiz') {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-200 shadow-xl text-center space-y-5">
          
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-200 animate-bounce-gentle">
            <Trophy className="w-10 h-10 text-yellow-100 fill-yellow-200" />
          </div>

          <div>
            <span className="text-xs font-black uppercase text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              HOÀN THÀNH 10 CÂU LUYỆN TẬP TƯƠNG TÁC
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Chúc Mừng Bạn Đã Về Đích! 🎉
            </h2>
            <p className="text-sm font-semibold text-slate-500 mt-1">
              Dưới đây là kết quả rèn luyện phản xạ đạo đức và văn hoá số của bạn:
            </p>
          </div>

          {/* Score card */}
          <div className="grid grid-cols-2 gap-4 bg-amber-50/60 p-5 rounded-2xl border border-amber-200">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase">Điểm Luyện Tập</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-600 mt-1">
                {score} <span className="text-base text-amber-800">/ 100</span>
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase">Số Câu Đúng</span>
              <div className="text-3xl sm:text-4xl font-black text-emerald-600 mt-1">
                {correctCount} <span className="text-base text-emerald-800">/ 10</span>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 text-sm font-semibold text-slate-700">
            {score >= 80 ? (
              <p className="text-emerald-700">
                🌟 <strong>Robot Tin học khen ngợi:</strong> Quá tuyệt vời! Bạn phản xạ các tình huống số cực kỳ chuẩn xác và có ý thức văn hoá cao! Hãy thử sức thêm với Mini-game Phân loại hoặc bước vào Đấu trường trí tuệ 20 câu nhé!
              </p>
            ) : score >= 50 ? (
              <p className="text-sky-700">
                👍 <strong>Robot Tin học động viên:</strong> Làm tốt lắm! Bạn đã nắm được hầu hết các nguyên tắc quan trọng. Bạn có thể làm lại để đạt điểm tuyệt đối 100/100 nha!
              </p>
            ) : (
              <p className="text-amber-700">
                💡 <strong>Robot Tin học nhắn nhủ:</strong> Đừng lo lắng nhé! Mỗi câu hỏi là một bài học bổ ích. Bạn hãy xem lại phần lý thuyết hoặc làm lại để nhớ lâu hơn nhé!
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm lại 10 câu này</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setPracticeMode('sort');
              }}
              className="px-5 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-extrabold text-xs sm:text-sm border border-emerald-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Shuffle className="w-4 h-4 text-emerald-600" />
              <span>Chơi Game Phân Loại Đúng - Sai</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onNavigateArena();
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-yellow-300" />
              <span>Vào Đấu Trường Trí Tuệ</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border-2 border-amber-100 shadow-sm">
        <div>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-amber-600 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Trang Chủ</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <Target className="w-6 h-6 text-amber-500" />
            <span>LUYỆN TẬP TƯƠNG TÁC TIN HỌC 8</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            {practiceMode === 'quiz' 
              ? '10 câu hỏi xử lí tình huống thực tế • Khóa đáp án tức thì'
              : 'Trò chơi phân loại: Nhận diện Hành vi Văn minh vs Hành vi Vi phạm'}
          </p>
        </div>

        {/* Current score bubble */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-50 border border-amber-200 px-3.5 py-1.5 rounded-2xl text-right">
            <span className="text-[10px] uppercase font-bold text-amber-700 block">Điểm luyện tập</span>
            <span className="text-lg font-black text-amber-800">{score} điểm</span>
          </div>

          <MascotBeSo 
            mood={currentAnswer ? (currentAnswer.isCorrect ? 'cheering' : 'waving') : 'thinking'}
            size="sm"
            showSpeech={false}
          />
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setPracticeMode('quiz');
          }}
          className={`py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            practiceMode === 'quiz'
              ? 'bg-white text-amber-800 shadow-md border border-amber-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Target className="w-4 h-4 text-amber-500" />
          <span>1. Bộ 10 Câu Trắc Nghiệm</span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setPracticeMode('sort');
          }}
          className={`py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            practiceMode === 'sort'
              ? 'bg-white text-emerald-800 shadow-md border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Shuffle className="w-4 h-4 text-emerald-500" />
          <span>2. Game Phân Loại Đúng - Sai</span>
        </button>
      </div>

      {/* Mode 2: Behavior Sorting Game */}
      {practiceMode === 'sort' ? (
        <BehaviorSortGame
          onAddScore={(pts) => {
            onSavePracticeScore(score + pts, correctCount);
          }}
          onFinish={() => {
            setPracticeMode('quiz');
          }}
        />
      ) : (
        /* Mode 1: 10 MCQ Questions */
        <div className="space-y-6">
          
          {/* Progress Bar & Indicators */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-xs font-black text-slate-700">
              <span>Câu {currentIndex + 1} trên {totalQuestions}</span>
              <span className="text-amber-600 font-bold">{progressPercent}% hoàn thành</span>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Question dots */}
            <div className="flex items-center justify-center gap-1.5 pt-1 overflow-x-auto">
              {PRACTICE_QUESTIONS.map((q, idx) => {
                const ans = userAnswers[q.id];
                let dotColor = 'bg-slate-200 text-slate-600';
                if (idx === currentIndex) {
                  dotColor = 'ring-2 ring-amber-500 bg-amber-400 text-white font-black';
                } else if (ans) {
                  dotColor = ans.isCorrect ? 'bg-emerald-500 text-white' : 'bg-rose-400 text-white';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setCurrentIndex(idx);
                    }}
                    className={`w-7 h-7 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${dotColor}`}
                    title={`Câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card - 16:9 Widescreen Two-Column Layout */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-md">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Question Details & Audio (5 cols on lg) */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full">
                      <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                      <span>CÂU HỎI {currentIndex + 1} / {totalQuestions}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSpeakQuestion}
                      className="p-2 px-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-600 border border-sky-200 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                      title="Nghe đọc câu hỏi này"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>Đọc câu hỏi</span>
                    </button>
                  </div>

                  <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-slate-800 leading-snug pt-1">
                    {currentQ.question}
                  </h2>
                </div>

                {/* Helpful Tip Box */}
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-1">
                  <p className="font-black flex items-center gap-1.5">
                    <span>💡 Gợi ý thực tế:</span>
                  </p>
                  <p className="font-semibold text-slate-600">
                    Hãy suy nghĩ xem hành động nào tôn trọng pháp luật, đạo đức và bảo vệ quyền riêng tư tốt nhất nhé!
                  </p>
                </div>
              </div>

              {/* Right Column: Options & Feedback & Navigation (7 cols on lg) */}
              <div className="lg:col-span-7 space-y-4">
                
                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt) => {
                    const isSelected = currentAnswer?.selectedKey === opt.key;
                    const isCorrectOption = opt.key === currentQ.correctKey;

                    let cardStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-amber-50/60 hover:border-amber-300';
                    let badgeStyle = 'bg-white border-slate-300 text-slate-700';

                    if (currentAnswer) {
                      if (isCorrectOption) {
                        cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-200 font-bold';
                        badgeStyle = 'bg-emerald-500 text-white border-emerald-600';
                      } else if (isSelected && !currentAnswer.isCorrect) {
                        cardStyle = 'bg-rose-50 border-rose-400 text-rose-950 line-through';
                        badgeStyle = 'bg-rose-500 text-white border-rose-600';
                      } else {
                        cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={opt.key}
                        type="button"
                        disabled={!!currentAnswer}
                        onClick={() => handleSelectOption(opt.key)}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${cardStyle} ${
                          !currentAnswer ? 'cursor-pointer hover:shadow-xs hover:scale-101' : 'cursor-default'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl border flex items-center justify-center font-black text-sm flex-shrink-0 shadow-xs ${badgeStyle}`}>
                          {opt.key}
                        </span>
                        <span className="font-bold text-xs sm:text-sm leading-snug mt-1 flex-1">
                          {opt.text}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Explanation Box */}
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
                          <span className="text-emerald-700">CHÍNH XÁC! +10 ĐIỂM THƯỞNG 🌟</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-600" />
                          <span className="text-rose-700">CHƯA ĐÚNG RỒI BẠN ƠI!</span>
                        </>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                      <strong>Giải thích của Robot Tin học:</strong> {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Navigation bottom bar */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={handlePrev}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
                      currentIndex === 0
                        ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                        : 'text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Câu trước</span>
                  </button>

                  {currentAnswer && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer animate-bounce-gentle"
                    >
                      <span>{currentIndex === totalQuestions - 1 ? 'Xem kết quả' : 'Câu tiếp theo'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
