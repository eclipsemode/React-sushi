import React from 'react';
import styles from './index.module.scss'

const HomeInfo = () => {
    return (
        <div className="container">
            <div className={styles.root}>
                <div className={styles.block}>
                    <div className={styles.contentTop}>
                        <h3 className={styles.delivery}>Доставка 0 ₽</h3>
                        <a href={'tel:88002002792'} className={styles.tel}>8 (800) 200-27-92</a>
                    </div>
                    <h1 className={styles.bottomContent}>Доставка курьером ресторана с 10:00 до 23:30</h1>
                </div>
            </div>
        </div>
    );
};

export default HomeInfo;