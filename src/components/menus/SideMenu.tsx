import React from 'react';
import { Box, List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface SideMenuProps {
  width: number;
  children?: React.ReactNode;
}

const SideMenu: React.FC<SideMenuProps> = ({ width, children }) => {
  const username = useSelector(
    (state: RootState) => state.auth.user?.username || null
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: width,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          marginTop: '55px',
          width: width,
          boxSizing: 'border-box',
          backgroundColor: '#000000',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {[
            { text: 'Home', path: '/' },
            { text: 'Profile', path: `/profile/${username}` },
            { text: 'Settings', path: '/settings' },
            // { text: 'Logout', path: '/logout' },
          ].map((item) => (
            <ListItem button component={Link} to={item.path} key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
