// import React from 'react';
// import { Toolbar, Typography, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const onLoginClick = () => {
//   // axios.get('/login').then((response) => {
//   //   console.log(response);
//   //   if (response.status === 200) {
//   //     navigate('/login');
//   //   }
//   // });
//   navigate('/login');
//   console.log('clicked');
// };

// const onRegisterClick = () => {
//   navigate('/register');
// };
// const AppToolbar = ({
//   onLoginClick,
//   onRegisterClick,
// }: {
//   onLoginClick: () => void;
//   onRegisterClick: () => void;
// }) => {
//   return (
//     <Toolbar>
//       <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
//         My Futuristic App
//       </Typography>
//       <Button onClick={onLoginClick} color="inherit">
//         Login
//       </Button>
//       <Button onClick={onRegisterClick} color="inherit">
//         Register
//       </Button>
//     </Toolbar>
//   );
// };

// export default AppToolbar;
import React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AppToolbar = ({
  onLoginClick = () => {},
  onRegisterClick = () => {},
  isAuthenticated = false,
}: {
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  isAuthenticated?: boolean;
  // sx: object;
}) => {
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

  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        My Futuristic App
      </Typography>
      {!isAuthenticated && (
        <>
          <Button onClick={handleLoginClick} color="inherit">
            Login
          </Button>
          <Button onClick={handleRegisterClick} color="inherit">
            Register
          </Button>
        </>
      )}
    </Toolbar>
  );
};

export default AppToolbar;
