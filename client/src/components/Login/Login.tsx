import React from "react";
import styles from './Login.module.css';
import { ApplyButton } from "../UI";

type LoginProps = {
  setAuth: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const handleAuth = () => {
    setAuth(false);
  }

  return (
    <div className={styles.root}>
      <form className={styles.root__container}>
      <input className={styles.root__input} placeholder="Имя пользователя" type="text" />
      <input className={styles.root__input} placeholder="Пароль" type="password" />
      </form>
      <ApplyButton>Войти</ApplyButton>
      <p>Впервые у нас? <span onClick={() => handleAuth()}>Зарегистрироваться</span></p>
    </div>
  );
};

export default Login;