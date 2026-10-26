import React, { useState } from 'react';
import { 
  BookOpen, CheckCircle2, ShieldAlert, Sparkles, HeartHandshake, 
  HelpCircle, ChevronRight, Check, AlertTriangle, ArrowLeft, ArrowRight,
  Layers, Smile, Award
} from 'lucide-react';
import { VIOLATIONS_PART_1, DIGITAL_PRODUCTS, CREATION_RULES, LearningSituation } from '../data/learningData';
import { MascotBeSo } from './MascotBeSo';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface LearningSectionProps {
  completedPart1: boolean;
  completedPart2: boolean;
  onCompletePart: (part: 'part1' | 'part2') => void;
  onNavigateHome: () => void;
  onNavigatePractice: () => void;
}

export const LearningSection: React.FC<LearningSectionProps> = ({
  completedPart1,
  completedPart2,
  onCompletePart,
  onNavigateHome,
  onNavigatePractice,
}) => {
  const [activeTab, setActiveTab] = useState<'part1' | 'part2'>('part1');
  const [answeredSituations, setAnsweredSituations] = useState<Record<string, { selectedKey: string; isCorrect: boolean }>>({});
  const [selectedProduct, setSelectedProduct] = useState<string | null>(DIGITAL_PRODUCTS[0].id);

  const handleSelectOption = (sitId: string, optionKey: string, correctKey: string) => {
    // If already answered, do not re-answer
    if (answeredSituations[sitId]) return;

    const isCorrect = optionKey === correctKey;
    if (isCorrect) {
      soundManager.playCorrect();
    } else {
      soundManager.playIncorrect();
    }

    setAnsweredSituations((prev) => ({
      ...prev,
      [sitId]: { selectedKey: optionKey, isCorrect }
    }));
  };

  const handleMarkUnderstandPart1 = () => {
    soundManager.playVictory();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    onCompletePart('part1');
  };

  const handleMarkUnderstandPart2 = () => {
    soundManager.playVictory();
    confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    onCompletePart('part2');
  };

  const part1AnsweredCount = Object.keys(answeredSituations).length;

  return (
    <div className="w-full max-w-[1650px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 animate-fadeIn">
      
      {/* Navigation & Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border-2 border-emerald-100 shadow-sm">
        <div>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-emerald-600 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Trang Chủ</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            <span>BÀI 4: ĐẠO ĐỨC VÀ VĂN HOÁ TRONG SỬ DỤNG CÔNG NGHỆ KĨ THUẬT SỐ</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Sách giáo khoa Tin học 8 • Bộ Kết nối tri thức với cuộc sống (Bài 4)
          </p>
        </div>

        {/* Mascot */}
        <div className="hidden sm:block flex-shrink-0">
          <MascotBeSo 
            mood="happy"
            size="sm"
            message="Hãy đọc từng tình huống thực tế và bấm 'Đã hiểu' khi xong nhé!"
          />
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="grid grid-cols-2 gap-3 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveTab('part1');
          }}
          className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'part1'
              ? 'bg-white text-emerald-700 shadow-md border border-emerald-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Phần 1. Biểu hiện vi phạm</span>
          {completedPart1 && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
        </button>

        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setActiveTab('part2');
          }}
          className={`py-3 px-4 rounded-xl font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'part2'
              ? 'bg-white text-sky-700 shadow-md border border-sky-200'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>Phần 2. Trung thực khi tạo sản phẩm số</span>
          {completedPart2 && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
        </button>
      </div>

      {/* ===================== PHẦN 1 ===================== */}
      {activeTab === 'part1' && (
        <div className="space-y-6">
          
          <div className="bg-emerald-50/80 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 text-emerald-950 space-y-2">
            <div className="inline-block bg-emerald-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full">
              MỤC TIÊU PHẦN 1
            </div>
            <h2 className="text-lg sm:text-xl font-black text-emerald-900">
              Nhận diện 8 biểu hiện vi phạm đạo đức, pháp luật & văn hoá khi dùng công nghệ
            </h2>
            <p className="text-xs sm:text-sm text-emerald-800 font-semibold leading-relaxed">
              Môi trường số mang lại nhiều tiện ích, nhưng nếu không cẩn trọng, chúng ta có thể vô tình hoặc cố ý vi phạm nội quy, bản quyền hoặc quyền riêng tư của người khác. Hãy tìm hiểu 8 tình huống dưới đây!
            </p>
          </div>

          {/* 8 Situation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VIOLATIONS_PART_1.map((item, idx) => {
              const answerState = answeredSituations[item.id];
              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        {item.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-400">
                        Tình huống {idx + 1}/8
                      </span>
                    </div>

                    <h3 className="text-base font-black text-slate-800 leading-snug">
                      {item.title}
                    </h3>

                    {/* Situation Box */}
                    <div className="bg-slate-50 border-l-4 border-amber-400 p-3 rounded-r-2xl text-xs sm:text-sm text-slate-700 font-medium">
                      <strong>Tình huống thực tế:</strong> {item.situation}
                    </div>

                    <div className="space-y-1.5 text-xs font-medium text-slate-600">
                      <p>
                        <strong className="text-slate-800">Vì sao vi phạm:</strong> {item.explanation}
                      </p>
                      <p className="text-emerald-700 font-semibold">
                        💡 <strong>Lời khuyên của Robot Tin học:</strong> {item.goodAdvice}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Quick Question */}
                  <div className="bg-emerald-50/60 rounded-2xl p-3.5 border border-emerald-200 space-y-2 mt-2">
                    <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
                      <HelpCircle className="w-4 h-4 text-emerald-600" />
                      <span>Câu hỏi gợi mở:</span>
                    </div>
                    <p className="text-xs font-bold text-slate-800">
                      {item.interactiveQuestion.question}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {item.interactiveQuestion.options.map((opt) => {
                        const isChosen = answerState?.selectedKey === opt.key;
                        const isTheCorrectOne = opt.key === item.interactiveQuestion.correctKey;

                        let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300';
                        if (answerState) {
                          if (isTheCorrectOne) {
                            btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black';
                          } else if (isChosen && !answerState.isCorrect) {
                            btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                          } else {
                            btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-70';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            disabled={!!answerState}
                            onClick={() => handleSelectOption(item.id, opt.key, item.interactiveQuestion.correctKey)}
                            className={`w-full text-left p-2.5 rounded-xl border text-xs transition-all flex items-start gap-2 ${btnStyle} ${
                              !answerState ? 'cursor-pointer hover:bg-emerald-50/50' : 'cursor-default'
                            }`}
                          >
                            <span className="font-black flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">
                              {opt.key}
                            </span>
                            <span className="leading-snug">{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {answerState && (
                      <div className={`p-2 rounded-xl text-xs font-bold mt-2 flex items-center gap-2 ${
                        answerState.isCorrect ? 'bg-emerald-200/80 text-emerald-900' : 'bg-rose-100 text-rose-900'
                      }`}>
                        {answerState.isCorrect ? (
                          <Check className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        )}
                        <span>{item.interactiveQuestion.feedback}</span>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

          {/* Complete Part 1 Button */}
          <div className="bg-white rounded-3xl p-6 border-2 border-emerald-200 text-center space-y-3 shadow-md">
            <h3 className="text-base font-black text-slate-800">
              Bạn đã tìm hiểu xong các biểu hiện vi phạm trong Phần 1 chưa?
            </h3>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
              Đã trả lời {part1AnsweredCount}/8 câu hỏi gợi mở. Hãy bấm nút dưới đây để xác nhận hoàn thành và nhận huy hiệu nhé!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleMarkUnderstandPart1}
                className={`py-3.5 px-8 rounded-2xl font-black text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                  completedPart1
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-emerald-500 hover:bg-emerald-600 text-white animate-bounce-gentle'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{completedPart1 ? '✓ ĐÃ HOÀN THÀNH PHẦN 1' : 'TÔI ĐÃ HIỂU PHẦN 1!'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab('part2');
                }}
                className="py-3.5 px-6 rounded-2xl font-black text-sm bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Học tiếp Phần 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ===================== PHẦN 2 ===================== */}
      {activeTab === 'part2' && (
        <div className="space-y-6">
          
          <div className="bg-sky-50/80 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 text-sky-950 space-y-2">
            <div className="inline-block bg-sky-600 text-white font-black text-xs px-2.5 py-0.5 rounded-full">
              MỤC TIÊU PHẦN 2
            </div>
            <h2 className="text-lg sm:text-xl font-black text-sky-900">
              Trung thực, trách nhiệm và tôn trọng bản quyền khi tạo ra sản phẩm số
            </h2>
            <p className="text-xs sm:text-sm text-sky-800 font-semibold leading-relaxed">
              Các bạn học sinh ngày nay có thể tự tạo rất nhiều sản phẩm số thú vị! Nhưng làm thế nào để vừa sáng tạo tài năng, vừa giữ được sự trung thực và chuẩn mực đạo đức? Cùng khám phá ngay nhé!
            </p>
          </div>

          {/* Sub-section: 7 Sản phẩm số gần gũi */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Các sản phẩm số gần gũi học sinh lớp 8 có thể tự tạo:</span>
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Bấm vào từng sản phẩm để xem ví dụ minh hoạ nhé!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {DIGITAL_PRODUCTS.map((prod) => {
                const isSelected = selectedProduct === prod.id;
                return (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(prod.id);
                      soundManager.playClick();
                    }}
                    className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[90px] ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50 shadow-sm ring-2 ring-sky-200 scale-102'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xl">✨</span>
                    <span className="text-[11px] font-black text-slate-800 line-clamp-2 mt-1">
                      {prod.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Product Detail */}
            {selectedProduct && (() => {
              const prod = DIGITAL_PRODUCTS.find((p) => p.id === selectedProduct)!;
              return (
                <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 rounded-2xl p-4 text-xs sm:text-sm text-sky-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
                  <div>
                    <h4 className="font-black text-sky-900 text-sm flex items-center gap-1.5">
                      <span>🏷️ {prod.name}:</span>
                    </h4>
                    <p className="text-slate-700 mt-1 font-medium">{prod.description}</p>
                    <p className="text-sky-700 font-bold mt-1">
                      💡 Ví dụ của học sinh: &quot;{prod.example}&quot;
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 8 Principles Cards */}
          <div className="space-y-3">
            <h3 className="text-base font-black text-slate-800 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              <span>8 Nguyên tắc vàng khi tạo ra sản phẩm số học sinh cần ghi nhớ:</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CREATION_RULES.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-white rounded-2xl p-4 border-2 border-slate-200/80 shadow-xs hover:border-sky-300 transition-colors flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 font-black text-xs flex items-center justify-center flex-shrink-0">
                    {rule.id}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 leading-snug">
                      {rule.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {rule.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Complete Part 2 Button */}
          <div className="bg-white rounded-3xl p-6 border-2 border-sky-200 text-center space-y-3 shadow-md">
            <h3 className="text-base font-black text-slate-800">
              Bạn đã ghi nhớ 8 nguyên tắc trung thực khi tạo sản phẩm số chưa?
            </h3>
            <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
              Bấm nút &quot;Tôi đã hiểu&quot; để hoàn thành toàn bộ bài học và sẵn sàng bước vào Luyện tập & Đấu trường nhé!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleMarkUnderstandPart2}
                className={`py-3.5 px-8 rounded-2xl font-black text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer ${
                  completedPart2
                    ? 'bg-sky-600 text-white hover:bg-sky-700'
                    : 'bg-sky-500 hover:bg-sky-600 text-white animate-bounce-gentle'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                <span>{completedPart2 ? '✓ ĐÃ HOÀN THÀNH PHẦN 2' : 'TÔI ĐÃ HIỂU PHẦN 2!'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  onNavigatePractice();
                }}
                className="py-3.5 px-6 rounded-2xl font-black text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <span>Sang Luyện Tập Tương Tác</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
