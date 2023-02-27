import axios from 'axios';
import queryString from 'query-string';
import {
  IExpenseByUserInput,
  IExpenseMonthly,
  IExpenseYearly,
  IInputData,
  IToken,
} from '../interfaces/expense.interface';

const API_URL = 'http://localhost:8000/api/expenses';

const createExpense = async (expense: IInputData, token: IToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, expense, config);
  return response.data;
};

const listExpenses = async (
  inputs: IExpenseByUserInput,
  token: string | undefined,
) => {
  const query = queryString.stringify({
    firstDay: inputs.firstDay,
    lastDay: inputs.lastDay,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}?${query}`, config);
  return response.data;
};

const updateExpense = async (
  expense: IInputData,
  expenseId: string | undefined,
  token: IToken,
) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${API_URL}/${expenseId}`,
    expense,
    config,
  );
  return response.data;
};

const removeExpense = async (expenseId: string | undefined, token: IToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${expenseId}`, config);
  return response.data;
};

const currentMonthPreview = async (token: IToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/current/preview`, config);
  return response.data;
};

const expenseByCategory = async (token: IToken) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/by/category`, config);
  return response.data;
};

const plotExpenses = async (month: IExpenseMonthly, token: IToken) => {
  const query = queryString.stringify({
    month,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/plot?${query}`, config);
  return response.data;
};

const averageCategories = async (
  inputs: IExpenseByUserInput,
  token: IToken,
) => {
  const query = queryString.stringify({
    firstDay: inputs.firstDay,
    lastDay: inputs.lastDay,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    `${API_URL}/category/averages?${query}`,
    config,
  );
  return response.data;
};

const yearlyExpenses = async (inputs: IExpenseYearly, token: IToken) => {
  const query = queryString.stringify({
    year: inputs.year,
  });
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/yearly?${query}`, config);
  return response.data;
};

const expenseService = {
  createExpense,
  listExpenses,
  updateExpense,
  removeExpense,
  currentMonthPreview,
  expenseByCategory,
  plotExpenses,
  averageCategories,
  yearlyExpenses,
};

export default expenseService;
