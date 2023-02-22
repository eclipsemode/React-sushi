import React from "react";
import styles from "./index.module.css";
import { ApplyButton } from "shared/UI";
import { useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
// import { BsAsterisk } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

import { fetchUserRegistration } from "features/registration/api";
import { ValidationError } from "shared/error";

type RegistrationProps = {
  setAuth: (value: boolean) => void;
}

type FormInputs = {
  email: string,
  password: string,
  passwordRepeat: string,
  name: string,
  surname: string,
  dateOfBirth: string,
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

  const handleAuth = () => {
    setAuth(true);
  };

  const onSubmit: SubmitHandler<FormInputs> = async data => {
    const response = await dispatch(fetchUserRegistration({
      name: data.name,
      surname: data.surname,
      dateOfBirth: data.dateOfBirth,
      email: data.email,
      password: data.password,
      tel: data.tel,
      street: data.street,
      house: data.house,
      floor: data.floor,
      entrance: data.entrance,
      room: data.room
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
          <p className={styles.root__topInfo}>* - Обязательные поля.</p>
          <ErrorMessage
            name="name"
            errors={errors}
            render={(): any => nameError()} />
          <div className={styles.root__requiredBlock}>
            <input className={styles.root__input_required + " " + (errors.name && styles.root__input_invalid)}
                   {...register("name", {
                     required: true,
                     maxLength: 20,
                     validate: (value: string) => !!value.match(/^[a-zа-яё\s]+$/iu)
                   })}
                   placeholder="Имя"
                   type="text" />
            *
          </div>
          <input className={styles.root__input}
                 placeholder="Фамилия"
                 {...register("surname")}
                 type="text" />
          <InputMask className={styles.root__input}
                     {...register("dateOfBirth")}
                     placeholder="Дата рождения"
                     type="text"
                     mask="99/99/9999" />
          <ErrorMessage
            name="email"
            errors={errors}
            render={(): any => emailError()} />
          <div className={styles.root__requiredBlock}>
            <input className={styles.root__input_required + " " + (errors.email && styles.root__input_invalid)}
                   {...register("email", {
                     required: true,
                     pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                   })}
                   placeholder="Email"
                   type="text" />
            *
          </div>
          <ErrorMessage
            name="password"
            errors={errors}
            render={(): any => passwordError()} />
          <div className={styles.root__requiredBlock}>
            <input className={styles.root__input_required + " " + (errors.password && styles.root__input_invalid)}
                   {...register("password", { required: true, minLength: 8 })}
                   placeholder="Пароль"
                   type="password" />
            *
          </div>
          <ErrorMessage
            name="passwordRepeat"
            errors={errors}
            render={(): any => passwordRepeatError()} />
          <div className={styles.root__requiredBlock}>
            <input className={styles.root__input_required + " " + (errors.passwordRepeat && styles.root__input_invalid)}
                   {...register("passwordRepeat", {
                     required: true,
                     minLength: 8,
                     validate: (value: string): any => value !== watch("password") ? "Пароли не совпадают." : null
                   })}
                   placeholder="Повторите пароль"
                   type="password"
                   autoComplete="on" />
            *
          </div>
          <ErrorMessage
            name="tel"
            errors={errors}
            render={(): any => telError()} />
          <div className={styles.root__requiredBlock}>
            <InputMask className={styles.root__input_required + " " + (errors.tel && styles.root__input_invalid)}
                       {...register("tel", { required: true, minLength: 18 })}
                       placeholder="+7 (xxx) xxx-xx-xx"
                       type="tel"
                       mask="+7 (999) 999-99-99"
                       maskChar="" />
            *
          </div>
          <input className={styles.root__input}
                 {...register("street")}
                 placeholder="Улица"
                 type="text" />
          <div className={styles.root__address}>
            <input className={styles.root__input}
                   {...register("house")}
                   placeholder="Дом"
                   max="9999"
                   type="number" />
            <input className={styles.root__input}
                   {...register("entrance")}
                   placeholder="Подьезд"
                   max="99"
                   type="number" />
            <input className={styles.root__input}
                   {...register("floor")}
                   placeholder="Этаж"
                   max="99"
                   type="number" />
            <input className={styles.root__input}
                   {...register("room")}
                   placeholder="Квартира"
                   max="9999"
                   type="number" />
          </div>
        </div>
        <ApplyButton>Регистрация</ApplyButton>
        <p>Есть аккаунт? <span onClick={() => handleAuth()}>Войти</span></p>
      </div>
    </form>
  );
};

export default Registration;