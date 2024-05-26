import User from '../interfaces/user.interface';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | { msg: string };
}

export default AuthState;
