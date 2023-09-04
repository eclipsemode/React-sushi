"use client"
import React from 'react';
import styles from './Footer.module.scss';
import { Skeleton, Stack } from '@mui/material';
import RouterPath from '@shared/utils/menuPath';
import { useAppSelector } from '@store/hooks';
import { DeviceType, selectAdaptiveServiceSlice } from '@store/features/adaptive';
import Link from "next/link";
import Image from "next/image";
import {selectLocation} from "@store/features/location/api";

const Footer: React.FC = () => {
    const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
    const { categories, categoriesStatus } = useAppSelector((state) => state.categoriesReducer);
    const {currentBranch} = useAppSelector(selectLocation);

    return (
        <footer id="footer" className={styles.root}>
            <div className="container">
                <Stack textAlign="center" justifyContent="space-between" spacing={2}>
                    <Stack
                        direction={deviceType === DeviceType.DESKTOP ? 'row' : 'column-reverse'}
                        justifyContent="space-between"
                    >
                        <Stack textAlign="left" spacing={2}>
                            <span
                                className={styles.tel}
                                style={{ textAlign: deviceType === DeviceType.DESKTOP ? 'left' : 'center' }}
                            >
                                8 (800) 200-27-92
                            </span>
                            <Stack
                                className={styles.stores}
                                direction="row"
                                justifyContent={deviceType === DeviceType.DESKTOP ? 'flex-start' : 'center'}
                                spacing={1}
                            >
                                <a
                                    href="https://apps.apple.com/us/app/%D0%BB%D0%B0%D0%B9%D0%BC-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%81%D1%83%D1%88%D0%B8-%D0%B8-%D0%BF%D0%B8%D1%86%D1%86%D1%8B/id1570970073?uo=4"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image src={'/images/stores/apple.png'} width={120} height={35} alt="app_store" />
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=ru.FoodSoul.StavropolLaym"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Image src={'/images/stores/android.png'} width={120} height={35} alt="google_play" />
                                </a>
                            </Stack>
                            <Stack
                                direction="row"
                                className={styles.links}
                                justifyContent={deviceType === DeviceType.DESKTOP ? 'flex-start' : 'center'}
                                spacing={2}
                            >
                                <Link href={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>Главная</Link>
                                <Link href={RouterPath.CONTACTS}>Контакты</Link>
                            </Stack>
                        </Stack>
                        <Stack className={styles.center} spacing={1} alignItems="center">
                            <Image src={'/images/logo.png'} width={150} priority height={50} alt="logo" />
                            <span>
                                город - <span style={{ fontWeight: 'bold' }}>{currentBranch}</span>
                            </span>
                            <span>Доставка с 10:00–23:30</span>
                        </Stack>
                        <Stack
                            className={styles.categories}
                            display={deviceType === DeviceType.DESKTOP ? 'auto' : 'none'}
                        >
                            {categoriesStatus === 'fulfilled'
                                ? categories.map((category) => (
                                      <Link href={`${RouterPath.CATEGORY}` + category.id} key={category.id}>
                                          {category.name}
                                      </Link>
                                  ))
                                : Array(10).map((_, index) => (
                                      <Skeleton key={index} width={120} height={21} animation="wave" />
                                  ))}
                        </Stack>
                    </Stack>

                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                    <span className={styles.about}>© 2010 - 2023 Ресторан японской кухни "Lime"</span>
                </Stack>
            </div>
        </footer>
    );
};

export default Footer;
