import { Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { RootState } from '../app/store';
import { useSelector } from 'react-redux';
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
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
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

  return (
    <Toolbar sx={{ backgroundColor: '#000000' }}>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        My Futuristic App
      </Typography>
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
