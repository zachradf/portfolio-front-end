import React from 'react';
import { Tooltip, IconButton, Typography, Box, Link } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

interface InfoIconProps {
  text: string;
  class?: string;
  style?: React.CSSProperties;
  code?: string;
  link?: string;
}

const InfoIcon: React.FC<InfoIconProps> = ({ link, style, text, code }) => {
  const hidden = useSelector((state: RootState) => state.infoIcon.hidden);
  if (hidden) return null;

  return (
    <Tooltip
      style={style}
      title={
        <Box sx={{ maxWidth: '600px' }}>
          <Typography variant="body2">
            {text}
            {link && (
              <Link href={link} target="_blank" style={{ marginLeft: 5 }}>
                Learn more
              </Link>
            )}
          </Typography>
          {code && (
            <Box
              mt={2}
              sx={{
                backgroundColor: '#000000',
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '10px',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                overflowX: 'auto',
                color: '#FFA500',
              }}
            >
              {code}
            </Box>
          )}
        </Box>
      }
      arrow
      sx={{
        [`& .MuiTooltip-tooltip`]: {
          maxWidth: '600px', // Adjust the max-width as needed
          fontSize: '1rem', // Adjust the font size as needed
          color: '#000000',
        },
      }}
    >
      <IconButton>
        <InfoOutlinedIcon />
      </IconButton>
    </Tooltip>
  );
};

export default InfoIcon;
