import React from 'react';
import styles from './Rejected.module.css';

const Rejected: React.FC = () => {
    return (
        <section className={styles.root}>
            <h3>Произошла ошибка...</h3>
            <h4>Обратитесь по номеру доставки 8 800-200-27-92</h4>
        </section>
    );
};

export default Rejected;
