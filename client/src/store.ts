import { configureStore } from '@reduxjs/toolkit';
import authSlice from './features/slices/auth.slice';
import expenseSlice from './features/slices/expense.slice';
import userSlice from './features/slices/user.slice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    auth: authSlice,
    expense: expenseSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
