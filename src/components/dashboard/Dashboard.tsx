import React, { ReactNode } from 'react';
import { Container, Grid, Box } from '@material-ui/core';

interface DashboardProps {
  children: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  return (
    <Container className="dashboard">
      <Grid container spacing={4}>
        {children}
      </Grid>
    </Container>
  );
};

export default Dashboard;
