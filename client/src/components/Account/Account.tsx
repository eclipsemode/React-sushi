import React from "react";
import styles from './Account.module.css';
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/hooks";
import { fetchUserInfo, IRegistrationProps } from "../../redux/features/userSlice";
import { MoonLoader } from "react-spinners";

const Account: React.FC = () => {
  const dispatch = useAppDispatch();
  const [userInfo, setUserInfo] = React.useState<IRegistrationProps | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    (async function getUserInfo() {
      const { payload } = await dispatch(fetchUserInfo() as any);
      setUserInfo(payload)
      setLoading(false)
    })()
  }, [dispatch])

  if (loading) return (
    <div className={styles.root__loading}>
      <MoonLoader color='#8ba4f9' />
    </div>
  )

  return (
    <div className={styles.root}>
        <div className={styles.root__head}>
          <Link className={styles.root__link} to={'/'}>Главная</Link>
          <p>/</p>
          <Link className={styles.root__link} to={''}>Профиль</Link>
          <p>/</p>
          <p className={styles.root__link2}>{ userInfo?.name + ' ' + userInfo?.surname }</p>
        </div>
    </div>
  );
};

export default Account;