import React from 'react';
import { useLocation } from 'react-router-dom';
import { Typography, Box, Button, ThemeProvider } from '@mui/material';
import appTheme from '../../themes/app-theme'; // Make sure to import your custom theme

const ErrorPage = () => {
  const location = useLocation();
  const { errorMessage } = location.state || {
    errorMessage: 'An unknown error occurred.',
  }; // Default error message

  return (
    <ThemeProvider theme={appTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          bgcolor: 'background.default',
          color: 'text.primary',
          padding: appTheme.spacing(2),
        }}
      >
        <Typography variant="h4" gutterBottom fontFamily="Orbitron">
          Oops! Something went wrong.
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {errorMessage}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => (window.location.href = '/')}
        >
          Go Home
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default ErrorPage;
