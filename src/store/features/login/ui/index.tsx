import React from "react";
import styles from "./index.module.scss";
import { ApplyButton, Input } from "@shared/UI";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import { fetchUserLogin } from "@store/features/login/api";
import { useForm, SubmitHandler } from "react-hook-form";
import  { ErrorMessage } from "@hookform/error-message";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {enqueueSnackbar} from "notistack";
import {selectUser} from "@store/features/user";
import {useRouter} from "next/navigation";
import RouterPath from "@shared/utils/menuPath";

type LoginProps = {
  setAuth: (value: boolean) => void;
}

type Inputs = {
  login: string,
  password: string,
};

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [passwordHidden, setPasswordHidden] = React.useState<boolean>(true);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const { isAuth } = useAppSelector(selectUser);
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
  
  React.useEffect(() => {
    if (isAuth) {
      router.push(RouterPath.HOME)
    }
  }, [isAuth, router])

  const reloadPage = () => {
    window.location.reload();
  }

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      await dispatch(fetchUserLogin({ login: data.login, password: data.password })).unwrap();
      reloadPage();
    } catch (e) {
      enqueueSnackbar('Неверный логин или пароль', { variant: 'error' })
    }
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
        <Input label='Имя пользователя' name='login' error={!!errors.login} required={true} register={register}
        pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}
        />
          <Input label='Пароль' name='password' autoComplete='on' error={!!errors.login} required={true} register={register}
                 pattern={/^[0-9a-zA-Z!@#$%^&*]+$/g}
                 minLength={8}
                 endAdornment={passwordHidden ? <VisibilityIcon onClick={() => handlePasswordHidden()} /> :
                     <VisibilityOffIcon onClick={() => handlePasswordHidden()} />}
                 type={passwordHidden ? "password" : "text"}
          />
      </div>
      <ApplyButton>Войти</ApplyButton>
      <p>Впервые у нас? <span onClick={() => handleAuth()}>Зарегистрироваться</span></p>
    </div>
    </form>
  );
};

export default Login;