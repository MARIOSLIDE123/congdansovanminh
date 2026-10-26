import React from 'react';
import { Award, Printer, X, Sparkles, ShieldCheck } from 'lucide-react';
import { StudentInfo } from '../types';
import { getRankDetails } from '../data/badgeData';

interface CertificateModalProps {
  student: StudentInfo;
  score: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  student,
  score,
  onClose
}) => {
  const rank = getRankDetails(score);
  const today = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-amber-300 overflow-hidden relative my-auto">
        
        {/* Top bar controls */}
        <div className="bg-amber-500 px-4 py-2 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-1.5 text-xs font-black">
            <Sparkles className="w-4 h-4 text-yellow-200" />
            <span>GIẤY CHỨNG NHẬN CÔNG DÂN SỐ VĂN MINH</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1 bg-white text-amber-800 rounded-lg text-xs font-bold hover:bg-amber-50 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>In giấy khen</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-amber-600 rounded-lg transition-colors cursor-pointer text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Area */}
        <div className="certificate-print-wrapper p-6 sm:p-10 bg-gradient-to-br from-amber-50/50 via-yellow-50/30 to-amber-50/50 relative">
          
          {/* Classic certificate border */}
          <div className="border-4 border-amber-500 rounded-2xl p-6 sm:p-8 relative bg-white/90 shadow-inner">
            <div className="absolute inset-1.5 border border-dashed border-amber-300 rounded-xl pointer-events-none" />

            {/* Header */}
            <div className="text-center space-y-1">
              <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-slate-500">
                BỘ SÁCH KẾT NỐI TRI THỨC VỚI CUỘC SỐNG • MÔN TIN HỌC 8
              </p>
              <h1 className="text-xl sm:text-3xl font-black text-amber-700 tracking-tight uppercase">
                GIẤY CHỨNG NHẬN
              </h1>
              <p className="text-xs sm:text-sm font-bold text-slate-600">
                CÔNG DÂN SỐ VĂN MINH XUẤT SẮC
              </p>
            </div>

            {/* Recipient */}
            <div className="text-center my-6 space-y-2">
              <p className="text-xs text-slate-500 font-semibold italic">Trao tặng cho học sinh:</p>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight border-b-2 border-amber-300 pb-2 inline-block px-8">
                {student.fullName}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-slate-700">
                Lớp: <span className="text-emerald-700">{student.grade}</span> • Trường: <span className="text-sky-700">{student.school}</span>
              </p>
            </div>

            {/* Reason & Achievement */}
            <div className="text-center max-w-xl mx-auto space-y-2 text-xs sm:text-sm text-slate-700 font-medium">
              <p>
                Đã hoàn thành xuất sắc thử thách <strong>Đấu trường trí tuệ Tin học 8 (Bài 4: Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số)</strong>.
              </p>
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 px-4 py-1.5 rounded-full font-black text-xs sm:text-sm">
                <span>{rank.emoji} Danh hiệu: {rank.rankTitle}</span>
                <span>•</span>
                <span>{score}/200 điểm</span>
              </div>
              <p className="text-xs text-slate-500 italic pt-1">
                Ghi nhận phẩm chất: Tôn trọng bản quyền • Bảo vệ quyền riêng tư • Trung thực tạo sản phẩm số!
              </p>
            </div>

            {/* Signatures & Seal */}
            <div className="flex items-center justify-between pt-8 text-center text-xs font-bold text-slate-600">
              <div className="space-y-1">
                <p className="text-[11px] text-slate-400">Ngày cấp: {today}</p>
                <p className="text-slate-800 font-black">BAN TỔ CHỨC ĐẤU TRƯỜNG</p>
                <p className="text-[10px] text-slate-400 italic">(Đã chứng thực điện tử)</p>
              </div>

              {/* Gold Seal Graphic */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 shadow-md flex items-center justify-center transform rotate-12">
                <div className="w-full h-full border-2 border-dashed border-amber-700 rounded-full flex flex-col items-center justify-center text-amber-950 p-1">
                  <ShieldCheck className="w-6 h-6 text-amber-900" />
                  <span className="text-[8px] font-black tracking-tighter uppercase">CÔNG DÂN SỐ</span>
                  <span className="text-[7px] font-bold">XUẤT SẮC</span>
                </div>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] text-slate-400">Trợ giảng đồng hành</p>
                <p className="text-emerald-700 font-black text-sm">ROBOT TIN HỌC 🤖</p>
                <p className="text-[10px] text-slate-400 italic">Văn minh & An toàn</p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Close */}
        <div className="bg-slate-50 p-3 text-center border-t border-slate-200 no-print">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-extrabold text-xs transition-colors cursor-pointer"
          >
            Đóng giấy chứng nhận
          </button>
        </div>

      </div>
    </div>
  );
};
