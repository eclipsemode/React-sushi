import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchUserInfo, IRegistrationProps, IUserInfo } from "entities/user";
import BlockForm from "shared/UI/BlockForm";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.userReducer);
  const [userData, setUserData] = React.useState<IRegistrationProps | null>(null);

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    })
  });

  React.useEffect(() => {
    if (isAuth) {
      (async function getUsers() {
        const { payload } = await dispatch(fetchUserInfo());
        setUserData(payload as IUserInfo)
      })()
    }
  }, [dispatch, isAuth])

  return (
    <BlockForm>
      <p>Имя: { userData?.name }</p>
      <p>Фамилия: { userData?.surname }</p>
      <p>Дата рождения: { userData?.dateOfBirth }</p>
      <p>Email: { userData?.email }</p>
      <p>Телефон: { userData?.tel }</p>
      <p>Адресс: { userData?.street + ' ' + userData?.house }, подьезд { userData?.entrance }, этаж { userData?.floor }, кв. { userData?.room }</p>
    </BlockForm>
  );
};

export default Profile;