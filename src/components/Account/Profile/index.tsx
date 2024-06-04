'use client';
import React from 'react';
import Field from '@shared/UI/Field';
import formatDateToString from '@shared/utils/formatDateToString';
import styles from './index.module.scss';
import { IUser } from '@store/features/user/model';

interface IProps {
  user: IUser;
}

const Profile = ({ user }: IProps) => {
  const renderEmptyProfile = () => (
    <div>
      <p>Вы еще не вводили данные</p>
    </div>
  );

  const renderUserProfile = () => (
    <div className={styles.root}>
      {user?.profile.name && <Field title="Имя" text={user.profile.name} />}
      {user?.profile.surname && (
        <Field title="Фамилия" text={user.profile.surname} />
      )}
      {user?.profile.dateOfBirth && (
        <Field
          title="Дата рождения"
          text={formatDateToString(new Date(user.profile.dateOfBirth))}
        />
      )}
      {user?.tel && <Field title="Телефон" text={user.tel} />}
      {user?.profile.street && (
        <Field
          title="Улица"
          text={
            user.profile.street +
            (user.profile.house ? `, ${user.profile.house}` : '')
          }
        />
      )}
      {user?.profile.street && (
        <div className={styles.root__additional}>
          {user?.profile.entrance && (
            <Field
              title="Подъезд"
              text={user?.profile.entrance ? user?.profile.entrance : ''}
            />
          )}
          {user?.profile.floor && (
            <Field
              title="Этаж"
              text={user?.profile.floor ? user?.profile.floor : ''}
            />
          )}
          {user?.profile.room && (
            <Field
              title="Квартира"
              text={user?.profile.room ? user?.profile.room : ''}
            />
          )}
        </div>
      )}
    </div>
  );

  return user.profile ? renderUserProfile() : renderEmptyProfile();
};

export default Profile;
