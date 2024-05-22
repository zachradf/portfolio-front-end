import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1de9b6', // Bright cyan
      dark: '#00bfa5', // Darker cyan
      light: '#6effe8', // Light cyan
      contrastText: '#000',
    },
    secondary: {
      main: '#ff4081', // Vivid pink
    },
    background: {
      default: '#212121', // Dark background
      paper: '#424242', // Dark paper background
    },
    text: {
      primary: '#ffffff', // White text
      secondary: '#bdbdbd', // Light gray text
    },
  },
  typography: {
    fontFamily: 'Roboto, Orbitron, sans-serif',
    h4: {
      fontFamily: 'Orbitron, sans-serif',
    },
  },
  spacing: 8,
});

export default theme;
