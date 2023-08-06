import React from 'react';
import {Box, Stack} from "@lib/mui";
import styles from './index.module.scss'
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contacts: React.FC = () => {
    return (
        <Stack>
            <Box>
                <iframe
                    className={styles.map}
                    title='Lime'
                    src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa56a5f3e96d73e99a9ed99917c0538a3c5ebc13bbb3e802256ab038edad1e71c&amp;source=constructor"
                    width="100%" height="400" frameBorder="0"></iframe>
            </Box>

            <Stack className={styles.bottom} rowGap='10px'>
                <Stack direction='row' columnGap='10px'>
                    <Box className={styles.box}>
                        <h2>Точки самовывоза</h2>
                        <Stack direction='row'>
                            <PlaceIcon/>
                            <Stack>
                                <span>Лайм</span>
                                <span>г. Армавир ул. Кропоткина, 194</span>
                                <span>тел. 8 (800) 200-27-92</span>
                            </Stack>
                        </Stack>
                    </Box>

                    <Box className={styles.box}>
                        <h2>Режим работы</h2>
                        <Stack direction='row'>
                            <AccessTimeIcon/>
                            <span>Ежедневно</span>
                            <span>10:00 - 23:30</span>
                        </Stack>
                    </Box>
                </Stack>
                <Box className={styles.box}>
                    <Stack spacing={2}>
                        <h2>О компании</h2>
                        <Stack justifyContent='flex-start' rowGap='10px'>
                            <span>Лайм суши — это японский-итальянский ресторан быстрого питания. Осуществляем бесплатную доставку, при заказе от 600 рублей в течении 1 часа.</span>
                            <span>Товары могут отличаться от фотографий соответствующих Товаров, представленных на сайте.</span>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>

        </Stack>
    );
};

export default Contacts;