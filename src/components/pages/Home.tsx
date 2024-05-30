import React, { useEffect } from 'react';
import {
  TypedUseSelectorHook,
  useDispatch as reduxUseDispatch,
  useSelector as reduxUseSelector,
} from 'react-redux';
import { Box, Container, Typography, AppBar, Toolbar } from '@mui/material';

import AppToolbar from '../menus/AppToolbar';
import Dashboard from '../dashboard/Dashboard';
import DashboardBox from '../dashboard/DashboardBox';
import SideMenu from '../menus/SideMenu';
import { authenticateUser, fetchSession } from '../../features/auth/authSlice';
import { RootState } from '../../app/store';
import FetchRepos from '../../features/utils/GitHub/fetchRepos';
import GitHubViewer from '../content/GitHubViewer';

const drawerWidth = 140;
const Home: React.FC = () => {
  const useDispatch = () => reduxUseDispatch<any>();
  const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector;
  const dispatch = useDispatch(); // Now correctly typed for your app
  const state = useSelector((state: RootState) => state.auth);
  const { isAuthenticated, error, status } = state;

  useEffect(() => {
    const initSession = async () => {
      if (status === 'idle' || !isAuthenticated) {
        try {
          const action = await dispatch(fetchSession());
          //Basically a workaround to relogin the user after authentication
          if (fetchSession.fulfilled.match(action) && action.payload.user) {
            dispatch(authenticateUser(action.payload));
          }
        } catch (error) {
          console.error('Error fetching session:', error);
        }
      }
    };

    initSession();
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <AppToolbar />
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
          {/* <SideMenu width={drawerWidth} /> */}
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
        {/* <DashboardBox> */}
        <DashboardBox className="leftSection">
          <GitHubViewer repoIdentifier="zachradf/testRepo" />
        </DashboardBox>
        {/* <FetchRepos /> */}
        {/* <DashboardBox className="rightSection" /> */}
      </Dashboard>
    </>
  );
};

export default Home;
