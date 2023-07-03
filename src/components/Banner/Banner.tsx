import React from 'react';
import styles from './Banner.module.scss';
import { Box } from '@mui/material';
import { Carousel } from 'antd';
import Image from "next/image";

const Banner: React.FC = () => {
    return (
        <Box sx={{ marginBottom: '50px' }}>
            <Carousel autoplay>
                <div>
                    <Image className={styles.image} alt="banner" width={1000} height={1000} src={'/images/banner/promo_60436d1c910f9504434024.1192.png'} loading="lazy" />
                </div>
                <div>
                    <Image className={styles.image} alt="banner" width={1000} height={1000} src={'/images/banner/eaa2c0509a822d5dea2200f7db69bbda.jpg'} loading="lazy" />
                </div>
                <div>
                    <Image className={styles.image} alt="banner" width={1000} height={1000} src={'/images/banner/293716a10f62adafe4ff2d8e570981fa.jpg'} loading="lazy" />
                </div>
                <div>
                    <Image className={styles.image} alt="banner" width={1000} height={1000} src={'/images/banner/8a7825b38e363c2cb8521c0acd235cee.jpg'} loading="lazy" />
                </div>
                <div>
                    <Image className={styles.image} alt="banner" width={1000} height={1000} src={'/images/banner/fea739416d652eec0ac42e81270c0a75.jpg'} loading="lazy" />
                </div>
            </Carousel>
        </Box>
    );
};

export default Banner;
