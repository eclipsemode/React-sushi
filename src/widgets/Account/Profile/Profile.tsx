import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchUserInfo, IRegistrationProps } from "entities/user";
import styles from './index.module.css'
import Field from "shared/UI/Field";
import formatDateToString from "shared/utils/formatDateToString";

export interface IUserData {
  dateOfBirth: string,
  id: number,
  email: string,
  name: string,
  surname: string,
  tel: string,
  street: string,
  house: string,
  floor: string ,
  entrance: string,
  room: string
}
const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(state => state.userReducer);
  const [userData, setUserData] = React.useState<IUserData | null>(null);

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    })
  });

  React.useEffect(() => {
    if (isAuth) {
      (async function getUsers() {
        const { payload }: IRegistrationProps | any = await dispatch(fetchUserInfo());

        setUserData({
          id: payload.id,
          email: payload.email,
          name: payload.name,
          surname: payload.surname,
          tel: payload.tel,
          street: payload.street,
          house: payload.house,
          floor: payload.floor ,
          entrance: payload.entrance,
          room: payload.room,
          dateOfBirth: formatDateToString(payload.dateOfBirth)
        })
      })()
    }
  }, [dispatch, isAuth])


  return (
    <div className={styles.root}>
      <Field title='Имя' text={userData?.name ? userData?.name : ''}/>

      { userData?.surname && <Field title='Фамилия' text={userData.surname}/> }

      { userData?.dateOfBirth && <Field title='Дата рождения' text={userData.dateOfBirth}/> }

      { userData?.email && <Field title='Email' text={userData.email}/> }

      <Field title='Телефон' text={userData?.tel ? userData?.tel : ''}/>

      { userData?.street  && <Field title='Улица' text={userData.street + (userData.house ? `, кв. ${userData.house}` : '')}/> }


        { userData?.street  && (
          <div className={styles.root__additional}>
          <Field title='Подъезд' text={userData?.entrance ? userData?.entrance : ''}/>
          <Field title='Этаж' text={userData?.floor ? userData?.floor : ''}/>
          <Field title='Квартира' text={userData?.room ? userData?.room : ''}/>
          </div>
        ) }
    </div>
  );
};

export default Profile;