import axios from 'axios';

// const unstarRepository = async (owner, repo) => {
//   try {
//     const response = await axios.delete(`/api/auth/github/unstar/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
//     console.log('Repository unstarred successfully', response);
//   } catch (error) {
//     console.error('Error unstarring repository:', error.response ? error.response.data : 'Unknown error');
//   }
// };

// export default unstarRepository;import axios from 'axios';

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
  