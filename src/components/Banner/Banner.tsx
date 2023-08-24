import React from 'react';
import CardScroll from "@components/CardScroll";
// import styles from './Banner.module.scss';
// import {Box} from '@mui/material';
// import { Carousel } from 'antd';
// import Image from "next/image";

const Banner: React.FC = () => {

    const cards = [
        {
            id: 1,
            title: 'Скидка 15% в день рождения',
            about: 'Отметь свой день рождения с нами! Сделай заказ по телефону или в точке самовывоза и получи скидку 15%! Воспользоваться скидкой можно за день до и после дня рождения! Скидка единоразовая и не накладывается на другие акции, а также не распространяется на сеты и напитки. При получении заказа необходимо показать личный паспорт кассиру или курьеру. Заведение оставляет за собой право изменять условия акции.',
            img: '/images/banner/promo_60436d1c910f9504434024.1192.png'
        },
        {
            id: 2,
            title: 'Second',
            about: 'Отметь свой день рождения с нами! Сделай заказ по телефону или в точке самовывоза и получи скидку 15%! Воспользоваться скидкой можно за день до и после дня рождения! Скидка единоразовая и не накладывается на другие акции, а также не распространяется на сеты и напитки. При получении заказа необходимо показать личный паспорт кассиру или курьеру. Заведение оставляет за собой право изменять условия акции.',
            img: '/images/banner/eaa2c0509a822d5dea2200f7db69bbda.jpg'
        },
        {
            id: 3,
            title: 'Second',
            about: 'Отметь свой день рождения с нами! Сделай заказ по телефону или в точке самовывоза и получи скидку 15%! Воспользоваться скидкой можно за день до и после дня рождения! Скидка единоразовая и не накладывается на другие акции, а также не распространяется на сеты и напитки. При получении заказа необходимо показать личный паспорт кассиру или курьеру. Заведение оставляет за собой право изменять условия акции.',
            img: '/images/banner/293716a10f62adafe4ff2d8e570981fa.jpg'
        },
        {
            id: 4,
            title: 'Second',
            about: 'Отметь свой день рождения с нами! Сделай заказ по телефону или в точке самовывоза и получи скидку 15%! Воспользоваться скидкой можно за день до и после дня рождения! Скидка единоразовая и не накладывается на другие акции, а также не распространяется на сеты и напитки. При получении заказа необходимо показать личный паспорт кассиру или курьеру. Заведение оставляет за собой право изменять условия акции.',
            img: '/images/banner/8a7825b38e363c2cb8521c0acd235cee.jpg'
        },
        {
            id: 5,
            title: 'Second',

            about: 'Отметь свой день рождения с нами! Сделай заказ по телефону или в точке самовывоза и получи скидку 15%! Воспользоваться скидкой можно за день до и после дня рождения! Скидка единоразовая и не накладывается на другие акции, а также не распространяется на сеты и напитки. При получении заказа необходимо показать личный паспорт кассиру или курьеру. Заведение оставляет за собой право изменять условия акции.',
            img: '/images/banner/fea739416d652eec0ac42e81270c0a75.jpg'
        }
    ]

    return (
        <CardScroll cards={cards} />
        // <Box sx={{borderRadius: '15px', overflow: 'hidden' }}>
        //     <Carousel autoplay data-testid='carousel'>
        //         <div className={styles.imageContainer}>
        //             <Image className={styles.image} alt="banner" fill src={'/images/banner/promo_60436d1c910f9504434024.1192.png'} sizes='(max-width: 768px) 100vw' priority />
        //         </div>
        //         <div className={styles.imageContainer}>
        //             <Image className={styles.image} alt="banner" fill src={'/images/banner/eaa2c0509a822d5dea2200f7db69bbda.jpg'} sizes='(max-width: 768px) 100vw' priority />
        //         </div>
        //         <div className={styles.imageContainer}>
        //             <Image className={styles.image} alt="banner" fill src={'/images/banner/293716a10f62adafe4ff2d8e570981fa.jpg'} sizes='(max-width: 768px) 100vw' priority />
        //         </div>
        //         <div className={styles.imageContainer}>
        //             <Image className={styles.image} alt="banner" fill src={'/images/banner/8a7825b38e363c2cb8521c0acd235cee.jpg'} sizes='(max-width: 768px) 100vw' priority />
        //         </div>
        //         <div className={styles.imageContainer}>
        //             <Image className={styles.image} alt="banner" fill src={'/images/banner/fea739416d652eec0ac42e81270c0a75.jpg'} sizes='(max-width: 768px) 100vw' priority />
        //         </div>
        //     </Carousel>
        // </Box>
    );
};

export default Banner;
