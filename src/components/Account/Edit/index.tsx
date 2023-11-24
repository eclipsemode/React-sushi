import React from 'react';
import Input from '../../../shared/UI/Input';
import { Stack } from '@mui/material';
import styles from './index.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IUserInfo } from '@store/features/user';
import formatDateToYyyyMmDd from '@shared/utils/formatDateToYyyyMmDd';
import { useAppDispatch } from '@store/hooks';
import { clearMaterialDialog, setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import ActionBlock from '@components/Account/Edit/ActionBlock';

interface IProps {
  userInfo: Partial<IUserInfo> | null,
  applyCallback: boolean | undefined
}

const Edit = ({ userInfo, applyCallback }: IProps) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, defaultValues },
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

  const handleResetButton = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.PROFILE_SETTINGS_RESET,
      }),
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
      }),
    );
  };

  const validateButtons = () =>
    defaultValues?.name !== watch('name')
    || defaultValues?.surname !== watch('surname')
    || defaultValues?.dateOfBirth !== watch('dateOfBirth')
    || defaultValues?.email !== watch('email')
    || defaultValues?.street !== watch('street')
    || (defaultValues?.house || '') !== (watch('house') || '')
    || (defaultValues?.floor || '') !== (watch('floor') || '')
    || (defaultValues?.entrance || '') !== (watch('entrance') || '')
    || (defaultValues?.room || '') !== (watch('room') || '');


  return (
    <div className={styles.root}>
      <form
        onReset={(event) => handleResetButton(event)}
        onSubmit={handleSubmit(onSubmit)}
        name='settings'
        className={styles.root__form}
      >
        <Input
          error={!!errors.name}
          register={register}
          name='name'
          label='Имя'
          maxLength={20}
          validate={(value: string) => !!value.match(/^[a-zа-яё\s]+$/iu)}
        />
        <Input
          register={register}
          name='surname'
          label='Фамилия'
          maxLength={20}
        />
        <Input
          error={!!errors.dateOfBirth}
          register={register}
          name='dateOfBirth'
          label=' '
          type='date'
        />
        <Input
          error={!!errors.email}
          register={register}
          name='email'
          label='Email'
          pattern={
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          }
        />
        <Input
          error={!!errors.tel}
          register={register}
          name='tel'
          disabled
          label='+7 (xxx) xxx-xx-xx'
          type='tel'
        />
        <Input register={register} name='street' label='Улица' />
        <Stack spacing={2}>
          <Stack direction='row' spacing={2}>
            <Input register={register} name='house' label='Дом' type='number' />
            <Input
              register={register}
              name='entrance'
              label='Подьезд'
              type='number'
            />
          </Stack>
          <Stack direction='row' spacing={2}>
            <Input
              register={register}
              name='floor'
              label='Этаж'
              type='number'
            />
            <Input
              register={register}
              name='room'
              label='Квартира'
              type='number'
            />
          </Stack>
        </Stack>
        <Stack direction='row' className={styles.root__buttons}>
          <ActionBlock validate={!validateButtons()} />
        </Stack>
      </form>
    </div>
  );
};

export default Edit;