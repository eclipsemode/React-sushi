import React from 'react';
import { Stack } from '@mui/material';
import styles from './index.module.scss';
import Image from 'next/image';

interface IProps {
  currentBranch: string;
}

const CenterFooterBlock = ({ currentBranch }: IProps) => {
  return (
    <Stack className={styles.center} spacing={1} alignItems='center'>
      <Image
        src={'/images/logo.png'}
        width={150}
        priority
        height={50}
        alt='logo' />
      <span>
                город -{' '}
        <span style={{ fontWeight: 'bold' }}>{currentBranch}</span>
              </span>
      <span>Доставка с 10:00–23:30</span>
    </Stack>
  );
};

export default CenterFooterBlock;