import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import AppToolbar from './AppToolbar';

const drawerWidth = 240;

const Home: React.FC = () => {
  const navigate = useNavigate();

  const onLoginClick = () => {
    // axios.get('/login').then((response) => {
    //   console.log(response);
    //   if (response.status === 200) {
    //     navigate('/login');
    //   }
    // });
    navigate('/login');
    console.log('clicked');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <AppToolbar
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          // sx={{ backgroundColor: 'primary.main' }}
        />
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Home', 'Profile', 'Settings', 'Logout'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.', p: 3 }}>
        <Toolbar />
        <Container>
          <Typography variant="h4" gutterBottom>
            Welcome to My Futuristic App
          </Typography>
          <Typography variant="body1">
            This is a sleek and welcoming interface designed with Material-UI.
            Enjoy exploring the features of this futuristic application.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
