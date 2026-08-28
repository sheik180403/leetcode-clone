import React, { useState } from 'react';
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
  Edit3,
  KeyRound,
  X,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userService, UpdateProfilePayload, ChangePasswordPayload } from '../services/user.service';

export const ProfilePage: React.FC = () => {
  const { user, refreshUser } = useAuth();

  // Modals state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  // Edit Profile Form State
  const [profileForm, setProfileForm] = useState<UpdateProfilePayload>({
    realName: user?.profile?.realName || '',
    avatar: user?.profile?.avatar || '',
    bio: user?.profile?.bio || '',
    location: user?.profile?.location || '',
    company: user?.profile?.company || '',
    school: user?.profile?.school || '',
    githubUrl: user?.profile?.githubUrl || '',
    linkedinUrl: user?.profile?.linkedinUrl || '',
    websiteUrl: user?.profile?.websiteUrl || '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);

  // Change Password Form State
  const [passwordForm, setPasswordForm] = useState<ChangePasswordPayload & { confirmPassword: string }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  if (!user) return null;

  const solved = user.stats?.solved || { easy: 0, medium: 0, hard: 0, all: 0 };
  const totalEasy = 800;
  const totalMedium = 1600;
  const totalHard = 700;
  const totalAll = totalEasy + totalMedium + totalHard;

  const handleOpenEdit = () => {
    setProfileForm({
      realName: user.profile?.realName || '',
      avatar: user.profile?.avatar || '',
      bio: user.profile?.bio || '',
      location: user.profile?.location || '',
      company: user.profile?.company || '',
      school: user.profile?.school || '',
      githubUrl: user.profile?.githubUrl || '',
      linkedinUrl: user.profile?.linkedinUrl || '',
      websiteUrl: user.profile?.websiteUrl || '',
    });
    setProfileError(null);
    setProfileSuccess(null);
    setIsEditOpen(true);
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setProfileLoading(true);

    try {
      await userService.updateProfile(profileForm);
      await refreshUser();
      setProfileSuccess('Profile updated successfully!');
      setTimeout(() => setIsEditOpen(false), 1200);
    } catch (err: any) {
      setProfileError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('New password and confirm password do not match.');
      return;
    }

    setPasswordLoading(true);

    try {
      await userService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setIsPasswordOpen(false), 1200);
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#1a1a1a] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Profile Details */}
        <div className="space-y-6">
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl relative">
            {/* Quick Action Buttons */}
            <div className="flex items-center gap-2 mb-6 justify-end">
              <button
                onClick={handleOpenEdit}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#383838] hover:bg-[#444444] text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Profile
              </button>
              <button
                onClick={() => {
                  setPasswordError(null);
                  setPasswordSuccess(null);
                  setIsPasswordOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs font-semibold bg-[#383838] hover:bg-[#444444] text-gray-200 px-3 py-1.5 rounded-lg transition-colors"
              >
                <KeyRound className="w-3.5 h-3.5" />
                Password
              </button>
            </div>

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
              <p className="text-xs text-gray-500 text-center py-4">
                Solve daily challenges to earn achievement badges.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Statistics & Graphs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Solved Problems Breakdown Card */}
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#ffa116]" />
              Solved Problems
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
              {/* Total Solved Circle Stats */}
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
              <p className="text-xs text-gray-400">
                Solve a problem today to keep your daily streak alive!
              </p>
            </div>
          </div>

          {/* Submission Heatmap Preview */}
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-4">
              Submissions in the last year
            </h3>
            <div className="bg-[#1e1e1e] p-6 rounded-xl border border-[#333333] text-center">
              <div className="grid grid-flow-col grid-rows-7 gap-1.5 justify-center py-4 overflow-x-auto">
                {Array.from({ length: 150 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      i % 7 === 0 || i % 13 === 0
                        ? 'bg-[#00b8a3]'
                        : i % 19 === 0
                        ? 'bg-[#00b8a3]/60'
                        : 'bg-[#2a2a2a]'
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Total Submissions:{' '}
                <span className="text-white font-semibold">
                  {user.stats?.submissions?.totalSubmissions || 0}
                </span>{' '}
                | Accepted:{' '}
                <span className="text-[#00b8a3] font-semibold">
                  {user.stats?.submissions?.acceptedSubmissions || 0}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl max-w-lg w-full p-6 shadow-2xl relative my-8">
            <button
              onClick={() => setIsEditOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Edit Profile</h3>
            <p className="text-xs text-gray-400 mb-6">Update your public developer details and links</p>

            {profileError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{profileError}</span>
              </div>
            )}

            {profileSuccess && (
              <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{profileSuccess}</span>
              </div>
            )}

            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Full / Display Name
                </label>
                <input
                  type="text"
                  value={profileForm.realName}
                  onChange={(e) => setProfileForm({ ...profileForm, realName: e.target.value })}
                  placeholder="e.g. Alex Rivera"
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={profileForm.avatar}
                  onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Bio / Summary
                </label>
                <textarea
                  rows={2}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  placeholder="Tell others about your coding journey..."
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={profileForm.company}
                    onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                    placeholder="e.g. Google"
                    className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    School / University
                  </label>
                  <input
                    type="text"
                    value={profileForm.school}
                    onChange={(e) => setProfileForm({ ...profileForm, school: e.target.value })}
                    placeholder="e.g. Stanford"
                    className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  placeholder="e.g. San Francisco, CA"
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.githubUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, githubUrl: e.target.value })}
                    placeholder="https://github.com/..."
                    className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={profileForm.linkedinUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, linkedinUrl: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                    className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 bg-[#333333] hover:bg-[#3e3e3e] text-gray-300 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={profileLoading}
                  className="flex items-center gap-2 px-5 py-2 bg-[#ffa116] hover:bg-[#e69010] text-black font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {profileLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD MODAL */}
      {isPasswordOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#282828] border border-[#3e3e3e] rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsPasswordOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Change Password</h3>
            <p className="text-xs text-gray-400 mb-6">Enter your existing password and choose a new secure password</p>

            {passwordError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="mb-4 bg-green-500/10 border border-green-500/30 text-green-400 p-3 rounded-lg text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordForm.newPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                  }
                  placeholder="Minimum 6 characters"
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                  }
                  placeholder="Repeat new password"
                  className="w-full px-3.5 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white text-sm focus:outline-none focus:border-[#ffa116]"
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsPasswordOpen(false)}
                  className="px-4 py-2 bg-[#333333] hover:bg-[#3e3e3e] text-gray-300 rounded-lg text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={passwordLoading}
                  className="flex items-center gap-2 px-5 py-2 bg-[#ffa116] hover:bg-[#e69010] text-black font-bold rounded-lg text-sm transition-colors disabled:opacity-50"
                >
                  {passwordLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
