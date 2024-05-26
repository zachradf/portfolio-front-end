import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch as useReduxDispatch } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Dispatch } from 'redux';

import Home from '../components/pages/Home';
import Login from '../components/pages/Login';
import Registration from '../components/pages/Registration';
import { fetchSession } from '../features/auth/authSlice';
import appTheme from '../themes/app-theme';
import Profile from '../components/pages/Profile';
import PrivateRoute from './PrivateRoute';
import OAuth from '../components/pages/OAuth';
import '../App.css';
function App() {
  const useDispatch = () => useReduxDispatch<Dispatch<any>>();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchSession());
  // }, [dispatch]);

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Registration} />
          <Route
            path="/profile/:name"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/" Component={Home} />
          <Route path="api/github" Component={OAuth} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import { Container, Grid } from '@mui/material';

// import Home from '../components/Home';
// import Login from '../components/Login';
// import Registration from '../components/Registration';
// import appTheme from '../themes/app-theme';
// import Profile from '../components/Profile';
// import PrivateRoute from './PrivateRoute';
// import AppToolbar from '../components/AppToolbar';

// const theme = createTheme(appTheme);

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <AppToolbar /> {/* Add your toolbar here */}
//         <Container maxWidth="lg">
//           <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} md={8}>
//               <Routes>
//                 <Route path="/login" element={<Login />} />
//                 <Route path="/register" element={<Registration />} />
//                 <Route
//                   path="/profile/:name"
//                   element={
//                     <PrivateRoute>
//                       <Profile />
//                     </PrivateRoute>
//                   }
//                 />
//                 <Route path="/" element={<Home />} />
//               </Routes>
//             </Grid>
//           </Grid>
//         </Container>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;
