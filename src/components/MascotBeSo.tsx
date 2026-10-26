import React, { useState } from 'react';
import { Sparkles, Volume2, MessageCircle } from 'lucide-react';
import { soundManager } from '../utils/sound';

interface MascotBeSoProps {
  mood?: 'happy' | 'thinking' | 'cheering' | 'waving';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  showSpeech?: boolean;
}

export const MascotBeSo: React.FC<MascotBeSoProps> = ({
  mood = 'happy',
  message,
  size = 'md',
  showSpeech = true,
}) => {
  const [clickCount, setClickCount] = useState(0);

  const defaultMessages: Record<string, string[]> = {
    happy: [
      'Chào bạn! Mình là Robot Tin học, trợ giảng công nghệ của bạn đây!',
      'Hôm nay chúng mình cùng học cách làm Công dân số thật văn minh nhé!',
      'Luôn nhớ: Trung thực, tôn trọng bản quyền và giữ an toàn trên mạng!'
    ],
    thinking: [
      'Hãy đọc thật kĩ câu hỏi trước khi chọn phương án nhé!',
      'Tự tin lên nào, bạn nhất định sẽ tìm ra đáp án đúng!',
      'Suy nghĩ xem hành động nào vừa văn minh lại vừa an toàn nha!'
    ],
    cheering: [
      'Tuyệt cú mèo! Bạn trả lời quá xuất sắc luôn!',
      'Đúng rồi! Bạn xứng đáng nhận 10 điểm thưởng!',
      'Tiếp tục giữ vững phong độ nhé, Robot Tin học tự hào về bạn!'
    ],
    waving: [
      'Cố lên bạn ơi, sai một câu không sao cả, mình học được bài học mới!',
      'Robot Tin học luôn đồng hành và cổ vũ bạn nè!',
      'Mỗi thử thách sẽ giúp bạn thông thái hơn mỗi ngày!'
    ]
  };

  const getActiveMessage = () => {
    if (message) return message;
    const pool = defaultMessages[mood] || defaultMessages.happy;
    return pool[clickCount % pool.length];
  };

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    soundManager.playClick();
  };

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 md:w-28 md:h-28',
    lg: 'w-32 h-32 md:w-36 md:h-36',
  };

  return (
    <div className="relative inline-flex items-center gap-3">
      {/* Robot SVG Avatar */}
      <button
        type="button"
        onClick={handleClick}
        title="Nhấn vào Robot Tin học để trò chuyện!"
        className={`${sizeClasses[size]} relative transition-transform hover:scale-105 active:scale-95 focus:outline-none cursor-pointer flex-shrink-0 animate-float`}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-md">
          {/* Antenna */}
          <line x1="60" y1="22" x2="60" y2="10" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
          <circle cx="60" cy="8" r="7" fill="#f59e0b" className="animate-pulse" />
          <circle cx="60" cy="8" r="3" fill="#fef08a" />

          {/* Ears */}
          <rect x="18" y="42" width="8" height="16" rx="4" fill="#0284c7" />
          <rect x="94" y="42" width="8" height="16" rx="4" fill="#0284c7" />

          {/* Head */}
          <rect x="24" y="22" width="72" height="54" rx="20" fill="#38bdf8" />
          <rect x="28" y="26" width="64" height="46" rx="16" fill="#0284c7" />

          {/* Screen Face */}
          <rect x="34" y="32" width="52" height="34" rx="10" fill="#0f172a" />

          {/* Eyes depending on mood */}
          {mood === 'happy' || mood === 'cheering' ? (
            <>
              {/* Joyful curved eyes */}
              <path d="M42 50 Q48 42 54 50" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M66 50 Q72 42 78 50" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" />
            </>
          ) : mood === 'thinking' ? (
            <>
              {/* Concentrated thinking eyes */}
              <circle cx="48" cy="48" r="5" fill="#facc15" />
              <circle cx="72" cy="48" r="5" fill="#facc15" />
              <circle cx="46" cy="46" r="1.5" fill="#ffffff" />
              <circle cx="70" cy="46" r="1.5" fill="#ffffff" />
            </>
          ) : (
            <>
              {/* Gentle encouraging round eyes */}
              <circle cx="48" cy="48" r="5" fill="#38bdf8" />
              <circle cx="72" cy="48" r="5" fill="#38bdf8" />
              <circle cx="46" cy="46" r="2" fill="#ffffff" />
              <circle cx="70" cy="46" r="2" fill="#ffffff" />
            </>
          )}

          {/* Cheeks */}
          <ellipse cx="40" cy="58" rx="4" ry="2" fill="#f43f5e" opacity="0.7" />
          <ellipse cx="80" cy="58" rx="4" ry="2" fill="#f43f5e" opacity="0.7" />

          {/* Smile mouth */}
          <path d="M54 58 Q60 63 66 58" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />

          {/* Neck */}
          <rect x="52" y="76" width="16" height="8" rx="3" fill="#cbd5e1" />

          {/* Body */}
          <path d="M30 84 Q60 80 90 84 L96 112 Q60 118 24 112 Z" fill="#0ea5e9" />
          {/* Belly screen with heart & stars */}
          <rect x="42" y="88" width="36" height="22" rx="7" fill="#0369a1" />
          <path d="M60 94 C57 91 52 93 52 97 C52 101 60 106 60 106 C60 106 68 101 68 97 C68 93 63 91 60 94 Z" fill="#f43f5e" />

          {/* Arms */}
          <path d="M26 88 Q14 96 18 106" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
          <path d="M94 88 Q106 96 102 106" fill="none" stroke="#38bdf8" strokeWidth="6" strokeLinecap="round" />
        </svg>

        {/* Small badge */}
        <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow whitespace-nowrap">
          Robot Tin học
        </span>
      </button>

      {/* Speech Bubble */}
      {showSpeech && (
        <div className="relative bg-white text-slate-800 p-3 md:p-3.5 rounded-2xl rounded-tl-none shadow-md border-2 border-sky-100 max-w-xs md:max-w-sm text-sm font-medium leading-relaxed">
          <div className="flex items-center gap-1.5 text-xs font-bold text-sky-600 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
            <span>Robot Tin học nhắn nhủ:</span>
          </div>
          <p className="text-slate-700 text-xs md:text-sm font-semibold">{getActiveMessage()}</p>
        </div>
      )}
    </div>
  );
};
