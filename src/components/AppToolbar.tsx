import React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';

const AppToolbar = ({
  onLoginClick,
  onRegisterClick,
}: {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}) => {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        My Futuristic App
      </Typography>
      <Button onClick={onLoginClick} color="inherit">
        Login
      </Button>
      <Button onClick={onRegisterClick} color="inherit">
        Register
      </Button>
    </Toolbar>
  );
};

export default AppToolbar;
