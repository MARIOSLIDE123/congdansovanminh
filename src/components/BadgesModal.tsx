import React, { useState } from 'react';
import { Award, X, Sparkles, CheckCircle2, Lock, Flame, Crown, ShieldCheck, Brain, Target } from 'lucide-react';
import { BADGE_DEFINITIONS, BadgeDef } from '../data/badgeData';

interface BadgesModalProps {
  unlockedBadgeIds: string[];
  onClose: () => void;
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  unlockedBadgeIds,
  onClose
}) => {
  const [filter, setFilter] = useState<'all' | 'learning' | 'mindmap' | 'practice' | 'arena'>('all');

  const filteredBadges = BADGE_DEFINITIONS.filter((b) => {
    if (filter === 'all') return true;
    return b.category === filter;
  });

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'Brain': return <Brain className="w-6 h-6" />;
      case 'Target': return <Target className="w-6 h-6" />;
      case 'Flame': return <Flame className="w-6 h-6" />;
      case 'Trophy': return <Award className="w-6 h-6" />;
      case 'Crown': return <Crown className="w-6 h-6" />;
      default: return <Award className="w-6 h-6" />;
    }
  };

  const unlockedCount = BADGE_DEFINITIONS.filter((b) => unlockedBadgeIds.includes(b.id)).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-200 overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Award className="w-6 h-6 text-yellow-200" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-black">KHO HUY HIỆU CÔNG DÂN SỐ</h2>
              <p className="text-xs text-amber-100 font-semibold">
                Đã mở khoá: {unlockedCount} / {BADGE_DEFINITIONS.length} danh hiệu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-xl transition-colors cursor-pointer text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter categories */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-1.5 flex-shrink-0">
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'learning', label: 'Học tập' },
            { id: 'mindmap', label: 'Sơ đồ' },
            { id: 'practice', label: 'Luyện tập' },
            { id: 'arena', label: 'Đấu trường' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilter(cat.id as unknown as typeof filter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                filter === cat.id
                  ? 'bg-amber-500 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Badge Grid */}
        <div className="p-5 space-y-3 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filteredBadges.map((badge) => {
              const isUnlocked = unlockedBadgeIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border-2 flex items-start gap-3.5 transition-all ${
                    isUnlocked
                      ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                      isUnlocked
                        ? `bg-gradient-to-tr ${badge.color} text-white`
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    {isUnlocked ? getBadgeIcon(badge.icon) : <Lock className="w-5 h-5" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-black text-sm text-slate-800 leading-tight">
                        {badge.title}
                      </h4>
                      {isUnlocked && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">
                      {badge.description}
                    </p>
                    <span className="text-[10px] font-black uppercase tracking-wider block pt-0.5 text-amber-700">
                      {isUnlocked ? '✓ Đã đạt được' : '🔒 Chưa mở khoá'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs rounded-xl transition-colors cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
