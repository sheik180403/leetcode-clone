import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal, Trophy, Users, ArrowRight, CheckCircle2, Flame, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const HomePage: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#1a1a1a] text-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#282828]">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffa116]/10 border border-[#ffa116]/30 text-[#ffa116] text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Next-Generation Coding Platform
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
            A New Way to <span className="text-[#ffa116]">Learn & Level Up</span> Your Coding Skills
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
            Practice algorithmic challenges, compete in weekly developer contests, and prepare for top-tier technical interviews with our full-featured platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ffa116] hover:bg-[#e69010] text-black font-bold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Go to Profile ({user?.username})
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <>
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#ffa116] hover:bg-[#e69010] text-black font-bold px-6 py-3 rounded-lg shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  Create Free Account
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#282828] hover:bg-[#333333] border border-[#3e3e3e] text-white font-semibold px-6 py-3 rounded-lg transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#282828] border border-[#383838] p-6 rounded-xl hover:border-[#ffa116]/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#ffa116]/10 flex items-center justify-center text-[#ffa116] mb-4">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Hundreds of Problems</h3>
            <p className="text-sm text-gray-400">
              Curated coding problems spanning dynamic programming, data structures, graph theory, and algorithmic design.
            </p>
          </div>

          <div className="bg-[#282828] border border-[#383838] p-6 rounded-xl hover:border-[#ffa116]/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400 mb-4">
              <Terminal className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Fast Online Judge</h3>
            <p className="text-sm text-gray-400">
              Run and test multi-language code snippets against comprehensive hidden and public test cases in real-time.
            </p>
          </div>

          <div className="bg-[#282828] border border-[#383838] p-6 rounded-xl hover:border-[#ffa116]/50 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400 mb-4">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Contests & Rating</h3>
            <p className="text-sm text-gray-400">
              Compete in weekly coding contests, climb the global leaderboard, and maintain your problem-solving streak.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#282828] py-8 text-center text-xs text-gray-500">
        <p>© 2026 LeetCode Clone Platform. Designed with TypeScript, React, and Express.</p>
      </footer>
    </div>
  );
};

