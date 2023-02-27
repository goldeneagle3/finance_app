import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {
  IExpenseByUserInput,
  IExpenseMonthly,
  IExpenseYearly,
  IInputData,
} from '../interfaces/expense.interface';
import { IAsyncState } from '../interfaces/state.interface';
import expenseService from '../services/expense.service';

interface IExpenseState extends IAsyncState {
  currentMonthPreview: any;
  expenseByCategory: any;
  plotExpenses: any;
  averageCategories: any;
  yearlyExpenses: any;
  expenses: IInputData[];
  message: any;
}

const initialState: IExpenseState = {
  currentMonthPreview: [],
  expenseByCategory: [],
  plotExpenses: [],
  averageCategories: [],
  yearlyExpenses: [],
  expenses: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
};

// Add this to Error Handling
const errorHandling = (error: any) => {
  return (
    (error.response && error.response.data && error.response.data.message) ||
    error.message ||
    error.toString()
  );
};

export const createExpense = createAsyncThunk<any, any, { state: RootState }>(
  'expense/create',
  async (expense: IInputData, thunkAPI) => {
    try {
      const {
        auth: { jwt },
      } = thunkAPI.getState();
      if (!jwt) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      const token = jwt.auth_token;
      if (!token) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      return await expenseService.createExpense(expense, token);
    } catch (error) {
      const message = errorHandling(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const listExpenses = createAsyncThunk<any, any, { state: RootState }>(
  'expense/listByUser',
  async (data: IExpenseByUserInput, thunkAPI) => {
    try {
      const {
        auth: { jwt },
      } = thunkAPI.getState();
      if (!jwt) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      const token = jwt.auth_token;
      if (!token) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      return await expenseService.listExpenses(data, token);
    } catch (error: any) {
      const message = errorHandling(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const updateExpense = createAsyncThunk<any, any, { state: RootState }>(
  'expense/update',
  async (data: IInputData, thunkAPI) => {
    try {
      const {
        auth: { jwt },
      } = thunkAPI.getState();
      if (!jwt) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      const token = jwt.auth_token;
      if (!token) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      return await expenseService.updateExpense(data, data.id, token);
    } catch (error: any) {
      const message = errorHandling(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const removeExpense = createAsyncThunk<any, any, { state: RootState }>(
  'expense/remove',
  async (expenseId: string | undefined, thunkAPI) => {
    try {
      const {
        auth: { jwt },
      } = thunkAPI.getState();
      if (!jwt) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      const token = jwt.auth_token;
      if (!token) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      return await expenseService.removeExpense(expenseId, token);
    } catch (error: any) {
      const message = errorHandling(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const currentMonthPreview = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('expense/currentMonthPreview', async (_, thunkAPI) => {
  try {
    const {
      auth: { jwt },
    } = thunkAPI.getState();
    if (!jwt) {
      return thunkAPI.rejectWithValue('Error with JWT');
    }
    const token = jwt.auth_token;
    if (!token) {
      return thunkAPI.rejectWithValue('Error with JWT');
    }
    return await expenseService.currentMonthPreview(token);
  } catch (error: any) {
    const message = errorHandling(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const expenseByCategory = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('expense/expenseByCategory', async (_, thunkAPI) => {
  try {
    const {
      auth: { jwt },
    } = thunkAPI.getState();
    if (!jwt) {
      return thunkAPI.rejectWithValue('Error with JWT');
    }
    const token = jwt.auth_token;
    if (!token) {
      return thunkAPI.rejectWithValue('Error with JWT');
    }
    return await expenseService.expenseByCategory(token);
  } catch (error: any) {
    const message = errorHandling(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const plotExpenses = createAsyncThunk<any, any, { state: RootState }>(
  'expense/plotExpenses',
  async (data: IExpenseMonthly, thunkAPI) => {
    try {
      const {
        auth: { jwt },
      } = thunkAPI.getState();
      if (!jwt) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      const token = jwt.auth_token;
      if (!token) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      return await expenseService.plotExpenses(data, token);
    } catch (error: any) {
      const message = errorHandling(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const averageCategories = createAsyncThunk<
  any,
  any,
  { state: RootState }
>('expense/averageCategories', async (data: IExpenseByUserInput, thunkAPI) => {
  try {
    const {
      auth: { jwt },
    } = thunkAPI.getState();
    if (!jwt) {
      return thunkAPI.rejectWithValue('Error with JWT');
    }
    const token = jwt.auth_token;
    if (!token) {
      return thunkAPI.rejectWithValue('Error with JWT');
    }
    return await expenseService.averageCategories(data, token);
  } catch (error: any) {
    const message = errorHandling(error);
    return thunkAPI.rejectWithValue(message);
  }
});

export const yearlyExpenses = createAsyncThunk<any, any, { state: RootState }>(
  'expense/yearlyExpenses',
  async (data: IExpenseYearly, thunkAPI) => {
    try {
      const {
        auth: { jwt },
      } = thunkAPI.getState();
      if (!jwt) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      const token = jwt.auth_token;
      if (!token) {
        return thunkAPI.rejectWithValue('Error with JWT');
      }
      return await expenseService.yearlyExpenses(data, token);
    } catch (error: any) {
      const message = errorHandling(error);
      return thunkAPI.rejectWithValue(message);
    }
  },
);

export const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses.push(action.payload);
      })
      .addCase(createExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.expenses = [];
        state.message = action.payload;
      })

      // List By Users
      .addCase(listExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = action.payload;
      })
      .addCase(listExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Update Expense
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = state.expenses.map((expense) =>
          expense._id === action.payload._id ? action.payload : expense,
        );
      })
      .addCase(updateExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Delete Expense
      .addCase(removeExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenses = state.expenses.filter(
          (expense) => expense._id !== action.payload._id,
        );
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Current Month Preview
      .addCase(currentMonthPreview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentMonthPreview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currentMonthPreview = action.payload;
      })
      .addCase(currentMonthPreview.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Expense By Category
      .addCase(expenseByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(expenseByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.expenseByCategory = action.payload;
      })
      .addCase(expenseByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Plot Expenses
      .addCase(plotExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(plotExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.plotExpenses = action.payload;
      })
      .addCase(plotExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Average Categories
      .addCase(averageCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(averageCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.averageCategories = action.payload;
      })
      .addCase(averageCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Yearly Expenses
      .addCase(yearlyExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(yearlyExpenses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.yearlyExpenses = action.payload;
      })
      .addCase(yearlyExpenses.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = expenseSlice.actions;

export const selectedExpense = (state: RootState) => {
  return state.expense;
};

export default expenseSlice.reducer;
