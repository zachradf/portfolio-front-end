import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import User from '../../interfaces/user.interface';
const OAuthPage = () => {
  const user = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();
  // const auth = useSelector((state: any) => state.auth);
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      exchangeCodeForToken(code, user);
    } else {
      // Handle the situation where no code is provided, maybe redirect to an error page
      navigate('/error');
    }
  }, [navigate]);

  const exchangeCodeForToken = async (code: string, user: User) => {
    console.log('code', code, user);
    try {
      console.log('exchangeCodeForToken');
      const response = await axios.post('/api/auth/github/exchange-code', {
        code,
        user,
      });
      // localStorage.setItem('github_token', response.data.access_token);
      console.log('resultUrl', response);
      navigate('/'); // Redirect to profile page after successful login
    } catch (error) {
      console.error('Failed to exchange OAuth code for token:', error);
      navigate('/error'); // Redirect to an error page
    }
  };

  return (
    <div>Loading...</div> // Optionally add a spinner or loading message here
  );
};

export default OAuthPage;
