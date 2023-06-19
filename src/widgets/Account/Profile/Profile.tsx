import React from "react";
import { useAppSelector } from "app/hooks";
import styles from './index.module.scss'
import Field from "shared/UI/Field";
import formatDateToString from "shared/utils/formatDateToString";
import {Skeleton} from "@mui/material";

const Profile: React.FC = () => {
  const { userInfo } = useAppSelector(state => state.userReducer);

  React.useEffect(() => {
    window.scrollTo({
      top: 0
    })
  });
  const renderUserInfo = () => (
    <div className={styles.root}>
      { userInfo?.name && <Field title='Имя' text={userInfo.name}/> }
      { userInfo?.surname && <Field title='Фамилия' text={userInfo.surname}/>}
      { userInfo?.dateOfBirth && <Field title='Дата рождения' text={formatDateToString(new Date(userInfo.dateOfBirth))}/> }
      { userInfo?.email && <Field title='Email' text={userInfo.email}/> }
      { userInfo?.tel && <Field title='Телефон' text={userInfo.tel}/> }
      { userInfo?.street && <Field title='Улица' text={userInfo.street + (userInfo.house ? `, ${userInfo.house}` : '')}/> }
      {
          userInfo?.street && (
              <div className={styles.root__additional}>
                <Field title='Подъезд' text={userInfo?.entrance ? userInfo?.entrance : ''}/>
                <Field title='Этаж' text={userInfo?.floor ? userInfo?.floor : ''}/>
                <Field title='Квартира' text={userInfo?.room ? userInfo?.room : ''}/>
              </div>
          )
      }
    </div>
  )

  const renderSkeleton = () => (
      <div className={styles.skeleton}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <Skeleton animation="wave" />
        <div className={styles.root__additional}>
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </div>
      </div>
  )

  return !userInfo ? renderSkeleton() : renderUserInfo();
};

export default Profile;