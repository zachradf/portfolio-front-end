import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ThemeProvider,
} from '@mui/material';
import submitIssue from '../../features/utils/issueGitHub';
import appTheme from '../../themes/app-theme'; // Import your theme

interface SubmitIssueProps {
  owner: string;
  repo: string;
  issueSubmitted: Function;
}

const SubmitIssue: React.FC<SubmitIssueProps> = ({
  owner,
  repo,
  issueSubmitted,
}) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await submitIssue(owner, repo, title, description);
      setSuccess(true);
      setTitle('');
      setDescription('');
      issueSubmitted();
    } catch (err) {
      setError('Failed to submit issue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Submit an Issue
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Issue'}
            </Button>
          </form>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="primary" sx={{ mt: 2 }}>
              Issue submitted successfully!
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SubmitIssue;
