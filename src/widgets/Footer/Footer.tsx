import React from 'react';
import styles from './Footer.module.scss';
import { Skeleton, Stack } from '@mui/material';
import GooglePlayImg from 'app/assets/img/stores/android.png';
import AppleStoreImg from 'app/assets/img/stores/apple.png';
import LogoImg from 'app/assets/img/logo.png';
import { Link } from 'react-router-dom';
import RouterPath from '../../app/utils/menuPath';
import { useAppSelector } from '../../app/hooks';
import { selectCity } from '../../entities/city';
import { DeviceType, selectAdaptiveServiceSlice } from '../../processes/services/adaptiveService/adaptiveService';

const Footer: React.FC = () => {
    const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
    const { categories, categoriesStatus } = useAppSelector((state) => state.categoriesReducer);
    const { city } = useAppSelector(selectCity);

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
                                    <img src={AppleStoreImg} width="120px" alt="app_store" />
                                </a>
                                <a
                                    href="https://play.google.com/store/apps/details?id=ru.FoodSoul.StavropolLaym"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <img src={GooglePlayImg} width="120px" alt="google_play" />
                                </a>
                            </Stack>
                            <Stack
                                direction="row"
                                className={styles.links}
                                justifyContent={deviceType === DeviceType.DESKTOP ? 'flex-start' : 'center'}
                                spacing={2}
                            >
                                <Link to={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>Главная</Link>
                                <Link to={RouterPath.HOME}>Контакты</Link>
                            </Stack>
                        </Stack>
                        <Stack className={styles.center} spacing={1} alignItems="center">
                            <img src={LogoImg} width={150} alt="logo" />
                            <span>
                                город - <span style={{ fontWeight: 'bold' }}>{city}</span>
                            </span>
                            <span>Доставка с 10:00–23:30</span>
                        </Stack>
                        <Stack
                            className={styles.categories}
                            display={deviceType === DeviceType.DESKTOP ? 'auto' : 'none'}
                        >
                            {categoriesStatus === 'fulfilled'
                                ? categories.map((category) => (
                                      <Link to={`${RouterPath.CATEGORY}` + category.id} key={category.id}>
                                          {category.name}
                                      </Link>
                                  ))
                                : Array(10).map((_, index) => (
                                      <Skeleton key={index} width={120} height={21} animation="wave" />
                                  ))}
                        </Stack>
                    </Stack>
                    <span className={styles.about}>© 2010 - 2023 Ресторан японской кухни "Lime"</span>
                </Stack>
            </div>
        </footer>
    );
};

export default Footer;
