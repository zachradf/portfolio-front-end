import React, { ReactNode } from 'react';
import { Container, Grid, Box } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],

    background: 'rgba(74, 74, 74 0.8)',

    // background: 'rgba(255, 255, 255, 0.8)',
    transition: 'transform 0.5s, background 0.5s',
  },
  leftSection: {
    // transform: 'skewX(-15deg)',
    // '&:hover': {
    // transform: 'skewX(0)',
    // background: 'rgba(255, 255, 255, 0.4)',
    // },
  },
  rightSection: {
    // transform: 'skewX(15deg)',
    // '&:hover': {
    // transform: 'skewX(0)',
    // background: 'rgba(255, 255, 255, 0.4)',
    // },
  },
}));
type SectionClassNames = 'leftSection' | 'rightSection';

interface DashboardBoxProps {
  className: SectionClassNames;
  children?: ReactNode;
}
const DashboardBox: React.FC<DashboardBoxProps> = ({ className, children }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <Box>{children}</Box>
    </Grid>
  );
};

export default DashboardBox;
