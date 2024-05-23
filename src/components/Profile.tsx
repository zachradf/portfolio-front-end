import React from 'react';
import {
  AppBar,
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
// import AppBar from '@mui/material';
import AppToolbar from './AppToolbar';
import profileStyles from '../themes/profile-styles';
import { logoutUser } from '../features/auth/authSlice';

const Profile: React.FC = () => {
  const classes = profileStyles();
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  //   const NFTProfile = useSelector(
  //     (state: RootState) => state.auth.user?.nftProfilePicture
  //   );
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  console.log('dfgdfgdfg', user, user?.nftProfilePicture);
  //   console.log('NFTProfi le', NFTProfile);
  return (
    <>
      <AppBar position="static">
        <AppToolbar onLogoutClick={handleLogout} />
      </AppBar>
      <Box className={classes.root}>
        <Avatar
          alt="NFT Profile"
          src={user?.nftProfilePicture} // Replace with actual NFT image URL
          className={classes.avatar}
        />
        {/* <Avatar
          //   alt="NFT Profile"
          src={user?.nftProfilePicture}
          alt={`${user?.username}'s avatar`}
        /> */}
        {/* {user?.nftProfilePicture} */}
        <Typography variant="h4" gutterBottom>
          {user?.username}
        </Typography>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className={`${classes.section} ${classes.leftSection}`}>
                {user?.walletAddress}
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
