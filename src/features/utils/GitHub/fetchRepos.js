import React from 'react';
import axios from 'axios';

const FetchRepos = () => {
  const fetchRepositories = () => {
    console.log('Fetching repositories...');
    axios.get('/api/auth/github/user/repos')
      .then(response => {
        console.log('Repositories:', response.data);
      })
      .catch(error => {
        console.error('Error fetching repositories:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <div>
      <button onClick={fetchRepositories}>Fetch Repositories</button>
    </div>
  );
};

export default FetchRepos;
