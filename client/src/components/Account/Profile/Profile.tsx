import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchUserInfo, IRegistrationProps } from "../../../redux/features/userSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const [userData, setUserData] = React.useState<IRegistrationProps | null>(null);

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    })
  });

  React.useEffect(() => {
    if (user) {
      (async function getUsers() {
        const { payload } = await dispatch(fetchUserInfo());
        setUserData(payload as IRegistrationProps)
      })()
    }
  }, [dispatch, user])

  return (
    <section>
      <p>Имя: { userData?.name }</p>
      <p>Фамилия: { userData?.surname }</p>
      <p>Дата рождения: { userData?.dateOfBirth }</p>
      <p>Email: { userData?.email }</p>
      <p>Телефон: { userData?.tel }</p>
      <p>Адресс: { userData?.street + ' ' + userData?.house }, подьезд { userData?.entrance }, этаж { userData?.floor }, кв. { userData?.room }</p>
    </section>
  );
};

export default Profile;