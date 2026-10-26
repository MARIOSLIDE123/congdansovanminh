import React, { useState } from 'react';
import { 
  Database, X, ShieldCheck, Download, ExternalLink, 
  CheckCircle2, AlertCircle, FileSpreadsheet, Sparkles, 
  Copy, Check, Send, Code
} from 'lucide-react';
import { StudentInfo, ArenaHistoryRecord } from '../types';

interface SyncSettingsModalProps {
  student: StudentInfo;
  arenaHistory: ArenaHistoryRecord[];
  totalScore: number;
  onClose: () => void;
}

export const SyncSettingsModal: React.FC<SyncSettingsModalProps> = ({
  student,
  arenaHistory,
  totalScore,
  onClose
}) => {
  const [scriptUrl, setScriptUrl] = useState(() => localStorage.getItem('google_apps_script_url') || '');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);

  const sampleAppsScript = `// Mã nguồn Google Apps Script đồng bộ điểm học sinh vào Google Sheets
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Thời gian", "Họ và tên", "Lớp", "Trường", "Điểm Đấu Trường", "Số câu đúng", "Danh hiệu"]);
    }
    var data = JSON.parse(e.postData.contents);
    sheet.appendRow([
      new Date().toLocaleString("vi-VN"),
      data.fullName || "",
      data.grade || "",
      data.school || "",
      data.score || 0,
      data.correctCount || 0,
      data.rankTitle || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: "error", message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}`;

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = scriptUrl.trim();
    if (clean) {
      localStorage.setItem('google_apps_script_url', clean);
      setSaveStatus('Đã lưu cấu hình kết nối Web App!');
    } else {
      localStorage.removeItem('google_apps_script_url');
      setSaveStatus('Đã đưa về chế độ lưu cục bộ trên thiết bị.');
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleAppsScript);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleTestSync = async () => {
    if (!scriptUrl.trim()) return;
    setSyncing(true);
    setSyncResult(null);

    try {
      const payload = {
        fullName: student.fullName,
        grade: student.grade,
        school: student.school,
        score: totalScore,
        correctCount: arenaHistory.length > 0 ? arenaHistory[0].correctCount : 0,
        rankTitle: arenaHistory.length > 0 ? arenaHistory[0].rankTitle : 'Học sinh lớp 8'
      };

      await fetch(scriptUrl.trim(), {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
        mode: 'no-cors'
      });

      setSyncResult('Đã gửi dữ liệu thành công tới máy chủ Google Sheets!');
    } catch {
      setSyncResult('Không thể kết nối tới URL này. Hãy kiểm tra lại quyền Web App (Truy cập: Bất kỳ ai).');
    } finally {
      setSyncing(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Họ và Tên', 'Lớp', 'Trường', 'Ngày thi', 'Điểm Đấu Trường', 'Số câu đúng', 'Số câu sai', 'Danh hiệu'];
    const rows = arenaHistory.map((h) => [
      `"${student.fullName}"`,
      `"${student.grade}"`,
      `"${student.school}"`,
      `"${h.date}"`,
      h.score,
      h.correctCount,
      h.wrongCount,
      `"${h.rankTitle}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Ket_qua_${student.fullName}_${student.grade}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasConfiguredServer = !!scriptUrl.trim();

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Database className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <h2 className="text-lg font-black">LƯU TRỮ & ĐỒNG BỘ ĐIỂM SỐ</h2>
              <p className="text-xs text-emerald-100 font-semibold">
                Dành cho Học sinh & Thầy Cô giáo Tin học
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

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          
          {/* Current Local Storage Status */}
          <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 ${
            hasConfiguredServer 
              ? 'bg-sky-50 border-sky-300 text-sky-950' 
              : 'bg-emerald-50 border-emerald-300 text-emerald-950'
          }`}>
            <ShieldCheck className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs sm:text-sm">
              <h4 className="font-black text-slate-800">
                {hasConfiguredServer ? 'Đã cài đặt liên kết máy chủ Web App' : 'Chế độ an toàn: Lưu cục bộ trên thiết bị'}
              </h4>
              <p className="text-slate-600 font-medium leading-relaxed">
                {hasConfiguredServer 
                  ? `Hệ thống đã lưu URL Google Apps Script. Thầy cô có thể nhấn nút "Thử đồng bộ" dưới đây.`
                  : 'Tiến độ học tập, điểm số và huy hiệu của bạn được lưu trữ an toàn, trực tiếp trên trình duyệt của máy này (LocalStorage). Không có dữ liệu cá nhân nào bị gửi ra ngoài trái phép.'}
              </p>
            </div>
          </div>

          {/* Quick Export CSV for Teachers */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Xuất báo cáo điểm bảng tính (Excel / CSV)</span>
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  Tải tệp điểm số của học sinh về máy thầy cô hoặc phụ huynh để lưu trữ.
                </p>
              </div>

              <button
                type="button"
                onClick={handleExportCSV}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs flex-shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải tệp CSV</span>
              </button>
            </div>
          </div>

          {/* Google Sheets (Google Apps Script) Configuration */}
          <form onSubmit={handleSaveUrl} className="space-y-3 pt-1">
            <div>
              <label className="block text-xs sm:text-sm font-extrabold text-slate-700 mb-1">
                Liên kết Google Apps Script (Thầy Cô nhập khi có Web App URL thật):
              </label>
              <input
                type="url"
                value={scriptUrl}
                onChange={(e) => setScriptUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none text-xs font-mono text-slate-800"
              />
              <p className="text-[11px] text-slate-500 mt-1 italic">
                *Để trống nếu muốn ứng dụng chạy độc lập offline/cục bộ trên trình duyệt.
              </p>
            </div>

            {saveStatus && (
              <p className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{saveStatus}</span>
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="submit"
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer"
              >
                Lưu cấu hình URL
              </button>

              {hasConfiguredServer && (
                <button
                  type="button"
                  disabled={syncing}
                  onClick={handleTestSync}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-extrabold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{syncing ? 'Đang gửi...' : 'Thử gửi kết quả lên Sheet'}</span>
                </button>
              )}
            </div>

            {syncResult && (
              <p className="text-xs font-bold text-sky-700 bg-sky-50 p-2.5 rounded-xl border border-sky-200">
                {syncResult}
              </p>
            )}
          </form>

          {/* Expandable Apps Script Code for Teachers */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowCode(!showCode)}
              className="w-full p-3 bg-slate-50 hover:bg-slate-100 text-left flex items-center justify-between text-xs font-bold text-slate-700 transition-colors"
            >
              <span className="flex items-center gap-1.5">
                <Code className="w-4 h-4 text-emerald-600" />
                <span>Xem mã nguồn Google Apps Script mẫu cho Thầy Cô</span>
              </span>
              <span className="text-[11px] text-emerald-600 font-extrabold">
                {showCode ? 'Thu gọn' : 'Xem mã'}
              </span>
            </button>

            {showCode && (
              <div className="p-3 bg-slate-900 text-slate-100 text-[11px] font-mono space-y-2 relative">
                <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-700 pb-1">
                  <span>Code.gs</span>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-white"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Đã sao chép' : 'Sao chép mã'}</span>
                  </button>
                </div>
                <pre className="overflow-x-auto max-h-40 leading-relaxed text-emerald-300">
                  {sampleAppsScript}
                </pre>
              </div>
            )}
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
