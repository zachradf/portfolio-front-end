import axios from 'axios';
type upsertFileValues = {
  owner: string;
  repo: string;
  path: string;
  message: string;
  content: string;
  branch: string;
};
const upsertFile = async (data: upsertFileValues) => {
  const { owner, repo, path, message, content, branch } = data;
  try {
    const response = await axios.post(
      `/api/auth/github/upsert-file/${owner}/${repo}`,
      {
        owner,
        repo,
        path,
        message,
        content,
        branch,
      }
    );

    if (response.data.success) {
      console.log(`File updated successfully: ${response.data.commitSha}`);
    }
  } catch (error) {
    console.error('Error updating file:', error);
  }
};

export default upsertFile;
