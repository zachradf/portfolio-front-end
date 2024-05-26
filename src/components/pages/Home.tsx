import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TypedUseSelectorHook,
  useDispatch as reduxUseDispatch,
  useSelector as reduxUseSelector,
} from 'react-redux';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';
import { AppDispatch } from '../../app/store'; // Import your store's types

import AppToolbar from '../menus/AppToolbar';
import Dashboard from '../dashboard/Dashboard';
import DashboardBox from '../dashboard/DashboardBox';
import SideMenu from '../menus/SideMenu';
import clearSession, {
  authenticateUser,
  fetchSession,
  logoutUser,
  // setSession,
} from '../../features/auth/authSlice';
import AuthState from '../../interfaces/authstate.interface';
// import { Dispatch } from 'redux';
import { RootState } from '../../app/store';
// import { setSession, fetchSession } from '../../features/session/sessionSlice';
const drawerWidth = 140;

const Home: React.FC = () => {
  // const useDispatch = () => useReduxDispatch<Dispatch<any>>();
  const useDispatch = () => reduxUseDispatch<any>();
  const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Now correctly typed for your app

  // const session = useSelector((state: RootState) => state.auth);
  const state = useSelector((state: RootState) => state.auth);
  // const [user, setUser] = React.useState<any>(state.user);
  const { isAuthenticated, error, status } = state;
  console.log('Home', state.user, isAuthenticated, error);
  // useEffect(() => {
  //   const initSession = async () => {
  //     try {
  //       // if (isAuthenticated) {
  //       console.log('initSession', isAuthenticated);
  //       const resultAction = await dispatch(fetchSession());
  //       console.log('resultAction', resultAction);
  //       if (fetchSession.fulfilled.match(resultAction)) {
  //         // Use the payload directly from the action result
  //         // dispatch(setSession(resultAction.payload));
  //       } else {
  //         throw new Error('Session fetch failed');
  //       }
  //       // }
  //     } catch (error) {
  //       console.error('Error fetching session:', error);
  //     }
  //   };

  //   // if (!isAuthenticated && !error) {
  //   initSession();
  //   // }
  // }, []);
  useEffect(() => {
    const initSession = async () => {
      if (status === 'idle' || !isAuthenticated) {
        try {
          const action = await dispatch(fetchSession());
          if (fetchSession.fulfilled.match(action)) {
            console.log('action', action);
            const authState: AuthState = {
              isAuthenticated: true,
              user: action.payload,
              error: null,
              status: 'idle',
            };
            dispatch(authenticateUser(action.payload));
          }
          console.log('action', action);
          // const resultAction = await dispatch(authenticateUser(action.payload));
          // console.log('resultAction', resultAction);
          // if (authenticateUser.fulfilled.match(resultAction)) {
          //   console.log('success', resultAction);
          // dispatch(setSession(resultAction.payload));
          // navigate(`/profile/${resultAction.payload.username}`);
          // }
        } catch (error) {
          console.error('Error fetching session:', error);
          // navigate('/login'); // Redirect to login if the session is not active
        }
      }
    };

    initSession();
  }, []);
  // dispatch, isAuthenticated, error
  // useEffect(() => {
  //   // if (!isAuthenticated && !error) {
  //   const state = dispatch(fetchSession());
  //   console.log('Home', state);
  //   dispatch(setSession(state));
  //   // }
  // }, [dispatch, isAuthenticated, error]);

  const onLoginClick = () => {
    navigate('/login');
    console.log('clicked');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
    // dispatch(clearSession());
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
          className="App App-glow"
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
          <Container>
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
