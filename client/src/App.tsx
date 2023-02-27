import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import NewUser from './user/NewUser';
import Home from './core/Home';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';
import NewExpense from './expense/NewExpense';
import { CheckoutProvider } from './context/CheckoutContext';
import ExpenseByUser from './expense/ExpenseByUser';
import Reports from './report/Reports';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CheckoutProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute page={<Home />} />} />
            <Route path="/register" element={<NewUser />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/expense"
              element={<PrivateRoute page={<ExpenseByUser />} />}
            />
            <Route
              path="/expense/new"
              element={<PrivateRoute page={<NewExpense />} />}
            />
            <Route
              path="/overview"
              element={<PrivateRoute page={<Reports />} />}
            />
          </Routes>
        </BrowserRouter>
      </CheckoutProvider>
    </ThemeProvider>
  );
};

export default App;
