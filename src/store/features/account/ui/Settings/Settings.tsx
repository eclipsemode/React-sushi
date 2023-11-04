import React from 'react';
import { IUserInfo } from '@store/features/user';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import styles from './Settings.module.scss';
import {
  clearMaterialDialog,
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '@shared/UI/input';
import { Box, Skeleton, Stack, Tooltip } from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import formatDateToYyyyMmDd from '@shared/utils/formatDateToYyyyMmDd';

const Settings: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector((state) => state.userReducer);
  const { applyCallback } = useAppSelector(selectMaterialDialog);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Partial<IUserInfo>>({
    defaultValues: {
      name: userInfo?.name || '',
      surname: userInfo?.surname || '',
      dateOfBirth: userInfo?.dateOfBirth
        ? formatDateToYyyyMmDd(userInfo?.dateOfBirth as string)
        : '',
      tel: userInfo?.tel,
      email: userInfo?.email || '',
      street: userInfo?.street || '',
      house: userInfo?.house || undefined,
      entrance: userInfo?.entrance || undefined,
      floor: userInfo?.floor || undefined,
      room: userInfo?.room || undefined,
    },
  });

  React.useEffect(() => {
    if (applyCallback) {
      reset();
      dispatch(clearMaterialDialog());
    }
  }, [applyCallback, dispatch, reset]);

  const validateSubmit = (): boolean => {
    return (
      watch('name') === (userInfo?.name || '') &&
      watch('surname') === (userInfo?.surname || '') &&
      watch('dateOfBirth') ===
        (formatDateToYyyyMmDd(String(userInfo?.dateOfBirth)) || '') &&
      watch('email') === (userInfo?.email || '') &&
      watch('street') === (userInfo?.street || '') &&
      String(watch('house') || null) === String(userInfo?.house) &&
      String(watch('entrance') || null) === String(userInfo?.entrance) &&
      String(watch('floor') || null) === String(userInfo?.floor) &&
      String(watch('room') || null) === String(userInfo?.room)
    );
  };

  const handleResetButton = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.PROFILE_SETTINGS_RESET,
      })
    );
  };

  const onSubmit: SubmitHandler<Partial<IUserInfo>> = ({
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

  return (
    <section className={styles.root}>
      <form
        onReset={(event) => handleResetButton(event)}
        onSubmit={handleSubmit(onSubmit)}
        name="settings"
        className={styles.form}
      >
        <Input
          error={!!errors.name}
          register={register}
          name="name"
          label="Имя"
          maxLength={20}
          validate={(value: string) => !!value.match(/^[a-zа-яё\s]+$/iu)}
        />
        <Input
          register={register}
          name="surname"
          label="Фамилия"
          maxLength={20}
        />
        <Input
          error={!!errors.dateOfBirth}
          register={register}
          name="dateOfBirth"
          label=" "
          type="date"
        />
        <Input
          error={!!errors.email}
          register={register}
          name="email"
          label="Email"
          pattern={
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          }
        />
        <Input
          error={!!errors.tel}
          register={register}
          name="tel"
          disabled
          label="+7 (xxx) xxx-xx-xx"
          type="tel"
        />
        <Input register={register} name="street" label="Улица" />
        <Stack spacing={2}>
          <Stack direction="row" spacing={2}>
            <Input register={register} name="house" label="Дом" type="number" />
            <Input
              register={register}
              name="entrance"
              label="Подьезд"
              type="number"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Input
              register={register}
              name="floor"
              label="Этаж"
              type="number"
            />
            <Input
              register={register}
              name="room"
              label="Квартира"
              type="number"
            />
          </Stack>
        </Stack>
        <Stack direction="row" className={styles.root__buttons}>
          {Object.keys(getValues()).length !== 0 ? (
            <>
              <Tooltip
                title={validateSubmit() && 'Изменения отсутствуют'}
                arrow
                placement="top"
              >
                <Box>
                  <SimpleButton
                    color={Colors.$mainColor}
                    disabled={validateSubmit()}
                    variant="contained"
                    type="reset"
                  >
                    Сбросить
                  </SimpleButton>
                </Box>
              </Tooltip>
              <Tooltip
                title={validateSubmit() && 'Изменения отсутствуют'}
                arrow
                placement="top"
              >
                <Box>
                  <SimpleButton
                    variant="contained"
                    type="submit"
                    disabled={validateSubmit()}
                  >
                    Изменить
                  </SimpleButton>
                </Box>
              </Tooltip>
            </>
          ) : (
            <>
              <Skeleton className={styles.skeleton__button} animation="wave" />
              <Skeleton className={styles.skeleton__button} animation="wave" />
            </>
          )}
        </Stack>
      </form>
    </section>
  );
};

export default Settings;
