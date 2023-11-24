import React from 'react';
import { Skeleton } from '@mui/material';
import styles from './index.module.scss'

const Pending: React.FC = () => {
  return (
    <section className={styles.products}>
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
