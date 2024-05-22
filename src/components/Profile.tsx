import React from 'react';
import {
  AppBar,
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';

// import AppBar from '@mui/material';
import AppToolbar from './AppToolbar';
import profileStyles from '../themes/profile-styles';

const Profile: React.FC = () => {
  const classes = profileStyles();

  return (
    <>
      <AppBar position="static">
        <AppToolbar />
      </AppBar>
      <Box className={classes.root}>
        <Avatar
          alt="NFT Profile"
          src="https://via.placeholder.com/150" // Replace with actual NFT image URL
          className={classes.avatar}
        />
        <Typography variant="h4" gutterBottom>
          Username
        </Typography>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className={`${classes.section} ${classes.leftSection}`}>
                {/* Left section content goes here */}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box className={`${classes.section} ${classes.rightSection}`}>
                {/* Right section content goes here */}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
