import { PracticeQuestion } from '../types';

export const PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: 1,
    question: 'Bạn thấy một biển báo cấm chụp ảnh. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Tuân thủ biển báo.' },
      { key: 'B', text: 'Chụp ảnh rồi xoá sau.' },
      { key: 'C', text: 'Nhờ bạn chụp ảnh.' }
    ],
    correctKey: 'A',
    explanation: 'Khi thấy biển cấm, chúng ta phải nghiêm túc chấp hành quy định nơi công cộng để giữ trật tự và bảo vệ quy định chung.',
    icon: 'CameraOff'
  },
  {
    id: 2,
    question: 'Khi muốn dùng một bức tranh có bản quyền của người khác trong sản phẩm của mình, bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Xoá tên tác giả.' },
      { key: 'B', text: 'Tìm hiểu điều kiện sử dụng và xin phép khi cần.' },
      { key: 'C', text: 'Nhận bức tranh là của mình.' }
    ],
    correctKey: 'B',
    explanation: 'Bức tranh là tài sản trí tuệ của tác giả, bạn cần tìm hiểu điều kiện sử dụng, xin phép tác giả hoặc ghi nguồn hợp lệ.',
    icon: 'Palette'
  },
  {
    id: 3,
    question: 'Bạn muốn giới thiệu cuốn sách mình yêu thích trên blog. Cách làm nào phù hợp?',
    options: [
      { key: 'A', text: 'Chép nguyên bài giới thiệu của người khác.' },
      { key: 'B', text: 'Tự viết cảm nhận chân thực của mình.' },
      { key: 'C', text: 'Đưa thông tin chưa kiểm chứng.' }
    ],
    correctKey: 'B',
    explanation: 'Viết bằng cảm nhận chân thực của mình vừa rèn luyện khả năng tư duy, vừa thể hiện sự trung thực khi tạo sản phẩm số.',
    icon: 'BookOpen'
  },
  {
    id: 4,
    question: 'Một người gửi cho bạn video đánh nhau ở trường. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Chia sẻ cho cả lớp.' },
      { key: 'B', text: 'Đăng lên mạng để nhiều người xem.' },
      { key: 'C', text: 'Không phát tán và báo người lớn đáng tin cậy.' }
    ],
    correctKey: 'C',
    explanation: 'Không phát tán nội dung bạo lực học đường và báo ngay cho thầy cô, cha mẹ để kịp thời giúp đỡ các bạn.',
    icon: 'ShieldAlert'
  },
  {
    id: 5,
    question: 'Hành động nào thể hiện sự trung thực khi tạo sản phẩm số?',
    options: [
      { key: 'A', text: 'Tự sáng tác truyện và ghi rõ nguồn nếu có sử dụng tư liệu phù hợp.' },
      { key: 'B', text: 'Sao chép bài của bạn.' },
      { key: 'C', text: 'Sửa tên tác giả thành tên mình.' }
    ],
    correctKey: 'A',
    explanation: 'Tự sáng tạo tác phẩm và trung thực ghi nguồn tài liệu tham khảo là chuẩn mực đạo đức tốt đẹp trong môi trường số.',
    icon: 'Sparkles'
  },
  {
    id: 6,
    question: 'Bạn có được tự ý đăng số điện thoại của bạn bè lên Internet không?',
    options: [
      { key: 'A', text: 'Có, nếu là bạn thân.' },
      { key: 'B', text: 'Có, nếu nhiều người muốn biết.' },
      { key: 'C', text: 'Không, cần tôn trọng quyền riêng tư và sự cho phép phù hợp.' }
    ],
    correctKey: 'C',
    explanation: 'Số điện thoại là thông tin cá nhân riêng tư, tự ý chia sẻ có thể khiến người khác bị quấy rối hoặc gặp kẻ xấu lợi dụng.',
    icon: 'PhoneOff'
  },
  {
    id: 7,
    question: 'Trên Internet, bạn nên nghĩ gì về bản quyền?',
    options: [
      { key: 'A', text: 'Tất cả nội dung đều miễn phí.' },
      { key: 'B', text: 'Phần lớn thông tin và sản phẩm đều có thể chịu sự bảo hộ bản quyền.' },
      { key: 'C', text: 'Chỉ sách giấy mới có bản quyền.' }
    ],
    correctKey: 'B',
    explanation: 'Các bài viết, hình ảnh, bài hát hay phần mềm trên Internet đều là công sức trí tuệ và thường được bảo hộ quyền tác giả.',
    icon: 'Copyright'
  },
  {
    id: 8,
    question: 'Có người sử dụng phần mềm bẻ khoá và rủ bạn làm theo. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Từ chối và sử dụng phần mềm hợp pháp.' },
      { key: 'B', text: 'Làm theo để tiết kiệm tiền.' },
      { key: 'C', text: 'Chia sẻ phần mềm cho các bạn.' }
    ],
    correctKey: 'A',
    explanation: 'Phần mềm bẻ khoá vi phạm bản quyền và có thể chứa virus, mã độc nguy hại phá hỏng máy tính.',
    icon: 'ShieldOff'
  },
  {
    id: 9,
    question: 'Bạn phát hiện mình đã chia sẻ nhầm thông tin cá nhân của người khác. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Tiếp tục chia sẻ.' },
      { key: 'B', text: 'Xoá hoặc gỡ nội dung nếu có thể và báo người lớn để được hướng dẫn.' },
      { key: 'C', text: 'Đổ lỗi cho người khác.' }
    ],
    correctKey: 'B',
    explanation: 'Gỡ bài đăng ngay lập tức để hạn chế lan truyền và báo người lớn để có cách khắc phục tốt nhất.',
    icon: 'AlertCircle'
  },
  {
    id: 10,
    question: 'Trước khi đăng một sản phẩm số, bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Đăng ngay để được nhiều lượt thích.' },
      { key: 'B', text: 'Kiểm tra tính chính xác, bản quyền, quyền riêng tư và sự phù hợp của nội dung.' },
      { key: 'C', text: 'Sao chép sản phẩm nổi tiếng.' }
    ],
    correctKey: 'B',
    explanation: 'Công dân số văn minh luôn cẩn trọng kiểm tra nội dung có đúng đắn, không vi phạm bản quyền và bảo vệ quyền riêng tư trước khi chia sẻ.',
    icon: 'CheckSquare'
  }
];
