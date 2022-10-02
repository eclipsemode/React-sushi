import React from "react";
import styles from './Account.module.css';
import { Link } from "react-router-dom";

const Account: React.FC = () => {
  return (
    <div className={styles.root}>
        <div className={styles.root__head}>
          <Link className={styles.root__link} to={'/'}>Главная</Link>
          <p>/</p>
          <Link className={styles.root__link} to={''}>Профиль</Link>
          <p>/</p>
          <p className={styles.root__link2}>Профиль</p>
        </div>
    </div>
  );
};

export default Account;