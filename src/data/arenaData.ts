import { ArenaQuestion, ShuffledArenaQuestion } from '../types';

export const RAW_ARENA_QUESTIONS: ArenaQuestion[] = [
  // --- CHẶNG 1: KHỞI ĐỘNG (Câu 1 - 7) ---
  {
    id: 1,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Sản phẩm số nào sau đây có thể do học sinh tạo ra?',
    options: [
      { key: 'A', text: 'Một chiếc bàn gỗ.' },
      { key: 'B', text: 'Một quyển vở giấy trắng.' },
      { key: 'C', text: 'Một poster được thiết kế trên máy tính.' },
      { key: 'D', text: 'Một chiếc cặp sách.' }
    ],
    correctKey: 'C',
    explanation: 'Poster được thiết kế trên máy tính là một sản phẩm số do học sinh có thể tự sáng tạo và lưu trữ trên thiết bị điện tử.'
  },
  {
    id: 2,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Khi truy cập Internet, bạn tìm thấy bài viết hữu ích của người khác. Bạn nên làm gì nếu muốn sử dụng bài viết đó?',
    options: [
      { key: 'A', text: 'Đổi tiêu đề rồi nhận là bài của mình.' },
      { key: 'B', text: 'Tìm hiểu điều kiện sử dụng, xin phép khi cần và ghi nguồn phù hợp.' },
      { key: 'C', text: 'Xoá tên người viết.' },
      { key: 'D', text: 'Chép bài đăng lên mọi nơi mà không cần quan tâm bản quyền.' }
    ],
    correctKey: 'B',
    explanation: 'Cần tôn trọng bản quyền của tác giả và trung thực về nguồn gốc thông tin khi sử dụng tư liệu trên Internet.'
  },
  {
    id: 3,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Ở nơi có biển cấm chụp ảnh, hành động nào phù hợp nhất?',
    options: [
      { key: 'A', text: 'Tuân thủ biển báo.' },
      { key: 'B', text: 'Chụp ảnh khi không ai nhìn thấy.' },
      { key: 'C', text: 'Nhờ bạn chụp giúp.' },
      { key: 'D', text: 'Quay video thay vì chụp ảnh.' }
    ],
    correctKey: 'A',
    explanation: 'Cần tuân thủ nội quy và quy định tại địa điểm đó để thể hiện nếp sống văn minh và trách nhiệm.'
  },
  {
    id: 4,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Hành động nào thể hiện sự trung thực khi làm bài trình chiếu?',
    options: [
      { key: 'A', text: 'Sao chép toàn bộ bài của bạn rồi đổi màu.' },
      { key: 'B', text: 'Chép nội dung trên mạng và xoá tên tác giả.' },
      { key: 'C', text: 'Ghi tên mình vào sản phẩm của người khác.' },
      { key: 'D', text: 'Tự làm bài, ghi nguồn đối với tư liệu được sử dụng hợp lệ.' }
    ],
    correctKey: 'D',
    explanation: 'Trung thực là tự tạo nội dung bằng chính sự nỗ lực của mình và tôn trọng đóng góp của người khác bằng cách ghi rõ nguồn.'
  },
  {
    id: 5,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Bạn nên làm gì khi muốn sử dụng một bài hát có bản quyền?',
    options: [
      { key: 'A', text: 'Tải từ bất cứ nơi nào và chia sẻ lại.' },
      { key: 'B', text: 'Cắt một đoạn rồi nhận là nhạc tự sáng tác.' },
      { key: 'C', text: 'Tìm nguồn hợp pháp và tuân thủ điều kiện sử dụng.' },
      { key: 'D', text: 'Đổi tên bài hát để tránh bản quyền.' }
    ],
    correctKey: 'C',
    explanation: 'Cần sử dụng sản phẩm có bản quyền theo đúng điều kiện được phép, không tự ý sao chép hay nhận vơ.'
  },
  {
    id: 6,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Có người gửi bạn thông tin riêng tư của người khác. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Đăng lên nhóm lớp.' },
      { key: 'B', text: 'Không phát tán và tôn trọng quyền riêng tư của người khác.' },
      { key: 'C', text: 'Chia sẻ với nhiều người hơn.' },
      { key: 'D', text: 'Dùng thông tin đó để trêu đùa.' }
    ],
    correctKey: 'B',
    explanation: 'Không tự ý chia sẻ thông tin riêng tư của người khác nhằm bảo vệ sự an toàn và danh dự cho bạn bè.'
  },
  {
    id: 7,
    stage: 1,
    stageName: 'Chặng 1: Khởi động',
    question: 'Nhận định nào đúng về bản quyền trên Internet?',
    options: [
      { key: 'A', text: 'Chỉ video mới có bản quyền.' },
      { key: 'B', text: 'Nội dung trên Internet luôn miễn phí.' },
      { key: 'C', text: 'Chỉ nội dung có thu phí mới được bảo vệ.' },
      { key: 'D', text: 'Nhiều loại thông tin và sản phẩm trên Internet có bản quyền.' }
    ],
    correctKey: 'D',
    explanation: 'Nhiều loại thông tin, hình ảnh, âm nhạc trên Internet chịu sự bảo hộ của luật bản quyền, cần tìm hiểu kỹ trước khi sử dụng.'
  },

  // --- CHẶNG 2: TĂNG TỐC (Câu 8 - 14) ---
  {
    id: 8,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Bạn thấy một người đang phát trực tiếp cảnh đánh nhau ở trường. Việc nào nên làm?',
    options: [
      { key: 'A', text: 'Chia sẻ đường dẫn cho các lớp khác.' },
      { key: 'B', text: 'Bình luận cổ vũ.' },
      { key: 'C', text: 'Không phát tán và báo thầy cô hoặc người lớn đáng tin cậy.' },
      { key: 'D', text: 'Tải video về máy để đăng lại.' }
    ],
    correctKey: 'C',
    explanation: 'Không lan truyền bạo lực học đường và cần báo ngay cho thầy cô hoặc người có trách nhiệm để can thiệp kịp thời.'
  },
  {
    id: 9,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Hành động nào là vi phạm tính trung thực khi tạo sản phẩm số?',
    options: [
      { key: 'A', text: 'Chép bài viết của người khác rồi nhận là của mình.' },
      { key: 'B', text: 'Tự sáng tác truyện.' },
      { key: 'C', text: 'Tự chụp ảnh phong cảnh.' },
      { key: 'D', text: 'Ghi rõ nguồn tư liệu được dùng hợp lệ.' }
    ],
    correctKey: 'A',
    explanation: 'Không được nhận sản phẩm của người khác là của mình. Đây là hành vi gian lận và thiếu trung thực.'
  },
  {
    id: 10,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Vì sao không nên sử dụng phần mềm bẻ khoá?',
    options: [
      { key: 'A', text: 'Vì phần mềm đó luôn có giao diện xấu.' },
      { key: 'B', text: 'Vì phần mềm đó không bao giờ chạy được.' },
      { key: 'C', text: 'Vì phần mềm đó không có màu sắc đẹp.' },
      { key: 'D', text: 'Vì có thể vi phạm quy định về bản quyền và pháp luật.' }
    ],
    correctKey: 'D',
    explanation: 'Cần sử dụng phần mềm hợp pháp. Phần mềm bẻ khóa vừa vi phạm luật bản quyền vừa dễ chứa virus phá hỏng máy tính.'
  },
  {
    id: 11,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Bạn muốn đăng ảnh chụp một người bạn lên mạng. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Đăng ngay vì đã chụp được ảnh.' },
      { key: 'B', text: 'Tôn trọng quyền riêng tư và hỏi ý kiến bạn khi phù hợp.' },
      { key: 'C', text: 'Đính kèm địa chỉ nhà của bạn.' },
      { key: 'D', text: 'Dùng ảnh để chế giễu bạn.' }
    ],
    correctKey: 'B',
    explanation: 'Cần tôn trọng hình ảnh và sự riêng tư của người khác, chỉ đăng tải khi bạn đồng ý.'
  },
  {
    id: 12,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Website yêu cầu bạn tham gia cá cược bóng đá để nhận quà. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Tham gia để thử vận may.' },
      { key: 'B', text: 'Gửi đường dẫn cho bạn.' },
      { key: 'C', text: 'Không tham gia và báo người lớn đáng tin cậy.' },
      { key: 'D', text: 'Mượn tài khoản người khác để chơi.' }
    ],
    correctKey: 'C',
    explanation: 'Học sinh tuyệt đối không tham gia cá cược, cờ bạc hoặc quảng bá các hoạt động phi pháp này.'
  },
  {
    id: 13,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Một bài viết trên Internet có thông tin chưa được kiểm chứng. Bạn nên làm gì trước khi chia sẻ?',
    options: [
      { key: 'A', text: 'Kiểm tra độ tin cậy và không chia sẻ thông tin sai lệch.' },
      { key: 'B', text: 'Chia sẻ ngay vì tiêu đề hấp dẫn.' },
      { key: 'C', text: 'Thêm thông tin tưởng tượng cho sinh động.' },
      { key: 'D', text: 'Sửa tên tác giả thành tên mình.' }
    ],
    correctKey: 'A',
    explanation: 'Cần kiểm tra độ xác thực của thông tin trước khi chia sẻ để tránh lan truyền tin giả, tin độc hại.'
  },
  {
    id: 14,
    stage: 2,
    stageName: 'Chặng 2: Tăng tốc',
    question: 'Bạn muốn dùng một bức ảnh được ghi rõ là chỉ sử dụng khi có sự cho phép của tác giả. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Xoá dòng ghi chú bản quyền.' },
      { key: 'B', text: 'Dùng ảnh và không ghi nguồn.' },
      { key: 'C', text: 'Đổi màu ảnh rồi nhận là của mình.' },
      { key: 'D', text: 'Xin phép tác giả trước khi sử dụng.' }
    ],
    correctKey: 'D',
    explanation: 'Cần tuân thủ điều kiện sử dụng do tác giả quy định và xin phép tác giả trước khi dùng.'
  },

  // --- CHẶNG 3: VỀ ĐÍCH (Câu 15 - 20) ---
  {
    id: 15,
    stage: 3,
    stageName: 'Chặng 3: Về đích',
    question: 'Bạn phát hiện mình đã vô tình đăng thông tin riêng tư của người khác lên mạng. Cách xử lí phù hợp nhất là gì?',
    options: [
      { key: 'A', text: 'Để nguyên vì đã đăng rồi.' },
      { key: 'B', text: 'Gỡ nội dung nếu có thể, báo người lớn và không tiếp tục phát tán.' },
      { key: 'C', text: 'Gửi thêm cho nhiều người.' },
      { key: 'D', text: 'Đổ lỗi cho bạn.' }
    ],
    correctKey: 'B',
    explanation: 'Cần hạn chế sự phát tán ngay lập tức, gỡ bài đăng và nhờ sự hướng dẫn, giúp đỡ từ người lớn.'
  },
  {
    id: 16,
    stage: 3,
    stageName: 'Chặng 3: Về đích',
    question: 'Một người gửi bạn phần mềm bẻ khoá và nói rằng dùng thử không sao. Bạn nên làm gì?',
    options: [
      { key: 'A', text: 'Cài đặt rồi chia sẻ tiếp.' },
      { key: 'B', text: 'Cài đặt lên máy của cả lớp.' },
      { key: 'C', text: 'Từ chối, không phát tán và tìm phần mềm hợp pháp.' },
      { key: 'D', text: 'Đổi tên tệp rồi sử dụng.' }
    ],
    correctKey: 'C',
    explanation: 'Tuyệt đối không sử dụng hoặc tiếp tay lan truyền phần mềm bẻ khoá để bảo vệ thiết bị và tôn trọng pháp luật.'
  },
  {
    id: 17,
    stage: 3,
    stageName: 'Chặng 3: Về đích',
    question: 'Nhóm bạn làm poster về bảo vệ môi trường và sử dụng một bức ảnh có giấy phép yêu cầu ghi công tác giả. Nhóm nên làm gì?',
    options: [
      { key: 'A', text: 'Ghi công tác giả theo đúng điều kiện giấy phép.' },
      { key: 'B', text: 'Xoá tên tác giả.' },
      { key: 'C', text: 'Nhận ảnh là do nhóm tự chụp.' },
      { key: 'D', text: 'Không cần quan tâm giấy phép.' }
    ],
    correctKey: 'A',
    explanation: 'Cần tuân thủ điều kiện giấy phép và ghi chú tên tác giả đầy đủ, đúng vị trí quy định.'
  },
  {
    id: 18,
    stage: 3,
    stageName: 'Chặng 3: Về đích',
    question: 'Hành động nào thể hiện văn hoá khi giao tiếp trên môi trường số?',
    options: [
      { key: 'A', text: 'Bình luận xúc phạm người khác.' },
      { key: 'B', text: 'Chia sẻ hình ảnh riêng tư để trêu chọc.' },
      { key: 'C', text: 'Lan truyền tin đồn chưa kiểm chứng.' },
      { key: 'D', text: 'Dùng ngôn từ lịch sự và tôn trọng người khác.' }
    ],
    correctKey: 'D',
    explanation: 'Giao tiếp văn minh luôn xuất phát từ lời nói lịch sự, tôn trọng và đồng cảm với mọi người.'
  },
  {
    id: 19,
    stage: 3,
    stageName: 'Chặng 3: Về đích',
    question: 'Khi tạo video giới thiệu một cuốn sách, phương án nào tốt nhất?',
    options: [
      { key: 'A', text: 'Sao chép video của người khác và đổi nhạc.' },
      { key: 'B', text: 'Tự trình bày cảm nhận chân thực, dùng tư liệu hợp pháp và ghi nguồn khi cần.' },
      { key: 'C', text: 'Bịa đặt nội dung để video hấp dẫn hơn.' },
      { key: 'D', text: 'Đưa thông tin cá nhân của người khác vào video.' }
    ],
    correctKey: 'B',
    explanation: 'Sản phẩm số cần trung thực, thể hiện cảm nhận của bản thân, tôn trọng bản quyền và quyền riêng tư.'
  },
  {
    id: 20,
    stage: 3,
    stageName: 'Chặng 3: Về đích',
    question: 'Trước khi chia sẻ bất kỳ nội dung nào lên Internet, bạn nên tự hỏi điều gì?',
    options: [
      { key: 'A', text: 'Nội dung này có giúp bạn nhận được nhiều lượt thích không?' },
      { key: 'B', text: 'Bạn có thể đăng nhanh hơn người khác không?' },
      { key: 'C', text: 'Nội dung có đúng sự thật, được phép sử dụng, tôn trọng quyền riêng tư và phù hợp không?' },
      { key: 'D', text: 'Nội dung này có khiến người khác ngạc nhiên không?' }
    ],
    correctKey: 'C',
    explanation: 'Công dân số có trách nhiệm luôn tự kiểm tra: Tính chính xác, Bản quyền, Quyền riêng tư và Sự phù hợp của thông điệp.'
  }
];

