import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Award, RefreshCw, X, Search, Clock, GraduationCap, Flame, Sparkles, UserPlus } from 'lucide-react';
import { LeaderboardEntry, StudentInfo } from '../types';
import { fetchLeaderboard, formatStudyTime } from '../services/googleSyncService';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStudent: StudentInfo | null;
  currentScore: number;
  studyDurationSeconds: number;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  currentStudent,
  currentScore,
  studyDurationSeconds
}) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchLeaderboard(currentStudent, currentScore, studyDurationSeconds);
      setLeaderboard(data);
      setLastUpdated(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch {
      // Handled gracefully in service
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen, currentScore, studyDurationSeconds]);

  if (!isOpen) return null;

  const filteredLeaderboard = leaderboard.filter(entry => 
    entry.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const top3 = leaderboard.slice(0, 3);
  const currentStudentRank = currentStudent 
    ? leaderboard.findIndex(e => e.fullName.toLowerCase() === currentStudent.fullName.toLowerCase()) + 1
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden border-4 border-yellow-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white p-5 sm:p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all text-white hover:scale-110 cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner backdrop-blur-sm">
                <Trophy className="w-8 h-8 text-yellow-200 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Bảng Xếp Hạng Toàn Quốc</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-yellow-400 text-yellow-950 flex items-center gap-1 shadow-sm">
                    <Sparkles className="w-3 h-3" /> Real-time
                  </span>
                </div>
                <p className="text-yellow-100 text-sm mt-0.5">
                  Vinh danh những Công dân số xuất sắc trên khắp cả nước
                </p>
              </div>
            </div>

            <button
              onClick={loadData}
              disabled={isLoading}
              className="self-start sm:self-center px-4 py-2 bg-white/20 hover:bg-white/30 active:scale-95 disabled:opacity-50 rounded-xl text-sm font-semibold flex items-center gap-2 backdrop-blur-sm transition-all border border-white/30 shadow cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Đang cập nhật...' : 'Làm mới'}</span>
            </button>
          </div>

          {/* Current student quick bar */}
          {currentStudent && (
            <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap items-center justify-between text-xs sm:text-sm gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-200">Vị trí của bạn:</span>
                <span className="bg-white text-orange-600 font-extrabold px-3 py-1 rounded-full shadow text-sm">
                  {currentStudentRank > 0 ? `#${currentStudentRank}` : 'Chưa xếp hạng'}
                </span>
                <span className="font-medium text-white">{currentStudent.fullName}</span>
                <span className="text-yellow-200">({currentStudent.grade})</span>
              </div>
              <div className="flex items-center gap-3 text-yellow-100">
                <span>Điểm: <strong className="text-white">{currentScore} pts</strong></span>
                <span>•</span>
                <span>Thời gian học: <strong className="text-white">{formatStudyTime(studyDurationSeconds)}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* Podium Top 1-2-3 (Only displays when there are real students) */}
        {leaderboard.length >= 3 && (
          <div className="bg-gradient-to-b from-amber-50 to-orange-50/40 px-4 pt-6 pb-4 border-b border-orange-100">
            <div className="max-w-2xl mx-auto grid grid-cols-3 gap-2 sm:gap-4 items-end text-center">
              
              {/* TOP 2 - BẠC */}
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-slate-300 to-slate-100 border-4 border-slate-300 shadow-md flex items-center justify-center text-slate-700 font-black text-xl">
                    {top3[1]?.fullName?.charAt(0) || '2'}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-800 text-xs font-black px-2 py-0.5 rounded-full shadow">
                    TOP 2
                  </div>
                </div>
                <div className="w-full bg-white rounded-2xl p-2.5 sm:p-3 shadow-md border-2 border-slate-200 h-28 sm:h-32 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate" title={top3[1]?.fullName}>
                      {top3[1]?.fullName}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">{top3[1]?.school}</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-extrabold text-slate-700">{top3[1]?.totalScore} pts</p>
                    <p className="text-[10px] text-slate-400">{top3[1]?.studyMinutes} phút học</p>
                  </div>
                </div>
              </div>

              {/* TOP 1 - VÀNG */}
              <div className="flex flex-col items-center -mt-4">
                <div className="relative mb-2">
                  <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-200 border-4 border-yellow-400 shadow-xl flex items-center justify-center text-amber-900 font-black text-2xl ring-4 ring-yellow-200/50">
                    <Medal className="w-9 h-9 text-yellow-600 animate-pulse" />
                  </div>
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="text-2xl">👑</span>
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-md whitespace-nowrap">
                    TOP 1 QUÁN QUÂN
                  </div>
                </div>
                <div className="w-full bg-gradient-to-b from-yellow-50 to-amber-100/60 rounded-2xl p-2.5 sm:p-3 shadow-lg border-2 border-yellow-400 h-32 sm:h-36 flex flex-col justify-between">
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-amber-900 truncate" title={top3[0]?.fullName}>
                      {top3[0]?.fullName}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-amber-700 font-medium truncate">{top3[0]?.school}</p>
                  </div>
                  <div>
                    <p className="text-base sm:text-lg font-black text-amber-700 flex items-center justify-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                      {top3[0]?.totalScore} pts
                    </p>
                    <p className="text-[10px] text-amber-700/80 font-medium">{top3[0]?.studyMinutes} phút học</p>
                  </div>
                </div>
              </div>

              {/* TOP 3 - ĐỒNG */}
              <div className="flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 border-4 border-amber-600 shadow-md flex items-center justify-center text-amber-950 font-black text-xl">
                    {top3[2]?.fullName?.charAt(0) || '3'}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-600 text-white text-xs font-black px-2 py-0.5 rounded-full shadow">
                    TOP 3
                  </div>
                </div>
                <div className="w-full bg-white rounded-2xl p-2.5 sm:p-3 shadow-md border-2 border-amber-200 h-28 sm:h-32 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-amber-900 truncate" title={top3[2]?.fullName}>
                      {top3[2]?.fullName}
                    </h4>
                    <p className="text-[10px] sm:text-xs text-slate-500 truncate">{top3[2]?.school}</p>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-extrabold text-amber-800">{top3[2]?.totalScore} pts</p>
                    <p className="text-[10px] text-slate-400">{top3[2]?.studyMinutes} phút học</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Podium for 1 or 2 students */}
        {leaderboard.length > 0 && leaderboard.length < 3 && (
          <div className="bg-gradient-to-b from-amber-50 to-orange-50/40 px-4 py-6 border-b border-orange-100 flex justify-center gap-4">
            {leaderboard.map((item, idx) => (
              <div key={item.fullName} className="flex flex-col items-center max-w-[200px] w-full">
                <div className="relative mb-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-amber-300 border-4 border-yellow-400 shadow-lg flex items-center justify-center text-amber-950 font-black text-2xl">
                    {item.fullName.charAt(0)}
                  </div>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                    TOP {idx + 1}
                  </div>
                </div>
                <div className="w-full bg-white rounded-2xl p-3 shadow-md border-2 border-yellow-300 text-center">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 truncate">{item.fullName}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{item.school}</p>
                  <p className="text-sm font-black text-amber-700 mt-1">{item.totalScore} pts</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Filter bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row gap-2 justify-between items-center text-xs text-slate-500">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên học sinh, lớp, trường..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          <div className="flex items-center gap-3">
            <span>Tổng số: <strong className="text-slate-800 font-bold">{leaderboard.length}</strong> học sinh</span>
            {lastUpdated && <span>Cập nhật lúc: <strong className="text-slate-700">{lastUpdated}</strong></span>}
          </div>
        </div>

        {/* Table Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {filteredLeaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-2.5 px-3 text-center">Hạng</th>
                    <th className="py-2.5 px-3">Học sinh</th>
                    <th className="py-2.5 px-3 hidden md:table-cell">Trường</th>
                    <th className="py-2.5 px-3 text-center">Lớp</th>
                    <th className="py-2.5 px-3 text-right">Điểm số</th>
                    <th className="py-2.5 px-3 text-right hidden sm:table-cell">Thời lượng</th>
                    <th className="py-2.5 px-3 text-center hidden lg:table-cell">Huy hiệu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredLeaderboard.map((entry) => {
                    const isCurrent = currentStudent && entry.fullName.toLowerCase() === currentStudent.fullName.toLowerCase();
                    
                    return (
                      <tr
                        key={`${entry.rank}-${entry.fullName}`}
                        className={`hover:bg-amber-50/50 transition-colors ${
                          isCurrent ? 'bg-amber-100/70 font-semibold ring-2 ring-inset ring-amber-400' : ''
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3 px-3 text-center">
                          {entry.rank === 1 && (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-400 text-yellow-950 font-black text-xs shadow">
                              1
                            </span>
                          )}
                          {entry.rank === 2 && (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-slate-300 text-slate-800 font-black text-xs shadow">
                              2
                            </span>
                          )}
                          {entry.rank === 3 && (
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-600 text-white font-black text-xs shadow">
                              3
                            </span>
                          )}
                          {entry.rank && entry.rank > 3 && (
                            <span className="text-slate-600 font-bold text-xs">
                              #{entry.rank}
                            </span>
                          )}
                        </td>

                        {/* Name */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                              isCurrent ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {entry.fullName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                                <span>{entry.fullName}</span>
                                {isCurrent && (
                                  <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                                    Bạn
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400 md:hidden">{entry.school}</div>
                            </div>
                          </div>
                        </td>

                        {/* School */}
                        <td className="py-3 px-3 hidden md:table-cell text-slate-600 text-xs">
                          <div className="flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                            <span className="truncate max-w-[180px]">{entry.school}</span>
                          </div>
                        </td>

                        {/* Class */}
                        <td className="py-3 px-3 text-center">
                          <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-0.5 rounded-md border border-slate-200">
                            {entry.grade}
                          </span>
                        </td>

                        {/* Score */}
                        <td className="py-3 px-3 text-right">
                          <span className="font-extrabold text-orange-600 text-sm">
                            {entry.totalScore.toLocaleString('vi-VN')}
                          </span>
                          <span className="text-xs text-slate-400 ml-1">pts</span>
                        </td>

                        {/* Study duration */}
                        <td className="py-3 px-3 text-right hidden sm:table-cell text-xs text-slate-600">
                          <span className="inline-flex items-center gap-1">
                            <Clock className="w-3 h-3 text-slate-400" />
                            {entry.studyMinutes} phút
                          </span>
                        </td>

                        {/* Badges */}
                        <td className="py-3 px-3 text-center hidden lg:table-cell">
                          <span className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded-full border border-yellow-200">
                            <Award className="w-3 h-3 text-yellow-600" />
                            {entry.badgeCount || 1}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-14 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8 opacity-60" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-slate-700 text-base">Chưa có học sinh nào trên Bảng xếp hạng</h4>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Hãy bắt đầu bài học, làm bài luyện tập hoặc thi đấu tại Đấu trường để trở thành học sinh đầu tiên ghi danh trên Bảng vàng toàn quốc!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-medium text-emerald-700">Dữ liệu được cập nhật 100% từ học sinh thực tế trên Google Sheets</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-bold rounded-xl transition-all shadow cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};
