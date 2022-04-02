import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import NewUser from './user/NewUser';
import Home from './core/Home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<NewUser />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
