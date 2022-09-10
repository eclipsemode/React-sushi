import React from "react";
import styles from "./Registration.module.css";
import { ApplyButton } from "../UI";

type RegistrationProps = {
  setAuth: (value: boolean) => void;
}

const Registration: React.FC<RegistrationProps> = ({ setAuth }) => {
  const handleAuth = () => {
    setAuth(true);
  };

  return (
    <div className={styles.root}>
      <form className={styles.root__container}>
        <h1>Регистрация</h1>
        <input className={styles.root__input} placeholder="Имя" type="text" required={true} />
        <input className={styles.root__input} placeholder="Фамилия" type="text" />
        <input className={styles.root__input} placeholder="Email" type="email" required={true} />
        <input className={styles.root__input} placeholder="Пароль" type="password" required={true} />
        <input className={styles.root__input} placeholder="Повторите пароль" type="password" required={true} />
        <input className={styles.root__input} placeholder="Номер телефона" type="text" required={true} />
        <input className={styles.root__input} placeholder="Улица" type="text" />
        <div className={styles.root__address}>
          <input className={styles.root__input} placeholder="Дом" type="number" />
          <input className={styles.root__input} placeholder="Подьезд" type="number" />
          <input className={styles.root__input} placeholder="Этаж" type="number" />
          <input className={styles.root__input} placeholder="Квартира" type="number" />
        </div>
      </form>
      <ApplyButton>Регистрация</ApplyButton>
      <p>Есть аккаунт? <span onClick={() => handleAuth()}>Войти</span></p>
    </div>
  );
};

export default Registration;