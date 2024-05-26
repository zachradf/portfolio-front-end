import React, { useEffect } from 'react';
import { Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../../app/store';
import HideInfoButton from '../info-button/HideInfoButton';
import InfoIcon from '../info-button/InfoIcon';
import logoSrc from '../../logo.png';
import { logoutUser } from '../../features/auth/authSlice';

const AppToolbar = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  console.log(
    'AppToolbar' + isAuthenticated,
    'isAuthenticated',
    useSelector((state: RootState) => state.auth)
  );
  const useDispatch = () => useReduxDispatch<Dispatch<any>>();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     // dispatch(fetchSession());
  //   }
  // }, [dispatch, isAuthenticated]);

  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate('/login');
  };

  const onRegisterClick = () => {
    navigate('/register');
  };

  const onLogoutClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  const onLogoClick = () => {
    navigate('/');
  };

  const onGitHubOauthClick = async () => {
    try {
      const response = await axios.get('/api/auth/github/initiate');
      window.location.href = response.data.url;
      console.log('GitHub OAuth initiated', response.data.url);
    } catch (error) {
      console.error('Failed to initiate GitHub OAuth:', error);
    }
  };

  return (
    <Toolbar sx={{ backgroundColor: '#000000' }}>
      <Box
        component="img"
        src={logoSrc}
        alt={'Zachary Radford'}
        sx={{ height: 40, mr: 1 }}
        onClick={onLogoClick}
      />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, mb: 0.5 }}
        onClick={onLogoClick}
      >
        My Futuristic App
        <InfoIcon
          text="This is an info icon. Here you can see code snippets and explanations of how the app works. It might also link to relevant content.
        Here is the code for this toolbar:"
          code={`const InfoIcon: React.FC<InfoIconProps> = ({ text, code }) => {
const hidden = useSelector((state: RootState) => state.infoIcon.hidden);
if (hidden) return null;
   return (
     <Tooltip
      title={
       <Box sx={style}>
        <Typography variant="body2">
        {text}
        </Typography>
          {code && (
            <Box mt={2} sx={{styles}}>
          {code}
              </Box>
                )}
                </Box>
              }
              arrow
              sx={styles}>
              <IconButton>
           <InfoOutlinedIcon />
        </IconButton>
     </Tooltip>
   );
};

export default InfoIcon;`}
        />
      </Typography>
      <HideInfoButton />
      {!isAuthenticated ? (
        <>
          <Button onClick={onLoginClick} color="inherit">
            Login
          </Button>
          <Button onClick={onRegisterClick} color="inherit">
            Register
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onGitHubOauthClick}>GitHub Oauth</Button>
          <Button onClick={onLogoutClick} color="inherit">
            Logout
          </Button>
        </>
      )}
    </Toolbar>
  );
};

export default AppToolbar;
