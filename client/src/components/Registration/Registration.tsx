import React from "react";
import styles from "./Registration.module.css";
import { ApplyButton } from "../UI";
import { useAppDispatch } from "../../redux/hooks";
import { fetchRegistration } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";
import ValidationError from "../../error/ValidationError";
import InputMask from 'react-input-mask';

type RegistrationProps = {
  setAuth: (value: boolean) => void;
}

const Registration: React.FC<RegistrationProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [passwordSec, setPasswordSec] = React.useState<string>("");
  const [tel, setTel] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [house, setHouse] = React.useState<string>("");
  const [entrance, setEntrance] = React.useState<string>("");
  const [floor, setFloor] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");

  const [nameError, setNameError] = React.useState<string>("Имя не может быть пустым.");
  const [emailError, setEmailError] = React.useState<string>("Email не может быть пустым.");
  const [passwordError, setPasswordError] = React.useState<string>("Пароль не может быть пустым.");
  const [passwordSecError, setPasswordSecError] = React.useState<string>("");
  const [telError, setTelError] = React.useState<string>("Введите номер телефона.");

  const [formDirty, setFormDirty] = React.useState<boolean>(false);

  const handleAuth = () => {
    setAuth(true);
  };

  const handleSubmit = async () => {
    setFormDirty(true);

    if (nameError || emailError || passwordError || telError || passwordSecError) {
      throw new ValidationError("Необходимо заполнить все поля.");
    }

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
      return;
    }
    navigate("/");
  };

  const handleName = (value: string) => {
    const re = /^[a-zа-яё\s]+$/iu;
    setName(value);
    if (!value) {
      setNameError("Имя не может быть пустым.");
    } else if (!value.match(re)) {
      setNameError("Имя не может содержать цифры и специальные симовлы.");
    } else {
      setNameError("");
    }
  };

  const handleEmail = (value: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setEmail(value);

    if (!re.test(String(value).toLowerCase())) {
      setEmailError("Данный email некорректен.");
    } else {
      setEmailError("");
    }

    if (!value) {
      setEmailError("Email не может быть пустым.");
    }
  };

  const handlePassword = (value: string) => {
    const re = /^[0-9a-zA-Z!@#$%^&*]+$/g;
    setPassword(value);
    if (value !== passwordSec) {
      setPasswordSecError("Пароли не совпадают.");
    } else {
      setPasswordSecError("");
    }
    if (!value) {
      setPasswordError("Пароль не может быть пустым.");
    } else if (!value.match(re)) {
      setPasswordError("Пароль должен состоять из латинских букв и цифр.");
    } else if (value.length < 8) {
      setPasswordError("Пароль не может иметь меньше 8 символов.");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordSec = (value: string) => {
    setPasswordSec(value);

    if (value !== password) {
      setPasswordSecError("Пароли не совпадают.");
    } else {
      setPasswordSecError("");
    }
  };

  const handleTel = (value: string) => {
    setTel(value);

    if (value.length !== 18) {
      setTelError('Введите номер телефона.');
    } else {
      setTelError('');
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.root__container} name="reg_form">
        <h1>Регистрация</h1>
        {(nameError && formDirty) && <span className={styles.root__error}>{nameError}</span>}
        <input className={styles.root__input} placeholder="Имя" name="name" value={name}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleName(e.currentTarget.value)} type="text"
               required={true} />
        <input className={styles.root__input} placeholder="Фамилия" name="surname" value={surname}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.currentTarget.value)} type="text" />
        {(emailError && formDirty) && <span className={styles.root__error}>{emailError}</span>}
        <input className={styles.root__input} placeholder="Email" name="email" value={email} type="email"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleEmail(e.currentTarget.value)}
               required={true} />
        {(passwordError && formDirty) && <span className={styles.root__error}>{passwordError}</span>}
        <input className={styles.root__input} placeholder="Пароль" name="password" value={password} autoComplete="on"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePassword(e.currentTarget.value)}
               type="password"
               required={true} />
        {(passwordSecError && formDirty) && <span className={styles.root__error}>{passwordSecError}</span>}
        <input className={styles.root__input} placeholder="Повторите пароль" type="password" name="passwordSec"
               required={true} autoComplete="on"
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePasswordSec(e.currentTarget.value)} />
        {(telError && formDirty) && <span className={styles.root__error}>{telError}</span>}
        <InputMask className={styles.root__input} placeholder="+7 (xxx) xxx-xx-xx" name="tel" value={tel}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTel(e.currentTarget.value)} type="tel"
               required={true} mask="+7 (999) 999-99-99" maskChar='' />
        <input className={styles.root__input} placeholder="Улица" name="street" value={street}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.currentTarget.value)} type="text" />
        <div className={styles.root__address}>
          <input className={styles.root__input} placeholder="Дом" name="house" max="9999" value={house}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHouse(e.currentTarget.value)} type="number" />
          <input className={styles.root__input} placeholder="Подьезд" name="entrance" max="99" value={entrance}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEntrance(e.currentTarget.value)}
                 type="number" />
          <input className={styles.root__input} placeholder="Этаж" name="floor" max="99" value={floor}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFloor(e.currentTarget.value)} type="number" />
          <input className={styles.root__input} placeholder="Квартира" name="room" max="9999" value={room}
                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.currentTarget.value)} type="number" />
        </div>
      </form>
      <ApplyButton clickEvent={handleSubmit}>Регистрация</ApplyButton>
      <p>Есть аккаунт? <span onClick={() => handleAuth()}>Войти</span></p>
    </div>
  );
};

export default Registration;