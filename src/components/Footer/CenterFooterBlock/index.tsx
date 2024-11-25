import React from 'react';
import {Stack} from '@mui/material';
import styles from './index.module.scss';
import Image from 'next/image';
import {IBranch} from '@store/features/branch/api';

interface IProps {
    currentBranch: IBranch | null;
}

const CenterFooterBlock = ({currentBranch}: IProps) => {
    return (
        <Stack className={styles.center} spacing={1} alignItems="center">
            <Image
                className='w-auto h-auto'
                src={'/images/logo.png'}
                width={150}
                height={50}
                priority
                alt="logo"
            />
            <span>
        город -{' '}
                <span style={{fontWeight: 'bold'}}>{currentBranch?.name}</span>
      </span>
            <span>Доставка с 10:00–23:30</span>
        </Stack>
    );
};

export default CenterFooterBlock;
