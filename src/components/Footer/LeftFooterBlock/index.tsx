import React from 'react';
import {Stack} from '@mui/material';
import {DeviceType} from '@store/features/adaptive';
import Image from 'next/image';
import styles from './index.module.scss';
import Link from 'next/link';
import RouterPath from '@shared/utils/menuPath';

interface IProps {
    deviceType: DeviceType;
}

const LeftFooterBlock = ({deviceType}: IProps) => {
    return (
        <Stack textAlign='left' spacing={2}>
              <span
                  className={styles.tel}
                  style={{
                      textAlign:
                          deviceType === DeviceType.DESKTOP ? 'left' : 'center',
                  }}>
                8 (800) 200-27-92
              </span>
            <Stack
                direction='row'
                justifyContent={
                    deviceType === DeviceType.DESKTOP ? 'flex-start' : 'center'
                }
                spacing={1}>
                <a
                    href='https://apps.apple.com/us/app/%D0%BB%D0%B0%D0%B9%D0%BC-%D0%B4%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%81%D1%83%D1%88%D0%B8-%D0%B8-%D0%BF%D0%B8%D1%86%D1%86%D1%8B/id1570970073?uo=4'
                    target='_blank'
                    rel='noreferrer'>
                    <Image
                        className='w-auto h-auto'
                        src={'/images/stores/apple.png'}
                        width={120}
                        height={35}
                        alt='app_store'
                    />
                </a>
                <a
                    href='https://play.google.com/store/apps/details?id=ru.FoodSoul.StavropolLaym'
                    target='_blank'
                    rel='noreferrer'
                >
                    <Image
                        className='h-auto w-auto'
                        src={'/images/stores/android.png'}
                        width={120}
                        height={35}
                        alt='google_play'
                    />
                </a>
            </Stack>
            <Stack
                direction='row'
                className={styles.links}
                justifyContent={
                    deviceType === DeviceType.DESKTOP ? 'flex-start' : 'center'
                }
                spacing={2}>
                <Link
                    href={RouterPath.HOME}
                    onClick={() => window.scrollTo(0, 0)}>
                    Главная
                </Link>
                <Link href={RouterPath.CONTACTS}>Контакты</Link>
            </Stack>
        </Stack>
    );
};

export default LeftFooterBlock;