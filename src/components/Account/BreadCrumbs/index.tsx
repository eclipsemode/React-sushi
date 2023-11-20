import React from 'react';
import Link from 'next/link';
import RouterPath from '@shared/utils/menuPath';
import { Breadcrumbs, Skeleton, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import menuPath from '@shared/utils/menuPath';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './index.module.scss';

interface IProps {
  authLoadSaveProcess: boolean;
}

const BreadCrumbs = ({ authLoadSaveProcess }: IProps) => {
  const pathname = usePathname();

  const breadcrumbs = [
    <Link key={1} href={RouterPath.HOME}>
      Главная
    </Link>,
    <Link key={2} href={RouterPath.PROFILE}>
      Аккаунт
    </Link>,
    <Typography key={3}>
      {authLoadSaveProcess ? (
        <Skeleton animation='wave' height={24} width={100} />
      ) : pathname === menuPath.ACCOUNT_MAIN ? (
        'Мой профиль'
      ) : pathname === menuPath.ACCOUNT_HISTORY ? (
        'История заказов'
      ) : pathname === menuPath.ACCOUNT_EDIT ? (
        'Редактировать профиль'
      ) : (
        'Админ-панель'
      )}
    </Typography>,
  ];

  return (
    <div className={styles.root}>
      <Breadcrumbs
        className={styles.breadcrumbs}
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;