'use client';
import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import styles from './index.module.scss'

const Loading = () => {
  return (
    <Stack rowGap="40px" className={styles.container}>
      <span>
        <Skeleton
          animation="wave"
          sx={{ transform: 'none', height: '400px', width: '100%' }}
        />
      </span>
      <span>
        <Skeleton
          animation="wave"
          sx={{ transform: 'none', height: '212px', width: '100%' }}
        />
      </span>
    </Stack>
  );
};

export default Loading;
