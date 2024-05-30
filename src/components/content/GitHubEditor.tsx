import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import GitHubIcon from '@mui/icons-material/GitHub'; // Make sure to install @mui/icons-material if not already installed
import appTheme from '../../themes/app-theme';
import upsertFile from '../../features/utils/GitHub/upsertFile';

const GitHubEditor = () => {
  const [markdown, setMarkdown] = useState('');
  const [fullRepo, setRepo] = useState('');
  const [branch, setBranch] = useState('');
  const [path, setPath] = useState('');
  const [commit, setCommitMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  const saveContentToGitHub = async () => {
    const [owner, repo] = fullRepo.split('/');
    // const path = path; // You can make this dynamic
    const message = commit;
    const content = markdown;
    upsertFile({ owner, repo, path, message, content, branch });
  };

  const handleCreateRepository = async () => {
    const [owner, repo] = fullRepo.split('/');
    // const path = 'README.md'; // You can make this dynamic
    const path = 'README.md'; // You can make this dynamic
    const message = commit;
    const content = markdown;

    upsertFile({ owner, repo, path, message, content, branch });
    setOpenDialog(false);
    // Implement repository creation logic here
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h4" gutterBottom>
            GitHub Markdown Editor
          </Typography>
          <TextField
            label="Branch"
            variant="outlined"
            fullWidth
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Branch"
          />
          <TextField
            label="Path"
            variant="outlined"
            fullWidth
            value={path}
            onChange={(e) => setPath(e.target.value)}
            placeholder="File Path"
          />
          <TextField
            label="Repository"
            variant="outlined"
            fullWidth
            value={fullRepo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="Enter repo (username/repo)"
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
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={saveContentToGitHub}
            >
              Save to GitHub
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenDialog(true)}
            >
              Create New Repository
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <IconButton
                aria-label="go to GitHub repository"
                component={Link}
                href={`https://github.com/${fullRepo}`}
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Create New Repository</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Repository Name"
              type="text"
              fullWidth
              variant="outlined"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateRepository}>Create</Button>
          </DialogActions>
        </Dialog>
        <Box sx={{ bgcolor: 'background.paper', p: 2, mt: 2 }}>
          <Typography variant="h6" gutterBottom component="div">
            Markdown Preview
          </Typography>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GitHubEditor;
