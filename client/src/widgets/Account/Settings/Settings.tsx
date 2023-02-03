import React from "react";
import { fetchPatchUserInfo, fetchUserInfo, IRegistrationProps } from "entities/user";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { TextInput } from "shared/UI";
import styles from "./Settings.module.css";

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

  const handleResetButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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

  const handleSubmitButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.confirm('Подтвердить изменение информации?');
    // @ts-ignore
    await dispatch(fetchPatchUserInfo({email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room}));
    window.location.reload();
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
      <form className={styles.root__infoContainer}>
        <div className={styles.root__info}>
          <div>
            <p>Имя: </p>
            <TextInput value={name} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
          </div>
          <div>
            <p>Фамилия: </p>
            <TextInput value={surname}
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => setSurname(e.target.value)} />
          </div>
          <div>
            <p>Email: </p>
            <TextInput value={email} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
          </div>
          <div>
            <p>Дата рождения: </p>
            <TextInput value={dateOfBirth}
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => setDateOfBirth(e.target.value)} />
          </div>
          <div>
            <p>Телефон: </p>
            <TextInput value={tel} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setTel(e.target.value)} />
          </div>
          <div>
            <p>Улица: </p>
            <TextInput value={street} onInput={(e: React.ChangeEvent<HTMLInputElement>) => setStreet(e.target.value)} />
          </div>
          <div>
            <p>Дом: </p>
            <TextInput value={house} type="number"
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => setHouse(e.target.value)} />
          </div>
          <div>
            <p>Подьезд: </p>
            <TextInput value={entrance} type="number"
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => setEntrance(e.target.value)} />
          </div>
          <div>
            <p>Этаж: </p>
            <TextInput value={floor} type="number"
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => setFloor(e.target.value)} />
          </div>
          <div>
            <p>Квартира: </p>
            <TextInput value={room} type="number"
                       onInput={(e: React.ChangeEvent<HTMLInputElement>) => setRoom(e.target.value)} />
          </div>
        </div>
        <div className={styles.root__buttons}>
          <button className={styles.root__btn_reset}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleResetButton(e)}><span>Вернуть</span>
          </button>
          <button className={styles.root__btn_submit}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleSubmitButton(e)}><span>Отправить</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Settings;