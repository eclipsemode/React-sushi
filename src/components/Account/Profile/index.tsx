import React from 'react';
import Field from '@shared/UI/Field';
import formatDateToString from '@shared/utils/formatDateToString';
import styles from './index.module.scss';
import { IUserInfo } from '@store/features/user';

interface IProps {
  userInfo: Partial<IUserInfo> | null;
}

const Profile = ({ userInfo }: IProps) => {

  return (
    <div className={styles.root}>
      {userInfo?.name && <Field title='Имя' text={userInfo.name} />}
      {userInfo?.surname && <Field title='Фамилия' text={userInfo.surname} />}
      {userInfo?.dateOfBirth && (
        <Field
          title='Дата рождения'
          text={formatDateToString(new Date(userInfo.dateOfBirth))}
        />
      )}
      {userInfo?.email && <Field title='Email' text={userInfo.email} />}
      {userInfo?.tel && <Field title='Телефон' text={userInfo.tel} />}
      {userInfo?.street && (
        <Field
          title='Улица'
          text={userInfo.street + (userInfo.house ? `, ${userInfo.house}` : '')}
        />
      )}
      {userInfo?.street && (
        <div className={styles.root__additional}>
          {userInfo?.entrance && (
            <Field
              title='Подъезд'
              text={userInfo?.entrance ? userInfo?.entrance : ''}
            />
          )}
          {userInfo?.floor && (
            <Field title='Этаж' text={userInfo?.floor ? userInfo?.floor : ''} />
          )}
          {userInfo?.room && (
            <Field
              title='Квартира'
              text={userInfo?.room ? userInfo?.room : ''}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;