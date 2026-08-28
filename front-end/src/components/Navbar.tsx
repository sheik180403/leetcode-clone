import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, User, LogOut, ChevronDown, Trophy, Flame } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="bg-[#282828] border-b border-[#383838] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Main Nav */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 font-bold text-lg text-white hover:opacity-90">
              <div className="bg-[#ffa116] p-1.5 rounded text-black font-black">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="tracking-tight">
                Leet<span className="text-[#ffa116]">Code</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">
                Explore
              </Link>
              <Link to="/problems" className="hover:text-white transition-colors">
                Problems
              </Link>
              <Link to="/contest" className="hover:text-white transition-colors">
                Contest
              </Link>
              <a
                href="http://localhost:5000/api/docs"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#ffa116] transition-colors"
              >
                API Docs
              </a>
            </div>
          </div>

          {/* Right Nav / User Controls */}
          <div className="flex items-center gap-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                {/* Streak Badge */}
                <div className="hidden sm:flex items-center gap-1 bg-[#333333] px-2.5 py-1 rounded-full text-xs font-semibold text-[#ffa116]">
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{user.stats?.streak?.currentStreak || 0}</span>
                </div>

                {/* Contest Rating */}
                <div className="hidden sm:flex items-center gap-1 bg-[#333333] px-2.5 py-1 rounded-full text-xs font-semibold text-gray-300">
                  <Trophy className="w-3.5 h-3.5 text-yellow-400" />
                  <span>{user.stats?.contest?.rating || 1500}</span>
                </div>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-[#383838] transition-colors focus:outline-none"
                  >
                    <img
                      src={user.profile?.avatar || 'https://assets.leetcode.com/users/default_avatar.jpg'}
                      alt={user.username}
                      className="w-7 h-7 rounded-full object-cover border border-[#444444]"
                    />
                    <span className="text-sm font-medium text-gray-200 hidden md:block">
                      {user.username}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                  </button>

                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-48 bg-[#282828] border border-[#3e3e3e] rounded-lg shadow-xl py-1 z-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <div className="px-4 py-2 border-b border-[#383838]">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm font-semibold text-white truncate">{user.username}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-[#333333] hover:text-white"
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-[#333333] hover:text-red-300"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white px-3 py-1.5 rounded transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm font-semibold text-black bg-[#ffa116] hover:bg-[#e69010] px-3.5 py-1.5 rounded transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

