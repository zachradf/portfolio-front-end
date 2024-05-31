import axios from 'axios';
const unstarGitHub = async (owner, repo) => {
    try {
        const response = await axios.delete(`/api/auth/github/unstar/${owner}/${repo}`);
        if (response.status === 204) {
        console.log(`Successfully unstarred repository: ${owner}/${repo}`);
      }
    } catch (error) {
      console.error(`Error unstarring repository: ${owner}/${repo}`, error);
      throw error;
    }
  };
  
  export default unstarGitHub;
  