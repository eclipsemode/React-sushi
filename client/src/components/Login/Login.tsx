import React from "react";
import styles from "./Login.module.css";
import { ApplyButton } from "components/UI";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAppDispatch } from "app/utils";
import { fetchUserLogin } from "features/login";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import  { ErrorMessage } from "@hookform/error-message";

type LoginProps = {
  setAuth: (value: boolean) => void;
}

type Inputs = {
  login: string,
  password: string,
};

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [passwordHidden, setPasswordHidden] = React.useState<boolean>(true);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [authorisationError, setAuthorisationError] = React.useState<JSX.Element | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const reloadPage = () => {
    navigate('/');
    navigate(0);
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const { payload } = await dispatch(fetchUserLogin({ login: data.login, password: data.password }));
    if (typeof payload === "string") return setAuthorisationError(<span className={styles.root__error}>Неправильный логин или пароль.</span>)
    reloadPage();
  };

  const handlePasswordHidden = (): void => {
    setPasswordHidden(!passwordHidden);
    passwordRef.current?.focus();
  };

  const clearError = (): void => {
    setAuthorisationError(null);
  }

  const handleAuth = () => {
    setAuth(false);
  };

  const loginError = (): JSX.Element | void => {
    if (errors.login?.type === 'required') {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>
    } else if (errors.login?.type === 'pattern') {
      return <span className={styles.root__error}>Введите ваш email.</span>
    }
  }

  const passwordError = (): JSX.Element | void => {
    if (errors.password?.type === 'required') {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>
    } else if (errors.password?.type === 'pattern') {
      return <span className={styles.root__error}>Пароль не должен содержать буквы кириллицы.</span>
    } else if (errors.password?.type === 'minLength') {
      return <span className={styles.root__error}>Пароль не может иметь меньше 8 символов.</span>
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.root}>
      <div className={styles.root__container}>
        <h1>Вход</h1>
        { authorisationError !== null ? authorisationError : '' }
        <ErrorMessage
          errors={errors}
          name="login"
          render={(): any => loginError()}
        />
        <input {...register('login', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
               className={styles.root__input + ' ' + (errors.login && styles.root__input_invalid)}
               name="login"
               placeholder="Имя пользователя" type="text"
               onFocus={clearError}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={(): any => passwordError()}
        />
        <div className={styles.root__password}>
          <input {...register('password', { required: true, pattern: /^[0-9a-zA-Z!@#$%^&*]+$/g, minLength: 8 })}
                 className={styles.root__input + ' ' + (errors.password && styles.root__input_invalid)}
                 name="password"
                 autoComplete="on"
                 placeholder="Пароль"
                 type={passwordHidden ? "password" : "text"}
                 onFocus={clearError}
          />
          {passwordHidden ? <HiEye onClick={() => handlePasswordHidden()} /> :
            <HiEyeOff onClick={() => handlePasswordHidden()} />}
        </div>
      </div>
      <ApplyButton>Войти</ApplyButton>
      <p>Впервые у нас? <span onClick={() => handleAuth()}>Зарегистрироваться</span></p>
    </div>
    </form>
  );
};

export default Login;