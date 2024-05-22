import { makeStyles } from '@mui/styles';

const profileStyles = makeStyles((theme) => ({
  root: {
    // background: `linear-gradient(135deg,  #000000 190%, #1de9b6 90%)`,
    background: `#000000`,

    // background: `linear-gradient(135deg, ${theme.palette.secondary.main} 30%, ${theme.palette.primary.light} 90%)`,
    color: theme.palette.text.primary,
    minHeight: '100vh',
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-20%',
      left: '-20%',
      width: '140%',
      height: '140%',
      background: `radial-gradient(circle at center, ${theme.palette.primary.dark} 0%, transparent 70%)`,
      opacity: 0.3,
      transform: 'rotate(45deg)',
    },
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    border: `4px solid ${theme.palette.primary.main}`,
    marginBottom: theme.spacing(4),
    boxShadow: `0 0 20px ${theme.palette.primary.light}`,
  },
  section: {
    background: 'rgba(255, 255, 255, 0.2)',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    backdropFilter: 'blur(10px)',
  },
  leftSection: {
    transform: 'skewX(-15deg)',
    transition: 'transform 0.5s, background 0.5s',
    '&:hover': {
      transform: 'skewX(0)',
      background: 'rgba(255, 255, 255, 0.4)',
    },
  },
  rightSection: {
    transform: 'skewX(15deg)',
    transition: 'transform 0.5s, background 0.5s',
    '&:hover': {
      transform: 'skewX(0)',
      background: 'rgba(255, 255, 255, 0.4)',
    },
  },
  futuristicText: {
    fontFamily: 'Orbitron, sans-serif',
    textShadow: `0 0 10px ${theme.palette.primary.main}`,
  },
}));


export default profileStyles;