import React, { FormEvent } from "react";
import { fetchPatchUserInfo, fetchUserInfo, IRegistrationProps } from "entities/user";
import { useAppDispatch, useAppSelector } from "app/hooks";
import styles from "./Settings.module.css";
import FormInput from "shared/UI/FormInput";
import { Modal } from "antd";

const Settings: React.FC = () => {
  const [userInfo, setUserInfo] = React.useState<IRegistrationProps>();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector(state => state.userReducer);
  const [name, setName] = React.useState<string>("");
  const [surname, setSurname] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [dateOfBirth, setDateOfBirth] = React.useState<string>("");
  const [tel, setTel] = React.useState<string>("");
  const [street, setStreet] = React.useState<string>("");
  const [house, setHouse] = React.useState<number | string>(0);
  const [entrance, setEntrance] = React.useState<number | string>(0);
  const [floor, setFloor] = React.useState<number | string>(0);
  const [room, setRoom] = React.useState<number | string>(0);

  const handleResetButton = () => {
    window.scrollTo({
      top: 0
    });
    if (userInfo) {
      setName(userInfo.name);
      setSurname(userInfo.surname);
      setEmail(userInfo.email);
      setDateOfBirth(userInfo.dateOfBirth);
      setTel(userInfo.tel);
      setStreet(userInfo.street);
      setHouse(userInfo.house);
      setEntrance(userInfo.entrance);
      setFloor(userInfo.floor);
      setRoom(userInfo.room);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    confirm(event);
  }

  const confirm = (event: FormEvent<HTMLFormElement>) => {
    Modal.confirm({
      title: 'Подтвердите изменение данных.',
      onCancel: () => event.preventDefault(),
      onOk: async () => {
        await dispatch(fetchPatchUserInfo({email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room}));
        success();
      }
    })
  }

  const success = () => {
    Modal.success({
      title: "Ваш профиль изменен.",
      onOk: () => window.location.reload()
    });
  };

  React.useEffect(() => {
    if (user && isAuth) {
      (async function getUserInfo() {
        const { payload } = await dispatch(fetchUserInfo());
        const payloadData = payload as unknown as IRegistrationProps;
        setUserInfo(payload as IRegistrationProps);
        setName(payloadData.name);
        setSurname(payloadData.surname);
        setEmail(payloadData.email);
        setDateOfBirth(payloadData.dateOfBirth);
        setTel(payloadData.tel);
        setStreet(payloadData.street);
        setHouse(payloadData.house);
        setEntrance(payloadData.entrance);
        setFloor(payloadData.floor);
        setRoom(payloadData.room);
      })();
    }
  }, [dispatch, user, isAuth]);

  return (
    <section className={styles.root}>
      <form onReset={handleResetButton} onSubmit={(event) => onSubmit(event)} name='settings'>
        <FormInput type='text' name='name' value={userInfo?.name} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}>Имя</FormInput>
        <FormInput type='text' name='surname' value={surname} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)}>Фамилия</FormInput>
        <FormInput type='email' name='email' value={email} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}>Email</FormInput>
        <FormInput type='text' name='dateOfBirth' mask="99/99/9999" maskChar="_" value={dateOfBirth} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)}>Дата Рождения</FormInput>
        <FormInput type='text' name='tel' mask="+7 (999) 999-99-99" maskChar="" placeholder="+7 (xxx) xxx-xx-xx" value={tel} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setTel(e.target.value)}>Телефон</FormInput>
        <div className={styles.root__street}>
          <FormInput type='text' name='street' value={street} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)}>Улица</FormInput>
          <FormInput type='number' name='house' value={house} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setHouse(e.target.value)}>Дом</FormInput>
        </div>
        <div className={styles.root__additional}>
          <FormInput type='number' name='entrance' value={entrance} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setEntrance(e.target.value)}>Подъезд</FormInput>
          <FormInput type='number' name='floor' value={floor} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setFloor(e.target.value)}>Этаж</FormInput>
          <FormInput type='number' name='room' value={room} inputEvent={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)}>Квартира</FormInput>
        </div>

        <div className={styles.root__buttons}>
          <input type='reset'
                 className={styles.root__btn_reset}
                 />
          <input type='submit'
                 className={styles.root__btn_submit} />
        </div>
      </form>
    </section>
  );
};

export default Settings;