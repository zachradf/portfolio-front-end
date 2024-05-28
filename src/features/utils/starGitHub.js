import axios from 'axios';

const starRepository = async (owner, repo) => {
  try {
    const response = await axios.put(`/api/auth/github/star/${owner}/${repo}`);
    console.log('Repository starred successfully', response);
  } catch (error) {
    console.error('Error starring repository:', error.response ? error.response.data : 'Unknown error');
  }
};

export default starRepository;
