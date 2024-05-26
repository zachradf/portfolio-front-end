import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSession } from './sessionThunk';
import User from '../../interfaces/user.interface';
import AuthState from '../../interfaces/authstate.interface';
// interface SessionState {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearSession: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSession.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
      })
      .addCase(fetchSession.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch session';
        state.status = 'failed';
        state.isAuthenticated = false;
      });
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { fetchSession } from './sessionThunks';
// import User from '../../interfaces/user.interface';

// interface SessionState {
//   user: User | null;
//   isAuthenticated: boolean;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SessionState = {
//   user: null,
//   isAuthenticated: false,
//   loading: false,
//   error: null,
// };

// const sessionSlice = createSlice({
//   name: 'session',
//   initialState,
//   reducers: {
//     clearSession: (state) => {
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSession.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSession.fulfilled, (state, action) => {
//         state.user = action.payload;
//         state.isAuthenticated = true;
//         state.loading = false;
//       })
//       .addCase(fetchSession.rejected, (state: any, action) => {
//         state.error = action.payload;
//         state.loading = false;
//         state.isAuthenticated = false;
//       });
//   },
// });

// export const { clearSession } = sessionSlice.actions;
// export default sessionSlice.reducer;
