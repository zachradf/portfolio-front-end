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
// updateFile();
// const express = require('express');
// const { Octokit } = require('@octokit/rest');

// const router = express.Router();

// router.post('/push', async (req, res) => {
//   const { owner, repo, path, message, content, branch } = req.body;

//   if (!req.session || !req.session.authToken) {
//     return res.status(401).json({ error: 'No authentication token found in session' });
//   }

//   const octokit = new Octokit({ auth: req.session.authToken });

//   try {
// const { data: existingFile } = await octokit.repos.getContent({
//   owner,
//   repo,
//   path,
//   ref: branch,
// });

//     const { data: updateResponse } = await octokit.repos.createOrUpdateFileContents({
//       owner,
//       repo,
//       path,
//       message,
//       content,
//       sha: existingFile.sha,
//       branch,
//     });

//     console.log(`File updated successfully: ${updateResponse.commit.sha}`);
//     return res.json({ success: true, commitSha: updateResponse.commit.sha });
//   } catch (error) {
//     if (error.status === 404) {
//       try {
//         const { data: createResponse } = await octokit.repos.createOrUpdateFileContents({
//           owner,
//           repo,
//           path,
//           message,
//           content,
//           branch,
//         });

//         console.log(`File created successfully: ${createResponse.commit.sha}`);
//         return res.json({ success: true, commitSha: createResponse.commit.sha });
//       } catch (createError) {
//         console.error(`Failed to create file: ${createError}`);
//         return res.status(500).json({ error: 'Failed to create file', details: createError.message });
//       }
//     } else {
//       console.error(`Failed to update file: ${error}`);
//       return res.status(500).json({ error: 'Failed to update file', details: error.message });
//     }
//   }
// });

// module.exports = router;
