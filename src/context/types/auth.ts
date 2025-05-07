
import { User, LoginRequest, RegisterRequest, ProfileUpdateRequest } from '@/types';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateProfile: (userData: Partial<User> | ProfileUpdateRequest) => Promise<void>;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}
