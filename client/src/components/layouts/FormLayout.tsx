import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';

const FormLayout = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: 1,
        margin: 'auto',
        padding: { xs: 1, md: 3 },
        bgcolor: theme.palette.primary.light,
        borderColor: '#cccccc',
        borderRadius: '5px',
        maxWidth: 500,
        marginTop: { xs: 2, md: 2 },
      }}
    >
      <Typography variant="h5" align="center" component="h1" sx={{ mb: 3 }}>
        {text}
      </Typography>
      {children}
    </Box>
  );
};

export default FormLayout;
