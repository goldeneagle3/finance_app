import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import NewUser from './user/NewUser';
import Home from './core/Home';
import Signin from './auth/Signin';
import PrivateRoute from './auth/PrivateRoute';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<Home />} />} />
          <Route path="/register" element={<NewUser />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
