export interface MindmapNode {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  items: {
    text: string;
    detail: string;
    icon: string;
  }[];
}

export const MINDMAP_CENTER = {
  title: 'ĐẠO ĐỨC VÀ VĂN HOÁ TRONG SỬ DỤNG CÔNG NGHỆ KĨ THUẬT SỐ',
  subtitle: 'Tin học lớp 8 - Bộ sách Kết nối tri thức với cuộc sống (Bài 4)',
  motto: 'Văn minh • Trung thực • Trách nhiệm • An toàn'
};

export const MINDMAP_BRANCHES: MindmapNode[] = [
  {
    id: 'branch-1',
    title: '1. SỬ DỤNG CÔNG NGHỆ CÓ TRÁCH NHIỆM',
    subtitle: 'Tuân thủ nội quy và chuẩn mực xã hội',
    icon: 'Shield',
    color: 'emerald',
    bgGradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-300',
    items: [
      {
        text: 'Tôn trọng nội quy',
        detail: 'Tuân thủ quy định phòng tin học, nội quy nhà trường và trật tự nơi công cộng.',
        icon: 'CheckCircle2'
      },
      {
        text: 'Không quay phim, chụp ảnh tại nơi cấm',
        detail: 'Quan sát và chấp hành nghiêm túc biển báo cấm tại bảo tàng, rạp chiếu phim, thư viện.',
        icon: 'CameraOff'
      },
      {
        text: 'Không ghi âm trái phép',
        detail: 'Luôn xin phép và được sự đồng ý của mọi người trước khi ghi âm cuộc trò chuyện.',
        icon: 'MicOff'
      },
      {
        text: 'Không phát tán nội dung bạo lực',
        detail: 'Tuyệt đối không quay clip xô xát, không chia sẻ bạo lực học đường; lập tức báo người lớn.',
        icon: 'AlertOctagon'
      }
    ]
  },
  {
    id: 'branch-2',
    title: '2. TÔN TRỌNG BẢN QUYỀN',
    subtitle: 'Bảo vệ chất xám và quyền tác giả',
    icon: 'Copyright',
    color: 'blue',
    bgGradient: 'from-blue-500 to-indigo-600',
    borderColor: 'border-blue-300',
    items: [
      {
        text: 'Không nhận sản phẩm người khác là của mình',
        detail: 'Tôn trọng công sức của tác giả, không xóa tên tác giả gốc để thay bằng tên mình.',
        icon: 'UserX'
      },
      {
        text: 'Xin phép khi cần dùng sản phẩm có bản quyền',
        detail: 'Chỉ sử dụng bài hát, tranh vẽ, video khi được sự cho phép hoặc theo điều kiện cho phép.',
        icon: 'Key'
      },
      {
        text: 'Ghi nguồn và tên tác giả theo điều kiện sử dụng',
        detail: 'Nêu rõ nguồn gốc tài liệu tham khảo trong bài thuyết trình hoặc sản phẩm số.',
        icon: 'FileText'
      },
      {
        text: 'Không dùng phần mềm bẻ khoá',
        detail: 'Nói không với phần mềm lậu, crack để tránh vi phạm bản quyền và nhiễm virus nguy hại.',
        icon: 'ShieldAlert'
      }
    ]
  },
  {
    id: 'branch-3',
    title: '3. TRUNG THỰC KHI TẠO SẢN PHẨM SỐ',
    subtitle: 'Phát huy năng lực tự sáng tạo chân thật',
    icon: 'Sparkles',
    color: 'amber',
    bgGradient: 'from-amber-500 to-orange-600',
    borderColor: 'border-amber-300',
    items: [
      {
        text: 'Không tạo thông tin giả',
        detail: 'Chỉ chia sẻ tin tức đúng sự thật, không bịa đặt hay thêu dệt câu chuyện sai lệch.',
        icon: 'Check'
      },
      {
        text: 'Không sao chép để nhận là của mình',
        detail: 'Không copy nguyên xi bài văn, bài thuyết trình của bạn hoặc trên mạng Internet.',
        icon: 'CopyCheck'
      },
      {
        text: 'Ưu tiên sản phẩm tự sáng tạo',
        detail: 'Tự vẽ tranh, viết lời, quay video theo ý tưởng độc đáo và phong cách của bản thân.',
        icon: 'Palette'
      },
      {
        text: 'Chịu trách nhiệm về nội dung chia sẻ',
        detail: 'Kiểm tra kỹ nội dung trước khi bấm đăng tải hoặc gửi cho thầy cô, bạn bè.',
        icon: 'Smile'
      }
    ]
  },
  {
    id: 'branch-4',
    title: '4. BẢO VỆ QUYỀN RIÊNG TƯ',
    subtitle: 'Giữ an toàn thông tin cá nhân cho mình và bạn bè',
    icon: 'Lock',
    color: 'purple',
    bgGradient: 'from-purple-500 to-fuchsia-600',
    borderColor: 'border-purple-300',
    items: [
      {
        text: 'Không tự ý đăng thông tin cá nhân của người khác',
        detail: 'Không đăng số điện thoại, địa chỉ nhà hay thông tin gia đình bạn bè lên mạng.',
        icon: 'EyeOff'
      },
      {
        text: 'Tôn trọng hình ảnh và sự riêng tư',
        detail: 'Hỏi ý kiến bạn trước khi chụp hay đăng ảnh của bạn lên diễn đàn hoặc mạng xã hội.',
        icon: 'Camera'
      },
      {
        text: 'Không chia sẻ nội dung gây tổn thương người khác',
        detail: 'Không bình luận chế giễu, trêu đùa quá trớn hay lan truyền bí mật của bạn.',
        icon: 'Heart'
      },
      {
        text: 'Nhờ thầy cô, cha mẹ hỗ trợ khi khó xử',
        detail: 'Khi lỡ đăng nhầm thông tin hoặc bị người khác đe dọa, hãy tìm ngay người lớn đáng tin cậy.',
        icon: 'HelpCircle'
      }
    ]
  }
];
