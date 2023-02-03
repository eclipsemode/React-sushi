import React from "react";
import styles from "./Account.module.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchUserInfo, IRegistrationProps, IUserInfo } from "entities/user";
import { MoonLoader } from "react-spinners";
import { MdAccountCircle } from "react-icons/md";
import { AiOutlineStar } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { Orders, Profile, Settings } from "./index";

type SelectedType = "profile" | "orders" | "settings";

const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.userReducer);
  const [userInfo, setUserInfo] = React.useState<IRegistrationProps | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState<SelectedType>("profile");

  React.useEffect(() => {
    (async function getUserInfo() {
      if (isAuth) {
        const { payload } = await dispatch(fetchUserInfo());
        setUserInfo(payload as IUserInfo);
        setLoading(false);
      }
    })();
  }, [dispatch, isAuth]);

  if (loading) return (
    <div className={styles.root__loading}>
      <MoonLoader color="#8ba4f9" />
    </div>
  );

  return (
    <div className={styles.root}>
      <div className={styles.root__head}>
        <Link className={styles.root__link} to={"/"}>Главная</Link>
        <p>/</p>
        <Link className={styles.root__link} to={""}>Профиль</Link>
        <p>/</p>
        <p
          className={styles.root__link2}>{selected === "profile" ? userInfo?.name + " " + userInfo?.surname : (selected === "orders") ? "История заказов" : "Редактировать профиль"}</p>
      </div>
      <div className={styles.root__body}>
        <aside>
          <ul>
            <li className={selected === "profile" ? styles.root__selected : null} onClick={() => setSelected("profile")}>
              <MdAccountCircle /><span>Мой профиль</span></li>
            <li className={selected === "orders" ? styles.root__selected : null} onClick={() => setSelected("orders")}>
              <AiOutlineStar /><span>История заказов</span></li>
            <li className={selected === "settings" ? styles.root__selected : null} onClick={() => setSelected("settings")}>
              <FiSettings /><span>Редактировать профиль</span></li>
          </ul>
        </aside>
        {selected === "profile" && <Profile />}
        {selected === "orders" && <Orders />}
        {selected === "settings" && <Settings />}
      </div>
    </div>
  );
};

export default Account;