/**
 * Fisher-Yates shuffle array helper
 */
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Builds a fresh game session with:
 * 1. Shuffled option choices (A, B, C, D positions randomized) for EACH question.
 * 2. Exact recalculation of correct index based on the original correctKey.
 * 3. Shuffled questions within each stage to maintain Stage 1 -> Stage 2 -> Stage 3 progression.
 */
export function generateArenaSession(): ShuffledArenaQuestion[] {
  const letters = ['A', 'B', 'C', 'D'];

  const stage1 = shuffleArray(RAW_ARENA_QUESTIONS.filter(q => q.stage === 1));
  const stage2 = shuffleArray(RAW_ARENA_QUESTIONS.filter(q => q.stage === 2));
  const stage3 = shuffleArray(RAW_ARENA_QUESTIONS.filter(q => q.stage === 3));

  const allOrdered = [...stage1, ...stage2, ...stage3];

  return allOrdered.map((q) => {
    // Shuffle the options
    const shuffledOpts = shuffleArray(q.options);
    
    // Find where the original correct key landed
    const correctIndex = shuffledOpts.findIndex(opt => opt.key === q.correctKey);

    // Re-assign display labels A, B, C, D
    const optionsWithNewKeys = shuffledOpts.map((opt, idx) => ({
      key: letters[idx],
      text: opt.text,
      originalKey: opt.key
    }));

    return {
      id: q.id,
      stage: q.stage,
      stageName: q.stageName,
      question: q.question,
      options: optionsWithNewKeys,
      correctIndex: correctIndex, // 0..3 matching the new options order
      explanation: q.explanation
    };
  });
}
