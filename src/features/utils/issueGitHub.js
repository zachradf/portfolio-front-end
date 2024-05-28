import axios from "axios";
const submitIssue = async (owner, repo, title, body) => {
    try {
      const response = await axios.post(`/api/auth/github/submit-issue/${owner}/${repo}`, {
        title,
        body
      });
      console.log('Issue submitted successfully', response.data);
    } catch (error) {
      console.error('Error submitting issue:', error.response ? error.response.data : 'Unknown error');
    }
  };
  
  export default submitIssue;
  