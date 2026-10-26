export interface LearningSituation {
  id: string;
  title: string;
  badge: string;
  violationType: string;
  situation: string;
  explanation: string;
  whyWrong: string;
  goodAdvice: string;
  interactiveQuestion: {
    question: string;
    options: { key: string; text: string }[];
    correctKey: string;
    feedback: string;
  };
}

export interface DigitalProductType {
  id: string;
  name: string;
  description: string;
  iconName: string;
  example: string;
  color: string;
}

export interface CreationRule {
  id: number;
  title: string;
  detail: string;
  icon: string;
}

export const VIOLATIONS_PART_1: LearningSituation[] = [
  {
    id: 'v1',
    title: '1. Quay phim, chụp ảnh ở nơi có biển cấm',
    badge: 'Nội quy & Pháp luật',
    violationType: 'Vi phạm quy định nơi công cộng',
    situation: 'Tại bảo tàng nghệ thuật, thư viện, rạp chiếu phim hoặc khu vực bảo mật có biển báo "CẤM CHỤP ẢNH / QUAY PHIM".',
    explanation: 'Nhiều nơi cấm chụp ảnh để bảo vệ hiện vật (ánh đèn flash làm hỏng màu tranh cổ), giữ trật tự chung hoặc bảo vệ bản quyền tác phẩm.',
    whyWrong: 'Cố tình chụp lén hoặc phớt lờ biển cấm là hành vi thiếu văn minh và vi phạm nội quy.',
    goodAdvice: 'Luôn quan sát biển báo, cất điện thoại hoặc máy ảnh và chú tâm trải nghiệm bằng mắt.',
    interactiveQuestion: {
      question: 'Tại thư viện trường có biển KHÔNG CHỤP ẢNH. Bạn nên làm gì?',
      options: [
        { key: 'A', text: 'Chụp ảnh thật nhanh khi thủ thư không nhìn.' },
        { key: 'B', text: 'Tôn trọng quy định và không chụp ảnh.' },
        { key: 'C', text: 'Nhờ bạn cùng lớp chụp ảnh hộ.' }
      ],
      correctKey: 'B',
      feedback: 'Chính xác! Công dân số văn minh luôn tôn trọng nội quy và quy định nơi công cộng.'
    }
  },
  {
    id: 'v2',
    title: '2. Ghi âm trái phép các cuộc trò chuyện',
    badge: 'Quyền riêng tư',
    violationType: 'Xâm phạm bí mật đời tư',
    situation: 'Bí mật bật chức năng ghi âm trên điện thoại/đồng hồ thông minh khi đang nói chuyện với bạn bè, thầy cô mà không xin phép.',
    explanation: 'Mọi người đều có quyền bảo vệ cuộc trò chuyện riêng tư của mình. Ghi âm lén khiến người khác mất niềm tin và lo sợ.',
    whyWrong: 'Ghi âm không được phép là hành vi bất lịch sự và vi phạm quyền bí mật đời tư của cá nhân.',
    goodAdvice: 'Chỉ ghi âm khi được tất cả những người tham gia trò chuyện đồng ý, ví dụ phỏng vấn trong tiết học đã xin phép thầy cô.',
    interactiveQuestion: {
      question: 'Khi muốn ghi lại lời dặn dò của giáo viên để ôn tập, bạn nên làm gì?',
      options: [
        { key: 'A', text: 'Lễ phép xin phép thầy cô trước khi bật ghi âm.' },
        { key: 'B', text: 'Giấu máy ghi âm dưới gầm bàn để không ai biết.' },
        { key: 'C', text: 'Ghi âm rồi gửi vào nhóm chat trêu đùa.' }
      ],
      correctKey: 'A',
      feedback: 'Rất chuẩn! Luôn xin phép trước khi ghi âm để thể hiện sự tôn trọng.'
    }
  },
  {
    id: 'v3',
    title: '3. Sao chép thông tin từ website rồi nhận là của mình',
    badge: 'Tính trung thực',
    violationType: 'Đạo văn & Nhận vơ',
    situation: 'Khi làm bài tập làm văn hoặc bài thuyết trình, sao chép nguyên văn bài viết trên mạng rồi ghi tên mình là tác giả.',
    explanation: 'Bài viết trên mạng là công sức sáng tạo, trí tuệ của người khác. Tự ý nhận là của mình là hành vi dối trá.',
    whyWrong: 'Vi phạm tính trung thực trong học tập, lừa dối thầy cô, bạn bè và vi phạm bản quyền tác giả.',
    goodAdvice: 'Hãy tự viết bằng suy nghĩ của mình. Nếu có trích dẫn câu văn hay, hãy ghi rõ nguồn và tên tác giả.',
    interactiveQuestion: {
      question: 'Bạn tìm thấy một đoạn văn miêu tả rất hay trên mạng cho bài thuyết trình. Cách xử lí đúng là:',
      options: [
        { key: 'A', text: 'Xoá tên tác giả và nhận là do mình tự viết.' },
        { key: 'B', text: 'Tự viết cảm nhận của mình, hoặc trích dẫn kèm ghi rõ nguồn tham khảo.' },
        { key: 'C', text: 'Đổi phông chữ và nộp bài luôn.' }
      ],
      correctKey: 'B',
      feedback: 'Xuất sắc! Tự tạo nội dung và ghi nguồn trung thực là phẩm chất của học sinh gương mẫu.'
    }
  },
  {
    id: 'v4',
    title: '4. Tải, sử dụng hoặc chia sẻ bài hát, video có bản quyền trái phép',
    badge: 'Tôn trọng bản quyền',
    violationType: 'Vi phạm quyền sở hữu trí tuệ',
    situation: 'Tải các bài hát, bộ phim, video có bản quyền từ các nguồn lậu trái phép rồi phát tán, đăng tải lại lên mạng.',
    explanation: 'Các ca sĩ, nhạc sĩ, đạo diễn phải đầu tư rất nhiều thời gian, công sức và tiền bạc để tạo ra tác phẩm.',
    whyWrong: 'Sử dụng và phát tán trái phép là ăn cắp chất xám, gây thiệt hại cho tác giả và vi phạm pháp luật.',
    goodAdvice: 'Xem và nghe trên các nền tảng chính thức, được cấp phép (như kênh YouTube chính thống, trang nhạc có bản quyền).',
    interactiveQuestion: {
      question: 'Khi muốn lồng một đoạn nhạc vào video kỷ niệm của lớp, bạn nên chọn loại nhạc nào?',
      options: [
        { key: 'A', text: 'Tải lậu bài hát hot đang có bản quyền nghiêm ngặt.' },
        { key: 'B', text: 'Sử dụng nhạc miễn phí bản quyền (Royalty-free) hoặc xin phép tác giả.' },
        { key: 'C', text: 'Cắt nhạc của người khác rồi nhận là mình tự đàn hát.' }
      ],
      correctKey: 'B',
      feedback: 'Tuyệt vời! Chọn nhạc được phép sử dụng giúp video của bạn an toàn và văn minh.'
    }
  },
  {
    id: 'v5',
    title: '5. Sử dụng phần mềm bẻ khoá (phần mềm lậu/crack)',
    badge: 'An toàn & Pháp luật',
    violationType: 'Phần mềm lậu & Mã độc',
    situation: 'Tìm cách tải các bản phần mềm, trò chơi đã bị bẻ khoá (crack) để không phải trả phí bản quyền.',
    explanation: 'Phần mềm bẻ khoá thường bị kẻ xấu chèn virus, mã độc ăn cắp mật khẩu, phá hỏng máy tính.',
    whyWrong: 'Vi phạm quyền tác giả của lập trình viên và khiến máy tính gia đình gặp nguy hiểm lớn.',
    goodAdvice: 'Sử dụng các phần mềm miễn phí hợp pháp (mã nguồn mở), dùng phiên bản dùng thử hoặc nhờ phụ huynh mua bản quyền chính hãng.',
    interactiveQuestion: {
      question: 'Một người bạn cùng lớp rủ bạn cài đặt game bẻ khoá trên mạng. Bạn nên làm gì?',
      options: [
        { key: 'A', text: 'Từ chối, nhắc bạn về nguy cơ virus và chọn game miễn phí hợp pháp.' },
        { key: 'B', text: 'Cài đặt ngay để chơi cùng bạn.' },
        { key: 'C', text: 'Chia sẻ đường link game bẻ khoá cho cả lớp.' }
      ],
      correctKey: 'A',
      feedback: 'Chính xác! Luôn kiên quyết nói KHÔNG với phần mềm bẻ khoá để bảo vệ máy tính.'
    }
  },
  {
    id: 'v6',
    title: '6. Phát trực tiếp hoặc chia sẻ video bạo lực học đường',
    badge: 'Văn hoá & Đạo đức',
    violationType: 'Lan truyền bạo lực',
    situation: 'Khi thấy các bạn xô xát, cãi nhau, liền dùng điện thoại quay phim, livestream (phát trực tiếp) hoặc chia sẻ lên mạng xã hội.',
    explanation: 'Hành động này làm tổn thương sâu sắc tinh thần của bạn bè, kích động bạo lực và vi phạm nghiêm trọng nội quy trường học.',
    whyWrong: 'Tiếp tay cho bạo lực học đường và gây hại đến môi trường giáo dục an toàn.',
    goodAdvice: 'Không quay phim, không cổ vũ, lập tức tìm kiếm sự trợ giúp từ thầy cô, bác bảo vệ hoặc người lớn xung quanh.',
    interactiveQuestion: {
      question: 'Bạn thấy trong nhóm chat có người gửi clip đánh nhau. Bạn nên làm gì?',
      options: [
        { key: 'A', text: 'Chia sẻ ngay sang nhóm khác để nhiều người xem.' },
        { key: 'B', text: 'Bình luận trêu chọc bạn bị đánh.' },
        { key: 'C', text: 'Không phát tán clip và báo ngay cho thầy cô hoặc cha mẹ xử lí.' }
      ],
      correctKey: 'C',
      feedback: 'Rất đáng khen! Dũng cảm ngăn chặn lan truyền bạo lực là trách nhiệm của công dân số gương mẫu.'
    }
  },
  {
    id: 'v7',
    title: '7. Đăng tải thông tin cá nhân của người khác khi chưa được phép',
    badge: 'Bảo vệ quyền riêng tư',
    violationType: 'Lộ thông tin cá nhân',
    situation: 'Tự ý đăng ảnh dìm, địa chỉ nhà, số điện thoại, sổ liên lạc điện tử của bạn bè hoặc người khác lên mạng xã hội.',
    explanation: 'Thông tin cá nhân là bí mật riêng của mỗi người. Lộ thông tin có thể bị kẻ xấu lợi dụng để lừa đảo, đe doạ hoặc quấy rối.',
    whyWrong: 'Xâm phạm quyền riêng tư và có thể đẩy bạn bè vào tình huống nguy hiểm.',
    goodAdvice: 'Luôn hỏi ý kiến và được sự đồng ý của bạn bè trước khi đăng ảnh hoặc thông tin liên quan đến bạn.',
    interactiveQuestion: {
      question: 'Bạn chụp được một bức ảnh bạn cùng bàn có biểu cảm buồn cười. Bạn có nên đăng lên mạng xã hội không?',
      options: [
        { key: 'A', text: 'Đăng ngay để mọi người cùng cười.' },
        { key: 'B', text: 'Hỏi ý kiến bạn, nếu bạn không muốn thì tuyệt đối không đăng.' },
        { key: 'C', text: 'Đăng kèm số điện thoại của bạn.' }
      ],
      correctKey: 'B',
      feedback: 'Chính xác! Tôn trọng cảm xúc và quyền riêng tư của bạn là biểu hiện của người bạn tốt.'
    }
  },
  {
    id: 'v8',
    title: '8. Tham gia hoặc quảng bá website cờ bạc, đánh bạc, bạo lực',
    badge: 'An toàn không gian mạng',
    violationType: 'Hành vi vi phạm pháp luật',
    situation: 'Bấm vào các liên kết mời gọi chơi game bài đổi thưởng, cá cược bóng đá, nhận quà may mắn hoặc chia sẻ link đánh bạc cho người khác.',
    explanation: 'Cờ bạc trực tuyến là hành vi bị pháp luật nghiêm cấm, tiềm ẩn nguy cơ mất tiền và rơi vào cạm bẫy của tội phạm mạng.',
    whyWrong: 'Tiếp tay cho hành vi phạm pháp, gây ảnh hưởng xấu tới tâm lý và lối sống của lứa tuổi học sinh.',
    goodAdvice: 'Lập tức tắt trang web, không bấm vào đường link lạ và báo cho người lớn nếu bị quấy rầy bởi quảng cáo xấu.',
    interactiveQuestion: {
      question: 'Khi chơi game, màn hình hiện thông báo "Tham gia quay số trúng thưởng nạp thẻ cược nhận 500k". Bạn nên làm gì?',
      options: [
        { key: 'A', text: 'Nhanh chóng tắt quảng cáo hoặc thoát game, không bấm tham gia.' },
        { key: 'B', text: 'Mượn điện thoại bố mẹ để nạp tiền thử vận may.' },
        { key: 'C', text: 'Gửi link cho cả lớp cùng chơi.' }
      ],
      correctKey: 'A',
      feedback: 'Rất thông minh! Luôn cảnh giác với các chiêu trò dụ dỗ cờ bạc trên Internet.'
    }
  }
];

