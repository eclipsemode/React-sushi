import React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchUserInfo, IRegistrationProps } from "../../../redux/features/userSlice";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = React.useState<IRegistrationProps | null>(null);

  React.useEffect(() => {
    (async function getUsers() {
      const { payload } = await dispatch(fetchUserInfo());
      setUser(payload as IRegistrationProps)
    })()
  }, [dispatch])

  return (
    <section>
      <p>Имя: { user?.name }</p>
      <p>Фамилия: { user?.surname }</p>
      <p>Дата рождения: { user?.dateOfBirth }</p>
      <p>Email: { user?.email }</p>
      <p>Пароль: *******</p>
      <p>Телефон: { user?.tel }</p>
      <p>Адресс: { user?.street + ' ' + user?.house }, подьезд { user?.entrance }, этаж { user?.floor }, кв. { user?.room }</p>
    </section>
  );
};

export default Profile;