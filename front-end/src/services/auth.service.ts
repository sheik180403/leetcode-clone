import api from './api';
import { AuthResponse, UserResponse } from '../types/auth.types';

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  realName?: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register', payload);
    return response.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', payload);
    return response.data;
  },

  async getMe(): Promise<UserResponse> {
    const response = await api.get<UserResponse>('/auth/me');
    return response.data;
  },
};

