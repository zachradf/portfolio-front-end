// src/features/session/sessionThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import User from '../../interfaces/user.interface';

export const fetchSession = createAsyncThunk(
  'session/fetchSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/auth/check-session');
      return response.data.user as User;
    } catch (error) {
      return rejectWithValue('Failed to fetch session');
    }
  }
);
