import React from 'react';
import { Paper, useTheme } from '@mui/material';

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={1}
      sx={{
        padding: { xs: 1, md: 3, lg: 9 },
        margin: { md: 9 },
        bgcolor: theme.palette.primary.light,
      }}
    >
      {children}
    </Paper>
  );
};

export default PageLayout;
