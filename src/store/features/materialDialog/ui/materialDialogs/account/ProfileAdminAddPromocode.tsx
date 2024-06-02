import React from 'react';
import {
  Alert,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import CustomInput from '@shared/UI/CustomInput';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { useAppDispatch } from '@store/hooks';
import { SubmitHandler, useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import {
  createPromoCode,
  getAllPromoCodes,
} from '@store/features/promocode/api';
import Select from '@shared/UI/Select';
import styles from '../index.module.scss';
import {
  IPromocodeCreate,
  PromoCodeTypeEnum,
} from '@store/features/promocode/model';

const ProfileAdminAddPromocode = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IPromocodeCreate>();
  const success = async () => {
    await dispatch(getAllPromoCodes({}));
  };

  const callback = async (formData: IPromocodeCreate) => {
    try {
      await dispatch(
        createPromoCode({
          ...formData,
          limit: !formData.limit ? 9999 : formData.limit,
        })
      ).unwrap();
      enqueueSnackbar('Промокод успешно добавлен!', { variant: 'success' });
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ошибка добавления промокода, попробуйте позднее', {
        variant: 'error',
      });
    }
    await success();
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );
  };

  const handleAgree: SubmitHandler<IPromocodeCreate> = async (formData) => {
    await callback(formData);
  };

  const handleDisagree = () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );
  };
  return (
    <>
      <DialogTitle id="responsive-dialog-title">
        Введите название Промокода
      </DialogTitle>
      <form onSubmit={handleSubmit(handleAgree)} onReset={handleDisagree}>
        <DialogContent>
          <CustomInput register={register} name="code" label="Код" required />
          <Select
            register={register}
            name="type"
            defaultValue="disabled"
            className={styles.row}
            required
            validate={(value) => value !== 'disabled'}
          >
            <option value="disabled" disabled>
              Выберите тип
            </option>
            <option value={PromoCodeTypeEnum.RUB}>Рубли</option>
            <option value={PromoCodeTypeEnum.percent}>Проценты</option>
          </Select>
          <CustomInput
            register={register}
            name="discount"
            label="Скидка"
            type="number"
            className={styles.row}
            required
          />
          <CustomInput
            register={register}
            name="limit"
            label="Лимит"
            type="number"
            className={styles.row}
          />
          <Alert
            variant="filled"
            severity="info"
            sx={{
              marginTop: '15px',
              fontSize: '12px',
            }}
          >
            Оставьте поле &quot;Лимит&quot; пустым для неограниченного лимита
          </Alert>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <SimpleButton
            type="reset"
            color={Colors.$mainColor}
            variant="contained"
          >
            Отменить
          </SimpleButton>
          <SimpleButton type="submit" variant="contained">
            Подтвердить
          </SimpleButton>
        </DialogActions>
      </form>
    </>
  );
};

export default ProfileAdminAddPromocode;
