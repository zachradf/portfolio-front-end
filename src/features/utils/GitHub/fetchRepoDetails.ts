import axios from 'axios';

export const fetchRepoDetails = async (owner: string, repo: string) => {
  const detailsResponse = await axios.get(
    `/api/auth/github/repo-details/${owner}/${repo}`
  );
  const readmeResponse = await axios.get(
    `/api/auth/github/readme/${owner}/${repo}`
  );
  const starResponse = await axios.get(
    `/api/auth/github/is-starred/${owner}/${repo}`
  );
  return {
    details: detailsResponse.data,
    readme: readmeResponse.data.content,
    isStarred: starResponse.data.isStarred,
  };
};
