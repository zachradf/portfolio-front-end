// src/app/store.ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/auth/userSlice';
import infoIconReducer from '../features/infoIcon/infoIconSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    infoIcon: infoIconReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
