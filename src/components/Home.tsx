import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';

import AppToolbar from './AppToolbar';
import Dashboard from './Dashboard';
import DashboardBox from './DashboardBox';
import SideMenu from './SideMenu';
import { logoutUser } from '../features/auth/authSlice';

const drawerWidth = 140;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginClick = () => {
    navigate('/login');
    console.log('clicked');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <AppToolbar
            onLoginClick={onLoginClick}
            onRegisterClick={onRegisterClick}
            onLogoutClick={onLogoutClick}
          />
        </AppBar>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}></Box>
        <Box
          component="main"
          marginLeft={{
            xs: 10,
            sm: 10,
            md: 10,
            lg: 9,
            xl: 0,
            xxl: 0,
          }}
          sx={{
            flexGrow: 1,
            bgcolor: 'background',
            height: '100%',
            width: '100%',
          }}
        >
          <Toolbar />
          <SideMenu width={drawerWidth} />
          <Container className="App App-glow">
            <Typography variant="h4" gutterBottom>
              Welcome to My Futuristic App
            </Typography>
            <Typography variant="body1" bgcolor="background">
              This is a sleek and welcoming interface designed with Material-UI.
              Enjoy exploring the features of this futuristic application. This
              is a sleek and welcoming interface designed with Material-UI.
              Enjoy exploring the features of this futuristic application. This
              is a sleek and welcoming interface designed with Material-UI.
              Enjoy exploring the features of this futuristic application. This
              is a sleek and welcoming interface designed with Material-UI.
              Enjoy exploring the features of this futuristic application. This
              is a sleek and welcoming interface designed with Material-UI.
              Enjoy exploring the features of this futuristic application.
            </Typography>
          </Container>
          <Container>
            <Typography variant="body1">
              This is a sleek and welcoming interface designed with Material-UI.
              Enjoy exploring the features of this futuristic application.
            </Typography>
          </Container>
        </Box>
      </Box>
      <Dashboard>
        <DashboardBox className="leftSection" />
        <DashboardBox className="rightSection" />
      </Dashboard>
    </>
  );
};

export default Home;
