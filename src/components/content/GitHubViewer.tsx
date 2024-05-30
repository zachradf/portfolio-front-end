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
import IssueList from '../lists/IssueList';
import ForkList from '../lists/ForkList';
import SubmitIssue from './SubmitIssue';
import List from '../lists/IssueList';
import starGitHub from '../../features/utils/GitHub/starRepo';
import unstarGitHub from '../../features/utils/GitHub/unstarRepo';
import forkGitHub from '../../features/utils/GitHub/forkRepo';
import { fetchRepoDetails } from '../../features/utils/GitHub/fetchRepoDetails';
import { listForks } from '../../features/utils/GitHub/fetchForks';
import { listIssues } from '../../features/utils/GitHub/fetchIssues';
// import { starRepo } from './starRepo';
// import { forkRepo } from './forkRepo';
// import { unstarRepo } from './unstarRepo';

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
  const [issues, setIssues] = useState<any>([]);
  const [forks, setForks] = useState<any>([]);
  const [selectedTab, setSelectedTab] = useState<string>('readme');
  const getAndSetDetails = async () => {
    try {
      const { details, readme, isStarred } = await fetchRepoDetails(
        owner,
        repo
      );
      setRepoDetails(details);
      setReadmeContent(readme);
      setIsStarred(isStarred);
    } catch (error) {
      console.error('Error fetching repository data:', error);
    }
  };
  // const fetchRepositoryDetails = async () => {
  //   try {
  //     const detailsResponse = await axios.get(
  //       `/api/auth/github/repo-details/${owner}/${repo}`
  //     );
  //     setRepoDetails(detailsResponse.data);
  //     const readmeResponse = await axios.get(
  //       `/api/auth/github/readme/${owner}/${repo}`
  //     );
  //     setReadmeContent(readmeResponse.data.content);
  //     const starResponse = await axios.get(
  //       `/api/auth/github/is-starred/${owner}/${repo}`
  //     );
  //     setIsStarred(starResponse.data.isStarred);
  //   } catch (error) {
  //     console.error('Error fetching repository data:', error);
  //   }
  // };

  useEffect(() => {
    if (repoIdentifier) {
      getAndSetDetails();
    }
  }, [repoIdentifier]);

  async function starRepo(): Promise<void> {
    if (repoDetails) {
      await starGitHub(owner, repo);
      fetchRepoDetails(owner, repo);
    }
  }

  async function forkRepo(): Promise<void> {
    if (repoDetails) {
      await forkGitHub(owner, repo);
      fetchRepoDetails(owner, repo);
    }
  }

  async function unstarRepo(): Promise<void> {
    if (repoDetails) {
      await unstarGitHub(owner, repo);
      fetchRepoDetails(owner, repo);
    }
  }

  function reportIssue(): void {
    setShowSubmitIssue(!showSubmitIssue);
  }

  function handleTabClick(tab: string): void {
    setSelectedTab(tab);
    if (tab === 'forks') handleListForks();
    if (tab === 'issues') handleListIssues();
  }

  async function handleIssueSubmitted(): Promise<void> {
    setShowSubmitIssue(false);
    await fetchRepoDetails(owner, repo);
  }

  // async function listForks() {
  //   const forksResponse = await axios.get(
  //     `/api/auth/github/list-forks/${owner}/${repo}`
  //   );
  //   setForks(forksResponse.data);
  // }

  // async function listIssues() {
  //   const issuesResponse = await axios.get(
  //     `/api/auth/github/list-issues/${owner}/${repo}`
  //   );

  //   setIssues(issuesResponse.data);
  // }
  async function handleListIssues() {
    const issuesResponse = await listIssues(owner, repo);
    console.log('issuesRes', issuesResponse);
    setIssues(issuesResponse);
  }

  async function handleListForks() {
    const forksResponse = await listForks(owner, repo);
    console.log('forksResponse', forksResponse);
    setForks(forksResponse);
  }

  return (
    <ThemeProvider theme={appTheme}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
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
          <Box sx={{ bgcolor: 'background.paper', p: 2, minHeight: '300px' }}>
            {selectedTab === 'readme' && (
              <ReactMarkdown>{readmeContent}</ReactMarkdown>
            )}
            {selectedTab === 'issues' && <IssueList items={issues} />}
            {selectedTab === 'forks' && <ForkList items={forks} />}
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              mt: 2,
              borderTop: '1px solid #ccc',
              pt: 2,
            }}
          >
            <IconButton
              aria-label="readme tab"
              onClick={() => handleTabClick('readme')}
              sx={selectedTab === 'readme' ? { color: 'primary.main' } : {}}
            >
              <Typography variant="body2">Content</Typography>
            </IconButton>
            <IconButton
              aria-label="issues tab"
              onClick={() => handleTabClick('issues')}
              sx={selectedTab === 'issues' ? { color: 'primary.main' } : {}}
            >
              <Typography variant="body2">Issues</Typography>
              <ReportProblemOutlinedIcon />
            </IconButton>
            <IconButton
              aria-label="forks tab"
              onClick={() => handleTabClick('forks')}
              sx={selectedTab === 'forks' ? { color: 'primary.main' } : {}}
            >
              <Typography variant="body2">Forks</Typography>
              <ForkRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default GitHubViewer;
