import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  selectMaterialDialog,
  setMaterialDialog,
} from '@store/features/materialDialog/api';
import { enqueueSnackbar } from 'notistack';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { deleteCategory, getCategories } from '@store/features/categories/api';

const ProfileAdminDeleteCategory = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog);

  const callback = async () => {
    try {
      await dispatch(deleteCategory(data.id)).unwrap();
      await dispatch(getCategories());
      enqueueSnackbar('Категория успешно удалена!', { variant: 'success' });
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
        Вы уверены что хотите удалить категорию?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Подтвердите или отмените действие.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <SimpleButton
          clickEvent={handleDisagree}
          color={Colors.$mainColor}
          variant="contained"
        >
          Отменить
        </SimpleButton>
        <SimpleButton
          type={'reset'}
          clickEvent={handleAgree}
          variant="contained"
        >
          Подтвердить
        </SimpleButton>
      </DialogActions>
    </>
  );
};

export default ProfileAdminDeleteCategory;
