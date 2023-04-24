import React from 'react';
import styles from './Banner.module.scss';
import BannerImg2 from 'app/assets/img/banner/eaa2c0509a822d5dea2200f7db69bbda.jpg';
import BannerImg3 from 'app/assets/img/banner/293716a10f62adafe4ff2d8e570981fa.jpg';
import BannerImg4 from 'app/assets/img/banner/8a7825b38e363c2cb8521c0acd235cee.jpg';
import BannerImg5 from 'app/assets/img/banner/fea739416d652eec0ac42e81270c0a75.jpg';
import BannerImg from 'app/assets/img/banner/promo_60436d1c910f9504434024.1192.png';
import { Box } from '@mui/material';
import { Carousel } from 'antd';

const Banner: React.FC = () => {
    return (
        <Box sx={{ marginBottom: '50px' }}>
            <Carousel autoplay>
                <div>
                    <img className={styles.image} alt="banner" src={BannerImg} loading="lazy" />
                </div>
                <div>
                    <img className={styles.image} alt="banner" src={BannerImg2} loading="lazy" />
                </div>
                <div>
                    <img className={styles.image} alt="banner" src={BannerImg3} loading="lazy" />
                </div>
                <div>
                    <img className={styles.image} alt="banner" src={BannerImg4} loading="lazy" />
                </div>
                <div>
                    <img className={styles.image} alt="banner" src={BannerImg5} loading="lazy" />
                </div>
            </Carousel>
        </Box>
    );
};

export default Banner;
