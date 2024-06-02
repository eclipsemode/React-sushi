import React from 'react';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
import { enqueueSnackbar } from 'notistack';
import {
  deletePromocode,
  getAllPromoCodes,
} from '@store/features/promocode/api';

const ProfileAdminDeletePromocode = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog);

  const callback = async () => {
    try {
      await dispatch(deletePromocode(data.id)).unwrap();
      await dispatch(getAllPromoCodes({})).unwrap();
      enqueueSnackbar('Промокод успешно удален!', { variant: 'success' });
    } catch (e) {
      enqueueSnackbar('Ошибка удаления, попробуйте позднее', {
        variant: 'error',
      });
    }
  };

  const handleAgree = async () => {
    dispatch(
      setMaterialDialog({
        opened: false,
        dialogType: null,
      })
    );
    await callback();
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
        Вы уверены что хотите удалить промокод?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Подтвердите или отмените действие.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <SimpleButton
          type="reset"
          color={Colors.$mainColor}
          variant="contained"
          clickEvent={handleDisagree}
        >
          Отменить
        </SimpleButton>
        <SimpleButton
          type="submit"
          variant="contained"
          clickEvent={handleAgree}
        >
          Подтвердить
        </SimpleButton>
      </DialogActions>
    </>
  );
};

export default ProfileAdminDeletePromocode;
