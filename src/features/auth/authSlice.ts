// src/features/auth/authSlice.ts
import axios from 'axios';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import User from '../../interfaces/user.interface';
import AuthState from '../../interfaces/authstate.interface';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// const credValues = {
//   username: 'john_doe',
//   password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36/.IFJtW2r5OCD8N7TmYJO', // Hashed password
//   email: 'john_doe@example.com',
//   name: 'John Doe',
//   walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
//   nftProfilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
// };

// Define async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: {
    username: string;
    password: string;
    confirmPassword?: string;
    email?: string;
    name?: string;
    walletAddress?: string;
    nftProfilePicture?: string;
  }) => {
    const response = await axios.post('/api/users', credentials);
    return response.data as User;
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
