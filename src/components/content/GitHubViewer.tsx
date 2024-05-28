import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Link,
  ThemeProvider,
} from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import appTheme from '../../themes/app-theme';
import SubmitIssue from './SubmitIssue';
import starGitHub from '../../features/utils/starGitHub';
import unstarGitHub from '../../features/utils/unstarGitHub';
import forkGitHub from '../../features/utils/forkGitHub';

interface Props {
  repoIdentifier: string; // Format expected: "username/repository"
}

interface RepositoryDetails {
  fullName: string;
  description: string | null;
  starCount: number;
  forkCount: number;
  openIssuesCount: number;
  htmlUrl: string;
}

const GitHubViewer: React.FC<Props> = ({ repoIdentifier }) => {
  const [readmeContent, setReadmeContent] = useState<string>('');
  const [repoDetails, setRepoDetails] = useState<RepositoryDetails | null>(
    null
  );
  const [showSubmitIssue, setShowSubmitIssue] = useState<boolean>(false);
  const [isStarred, setIsStarred] = useState<boolean>(false);
  const [owner, repo] = repoIdentifier.split('/');

  const fetchRepositoryDetails = async () => {
    try {
      const detailsResponse = await axios.get(
        `/api/auth/github/repo-details/${owner}/${repo}`
      );
      setRepoDetails(detailsResponse.data);
      const readmeResponse = await axios.get(
        `/api/auth/github/readme/${owner}/${repo}`
      );
      setReadmeContent(readmeResponse.data.content);
      const starResponse = await axios.get(
        `/api/auth/github/is-starred/${owner}/${repo}`
      );
      setIsStarred(starResponse.data.isStarred);
    } catch (error) {
      console.error('Error fetching repository data:', error);
    }
  };

  useEffect(() => {
    if (repoIdentifier) {
      fetchRepositoryDetails();
    }
  }, [repoIdentifier]);

  async function starRepo(): Promise<void> {
    if (repoDetails) {
      await starGitHub(owner, repo);
      fetchRepositoryDetails();
    }
  }

  async function forkRepo(): Promise<void> {
    if (repoDetails) {
      await forkGitHub(owner, repo);
      fetchRepositoryDetails();
    }
  }

  async function unstarRepo(): Promise<void> {
    if (repoDetails) {
      await unstarGitHub(owner, repo);
      fetchRepositoryDetails();
    }
  }

  function reportIssue(): void {
    setShowSubmitIssue(!showSubmitIssue);
  }

  async function handleIssueSubmitted(): Promise<void> {
    setShowSubmitIssue(false);
    await fetchRepositoryDetails();
  }

  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          {/* <Typography variant="h4" gutterBottom>
            Repository Viewer
          </Typography> */}
          {repoDetails && (
            <>
              <Typography variant="h6">{repoDetails.fullName}</Typography>
              <Typography>{repoDetails.description}</Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 2,
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>Stars: {repoDetails.starCount}</Typography>
                  <IconButton
                    aria-label="star repository"
                    onClick={isStarred ? unstarRepo : starRepo}
                  >
                    {isStarred ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>Forks: {repoDetails.forkCount}</Typography>
                  <IconButton aria-label="fork repository" onClick={forkRepo}>
                    <ForkRightIcon />
                  </IconButton>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>
                    Open Issues: {repoDetails.openIssuesCount}
                  </Typography>
                  <IconButton aria-label="report issue" onClick={reportIssue}>
                    <ReportProblemOutlinedIcon />
                  </IconButton>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography>Open on GitHub</Typography>
                  <IconButton
                    aria-label="go to GitHub repository"
                    component={Link}
                    href={repoDetails.htmlUrl}
                    target="_blank"
                    rel="noopener"
                  >
                    <GitHubIcon />
                  </IconButton>
                </Box>
              </Box>
            </>
          )}
          <Box sx={{ bgcolor: 'background.paper', p: 2 }}>
            <ReactMarkdown>{readmeContent}</ReactMarkdown>
          </Box>
          {showSubmitIssue && (
            <SubmitIssue
              owner={owner}
              repo={repo}
              issueSubmitted={handleIssueSubmitted}
            />
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GitHubViewer;
