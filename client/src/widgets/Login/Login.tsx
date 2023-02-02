import React from "react";
import styles from "./Login.module.css";
import { ApplyButton } from "shared/UI";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useAppDispatch } from "app/hooks";
import { fetchUserLogin } from "features/login";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import  { ErrorMessage } from "@hookform/error-message";
import { ValidationError } from "../../shared/error";

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
  const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();

  const reloadPage = () => {
    navigate('/');
    navigate(0);
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    const response: any = await dispatch(fetchUserLogin({ login: data.login, password: data.password }));
    if (response.meta.requestStatus === 'rejected') {
      return new ValidationError(response.payload, setError)
    }
    reloadPage();
  };

  const handlePasswordHidden = (): void => {
    setPasswordHidden(!passwordHidden);
    passwordRef.current?.focus();
  };

  const handleAuth = () => {
    setAuth(false);
  };

  const loginError = (): JSX.Element | void => {
    if (errors.login?.type === 'required') {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>
    } else if (errors.login?.type === 'pattern') {
      return <span className={styles.root__error}>Введите ваш email.</span>
    } else if (errors.login?.type === 'custom') {
      return <span className={styles.root__error}>{errors.login?.message}</span>
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className={styles.root}>
      <div className={styles.root__container}>
        <h1>Вход</h1>
        <ErrorMessage
          errors={errors}
          name="login"
          render={(): any => loginError()}
        />
        <input {...register('login', { required: true, pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
               className={styles.root__input + ' ' + (errors.login && styles.root__input_invalid)}
               name="login"
               placeholder="Имя пользователя" type="text"
        />
        <div className={styles.root__password}>
          <input {...register('password', { required: true, pattern: /^[0-9a-zA-Z!@#$%^&*]+$/g, minLength: 8 })}
                 className={styles.root__input + ' ' + (errors.password && styles.root__input_invalid)}
                 name="password"
                 autoComplete="on"
                 placeholder="Пароль"
                 type={passwordHidden ? "password" : "text"}
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