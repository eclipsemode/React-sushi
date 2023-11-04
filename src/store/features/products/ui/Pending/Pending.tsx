import React from 'react';
import { Skeleton } from '@mui/material';

const Pending: React.FC = () => {
  return (
    <section className="content__items">
      {[...new Array(4)].map((_, index) => (
        <Skeleton
          variant="rectangular"
          width={306}
          height={386.83}
          animation="wave"
          sx={{ borderRadius: '12px' }}
          key={index}
        />
      ))}
    </section>
  );
};

export default Pending;
