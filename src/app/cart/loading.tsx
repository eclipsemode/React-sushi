import React from 'react';
import { Skeleton } from '@mui/material';

const Loading = () => {
  return (
    <div className="container">
      <span>
        <Skeleton
          animation="wave"
          sx={{ transform: 'none', height: '500px', width: '100%' }}
        />
      </span>
    </div>
  );
};

export default Loading;
