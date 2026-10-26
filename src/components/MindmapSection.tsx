import React, { useState } from 'react';
import { 
  Brain, ArrowLeft, ChevronDown, ChevronUp, Eye, EyeOff, 
  Sparkles, CheckCircle2, Shield, Copyright, Lock, HelpCircle 
} from 'lucide-react';
import { MINDMAP_CENTER, MINDMAP_BRANCHES, MindmapNode } from '../data/mindmapData';
import { MascotBeSo } from './MascotBeSo';
import { soundManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface MindmapSectionProps {
  onNavigateHome: () => void;
  onExploreDone: () => void;
  isExplored: boolean;
}

export const MindmapSection: React.FC<MindmapSectionProps> = ({
  onNavigateHome,
  onExploreDone,
  isExplored
}) => {
  // Store expanded state for each branch
  const [expandedBranches, setExpandedBranches] = useState<Record<string, boolean>>({
    'branch-1': true,
    'branch-2': true,
    'branch-3': true,
    'branch-4': true,
  });

  const toggleBranch = (id: string) => {
    soundManager.playClick();
    setExpandedBranches((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleExpandAll = () => {
    soundManager.playClick();
    setExpandedBranches({
      'branch-1': true,
      'branch-2': true,
      'branch-3': true,
      'branch-4': true,
    });
  };

  const handleCollapseAll = () => {
    soundManager.playClick();
    setExpandedBranches({
      'branch-1': false,
      'branch-2': false,
      'branch-3': false,
      'branch-4': false,
    });
  };

  const handleFinishExplore = () => {
    soundManager.playVictory();
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    onExploreDone();
  };

  const getBranchIcon = (id: string) => {
    switch (id) {
      case 'branch-1': return <Shield className="w-5 h-5" />;
      case 'branch-2': return <Copyright className="w-5 h-5" />;
      case 'branch-3': return <Sparkles className="w-5 h-5" />;
      case 'branch-4': return <Lock className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  const allExpanded = Object.values(expandedBranches).every(Boolean);

  return (
    <div className="w-full max-w-[1650px] mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6 animate-fadeIn">
      
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border-2 border-sky-100 shadow-sm">
        <div>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onNavigateHome();
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-sky-600 transition-colors mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Về Trang Chủ</span>
          </button>
          <h1 className="text-xl sm:text-2xl font-black text-slate-800 flex items-center gap-2">
            <Brain className="w-6 h-6 text-sky-600" />
            <span>SƠ ĐỒ TƯ DUY 4 NHÁNH KIẾN THỨC BÀI 4</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold">
            Trực quan hoá toàn bộ quy tắc ứng xử chuẩn mực của Công dân số văn minh
          </p>
        </div>

        {/* Mascot */}
        <div className="hidden sm:block flex-shrink-0">
          <MascotBeSo 
            mood="thinking"
            size="sm"
            message="Nhấn vào từng nhánh để mở rộng hoặc thu gọn nội dung nhé bạn ơi!"
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          {allExpanded ? (
            <button
              type="button"
              onClick={handleCollapseAll}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <EyeOff className="w-4 h-4 text-slate-500" />
              <span>Thu gọn các nhánh</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleExpandAll}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-sky-600" />
              <span>Xem toàn bộ sơ đồ (Mở tất cả)</span>
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleFinishExplore}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
            isExplored
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:opacity-95'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{isExplored ? '✓ Đã hoàn thành xem sơ đồ' : 'Đánh dấu đã hiểu sơ đồ!'}</span>
        </button>
      </div>

      {/* Mindmap Graphical Center & Branches */}
      <div className="space-y-6">
        
        {/* Central Core Box */}
        <div className="relative mx-auto max-w-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-7 text-white text-center shadow-xl border-4 border-white ring-4 ring-purple-100">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black mb-2 text-yellow-300">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            NÚT TRUNG TÂM
          </div>
          <h2 className="text-lg sm:text-2xl font-black uppercase tracking-tight leading-snug">
            {MINDMAP_CENTER.title}
          </h2>
          <p className="text-purple-100 font-bold text-xs sm:text-sm mt-1">
            {MINDMAP_CENTER.subtitle}
          </p>
          <div className="mt-3 inline-block bg-white/15 px-3 py-1 rounded-full text-xs font-black text-amber-200">
            {MINDMAP_CENTER.motto}
          </div>
        </div>

        {/* 4 Branches Grid: 4 columns on widescreen 16:9, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5 pt-2">
          {MINDMAP_BRANCHES.map((branch) => {
            const isExpanded = !!expandedBranches[branch.id];

            return (
              <div
                key={branch.id}
                className={`bg-white rounded-3xl border-2 transition-all duration-300 shadow-sm overflow-hidden flex flex-col ${
                  branch.borderColor
                } ${isExpanded ? 'shadow-md' : 'opacity-90'}`}
              >
                {/* Branch Header (Clickable Accordion) */}
                <button
                  type="button"
                  onClick={() => toggleBranch(branch.id)}
                  className={`w-full p-4 sm:p-5 text-white flex items-center justify-between text-left transition-all bg-gradient-to-r ${branch.bgGradient} cursor-pointer`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                      {getBranchIcon(branch.id)}
                    </div>
                    <div>
                      <h3 className="font-black text-sm sm:text-base leading-tight">
                        {branch.title}
                      </h3>
                      <p className="text-white/80 text-xs font-medium mt-0.5">
                        {branch.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 ml-2">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Branch Body Items */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-3 bg-white animate-fadeIn">
                    {branch.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3 sm:p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-full bg-white shadow-xs border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="space-y-0.5">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-800">
                            {item.text}
                          </h4>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Return to Home Action Card */}
      <div className="text-center pt-4">
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onNavigateHome();
          }}
          className="py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs sm:text-sm rounded-2xl transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay về Trang Chủ</span>
        </button>
      </div>

    </div>
  );
};
