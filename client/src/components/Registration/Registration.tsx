import React from "react";
import styles from "./Registration.module.css";
import { ApplyButton } from "../UI";
import { registration } from "../../http/userAPI";

type RegistrationProps = {
  setAuth: (value: boolean) => void;
}

// type infoType = {
//   name: string,
//   surname?: string,
//   email: string,
//   password: string,
//   tel: string,
//   street?: string,
//   house?: number,
//   floor?: number,
//   entrance?: number,
//   room?: number
// }

// type infoType = [
//   name: string,
//   surname: string,
//   email: string,
//   password: string,
//   tel: string,
//   street: string,
//   house: number,
//   floor: number,
//   entrance: number,
//   room: number
// ]

const Registration: React.FC<RegistrationProps> = ({ setAuth }) => {
  // const [info, setInfo] = React.useState<infoType[]>();
  const handleAuth = () => {
    setAuth(true);
  };

  const handleSubmit = async () => {
    const form = document.forms[0];

    // setInfo([
    //   // @ts-ignore
    //   form.name.value,
    //   form.surname.value,
    //   form.email.value,
    //   form.password.value,
    //   form.tel.value,
    //   form.street.value,
    //   form.house.value,
    //   form.floor.value,
    //   form.entrance.value,
    //   form.room.value
    // ])

      const response = await registration(
        // @ts-ignore
        form.name.value,
        form.surname.value,
        form.email.value,
        form.password.value,
        form.tel.value,
        form.street.value,
        form.house.value,
        form.floor.value,
        form.entrance.value,
        form.room.value
      );
  }

  return (
    <div className={styles.root}>
      <form className={styles.root__container} name="reg_form">
        <h1>Регистрация</h1>
        <input className={styles.root__input} placeholder="Имя" name="name" type="text" required={true} />
        <input className={styles.root__input} placeholder="Фамилия" name="surname" type="text" />
        <input className={styles.root__input} placeholder="Email" name="email" type="email" required={true} />
        <input className={styles.root__input} placeholder="Пароль" name="password" type="password" required={true} />
        <input className={styles.root__input} placeholder="Повторите пароль" type="password" required={true} />
        <input className={styles.root__input} placeholder="Номер телефона" name="tel" type="text" required={true} />
        <input className={styles.root__input} placeholder="Улица" name="street" type="text" />
        <div className={styles.root__address}>
          <input className={styles.root__input} placeholder="Дом" name="house" type="number" />
          <input className={styles.root__input} placeholder="Подьезд" name="entrance" type="number" />
          <input className={styles.root__input} placeholder="Этаж" name="floor" type="number" />
          <input className={styles.root__input} placeholder="Квартира" name="room" type="number" />
        </div>
      </form>
      <ApplyButton clickEvent={handleSubmit}>Регистрация</ApplyButton>
      <p>Есть аккаунт? <span onClick={() => handleAuth()}>Войти</span></p>
    </div>
  );
};

export default Registration;