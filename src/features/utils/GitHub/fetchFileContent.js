import axios from 'axios';

const fetchFileContent = async (owner, repo, path, branch) => {
  try {
    const fileContent = await axios.get(
      `/api/auth/github/file-content/${owner}/${repo}`, 
      {
        params: {
          path, 
          branch
        }
      }
    );
    console.log('fileContent', fileContent)
    return fileContent.data.content;
  } catch (error) {
    console.error('Error fetching file content:', error);
    return null;
  }
};

export default fetchFileContent;