export const DIGITAL_PRODUCTS: DigitalProductType[] = [
  {
    id: 'dp1',
    name: 'Poster & Băng rôn',
    description: 'Áp phích tuyên truyền bảo vệ môi trường, chào mừng ngày 20/11 thiết kế trên máy tính.',
    iconName: 'Image',
    example: 'Poster "Trường học xanh - Không rác thải nhựa"',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'dp2',
    name: 'Ảnh chụp & Ảnh chỉnh sửa',
    description: 'Bức ảnh phong cảnh trường học, ảnh chụp gia đình do chính học sinh chụp và cắt ghép.',
    iconName: 'Camera',
    example: 'Bộ ảnh "Mùa hoa phượng sân trường"',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'dp3',
    name: 'Truyện tranh sáng tác',
    description: 'Câu chuyện tranh vẽ bằng phần mềm Paint hoặc Scratch do học sinh tự nghĩ ra cốt truyện.',
    iconName: 'BookOpen',
    example: 'Truyện "Chuyến phiêu lưu của Giọt Nước Tí Hon"',
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'dp4',
    name: 'Bài đăng mạng xã hội / Diễn đàn trường',
    description: 'Lời chúc mừng sinh nhật bạn, bài viết chia sẻ phương pháp học tập tốt môn Toán.',
    iconName: 'MessageSquare',
    example: 'Bài viết "Kinh nghiệm đọc sách 15 phút mỗi ngày"',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'dp5',
    name: 'Bài giới thiệu & Đánh giá sách',
    description: 'Bài viết hoặc bài trình chiếu PowerPoint cảm nhận về cuốn sách yêu thích.',
    iconName: 'Award',
    example: 'Bài cảm nhận sách "Dế Mèn phiêu lưu ký"',
    color: 'from-rose-500 to-pink-500'
  },
  {
    id: 'dp6',
    name: 'Blog, Podcast, Vlog học tập',
    description: 'Bản thu âm đọc thơ, video ngắn tự quay thuyết trình về một di tích lịch sử quê hương.',
    iconName: 'Video',
    example: 'Vlog "Khám phá Vườn Bách Thảo cùng bạn"',
    color: 'from-sky-500 to-blue-600'
  },
  {
    id: 'dp7',
    name: 'Trò chơi điện tử tự thiết kế',
    description: 'Trò chơi đố vui toán học, điều khiển chú mèo bắt bóng được lập trình bằng Scratch.',
    iconName: 'Gamepad2',
    example: 'Trò chơi "Robot Tin học Vượt Chướng Ngại Vật"',
    color: 'from-violet-500 to-fuchsia-500'
  }
];

