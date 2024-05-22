// // src/components/HideInfoButton.tsx
// import React from 'react';
// import { useDispatch } from 'react-redux';
// import { Button } from '@mui/material';
// import { toggleHidden } from '../features/infoIcon/infoIconSlice';
// import { AppDispatch } from '../app/store';

// const HideInfoButton: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();

//   return <Button onClick={() => dispatch(toggleHidden())}>Hide Info</Button>;
// };

// export default HideInfoButton;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { toggleHidden } from '../features/infoIcon/infoIconSlice';
import { AppDispatch, RootState } from '../app/store';

const HideInfoButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const hidden = useSelector((state: RootState) => state.infoIcon.hidden);

  return (
    <Button onClick={() => dispatch(toggleHidden())}>
      {hidden ? 'Show Info' : 'Hide Info'}
    </Button>
  );
};

export default HideInfoButton;
