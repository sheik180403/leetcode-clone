import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Trophy,
  Flame,
  CheckCircle2,
  Calendar,
  Github,
  Linkedin,
  Globe,
  MapPin,
  Building,
  GraduationCap,
  Award,
  Loader2,
  UserX,
  ArrowLeft,
} from 'lucide-react';
import { userService } from '../services/user.service';
import { IUser } from '../types/user.types';

export const PublicProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!username) return;
      setLoading(true);
      setError(null);

      try {
        const res = await userService.getProfileByUsername(username);
        setUser(res.data.user);
      } catch (err: any) {
        setError(err.response?.data?.message || `User '@${username}' not found.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-[#1a1a1a]">
        <Loader2 className="w-10 h-10 animate-spin text-[#ffa116]" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center bg-[#1a1a1a] px-4 text-center">
        <div className="w-16 h-16 bg-[#282828] border border-[#383838] rounded-2xl flex items-center justify-center text-gray-500 mb-4">
          <UserX className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">User Not Found</h2>
        <p className="text-gray-400 text-sm max-w-sm mb-6">
          The developer profile <span className="text-[#ffa116] font-semibold">@{username}</span> does not exist or has been removed.
        </p>
        <Link
          to="/leaderboard"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#282828] hover:bg-[#383838] border border-[#3e3e3e] text-white rounded-lg text-sm transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Leaderboard
        </Link>
      </div>
    );
  }

  const solved = user.stats?.solved || { easy: 0, medium: 0, hard: 0, all: 0 };
  const totalEasy = 800;
  const totalMedium = 1600;
  const totalHard = 700;
  const totalAll = totalEasy + totalMedium + totalHard;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#1a1a1a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Public User Profile Card */}
        <div className="space-y-6">
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={user.profile?.avatar || 'https://assets.leetcode.com/users/default_avatar.jpg'}
                alt={user.username}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-[#383838]"
              />
              <div>
                <h1 className="text-xl font-bold text-white leading-tight">
                  {user.profile?.realName || user.username}
                </h1>
                <p className="text-sm text-gray-400">@{user.username}</p>
                <div className="inline-block mt-2 px-2 py-0.5 bg-[#333333] border border-[#444444] rounded text-xs font-semibold text-[#ffa116] uppercase">
                  {user.role}
                </div>
              </div>
            </div>

            {user.profile?.bio && (
              <p className="text-sm text-gray-300 mb-6 italic bg-[#1e1e1e] p-3 rounded-lg border border-[#333333]">
                "{user.profile.bio}"
              </p>
            )}

            {/* Metadata list */}
            <div className="space-y-3 text-sm text-gray-300 border-t border-[#383838] pt-4">
              {user.profile?.location && (
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{user.profile.location}</span>
                </div>
              )}
              {user.profile?.company && (
                <div className="flex items-center gap-2 text-gray-400">
                  <Building className="w-4 h-4 text-gray-500" />
                  <span>{user.profile.company}</span>
                </div>
              )}
              {user.profile?.school && (
                <div className="flex items-center gap-2 text-gray-400">
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <span>{user.profile.school}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6 border-t border-[#383838] pt-4">
              {user.profile?.githubUrl && (
                <a
                  href={user.profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#333333] hover:bg-[#444444] rounded-lg text-gray-300 transition-colors"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {user.profile?.linkedinUrl && (
                <a
                  href={user.profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#333333] hover:bg-[#444444] rounded-lg text-gray-300 transition-colors"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {user.profile?.websiteUrl && (
                <a
                  href={user.profile.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-[#333333] hover:bg-[#444444] rounded-lg text-gray-300 transition-colors"
                  title="Personal Website"
                >
                  <Globe className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Badges Card */}
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-[#ffa116]" />
              Badges ({user.badges?.length || 0})
            </h3>
            {user.badges && user.badges.length > 0 ? (
              <div className="grid grid-cols-3 gap-3">
                {user.badges.map((b, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#1e1e1e] border border-[#333333] rounded-xl flex flex-col items-center text-center"
                  >
                    <span className="text-2xl mb-1">{b.icon || '🏅'}</span>
                    <span className="text-xs font-semibold text-gray-200 truncate w-full">{b.name}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 text-center py-4">No badges earned yet.</p>
            )}
          </div>
        </div>

        {/* Right Column: Statistics & Highlights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Solved Problems Breakdown Card */}
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#ffa116]" />
              Solved Problems
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              {/* Total Solved */}
              <div className="bg-[#1e1e1e] border border-[#333333] p-5 rounded-xl text-center flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-white">{solved.all}</span>
                <span className="text-xs text-gray-400 mt-1">/ {totalAll} Solved</span>
                <div className="w-full bg-[#333333] h-1.5 rounded-full mt-3 overflow-hidden">
                  <div
                    className="bg-[#ffa116] h-full"
                    style={{ width: `${Math.min(100, (solved.all / totalAll) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Easy Stats */}
              <div className="bg-[#1e1e1e] border border-[#333333] p-4 rounded-xl">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#00b8a3]">Easy</span>
                  <span className="text-gray-300">{solved.easy} / {totalEasy}</span>
                </div>
                <div className="w-full bg-[#333333] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#00b8a3] h-full"
                    style={{ width: `${Math.min(100, (solved.easy / totalEasy) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Medium Stats */}
              <div className="bg-[#1e1e1e] border border-[#333333] p-4 rounded-xl">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#ffc01e]">Medium</span>
                  <span className="text-gray-300">{solved.medium} / {totalMedium}</span>
                </div>
                <div className="w-full bg-[#333333] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ffc01e] h-full"
                    style={{ width: `${Math.min(100, (solved.medium / totalMedium) * 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Hard Stats */}
              <div className="bg-[#1e1e1e] border border-[#333333] p-4 rounded-xl">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-[#ff375f]">Hard</span>
                  <span className="text-gray-300">{solved.hard} / {totalHard}</span>
                </div>
                <div className="w-full bg-[#333333] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#ff375f] h-full"
                    style={{ width: `${Math.min(100, (solved.hard / totalHard) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Contest & Streak Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contest Rating */}
            <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Contest Rating
                </h3>
                <span className="text-xs text-gray-400">
                  {user.stats?.contest?.attendedContests || 0} Contests
                </span>
              </div>
              <div className="text-3xl font-black text-white mb-1">
                {user.stats?.contest?.rating || 1500}
              </div>
              <p className="text-xs text-gray-400">
                Global Ranking:{' '}
                <span className="text-gray-200 font-semibold">
                  {user.stats?.contest?.globalRanking ? `#${user.stats.contest.globalRanking}` : 'Unranked'}
                </span>
              </p>
            </div>

            {/* Streak & Consistency */}
            <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#ffa116]" />
                  Day Streak
                </h3>
                <span className="text-xs text-gray-400">
                  Max: {user.stats?.streak?.maxStreak || 0} days
                </span>
              </div>
              <div className="text-3xl font-black text-[#ffa116] mb-1">
                {user.stats?.streak?.currentStreak || 0} <span className="text-lg text-gray-400 font-normal">days</span>
              </div>
              <p className="text-xs text-gray-400">Active coding consistency</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

