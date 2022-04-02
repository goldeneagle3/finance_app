import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { TJwt } from '../../types/jwt.type';
import { IDisplayUser, INewUser } from '../interfaces/user.interface';
import userService from '../services/user.service';

const storedUser: string | null = localStorage.getItem('user');
const user: IDisplayUser | null = !!storedUser ? JSON.parse(storedUser) : null;

const storedJwt: string | null = localStorage.getItem('jwt');
const jwt: TJwt = !!storedJwt ? JSON.parse(storedJwt) : null;

interface IAsyncState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

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

export const register = createAsyncThunk(
  'users/create',
  async (user: INewUser, thunkAPI) => {
    try {
      return await userService.createUser(user);
    } catch (error) {
      return thunkAPI.rejectWithValue('Unable to register!');
    }
  },
);

export const userSlice = createSlice({
  name: 'user',
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
      // Create
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
      });
  },
});

export const { reset } = userSlice.actions;

export const selectedUser = (state: RootState) => {
  return state.user;
};

export default userSlice.reducer;
