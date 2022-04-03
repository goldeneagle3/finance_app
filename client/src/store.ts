import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/slices/auth.slice';
import userSlice from './features/slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
