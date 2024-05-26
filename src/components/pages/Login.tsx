import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';

import { authenticateUser } from '../../features/auth/authSlice';
import { RootState, AppDispatch } from '../../app/store';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import appTheme from '../../themes/app-theme';

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // Use this status variable to get the updated status
  const status = useSelector((state: RootState) => state.auth.status);
  const error = useSelector((state: RootState) => state.auth.error);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = await dispatch(authenticateUser(credentials));
    if (authenticateUser.fulfilled.match(resultAction)) {
      navigate(`/profile/${resultAction.payload.username}`);
    } else {
      console.error(
        'Failed to login, check credentials',
        resultAction.error.message
      );
    }
  };

  useEffect(() => {
    if (status === 'succeeded') {
      navigate(`/profile/${auth.user?.username}`);
    }
  }, [status, navigate, auth.user]);

  return (
    <div>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '85%',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ marginLeft: 'auto' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={credentials.username}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={credentials.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
          </Box>
          {status === 'loading' && (
            <ThemeProvider theme={appTheme}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // height: '100vh',
                }}
              >
                <CircularProgress color="primary" />
              </div>
            </ThemeProvider>
          )}
          {status === 'failed' && (
            <Typography>Error during login: {error?.msg}</Typography>
          )}{' '}
        </Box>
      </Container>
    </div>
  );
};

export default LoginComponent;
