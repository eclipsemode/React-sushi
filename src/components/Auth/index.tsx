'use client';
import React from 'react';
import styles from './index.module.scss';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { enqueueSnackbar } from 'notistack';
import SimpleButton from '@shared/UI/SimpleButton';
import CustomInput from "@shared/UI/CustomInput";
import { signIn } from '@store/features/auth/api';
import Confirm from './Confirm';
import Checkbox from '@shared/UI/Checkbox';
import { Box, CircularProgress } from '@mui/material';

interface IAuthForm {
  tel: string;
  agreement: boolean;
}

const Auth = () => {
  const dispatch = useAppDispatch();
  const [requestId, setRequestId] = React.useState<string>('');
  const [confirm, setConfirm] = React.useState<boolean>(false);
  const { authLoadSaveProcess } = useAppSelector((state) => state.authReducer);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IAuthForm>({
    defaultValues: {
      agreement: true,
    },
  });

  const onSubmit: SubmitHandler<IAuthForm> = async (data) => {
    try {
      const id = await dispatch(signIn(data.tel)).unwrap();
      setRequestId(id);
      setConfirm(true);
    } catch (e) {
      enqueueSnackbar('Вы ввели неверные данные', { variant: 'error' });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            register={register}
            className={styles.root__input}
            name="tel"
            inputMask={true}
            mask="+7 (999) 999-99-99"
            maskChar=""
            error={!!errors.tel}
            validate={(value) =>
              !!value.match(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/)
            }
            label="Введите телефон"
            type="tel"
            required
            endAdornment={
              !confirm && authLoadSaveProcess ? (
                <CircularProgress size={20} />
              ) : (
                <Box width={20}></Box>
              )
            }
          />
          {!confirm && (
            <>
              <Checkbox
                register={register}
                style={{ width: '100%' }}
                required
                name="agreement"
                checked={true}
                validate={(value) => value}
              >
                Согласен(на) на обработку персональных данных
              </Checkbox>
              <SimpleButton variant="contained" type="submit">
                Выслать код
              </SimpleButton>
            </>
          )}
        </form>
        {confirm && <Confirm requestId={requestId} tel={watch('tel')} />}
      </div>
    </div>
  );
};

export default Auth;
