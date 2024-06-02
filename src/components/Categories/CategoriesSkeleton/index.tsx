'use client';
import React from 'react';
import { Skeleton } from '@mui/material';

const CategoriesSkeleton = () => {
  return [...new Array(10)].map((_, index) => (
    <li key={index}>
      <Skeleton
        variant="rectangular"
        animation="wave"
        width={130}
        height={69}
        sx={{ borderRadius: '12px' }}
      />
    </li>
  ));
};

export default CategoriesSkeleton;
