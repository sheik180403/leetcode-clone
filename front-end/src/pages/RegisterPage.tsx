import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Code2, Lock, User, Mail, AlertCircle, Loader2, UserCheck, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/user.service';

export const RegisterPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [realName, setRealName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Username live availability states
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  // Debounced username availability check
  useEffect(() => {
    if (!username || username.trim().length < 3) {
      setUsernameAvailable(null);
      setIsCheckingUsername(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingUsername(true);
      try {
        const res = await userService.checkUsername(username.trim());
        setUsernameAvailable(res.data.available);
      } catch {
        setUsernameAvailable(null);
      } finally {
        setIsCheckingUsername(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [username]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameAvailable === false) {
      setError('Please choose a different username. This one is already taken.');
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await register({ username, email, password, realName });
      navigate('/profile');
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.message ||
        'Failed to register. Please check your details.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-[#1a1a1a] px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-[#282828] border border-[#383838] p-8 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-[#ffa116] p-2.5 rounded-xl text-black font-black mb-3">
            <Code2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Create an Account</h2>
          <p className="text-sm text-gray-400 mt-1">Start practicing coding problems today</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-lg text-sm flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Username *
              </label>
              {isCheckingUsername && (
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" /> Checking...
                </span>
              )}
              {!isCheckingUsername && usernameAvailable === true && (
                <span className="text-xs text-green-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Available
                </span>
              )}
              {!isCheckingUsername && usernameAvailable === false && (
                <span className="text-xs text-red-400 flex items-center gap-1 font-medium">
                  <XCircle className="w-3.5 h-3.5" /> Taken
                </span>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="coder_pro"
                className={`w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-1 transition-all ${
                  usernameAvailable === true
                    ? 'border-green-500/50 focus:border-green-500 focus:ring-green-500'
                    : usernameAvailable === false
                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500'
                    : 'border-[#383838] focus:border-[#ffa116] focus:ring-[#ffa116]'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Email Address *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ffa116] focus:ring-1 focus:ring-[#ffa116] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Display Name (Optional)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <UserCheck className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ffa116] focus:ring-1 focus:ring-[#ffa116] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-2 bg-[#1a1a1a] border border-[#383838] rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#ffa116] focus:ring-1 focus:ring-[#ffa116] transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || usernameAvailable === false}
            className="w-full flex items-center justify-center gap-2 bg-[#ffa116] hover:bg-[#e69010] text-black font-bold py-2.5 rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-[#ffa116] font-semibold hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};
