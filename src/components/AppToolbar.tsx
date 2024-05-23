import React, { useEffect } from 'react';
import { Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import HideInfoButton from './HideInfoButton';
import InfoIcon from './InfoIcon';
import logoSrc from '../logo.png';

const AppToolbar = ({
  onLoginClick = () => {},
  onRegisterClick = () => {},
  onLogoutClick = () => {},
  // isAuthenticated = false,
}: {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  onLogoutClick?: () => void;
  // isAuthenticated?: boolean;
}) => {
  console.log(
    'state',
    useSelector((state: RootState) => state.auth.isAuthenticated)
  );
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const navigate = useNavigate();

  const handleLoginClick = () => {
    onLoginClick();
    navigate('/login');
    console.log('Login clicked');
  };

  const handleRegisterClick = () => {
    onRegisterClick();
    navigate('/register');
    console.log('Register clicked');
  };

  const handleLogoutClick = () => {
    onLogoutClick();
    navigate('/');
    console.log('Logout clicked');
  };

  const handleLogoClick = () => {
    navigate('/');
    console.log('Logo clicked');
  };

  return (
    <Toolbar sx={{ backgroundColor: '#000000' }}>
      <Box
        component="img"
        src={logoSrc}
        alt={'Zachary Radford'}
        sx={{ height: 40, mr: 1 }}
        onClick={handleLogoClick}
      />
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, mb: 0.5 }}
        onClick={handleLogoClick}
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
          <Button onClick={handleLoginClick} color="inherit">
            Login
          </Button>
          <Button onClick={handleRegisterClick} color="inherit">
            Register
          </Button>
        </>
      ) : (
        <Button onClick={handleLogoutClick} color="inherit">
          Logout
        </Button>
      )}
    </Toolbar>
  );
};

export default AppToolbar;
// import React, { useEffect } from 'react';
// import { Toolbar, Typography, Button, Box } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { RootState } from '../app/store';
// import HideInfoButton from './HideInfoButton';
// import InfoIcon from './InfoIcon';
// import logoSrc from '../logo.png';

// const AppToolbar: React.FC<{
//   onLoginClick?: () => void;
//   onRegisterClick?: () => void;
//   onLogoutClick?: () => void;
// }> = ({
//   onLoginClick = () => {},
//   onRegisterClick = () => {},
//   onLogoutClick = () => {},
// }) => {
//   const isAuthenticated = useSelector(
//     (state: RootState) => state.auth.isAuthenticated
//   );
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log('AppToolbar rendered');
//   }, [isAuthenticated]);

//   const handleLoginClick = () => {
//     onLoginClick();
//     navigate('/login');
//     console.log('Login clicked');
//   };

//   const handleRegisterClick = () => {
//     onRegisterClick();
//     navigate('/register');
//     console.log('Register clicked');
//   };

//   const handleLogoutClick = () => {
//     onLogoutClick();
//     navigate('/');
//     console.log('Logout clicked');
//   };

//   return (
//     <Toolbar>
//       <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
//         <Box
//           component="img"
//           src={logoSrc}
//           alt="Logo"
//           sx={{ height: 40, mr: 2 }}
//         />
//         <Typography variant="h6" component="div">
//           Your App Name
//         </Typography>
//       </Box>
//       {isAuthenticated ? (
//         <Button color="inherit" onClick={handleLogoutClick}>
//           Logout
//         </Button>
//       ) : (
//         <>
//           <Button color="inherit" onClick={handleLoginClick}>
//             Login
//           </Button>
//           <Button color="inherit" onClick={handleRegisterClick}>
//             Register
//           </Button>
//         </>
//       )}
//       <HideInfoButton />
//       <InfoIcon text="Some info text" />
//     </Toolbar>
//   );
// };

// export default AppToolbar;
