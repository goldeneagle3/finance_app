import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TJwt } from '../../types/jwt.type';
import { ILoginUser } from '../interfaces/auth.interface';
import { IAsyncState } from '../interfaces/state.interface';
import { IDisplayUser } from '../interfaces/user.interface';
import authService from '../services/auth.service';

const storedUser: string | null = localStorage.getItem('user');
const user: IDisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('jwt');
const jwt: TJwt = !!storedJwt ? JSON.parse(storedJwt) : null;

interface IAuthState extends IAsyncState {
  user?: IDisplayUser | null;
  jwt?: TJwt;
  isAuthenticated?: boolean;
}

const initialState: IAuthState = {
  user: user,
  jwt: jwt,
  isAuthenticated: false,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (user: ILoginUser, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to login');
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.jwt = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { reset } = authSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.auth;
};

export default authSlice.reducer;
