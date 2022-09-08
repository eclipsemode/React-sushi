import React from "react";
import styles from "./Login.module.css";
import { ApplyButton } from "../UI";

type LoginProps = {
  setAuth: (value: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const [login, setLogin] = React.useState<string>("");
  const [loginError, setLoginError] = React.useState<string>("Логин не может быть пустым.");
  const [loginDirty, setLoginDirty] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [passwordError, setPasswordError] = React.useState<string>("Пароль не может быть пустым.");
  const [passwordDirty, setPasswordDirty] = React.useState<boolean>(false);

  const blurHandle = (e: React.FocusEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case "login":
        setLoginDirty(true);
        if (!login) {
          setLoginError('Логин не может быть пустым.')
        }
        break;
      case "password":
        setPasswordDirty(true);
        if (!password) {
          setPasswordError('Пароль не может быть пустым.')
        }
        break;
      default:
        setLoginDirty(false);
        setPasswordDirty(false);
        break;
    }
  };

  const handleLogin = (value: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    setLogin(value);

    if (!re.test(String(value).toLowerCase())) {
        setLoginError('Данный email неккоректен.')
    } else {
      setLoginError('')
    }
  };

  const handlePassword = (value: string) => {
    setPassword(value);
  };


  const handleAuth = () => {
    setAuth(false);
  };

  return (
    <div className={styles.root}>
      <form className={styles.root__container}>
        {(loginError && loginDirty) && <span className={styles.root__error}>{loginError}</span>}
        <input className={styles.root__input} value={login} name="login" onBlur={(e) => blurHandle(e)}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLogin(e.currentTarget.value)}
               placeholder="Имя пользователя" type="text" />
        {(passwordError && passwordDirty) && <span className={styles.root__error}>{passwordError}</span>}
        <input className={styles.root__input} value={password} name="password" onBlur={(e) => blurHandle(e)}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePassword(e.currentTarget.value)}
               placeholder="Пароль" type="password" />
      </form>
      <ApplyButton>Войти</ApplyButton>
      <p>Впервые у нас? <span onClick={() => handleAuth()}>Зарегистрироваться</span></p>
    </div>
  );
};

export default Login;