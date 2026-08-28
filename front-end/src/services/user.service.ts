import api from './api';
import { IUser } from '../types/user.types';

export interface UpdateProfilePayload {
  realName?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  school?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  websiteUrl?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface LeaderboardUser {
  rank: number;
  _id: string;
  username: string;
  avatar?: string;
  realName?: string;
  solvedCount: number;
  contestRating: number;
  badgesCount: number;
}

export interface LeaderboardResponse {
  success: boolean;
  status: number;
  data: {
    leaderboard: LeaderboardUser[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalUsers: number;
      limit: number;
    };
  };
}

export const userService = {
  async getProfileByUsername(username: string): Promise<{ success: boolean; data: { user: IUser } }> {
    const res = await api.get(`/users/${username}`);
    return res.data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<{ success: boolean; message: string; data: { user: IUser } }> {
    const res = await api.put('/users/profile', payload);
    return res.data;
  },

  async changePassword(payload: ChangePasswordPayload): Promise<{ success: boolean; message: string }> {
    const res = await api.put('/users/change-password', payload);
    return res.data;
  },

  async getLeaderboard(page = 1, limit = 20, sortBy: 'solved' | 'rating' = 'solved'): Promise<LeaderboardResponse> {
    const res = await api.get(`/users/leaderboard?page=${page}&limit=${limit}&sortBy=${sortBy}`);
    return res.data;
  },

  async checkUsername(username: string): Promise<{ success: boolean; data: { username: string; available: boolean } }> {
    const res = await api.get(`/users/check-username/${username}`);
    return res.data;
  },
};

