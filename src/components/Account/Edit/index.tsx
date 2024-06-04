'use client';
import React, { useEffect } from 'react';
import CustomInput from '@shared/UI/CustomInput';
import { Stack } from '@mui/material';
import styles from './index.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import formatDateToYyyyMmDd from '@shared/utils/formatDateToYyyyMmDd';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  clearMaterialDialog,
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import ActionBlock from '@components/Account/Edit/ActionBlock';
import { IUser, IUserProfile } from '@store/features/user/model';

interface IProps {
  user: IUser;
}

const Edit = ({ user }: IProps) => {
  const { applyCallback } = useAppSelector(selectMaterialDialog);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, defaultValues },
  } = useForm<Partial<IUserProfile>>({
    mode: 'onBlur',
    defaultValues: {
      name: user?.profile?.name,
      surname: user?.profile?.surname,
      dateOfBirth: user?.profile?.dateOfBirth
        ? formatDateToYyyyMmDd(user?.profile.dateOfBirth as string)
        : '',
      email: user?.profile?.email,
      street: user?.profile?.street,
      house: user?.profile?.house,
      entrance: user?.profile?.entrance,
      floor: user?.profile?.floor,
      room: user?.profile?.room,
    },
  });

  useEffect(() => {
    if (applyCallback) {
      reset();
      dispatch(clearMaterialDialog());
    }
  }, [applyCallback, dispatch, reset]);

  const handleResetButton = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.PROFILE_SETTINGS_RESET,
      })
    );
  };

  const onSubmit: SubmitHandler<Partial<IUserProfile>> = ({
    email,
    name,
    surname,
    dateOfBirth,
    street,
    house,
    floor,
    entrance,
    room,
  }) => {
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.PROFILE_SETTINGS_SEND,
        data: {
          email,
          name,
          surname,
          dateOfBirth,
          street,
          house,
          floor,
          entrance,
          room,
        },
      })
    );
  };

  const validateButtons = () =>
    defaultValues?.name !== watch('name') ||
    defaultValues?.surname !== watch('surname') ||
    defaultValues?.dateOfBirth !== watch('dateOfBirth') ||
    defaultValues?.street !== watch('street') ||
    (defaultValues?.house || '') !== (watch('house') || '') ||
    (defaultValues?.floor || '') !== (watch('floor') || '') ||
    (defaultValues?.entrance || '') !== (watch('entrance') || '') ||
    (defaultValues?.room || '') !== (watch('room') || '');

  return (
    <div className={styles.root}>
      <form
        onReset={(event) => handleResetButton(event)}
        onSubmit={handleSubmit(onSubmit)}
        name="settings"
        className={styles.root__form}
      >
        <CustomInput
          error={!!errors.name}
          register={register}
          name="name"
          label="Имя"
          maxLength={20}
          validate={(value: string) => !!value.match(/^[a-zа-яё\s]+$/iu)}
        />
        <CustomInput
          register={register}
          name="surname"
          label="Фамилия"
          maxLength={20}
        />
        <CustomInput
          error={!!errors.dateOfBirth}
          register={register}
          name="dateOfBirth"
          label=" "
          type="date"
        />
        <CustomInput name="tel" disabled label={user?.tel} type="tel" />
        <CustomInput register={register} name="street" label="Улица" />
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <CustomInput
              register={register}
              name="house"
              label="Дом"
              type="number"
            />
            <CustomInput
              register={register}
              name="entrance"
              label="Подьезд"
              type="number"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <CustomInput
              register={register}
              name="floor"
              label="Этаж"
              type="number"
            />
            <CustomInput
              register={register}
              name="room"
              label="Квартира"
              type="number"
            />
          </Stack>
        </Stack>
        <Stack direction="row" className={styles.root__buttons}>
          <ActionBlock validate={!validateButtons()} />
        </Stack>
      </form>
    </div>
  );
};

export default Edit;
