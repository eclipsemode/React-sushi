import React from "react";
import styles from "./Registration.module.css";
import { ApplyButton } from "../UI";
import { useAppDispatch } from "../../redux/hooks";
import { fetchRegistration } from "../../redux/features/userSlice";

type RegistrationProps = {
  setAuth: (value: boolean) => void;
}

const Registration: React.FC<RegistrationProps> = ({ setAuth }) => {
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [tel, setTel] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [house, setHouse] = React.useState<string>("");
  const [entrance, setEntrance] = React.useState<string>("");
  const [floor, setFloor] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");
  const handleAuth = () => {
    setAuth(true);
  };

  const handleSubmit = async () => {
    try {
      await dispatch(fetchRegistration({
        name,
        surname,
        email,
        password,
        tel,
        street,
        house,
        floor,
        entrance,
        room
      }));
    } catch (e) {

    }

  };

  return (
    <div className={styles.root}>
      <form className={styles.root__container} name="reg_form">
        <h1>Регистрация</h1>
        <input className={styles.root__input} placeholder="Имя" name="name" value={name}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)} type="text"
               required={true} />
        <input className={styles.root__input} placeholder="Фамилия" name="surname" value={surname}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.currentTarget.value)} type="text" />
        <input className={styles.root__input} placeholder="Email" name="email" value={email} type="email"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)} required={true} />
        <input className={styles.root__input} placeholder="Пароль" name="password" value={password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)} type="password"
               required={true} />
        <input className={styles.root__input} placeholder="Повторите пароль" type="password" required={true} />
        <input className={styles.root__input} placeholder="Номер телефона" name="tel" value={tel}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTel(e.currentTarget.value)} type="text"
               required={true} />
        <input className={styles.root__input} placeholder="Улица" name="street" value={street}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.currentTarget.value)} type="text" />
        <div className={styles.root__address}>
          <input className={styles.root__input} placeholder="Дом" name="house" value={house}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHouse(e.currentTarget.value)} type="number" />
          <input className={styles.root__input} placeholder="Подьезд" name="entrance" value={entrance}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEntrance(e.currentTarget.value)}
                 type="number" />
          <input className={styles.root__input} placeholder="Этаж" name="floor" value={floor}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFloor(e.currentTarget.value)} type="number" />
          <input className={styles.root__input} placeholder="Квартира" name="room" value={room}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.currentTarget.value)} type="number" />
        </div>
      </form>
      <ApplyButton clickEvent={handleSubmit}>Регистрация</ApplyButton>
      <p>Есть аккаунт? <span onClick={() => handleAuth()}>Войти</span></p>
    </div>
  );
};

export default Registration;