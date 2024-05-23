// import axios from 'axios';
// import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
// import User from '../../interfaces/user.interface';
// import AuthState from '../../interfaces/authstate.interface';

// const initialState: AuthState = {
//   user: null,
//   isAuthenticated: false,
//   status: 'idle',
//   error: null,
// };

// // Define async thunk for login
// export const loginUser = createAsyncThunk(
//   'auth/login',
//   async (
//     credentials: {
//       username: string;
//       password: string;
//       confirmPassword?: string;
//       email?: string;
//       name?: string;
//       walletAddress?: string;
//       nftProfilePicture?: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post('/api/login', credentials);
//       const { token, user } = response.data;
//       // Store the token in local storage
//       localStorage.setItem('jwt', token);
//       return user;
//     } catch (error: any) {
//       if (!error.response) {
//         throw error;
//       }
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// // Create the auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logoutUser: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//       state.status = 'idle';
//       state.error = null;
//       // Remove the token from local storage
//       localStorage.removeItem('jwt');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         console.log('Pending');
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
//         console.log('Fulfilled');
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action: any) => {
//         console.log('Rejected');
//         state.status = 'failed';
//         state.error = action.payload
//           ? action.payload.message
//           : action.error.message;
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;
// export default authSlice.reducer;
import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
      const response = await axios.post('/api/users', formData);
      return response.data as User;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', credentials);
      const { token, user } = response.data;
      localStorage.setItem('jwt', token); // Store the token in local storage
      return user;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('jwt'); // Remove the token from local storage
    },
  },
  extraReducers: (builder) => {
    builder
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
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.status = 'failed';
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
