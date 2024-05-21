// src/features/auth/userSlice.ts
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import AuthState from '../../interfaces/authstate.interface';
import User from '../../interfaces/user.interface';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

interface RegisterData {
  username: string;
  name?: string;
  email?: string;
  password: string;
  // confirmPassword: string;
}

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (formData: RegisterData) => {
    const response = await axios.post('/api/users', formData);
    return response.data as User;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export default userSlice.reducer;
