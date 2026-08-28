import { IUser } from './user.types';

export interface AuthResponse {
  success: boolean;
  status: number;
  message: string;
  data: {
    token: string;
    user: IUser;
  };
}

export interface UserResponse {
  success: boolean;
  status: number;
  data: {
    user: IUser;
  };
}

export interface ApiErrorResponse {
  success: boolean;
  status: number;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}

