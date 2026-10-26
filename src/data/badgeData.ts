export interface BadgeDef {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  category: 'onboarding' | 'learning' | 'mindmap' | 'practice' | 'arena';
}

export interface StudentAvatar {
  id: string;
  name: string;
  title: string;
  emoji: string;
  bgColor: string;
  avatarSvg: string;
}

export const STUDENT_AVATARS: StudentAvatar[] = [
  {
    id: 'be_so',
    name: 'Robot Tin học',
    title: 'Robot Trợ Giảng',
    emoji: '🤖',
    bgColor: 'from-emerald-400 to-teal-500',
    avatarSvg: 'robot'
  },
  {
    id: 'nam_nang_dong',
    name: 'Minh Khang',
    title: 'Học sinh năng động',
    emoji: '👦',
    bgColor: 'from-blue-400 to-indigo-500',
    avatarSvg: 'boy'
  },
  {
    id: 'nu_thong_thai',
    name: 'Linh Đan',
    title: 'Học sinh thông thái',
    emoji: '👧',
    bgColor: 'from-pink-400 to-rose-500',
    avatarSvg: 'girl'
  },
  {
    id: 'phi_hanh_gia',
    name: 'Gia Huy',
    title: 'Phi hành gia số',
    emoji: '🧑‍🚀',
    bgColor: 'from-purple-400 to-violet-500',
    avatarSvg: 'astronaut'
  },
  {
    id: 'tham_hiem',
    name: 'Bảo Ngọc',
    title: 'Nhà thám hiểm',
    emoji: '🧭',
    bgColor: 'from-amber-400 to-orange-500',
    avatarSvg: 'explorer'
  },
  {
    id: 'nghe_si_so',
    name: 'Tuệ Mẫn',
    title: 'Họa sĩ sáng tạo số',
    emoji: '🎨',
    bgColor: 'from-cyan-400 to-sky-500',
    avatarSvg: 'artist'
  }
];

export const BADGE_DEFINITIONS: BadgeDef[] = [
  {
    id: 'khoi_dong_so',
    title: 'Tân Binh Công Dân Số',
    description: 'Đăng nhập thành công và sẵn sàng bước vào không gian số.',
    icon: 'Sparkles',
    color: 'from-emerald-400 to-teal-500',
    category: 'onboarding'
  },
  {
    id: 'hoc_gia_part1',
    title: 'Hiệp Sĩ Văn Minh Số',
    description: 'Nắm vững 8 biểu hiện vi phạm và cách ứng xử có trách nhiệm.',
    icon: 'ShieldCheck',
    color: 'from-sky-400 to-blue-500',
    category: 'learning'
  },
  {
    id: 'hoc_gia_part2',
    title: 'Nghệ Nhân Số Trung Thực',
    description: 'Nắm vững 8 nguyên tắc trung thực khi tạo sản phẩm số.',
    icon: 'Award',
    color: 'from-amber-400 to-orange-500',
    category: 'learning'
  },
  {
    id: 'bac_thay_so_do',
    title: 'Bộ Não Tư Duy',
    description: 'Khám phá đầy đủ 4 nhánh kiến thức trên Sơ đồ tư duy.',
    icon: 'Brain',
    color: 'from-purple-400 to-violet-500',
    category: 'mindmap'
  },
  {
    id: 'luyen_tap_xuat_sac',
    title: 'Bút Vàng Luyện Tập',
    description: 'Hoàn thành xuất sắc 10 câu hỏi luyện tập tương tác.',
    icon: 'Target',
    color: 'from-rose-400 to-red-500',
    category: 'practice'
  },
  {
    id: 'dau_truong_chien_binh',
    title: 'Chiến Binh Số Tiến Bộ',
    description: 'Đạt từ 100 đến 140 điểm trong Đấu trường trí tuệ.',
    icon: 'Flame',
    color: 'from-amber-500 to-amber-600',
    category: 'arena'
  },
  {
    id: 'dau_truong_chuyen_gia',
    title: 'Chuyên Gia Công Dân Số',
    description: 'Đạt từ 150 đến 170 điểm trong Đấu trường trí tuệ.',
    icon: 'Trophy',
    color: 'from-blue-500 to-indigo-600',
    category: 'arena'
  },
  {
    id: 'dau_truong_sieu_sao',
    title: 'Siêu Sao Công Dân Số',
    description: 'Đạt thành tích đỉnh cao từ 180 đến 200 điểm tối đa.',
    icon: 'Crown',
    color: 'from-yellow-400 to-amber-500',
    category: 'arena'
  }
];

export function getRankDetails(score: number): {
  rankTitle: string;
  badgeId: string;
  color: string;
  bgGrad: string;
  emoji: string;
  feedback: string;
} {
  if (score >= 180) {
    return {
      rankTitle: 'SIÊU SAO CÔNG DÂN SỐ',
      badgeId: 'dau_truong_sieu_sao',
      color: 'text-amber-500',
      bgGrad: 'from-amber-400 via-yellow-400 to-amber-500',
      emoji: '👑',
      feedback: 'Thật phi thường! Bạn có hiểu biết sâu sắc và toàn diện về đạo đức, văn hoá số. Bạn xứng đáng là tấm gương Công dân số văn minh mẫu mực của trường lớp!'
    };
  } else if (score >= 150) {
    return {
      rankTitle: 'CHUYÊN GIA CÔNG DÂN SỐ',
      badgeId: 'dau_truong_chuyen_gia',
      color: 'text-blue-500',
      bgGrad: 'from-blue-500 to-indigo-600',
      emoji: '🏆',
      feedback: 'Rất tuyệt vời! Bạn nắm rất chắc các nguyên tắc tôn trọng bản quyền, quyền riêng tư và ứng xử văn minh trong môi trường công nghệ.'
    };
  } else if (score >= 100) {
    return {
      rankTitle: 'CHIẾN BINH SỐ TIẾN BỘ',
      badgeId: 'dau_truong_chien_binh',
      color: 'text-emerald-500',
      bgGrad: 'from-emerald-500 to-teal-600',
      emoji: '🌟',
      feedback: 'Làm tốt lắm! Bạn đã biết phân biệt hầu hết các hành vi đúng - sai và có ý thức tự giác rất cao. Hãy tiếp tục phát huy nhé!'
    };
  } else {
    return {
      rankTitle: 'MẦM NON SỐ ĐANG TỎA SÁNG',
      badgeId: 'khoi_dong_so',
      color: 'text-purple-500',
      bgGrad: 'from-purple-400 to-pink-500',
      emoji: '🌱',
      feedback: 'Hoan hô tinh thần nỗ lực của bạn! Mỗi lần thử sức là một cơ hội để ghi nhớ thêm nhiều bài học bổ ích. Robot Tin học tin bạn sẽ bứt phá ở lượt chơi tới!'
    };
  }
}
