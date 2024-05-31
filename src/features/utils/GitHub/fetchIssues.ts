import axios from 'axios';

const listIssues = async (owner: string, repo: string) => {
  const issuesResponse = await axios.get(
    `/api/auth/github/list-issues/${owner}/${repo}`
  );
  return issuesResponse.data;
};

export default listIssues;
