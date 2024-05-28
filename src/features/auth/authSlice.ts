import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import User from '../../interfaces/user.interface';
import AuthState from '../../interfaces/authstate.interface';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

interface Credentials {
  username: string;
  password: string;
  confirmPassword?: string;
  email?: string;
  name?: string;
  walletAddress?: string;
  nftProfilePicture?: string;
}
// Async thunk for registering a user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (formData: Credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users/create', formData);
      return response.data as User;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchSession = createAsyncThunk(
  'session/fetchSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/check-session');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch session');
    }
  }
);

export const authenticateUser = createAsyncThunk(
  'auth/authenticate',
  async (
    credentials: {
      username: string;
      password: string;
      isAuthenticated?: boolean;
      user?: User;
    },
    { rejectWithValue }
  ) => {
    try {
      //Part of the relogin workaround after authentication
      if (
        credentials.isAuthenticated &&
        credentials.user !== null &&
        credentials.user !== undefined &&
        credentials.user._id !== null &&
        credentials.user._id !== undefined
      ) {
        const response = await axios.get('/api/check-session');
        localStorage.setItem('jwt', response.data.token);
        return response.data.user;
      }
      const response = await axios.post('/api/users/login', credentials);
      // localStorage.setItem('jwt', response.data.token);
      return response.data.user;
    } catch (error: any) {
      localStorage.removeItem('jwt');
      return rejectWithValue(error.response.data);
    }
  }
);

// export const checkSession = createAsyncThunk(
//   'auth/checkSession',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get('/api/auth/check-session');
//       return response.data.user;
//     } catch (error) {
//       return rejectWithValue('Failed to fetch session');
//     }
//   }
// );
export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      // Calling the backend endpoint to clear the session
      const response = await axios.post('/api/users/logout');
      if (response.status === 200) {
        localStorage.removeItem('jwt');
        return; // Return nothing, just signal success
      } else {
        return rejectWithValue('Failed to logout');
      }
    } catch (error: any) {
      return rejectWithValue(
        error.response ? error.response.data : 'Unknown error'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload; // Automatically set isAuthenticated based on if user is null or not
      state.error = null; // Clear any previous error when setting a user
    },
    clearSession: (state: any) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        console.log('logoutUser.fulfilled');
        state.user = null;
        state.isAuthenticated = false;
        state.status = 'idle';
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state: any, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true; // Assume registration auto logs in the user
      })
      .addCase(registerUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      })
      .addCase(authenticateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(
        authenticateUser.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.status = 'succeeded';
        }
      )
      .addCase(authenticateUser.rejected, (state: any, action) => {
        state.error = action.payload;
        state.status = 'failed';
        state.isAuthenticated = false;
      });
    // .addCase(checkSession.fulfilled, (state, action: PayloadAction<User>) => {
    //   state.user = action.payload;
    //   // state.isAuthenticated = true;
    //   state.status = 'succeeded';
    // })
    // .addCase(checkSession.rejected, (state: any, action) => {
    //   state.error = action.error.message;
    //   state.isAuthenticated = false;
    //   state.status = 'failed';
    // });
  },
});
export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
