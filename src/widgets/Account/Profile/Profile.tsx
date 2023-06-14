import React from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import {fetchUserInfo, IUserInfo, selectUser} from "entities/user";
import styles from './index.module.scss'
import Field from "shared/UI/Field";
import formatDateToString from "shared/utils/formatDateToString";
import {Skeleton} from "@mui/material";

export interface IUserDataFetched {
  dateOfBirth: any,
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
  const { status } = useAppSelector(selectUser);
  const [userData, setUserData] = React.useState<IUserDataFetched>();

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    })
  });

  React.useEffect(() => {
    dispatch(fetchUserInfo()).then(data => {
      if (data.type.match('fulfilled')) {

        const result: IUserInfo = data.payload as IUserInfo;

        !!data.type.match('fulfilled') && setUserData({
          email: result.email,
          entrance: result.entrance,
          floor: result.floor,
          house: result.house,
          name: result.name,
          room: result.room,
          street: result.street,
          surname: result.surname,
          tel: result.tel,
          dateOfBirth: formatDateToString(result.dateOfBirth)
        })

      }
        }
    )
  }, [isAuth, dispatch])


  return (
    <div className={styles.root}>
      {
        status === 'fulfilled' ? <Field title='Имя' text={userData?.name ? userData?.name : ''}/> : <Skeleton animation='wave' height={55} width='100%' />
      }


      { userData?.surname && <Field title='Фамилия' text={userData.surname}/> }

      { userData?.dateOfBirth && <Field title='Дата рождения' text={userData.dateOfBirth}/> }

      { userData?.email && <Field title='Email' text={userData.email}/> }

      {
        status === 'fulfilled' ? <Field title='Телефон' text={userData?.tel ? userData?.tel : ''}/> : <Skeleton animation='wave' height={55} width='100%' />
      }

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