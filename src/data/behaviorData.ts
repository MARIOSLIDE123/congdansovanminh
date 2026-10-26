export interface BehaviorCard {
  id: string;
  situation: string;
  category: 'correct' | 'violation'; // 'correct' = Nên làm, 'violation' = Không nên làm
  explanation: string;
  badge: string;
  icon: string;
}

export const BEHAVIOR_CARDS: BehaviorCard[] = [
  {
    id: 'b1',
    situation: 'Nhìn thấy biển cấm chụp ảnh ở bảo tàng, bạn cất máy ảnh và ngắm tranh bằng mắt.',
    category: 'correct',
    explanation: 'Rất đúng! Tuân thủ nội quy nơi công cộng là biểu hiện của công dân số văn minh.',
    badge: 'Nội quy',
    icon: 'CameraOff'
  },
  {
    id: 'b2',
    situation: 'Tự ý chụp lén bạn cùng lớp ngủ gật rồi đăng lên mạng xã hội để trêu đùa.',
    category: 'violation',
    explanation: 'Sai rồi! Hành động này xâm phạm quyền riêng tư và hình ảnh cá nhân của bạn.',
    badge: 'Quyền riêng tư',
    icon: 'EyeOff'
  },
  {
    id: 'b3',
    situation: 'Tự vẽ tranh minh hoạ và ghi rõ nguồn khi trích dẫn bài thơ vào bài trình chiếu.',
    category: 'correct',
    explanation: 'Chính xác! Tự sáng tạo và ghi nguồn trung thực là phẩm chất rất đáng khen.',
    badge: 'Trung thực',
    icon: 'Palette'
  },
  {
    id: 'b4',
    situation: 'Tải phim hoạt hình có bản quyền từ trang web lậu rồi chia sẻ cho nhóm bạn.',
    category: 'violation',
    explanation: 'Vi phạm bản quyền! Cần xem phim trên các kênh chính thức có bản quyền hợp pháp.',
    badge: 'Bản quyền',
    icon: 'FileWarning'
  },
  {
    id: 'b5',
    situation: 'Thấy bạn bè xô xát, lập tức chạy đi báo cho thầy cô và bác bảo vệ can thiệp.',
    category: 'correct',
    explanation: 'Rất tuyệt vời! Không quay clip phát tán mà tìm người lớn can thiệp để bảo vệ bạn.',
    badge: 'An toàn trường học',
    icon: 'ShieldCheck'
  },
  {
    id: 'b6',
    situation: 'Cài đặt phần mềm bẻ khoá (crack) về máy tính để chơi game không mất tiền.',
    category: 'violation',
    explanation: 'Nguy hiểm và vi phạm! Phần mềm bẻ khoá dễ chứa virus phá hỏng máy tính.',
    badge: 'An toàn mạng',
    icon: 'ShieldAlert'
  },
  {
    id: 'b7',
    situation: 'Khi được hỏi số điện thoại và địa chỉ nhà của bạn thân trên mạng, bạn lịch sự từ chối.',
    category: 'correct',
    explanation: 'Chuẩn xác! Giữ bí mật thông tin cá nhân của bạn bè là tôn trọng và bảo vệ bạn bè.',
    badge: 'Quyền riêng tư',
    icon: 'Lock'
  },
  {
    id: 'b8',
    situation: 'Sao chép nguyên văn bài văn của bạn trên mạng rồi đổi tên tác giả thành tên mình.',
    category: 'violation',
    explanation: 'Hành vi gian lận! Nhận sản phẩm của người khác là của mình là vi phạm đạo đức số.',
    badge: 'Đạo văn',
    icon: 'UserX'
  },
  {
    id: 'b9',
    situation: 'Sử dụng bản nhạc được cấp phép miễn phí (Royalty-free) để lồng vào video của lớp.',
    category: 'correct',
    explanation: 'Xuất sắc! Lựa chọn tư liệu hợp pháp giúp sản phẩm số của bạn an toàn và văn minh.',
    badge: 'Tôn trọng bản quyền',
    icon: 'Music'
  },
  {
    id: 'b10',
    situation: 'Nhấp vào quảng cáo mời gọi nạp tiền quay thưởng cá cược bóng đá trên mạng.',
    category: 'violation',
    explanation: 'Cực kỳ nguy hiểm! Học sinh tuyệt đối không tham gia hoặc quảng bá cờ bạc mạng.',
    badge: 'Pháp luật',
    icon: 'AlertOctagon'
  },
  {
    id: 'b11',
    situation: 'Trước khi chia sẻ một bài viết hay, bạn kiểm tra xem nguồn tin có đáng tin cậy không.',
    category: 'correct',
    explanation: 'Rất thông thái! Kiểm chứng thông tin giúp ngăn chặn lan truyền tin giả.',
    badge: 'Trách nhiệm',
    icon: 'CheckCircle2'
  },
  {
    id: 'b12',
    situation: 'Bình luận những lời lẽ thô tục, chế giễu ngoại hình của người khác trên mạng.',
    category: 'violation',
    explanation: 'Thiếu văn hoá! Cần dùng ngôn từ lịch sự, tích cực và tôn trọng mọi người.',
    badge: 'Văn hoá giao tiếp',
    icon: 'MessageSquareOff'
  }
];
