// // const credValues = {
// //   username: 'john_doe',
// //   password: '$2a$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36/.IFJtW2r5OCD8N7TmYJO', // Hashed password
// //   email: 'john_doe@example.com',
// //   name: 'John Doe',
// //   walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
// //   nftProfilePicture: 'https://randomuser.me/api/portraits/men/1.jpg',
// // };
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
//   async (credentials: {
//     username: string;
//     password: string;
//     confirmPassword?: string;
//     email?: string;
//     name?: string;
//     walletAddress?: string;
//     nftProfilePicture?: string;
//   }) => {
//     const response = await axios.post('/api/login', credentials);
//     const { token, user } = response.data;
//     console.log('received user and token');
//     // Store the token in local storage
//     localStorage.setItem('jwt', token);

//     return user;
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

//       // Remove the token from local storage
//       localStorage.removeItem('jwt');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message || null;
//       });
//   },
// });

// export const { logoutUser } = authSlice.actions;

// export default authSlice.reducer;
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
//       console.log('loginuser', loginUser);
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
//       // Remove the token from local storage
//       localStorage.removeItem('jwt');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.pending, (state) => {
//         state.status = 'loading';
//       })
//       .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
//         state.status = 'succeeded';
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(loginUser.rejected, (state, action: any) => {
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
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import User from '../../interfaces/user.interface';
import AuthState from '../../interfaces/authstate.interface';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

// Define async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: {
      username: string;
      password: string;
      confirmPassword?: string;
      email?: string;
      name?: string;
      walletAddress?: string;
      nftProfilePicture?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post('/api/login', credentials);
      const { token, user } = response.data;
      // Store the token in local storage
      localStorage.setItem('jwt', token);
      return user;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
      // Remove the token from local storage
      localStorage.removeItem('jwt');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        console.log('Pending');
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        console.log('Fulfilled');
        state.status = 'succeeded';
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        console.log('Rejected');
        state.status = 'failed';
        state.error = action.payload
          ? action.payload.message
          : action.error.message;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
