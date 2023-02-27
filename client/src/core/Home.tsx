import { Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import auth from '../auth/auth-helper';
import ExpenseOverview from '../expense/ExpenseOverview';

const Home = () => {
  const navigate = useNavigate();

  const user = auth.isAuthenticated();

  return (
    <div>
      <button onClick={() => navigate('/register')}>Register</button>
      <button onClick={() => navigate('/signin')}>Login</button>
      <button onClick={() => navigate('/expense/new')}>Add</button>
      <button onClick={() => navigate('/expense')}>Expenses</button>
      <button onClick={() => navigate('/overview')}>
        Expenses by Overview
      </button>
      <p>{user?.username} </p>
      <Box>
        <ExpenseOverview />
      </Box>
    </div>
  );
};

export default Home;
