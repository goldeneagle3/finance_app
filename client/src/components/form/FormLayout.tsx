import { Box, Typography } from '@mui/material';
import React from 'react';

const FormLayout = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  return (
    <Box
      sx={{
        border: 1,
        margin: 'auto',
        padding: { xs: 1, md: 3 },
        borderColor: '#cccccc',
        borderRadius: '5px',
        maxWidth: 500,
        marginTop: { xs: 2, md: 10 },
      }}
    >
      <Typography variant="h5" align="center" component="h1">
        {text}
      </Typography>
      {children}
    </Box>
  );
};

export default FormLayout;
