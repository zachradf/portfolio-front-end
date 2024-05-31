import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  IconButton,
  Link,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub';
import EditIcon from '@mui/icons-material/Edit';
import appTheme from '../../themes/app-theme';
import upsertFile from '../../features/utils/GitHub/upsertFile';
import fetchFileContent from '../../features/utils/GitHub/fetchFileContent';
import ReactMarkdown from 'react-markdown';

interface EditorProps {
  repoIdentifier: string; // Format expected: "username/repository"
  fileContent: string;
  onSave: () => void;
}

const GitHubEditor: React.FC<EditorProps> = ({
  repoIdentifier,
  fileContent,
  onSave,
}) => {
  const [markdown, setMarkdown] = useState(fileContent);
  const [path, setPath] = useState('README.md');
  const [commit, setCommitMessage] = useState('Update README');
  const [branch, setBranch] = useState('main');

  const [owner, repo] = repoIdentifier.split('/');

  const saveContentToGitHub = async () => {
    const message = commit;
    const content = markdown;

    await upsertFile({ owner, repo, path, message, content, branch });
    onSave();
  };

  useEffect(() => {
    const fetchData = async () => {
      const content = await fetchFileContent(owner, repo, path, branch);
      console.log(
        'path, branch, and content in useEffect',
        path,
        branch,
        content
      );

      setMarkdown(content);
    };
    fetchData();
  }, [owner, repo, path, branch]);

  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h6" gutterBottom>
            Edit File
          </Typography>
          <TextField
            label="File Path"
            variant="outlined"
            fullWidth
            value={path}
            onChange={(e) => setPath(e.target.value)}
          />
          <TextField
            label="Branch"
            variant="outlined"
            fullWidth
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
          />
          <TextField
            label="Commit Message"
            variant="outlined"
            fullWidth
            value={commit}
            onChange={(e) => setCommitMessage(e.target.value)}
          />
          <TextField
            label="Markdown Content"
            variant="outlined"
            multiline
            rows={10}
            fullWidth
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={saveContentToGitHub}
            >
              Save to GitHub
            </Button>
            <IconButton
              aria-label="go to GitHub repository"
              component={Link}
              href={`https://github.com/${repoIdentifier}`}
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon />
            </IconButton>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">Markdown Preview</Typography>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GitHubEditor;
