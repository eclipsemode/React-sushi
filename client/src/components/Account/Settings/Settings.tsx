import React from "react";
import { fetchUserInfo, IRegistrationProps } from "../../../redux/features/userSlice";
import { useAppDispatch } from "../../../redux/hooks";
import TextInput from "../../UI/TextInput/TextInput";
import styles from "./Settings.module.css";

const Settings: React.FC = () => {
  const [user, setUser] = React.useState<IRegistrationProps | null>(null);
  const dispatch = useAppDispatch();
  const [name, setName] = React.useState<string | undefined>("");
  const [surname, setSurname] = React.useState<string | undefined>("");
  const [email, setEmail] = React.useState<string | undefined>("");
  const [dateOfBirth, setDateOfBirth] = React.useState<string | undefined>("");
  const [tel, setTel] = React.useState<string | undefined>("");
  const [street, setStreet] = React.useState<string | undefined>("");
  const [house, setHouse] = React.useState<number | string | undefined>(0);
  const [entrance, setEntrance] = React.useState<number | string | undefined>(0);
  const [floor, setFloor] = React.useState<number | string | undefined>(0);
  const [room, setRoom] = React.useState<number | string | undefined>(0);

  const handleResetButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.scrollTo({
      top: 0
    });
    setName(user?.name);
    setSurname(user?.surname);
    setEmail(user?.email);
    setDateOfBirth(user?.dateOfBirth);
    setTel(user?.tel);
    setStreet(user?.street);
    setHouse(user?.house);
    setEntrance(user?.entrance);
    setFloor(user?.floor);
    setRoom(user?.room);
  }

  React.useEffect(() => {
    (async function getUserInfo() {
      const { payload } = await dispatch(fetchUserInfo());
      const payloadData = payload as unknown as IRegistrationProps;
      setUser(payload as IRegistrationProps);
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
  }, [dispatch]);

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
          <button className={styles.root__btn_reset} onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleResetButton(e)}><span>Вернуть</span></button>
          <button className={styles.root__btn_submit}><span>Отправить</span></button>
        </div>
      </form>
    </section>
  );
};

export default Settings;