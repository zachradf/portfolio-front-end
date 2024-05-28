import axios from 'axios';

const forkRepository = async (owner, repo) => {
    try {
      const response = await axios.post(`/api/auth/github/fork-repo/${owner}/${repo}`);
      console.log('Repository fork initiated successfully', response.data);
    } catch (error) {
      console.error('Error forking repository:', error.response ? error.response.data : 'Unknown error');
    }
  };

  export default forkRepository;
  