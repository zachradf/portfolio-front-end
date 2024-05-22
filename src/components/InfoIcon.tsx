import React from 'react';
import { Tooltip, IconButton, Typography, Box } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';

interface InfoIconProps {
  text: string;
  code?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ text, code }) => {
  const hidden = useSelector((state: RootState) => state.infoIcon.hidden);
  if (hidden) return null;

  return (
    <Tooltip
      title={
        <Box>
          <Typography variant="body2">{text}</Typography>
          {code && (
            <Box mt={2}>
              <Typography variant="body2" component="pre">
                {code}
              </Typography>
            </Box>
          )}
        </Box>
      }
      arrow
    >
      <IconButton>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoIcon;
