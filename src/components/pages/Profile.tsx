import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Container,
  Box,
  Typography,
  Grid,
  Avatar,
} from '@mui/material';
import { useSelector, useDispatch as useReduxDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../app/store';
import AppToolbar from '../menus/AppToolbar';
import profileStyles from '../../themes/profile-styles';
import { logoutUser } from '../../features/auth/authSlice';
import InfoIcon from '../info-button/InfoIcon';
import getBalance from '../../features/utils/wallet';
// import GitHubEditor from '../content/GitHubEditor';
import { Dispatch } from 'redux';
import GitHubViewer from '../content/GitHubViewer';

const Profile: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState('0');
  const classes = profileStyles();
  const useDispatch = () => useReduxDispatch<Dispatch<any>>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (!user || !isAuthenticated) {
      navigate('/error', {
        state: {
          errorMessage: 'User not authenticated. Redirecting to login page.',
        },
      });
    }
    if (user && user.walletAddress) {
      getBalance(user, setWalletBalance);
    } else {
      console.error('User or user wallet address not available');
    }
  }, [user, walletBalance]); // Depend on `user` to re-run this effect when `user` changes

  return (
    <>
      <AppBar position="static">
        <AppToolbar />
      </AppBar>
      <Box className={classes.root}>
        <div>
          <InfoIcon
            style={{
              // marginTop: '30px',
              marginBottom: '-30px',
              marginLeft: '150px',
            }}
            class="avatar-info-icon"
            text="This avatar is generated based on a hash of your username."
            code={`typescript
async function drawAvatar(username: string): Promise<HTMLCanvasElement> {
  const hash = await generateHash(username);

  const canvas = document.createElement('canvas');
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  ctx.clearRect(0, 0, canvas.width, canvas.height)...`}
            link={
              'https://github.com/jannetasa/yjdh/blob/main/backend/shared/shared/src/avatar.ts'
            }
          />
          <Avatar
            alt="NFT Profile"
            src={user?.nftProfilePicture} // Replace with actual NFT image URL
            className={classes.avatar}
          />
        </div>
        <Typography variant="h4" gutterBottom>
          {user?.username}
        </Typography>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box className={`${classes.section} ${classes.leftSection}`}>
                Wallet Address: {user?.walletAddress}
                <br />
                Wallet Balance: {walletBalance} WEI
              </Box>
              <Box className={`${classes.section} ${classes.leftSection}`}>
                <Typography variant="h5">My Content</Typography>
                {/* <GitHubEditor /> */}
                {/* <GitHubViewer /> */}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                className={`${classes.section} ${classes.rightSection}`}
              ></Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
