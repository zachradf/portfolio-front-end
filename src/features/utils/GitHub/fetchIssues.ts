import axios from 'axios';

export const listIssues = async (owner: string, repo: string) => {
  const issuesResponse = await axios.get(
    `/api/auth/github/list-issues/${owner}/${repo}`
  );
  return issuesResponse.data;
};
