import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { RootState, AppDispatch } from '../../app/store';
import { authenticateUser } from '../../features/auth/authSlice';
import { registerUser } from '../../features/auth/authSlice';
// import { registerUser } from '../features/auth/authSlice';
import drawAvatar from '../../features/avatar';
// import { Buffer } from 'buffer';
// Define the types for the form data
interface FormData {
  name?: string;
  username: string;
  email?: string;
  password: string;
  nftProfilePicture: string;
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    email: '',
    password: '',
    nftProfilePicture: '',
    // confirmPassword: '',
  });
  const state = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  function canvasToDataURL(canvas: HTMLCanvasElement): string {
    return canvas.toDataURL('image/png');
  }
  console.log('status', status, state);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nftProfilePicture = await drawAvatar(formData.username);
    const dataUrlNftProfilePicture = canvasToDataURL(nftProfilePicture);
    // const bufferNftProfilePicture = dataURLToBuffer(dataUrlNftProfilePicture);
    // console.log(
    //   'nftProfilePicture',
    //   nftProfilePicture,
    //   dataUrlNftProfilePicture.toString(),
    //   typeof dataUrlNftProfilePicture.toString(),
    //   typeof dataUrlNftProfilePicture
    //   //   bufferNftProfilePicture
    // );
    // Update the form data directly
    const updatedFormData: FormData = {
      ...formData,
      nftProfilePicture: dataUrlNftProfilePicture,
    };
    console.log('formData', formData);
    const resultAction = await dispatch(registerUser(updatedFormData));
    if (registerUser.fulfilled.match(resultAction)) {
      //   console.log('success', resultAction.payload);
      //   navigate(`/profile/${resultAction.payload.username}`);
      const resultAction = await dispatch(
        authenticateUser({
          username: formData.username,
          password: formData.password,
        })
      );
      if (authenticateUser.fulfilled.match(resultAction)) {
        console.log('success', resultAction.payload);
        // navigate(`/profile/${resultAction.payload.username}`);

        navigate(`/profile/${resultAction.payload.username}`);
      }
    }
  };

  return (
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
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="name"
            label="Name (optional)"
            name="name"
            autoComplete="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address (optional)"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
          />
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
            value={formData.username}
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
            value={formData.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </Box>
        {status === 'loading' && <Typography>Loading...</Typography>}
        {status === 'succeeded' && (
          <Typography>Registration successful!</Typography>
        )}
        {status === 'failed' && (
          <Typography>Error during registration.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Registration;
