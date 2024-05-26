import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authenticateUser, logoutUser } from '../../features/auth/authSlice';
import setSession from '../../features/auth/authSlice';
import { RootState, AppDispatch } from '../../app/store';
import { Box, Container, TextField, Button, Typography } from '@mui/material';

const LoginComponent: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  // Use this status variable to get the updated status
  const status = useSelector((state: RootState) => state.auth.isAuthenticated);
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
    console.log('resultAction', resultAction);
    if (authenticateUser.fulfilled.match(resultAction)) {
      console.log('success', resultAction);
      // dispatch(setSession(resultAction.payload));
      navigate(`/profile/${resultAction.payload.username}`);
    } else {
      console.log(
        'Failed to login, check credentials',
        resultAction.error.message
      );
    }
  };

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  // };

  useEffect(() => {
    if (status === true) {
      navigate(`/profile/${auth.user?.username}`);
    }
  }, [status, navigate, auth.user]);

  return (
    <div>
      {/* {auth.isAuthenticated ? (
        <div>
          <h1>Welcome, {auth.user?.name}</h1>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : ( */}
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
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
          {status === true && <Typography>Loading...</Typography>}
          {status === false && <Typography>Error during login</Typography>}
        </Box>
      </Container>
      {/* )} */}
    </div>
  );
};

export default LoginComponent;
