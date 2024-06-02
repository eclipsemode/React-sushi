'use client';
import React from 'react';
import styles from './index.module.scss';
import { Stack } from '@mui/material';
import { useAppSelector } from '@store/hooks';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import { selectBranch } from '@store/features/branch/api';
import LeftFooterBlock from './LeftFooterBlock';
import CenterFooterBlock from '@components/Footer/CenterFooterBlock';
import RightFooterBlock from '@components/Footer/RightFooterBlock';

const Footer: React.FC = () => {
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { categories, categoriesStatus } = useAppSelector(
    (state) => state.categoriesReducer
  );
  const { currentBranch } = useAppSelector(selectBranch);

  return (
    <footer className={styles.root}>
      <div className={styles.container}>
        <Stack textAlign="center" justifyContent="space-between" spacing={2}>
          <Stack
            direction={
              deviceType === DeviceType.DESKTOP ? 'row' : 'column-reverse'
            }
            justifyContent="space-between"
          >
            <LeftFooterBlock deviceType={deviceType} />
            <CenterFooterBlock currentBranch={currentBranch} />
            <RightFooterBlock
              deviceType={deviceType}
              categoriesStatus={categoriesStatus}
              categories={categories}
            />
          </Stack>

          <span className={styles.about}>
            © 2010 - 2024 Ресторан японской кухни &quot;Lime&quot;
          </span>
        </Stack>
      </div>
    </footer>
  );
};

export default Footer;
