import React from "react";
import styles from "./index.module.scss";
import { ApplyButton } from "shared/UI";
import { useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { fetchUserRegistration } from "features/registration/api";
import { ValidationError } from "shared/error";
import Input from "shared/UI/input";
import {Stack} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type RegistrationProps = {
  setAuth: (value: boolean) => void;
}

type FormInputs = {
  email: string,
  password: string,
  passwordRepeat: string,
  name: string,
  surname: string,
  dateOfBirth: Date,
  tel: string,
  street: string,
  house: number,
  entrance: number,
  floor: number,
  room: number
};

const Registration: React.FC<RegistrationProps> = ({ setAuth }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setError, watch, formState: { errors } } = useForm<FormInputs>();
  const [passwordHidden, setPasswordHidden] = React.useState<boolean>(true);

  const handlePasswordHidden = (): void => {
    setPasswordHidden(!passwordHidden);
  };
  const handleAuth = () => {
    setAuth(true);
  };

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const response = await dispatch(fetchUserRegistration({
      name: data.name,
      surname: data.surname ?? null,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      password: data.password,
      tel: data.tel,
      street: data.street ?? null,
      house: data.house ?? null,
      floor: data.floor ?? null,
      entrance: data.entrance ?? null,
      room: data.room ?? null
    }));
    if (response.meta.requestStatus === "rejected") {
      return new ValidationError(response.payload as any, setError);
    }
    navigate("/registered");
  };

  const nameError = (): JSX.Element | void => {
    if (errors.name?.type === "required") {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>;
    } else if (errors.name?.type === "validate") {
      return <span className={styles.root__error}>Имя не может содержать цифры и специальные символы.</span>;
    } else if (errors.name?.type === "maxLength") {
      return <span className={styles.root__error}>Имя не может быть слишком длинным.</span>;
    }
  };

  const emailError = (): JSX.Element | void => {
    if (errors.email?.type === "required") {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>;
    } else if (errors.email?.type === "pattern") {
      return <span className={styles.root__error}>Введите ваш email.</span>;
    } else if (errors.email?.type === 'custom') {
      return <span className={styles.root__error}>{errors.email?.message}</span>;
    }
  };

  const passwordError = (): JSX.Element | void => {
    if (errors.password?.type === "required") {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>;
    } else if (errors.password?.type === "minLength") {
      return <span className={styles.root__error}>Пароль не может иметь меньше 8 символов.</span>;
    }
  };

  const passwordRepeatError = (): JSX.Element | void => {
    if (errors.passwordRepeat?.type === "required") {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>;
    } else if (errors.passwordRepeat?.type === "minLength") {
      return <span className={styles.root__error}>Пароль не может иметь меньше 8 символов.</span>;
    } else if (errors.passwordRepeat?.type === "validate") {
      return <span className={styles.root__error}>Пароли не совпадают.</span>;
    }
  };

  const telError = (): JSX.Element | void => {
    if (errors.tel?.type === "required") {
      return <span className={styles.root__error}>Поле не может быть пустым.</span>;
    } else if (errors.tel?.type === "minLength") {
      return <span className={styles.root__error}>Введите номер телефона полностью.</span>;
    } else if (errors.tel?.type === 'custom') {
      return <span className={styles.root__error}>{errors.tel?.message}</span>;
    }

  };

  return (
    <form name="reg_form" onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.root}>
        <div className={styles.root__container}>
          <h1>Регистрация</h1>
          <ErrorMessage
            name="name"
            errors={errors}
            render={(): any => nameError()} />
            <Input error={!!errors.name} register={register} name='name' label='Имя' required={true} maxLength={20} validate={(value: string) => !!value.match(/^[a-zа-яё\s]+$/iu)}/>
          <Input register={register} name='surname' label='Фамилия' maxLength={20}/>
          <Input error={!!errors.dateOfBirth} register={register} name='dateOfBirth' label='Дата рождения' type='date' />
          <ErrorMessage
            name="email"
            errors={errors}
            render={(): any => emailError()} />
          <Input error={!!errors.email} register={register} name='email' label='Email' required={true} pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/}/>
          <ErrorMessage
            name="password"
            errors={errors}
            render={(): any => passwordError()} />
          <Input autoComplete='on' error={!!errors.password} register={register}
                 endAdornment={passwordHidden ? <VisibilityIcon onClick={() => handlePasswordHidden()} /> :
                     <VisibilityOffIcon onClick={() => handlePasswordHidden()} />}
                 type={passwordHidden ? "password" : "text"}
                 name='password' label='Пароль' required={true} minLength={8}/>
          <ErrorMessage
            name="passwordRepeat"
            errors={errors}
            render={(): any => passwordRepeatError()} />
          <Input autoComplete='on' error={!!errors.passwordRepeat} register={register}
                 endAdornment={passwordHidden ? <VisibilityIcon onClick={() => handlePasswordHidden()} /> :
                     <VisibilityOffIcon onClick={() => handlePasswordHidden()} />}
                 type={passwordHidden ? "password" : "text"}
                 name='passwordRepeat' label='Повторите пароль' required={true} minLength={8} validate={(value: string): any => value !== watch("password") ? "Пароли не совпадают." : null}/>
          <ErrorMessage
            name="tel"
            errors={errors}
            render={(): any => telError()} />
          <Input inputMask={true} error={!!errors.tel} register={register} name='tel' mask='+7 (999) 999-99-99' maskChar='' label='+7 (xxx) xxx-xx-xx' type='tel' required={true} minLength={18} />
          <Input register={register} name='street' label='Улица'/>
          <Stack spacing={2}>
            <Stack direction='row' spacing={2}>
            <Input register={register} name='house' label='Дом' type='number'/>
            <Input register={register} name='entrance' label='Подьезд' type='number'/>
            </Stack>
            <Stack direction='row' spacing={2}>
            <Input register={register} name='floor' label='Этаж' type='number'/>
            <Input register={register} name='room' label='Квартира' type='number'/>
            </Stack>
          </Stack>
        </div>
        <ApplyButton>Регистрация</ApplyButton>
        <p>Есть аккаунт? <span onClick={() => handleAuth()}>Войти</span></p>
      </div>
    </form>
  );
};

export default Registration;