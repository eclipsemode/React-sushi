import React from "react";
import styles from './Login.module.css';
import { ApplyButton } from "../UI";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
      <input className={styles.root__input} placeholder="Имя пользователя" type="text" />
      <input className={styles.root__input} placeholder="Пароль" type="password" />
      </div>
      <ApplyButton>Войти</ApplyButton>
      <p>Впервые у нас? <Link to="/">Зарегистрироваться</Link></p>
    </div>
  );
};

export default Login;