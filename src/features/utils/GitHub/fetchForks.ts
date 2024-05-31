import axios from 'axios';

const listForks = async (owner: string, repo: string) => {
  const forksResponse = await axios.get(
    `/api/auth/github/list-forks/${owner}/${repo}`
  );
  return forksResponse.data;
};

export default listForks;
