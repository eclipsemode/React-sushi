'use client';
import React from 'react';
import AsideMenu from '@components/Account/AsideMenu';
import { useAppSelector } from '@store/hooks';
import { selectUser } from '@store/features/user';
import { selectAuth } from '@store/features/auth/api';
import BreadCrumbs from '@components/Account/BreadCrumbs';
import styles from './index.module.scss';
import Auth from '@components/Auth';

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  const { user, isAuth } = useAppSelector(selectUser);
  const { authLoadSaveProcess } = useAppSelector(selectAuth);

  return isAuth ? (
    <div className={styles.layout__container}>
      <div className={styles.layout__innerContainer}>
        <BreadCrumbs authLoadSaveProcess={authLoadSaveProcess} />

        <div className={styles.layout__body}>
          <AsideMenu isAdmin={user?.role === 'ADMIN'} />
          <section className={styles.layout__section}>{children}</section>
        </div>

      </div>
    </div>
  ) : <Auth/>
}