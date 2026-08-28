import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy,
  Medal,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Award,
} from 'lucide-react';
import { userService, LeaderboardUser } from '../services/user.service';

export const LeaderboardPage: React.FC = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'solved' | 'rating'>('solved');
  const [loading, setLoading] = useState<boolean>(true);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      const res = await userService.getLeaderboard(page, 20, sortBy);
      setUsers(res.data.leaderboard);
      setTotalPages(res.data.pagination.totalPages);
      setTotalUsers(res.data.pagination.totalUsers);
    } catch (err) {
      console.error('Failed to load leaderboard', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [page, sortBy]);

  const handleSortChange = (newSort: 'solved' | 'rating') => {
    if (newSort !== sortBy) {
      setSortBy(newSort);
      setPage(1);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#1a1a1a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header & Ranking Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="p-2 bg-[#ffa116]/10 text-[#ffa116] rounded-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Global Leaderboard</h1>
            </div>
            <p className="text-xs text-gray-400">
              Ranking top developers across the globe ({totalUsers} total registered)
            </p>
          </div>

          {/* Sort Buttons */}
          <div className="inline-flex bg-[#282828] border border-[#383838] p-1 rounded-xl">
            <button
              onClick={() => handleSortChange('solved')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                sortBy === 'solved'
                  ? 'bg-[#ffa116] text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Most Problems Solved
            </button>
            <button
              onClick={() => handleSortChange('rating')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                sortBy === 'rating'
                  ? 'bg-[#ffa116] text-black shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Contest Rating
            </button>
          </div>
        </div>

        {/* Leaderboard Table Container */}
        <div className="bg-[#282828] border border-[#383838] rounded-2xl overflow-hidden shadow-2xl">
          {loading ? (
            <div className="py-24 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-[#ffa116]" />
            </div>
          ) : users.length === 0 ? (
            <div className="py-20 text-center text-gray-400 text-sm">
              No users registered on the leaderboard yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-300">
                <thead className="bg-[#1e1e1e] border-b border-[#383838] text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <tr>
                    <th scope="col" className="px-6 py-4 w-20 text-center">Rank</th>
                    <th scope="col" className="px-6 py-4">User</th>
                    <th scope="col" className="px-6 py-4 text-center">Problems Solved</th>
                    <th scope="col" className="px-6 py-4 text-center">Contest Rating</th>
                    <th scope="col" className="px-6 py-4 text-center">Badges</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#383838]">
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="hover:bg-[#333333]/50 transition-colors group"
                    >
                      {/* Rank */}
                      <td className="px-6 py-4 text-center font-bold">
                        {u.rank === 1 ? (
                          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">
                            <Medal className="w-4 h-4" />
                          </div>
                        ) : u.rank === 2 ? (
                          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-400/20 text-gray-300 border border-gray-400/40">
                            <Medal className="w-4 h-4" />
                          </div>
                        ) : u.rank === 3 ? (
                          <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40">
                            <Medal className="w-4 h-4" />
                          </div>
                        ) : (
                          <span className="text-gray-400 font-mono">#{u.rank}</span>
                        )}
                      </td>

                      {/* User Profile Info */}
                      <td className="px-6 py-4">
                        <Link
                          to={`/u/${u.username}`}
                          className="flex items-center gap-3 group-hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={u.avatar || 'https://assets.leetcode.com/users/default_avatar.jpg'}
                            alt={u.username}
                            className="w-9 h-9 rounded-full object-cover border border-[#444444]"
                          />
                          <div>
                            <div className="font-semibold text-white group-hover:text-[#ffa116] transition-colors">
                              {u.realName || u.username}
                            </div>
                            <div className="text-xs text-gray-400">@{u.username}</div>
                          </div>
                        </Link>
                      </td>

                      {/* Solved Problems */}
                      <td className="px-6 py-4 text-center font-bold text-white">
                        <span className="inline-block px-3 py-1 bg-[#1e1e1e] rounded-full border border-[#383838]">
                          {u.solvedCount}
                        </span>
                      </td>

                      {/* Contest Rating */}
                      <td className="px-6 py-4 text-center font-bold text-yellow-400">
                        {u.contestRating}
                      </td>

                      {/* Badges */}
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-300 bg-[#333333] px-2.5 py-1 rounded-full">
                          <Award className="w-3.5 h-3.5 text-[#ffa116]" />
                          {u.badgesCount}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Bar */}
          {!loading && totalPages > 1 && (
            <div className="bg-[#1e1e1e] border-t border-[#383838] px-6 py-4 flex items-center justify-between">
              <span className="text-xs text-gray-400">
                Page <span className="font-semibold text-white">{page}</span> of{' '}
                <span className="font-semibold text-white">{totalPages}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#282828] hover:bg-[#383838] disabled:opacity-30 disabled:cursor-not-allowed text-xs text-gray-300 rounded-lg transition-colors border border-[#3e3e3e]"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#282828] hover:bg-[#383838] disabled:opacity-30 disabled:cursor-not-allowed text-xs text-gray-300 rounded-lg transition-colors border border-[#3e3e3e]"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