export const CREATION_RULES: CreationRule[] = [
  {
    id: 1,
    title: '1. Luôn trung thực khi tạo sản phẩm số',
    detail: 'Tự mình suy nghĩ, thực hiện và tự hào với sản phẩm do chính bàn tay, khối óc của mình làm ra.',
    icon: 'HeartHandshake'
  },
  {
    id: 2,
    title: '2. Không sử dụng thông tin giả hoặc sai lệch',
    detail: 'Chỉ đưa vào sản phẩm những dữ liệu có thật, đã được kiểm chứng từ nguồn tin cậy như SGK, từ điển, thầy cô.',
    icon: 'ShieldCheck'
  },
  {
    id: 3,
    title: '3. Không sao chép sản phẩm của người khác rồi nhận là của mình',
    detail: 'Tuyệt đối không lấy bài làm của bạn, không tải sản phẩm trên mạng về rồi đổi tên tác giả thành tên mình.',
    icon: 'UserX'
  },
  {
    id: 4,
    title: '4. Ghi nguồn, tên tác giả khi sử dụng tài liệu tham khảo',
    detail: 'Nếu có mượn hình ảnh, trích dẫn câu thơ, đoạn văn của người khác, phải ghi chú rõ ràng: "Nguồn: Tác giả... / Trang web...".',
    icon: 'FileText'
  },
  {
    id: 5,
    title: '5. Chỉ sử dụng sản phẩm có bản quyền khi được phép',
    detail: 'Kiểm tra giấy phép sử dụng, xin phép tác giả hoặc ưu tiên chọn các kho tài nguyên miễn phí công cộng hợp pháp.',
    icon: 'Lock'
  },
  {
    id: 6,
    title: '6. Ưu tiên nội dung do chính mình tự sáng tạo',
    detail: 'Tự vẽ tranh, tự viết lời bình, tự chụp ảnh phong cảnh để sản phẩm mang dấu ấn độc đáo của riêng bạn.',
    icon: 'Sparkles'
  },
  {
    id: 7,
    title: '7. Không tiết lộ thông tin cá nhân của người khác',
    detail: 'Trong sản phẩm số, không để lộ họ tên đầy đủ, ngày sinh, địa chỉ, số điện thoại hay ảnh riêng tư của người khác khi chưa được cho phép.',
    icon: 'EyeOff'
  },
  {
    id: 8,
    title: '8. Bảo đảm nội dung phù hợp đạo đức, văn hoá và pháp luật',
    detail: 'Sử dụng ngôn ngữ lịch sự, trong sáng; không đưa hình ảnh bạo lực, phản cảm; lan toả điều tích cực, yêu thương.',
    icon: 'Smile'
  }
];
