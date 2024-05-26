import React, { useState } from 'react';
import { Octokit } from '@octokit/rest';
import ReactMarkdown from 'react-markdown';

const GitHubEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [repo, setRepo] = useState('');
  const [authToken, setAuthToken] = useState('');

  const octokit = new Octokit({ auth: authToken });

  const saveContentToGitHub = async () => {
    try {
      // Here you might extract user/owner and repo name from `repo` string
      // Example repo format could be "username/repository"
      const [owner, repoName] = repo.split('/');
      const path = 'path/to/file.md'; // Define how you want to store your file in the repo
      const message = 'Update blog post';
      const content = Buffer.from(markdown).toString('base64');

      const { data } = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo: repoName,
        path,
        message,
        content,
        committer: {
          name: `Your Name`,
          email: `your-email@example.com`,
        },
        author: {
          name: `Your Name`,
          email: `your-email@example.com`,
        },
      });
      alert('Content saved to GitHub!');
    } catch (error) {
      console.error('Failed to save content:', error);
      alert('Failed to save content.');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
        placeholder="Enter repo (username/repo)"
      />
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="Write your markdown"
      />
      <button onClick={saveContentToGitHub}>Save to GitHub</button>
      <div>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
};

export default GitHubEditor;
