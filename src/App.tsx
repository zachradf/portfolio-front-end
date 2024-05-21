import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ADD8E6', // Baby blue color
    },
    background: {
      default: '#f0f0f0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Registration} />
          {/* <Route path="/profile/:name" Component={<Profile />} /> */}
          <Route path="/" Component={Home} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
