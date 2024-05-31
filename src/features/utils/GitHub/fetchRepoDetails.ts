import axios from 'axios';
const fetchRepoDetails = async (owner: string, repo: string) => {
  const detailsResponse = await axios.get(
    `/api/auth/github/repo-details/${owner}/${repo}`
  );
  const readmeResponse = await axios.get(
    `/api/auth/github/readme/${owner}/${repo}`
  );
  const starResponse = await axios.get(
    `/api/auth/github/is-starred/${owner}/${repo}`
  );
  const userResponse = await axios.get(
    `/api/auth/github/check-ownership/${owner}/${repo}`
  );

  const isOwner = userResponse.data.login === owner;

  console.log('ownership response', detailsResponse, userResponse);
  return {
    details: detailsResponse.data,
    readme: readmeResponse.data.content,
    isStarred: starResponse.data.isStarred,
    isOwner: isOwner,
  };
};

export default fetchRepoDetails;
