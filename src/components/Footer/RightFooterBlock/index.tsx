import React from 'react';
import { Skeleton, Stack } from '@mui/material';
import styles from './index.module.scss';
import { DeviceType } from '@store/features/adaptive';
import Link from 'next/link';
import RouterPath from '@shared/utils/menuPath';
import { TAsyncThunkStatus } from '@store/model/asyncThunkModel';
import { ICategory } from '@store/features/categories/model';

interface IProps {
  deviceType: DeviceType;
  categoriesStatus: TAsyncThunkStatus;
  categories: ICategory[];
}

const RightFooterBlock = ({
  deviceType,
  categoriesStatus,
  categories,
}: IProps) => {
  return (
    <Stack
      className={styles.categories}
      display={deviceType === DeviceType.DESKTOP ? 'auto' : 'none'}
    >
      {categoriesStatus === 'fulfilled'
        ? categories.map((category) => (
            <Link
              href={`${RouterPath.CATEGORY}` + category.id}
              key={category.id}
            >
              {category.name}
            </Link>
          ))
        : Array(10).map((_, index) => (
            <Skeleton key={index} width={120} height={21} animation="wave" />
          ))}
    </Stack>
  );
};

export default RightFooterBlock;
