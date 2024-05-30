import axios from 'axios';

export const listForks = async (owner: string, repo: string) => {
  const forksResponse = await axios.get(
    `/api/auth/github/list-forks/${owner}/${repo}`
  );
  return forksResponse.data;
};
