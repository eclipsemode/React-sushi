import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { selectMaterialDialog, setMaterialDialog } from '../../../api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { enqueueSnackbar } from 'notistack';
import { deleteProduct, getProducts } from '@store/features/products/api';

const ProfileAdminDeleteProduct = () => {
  const dispatch = useAppDispatch();
  const { data } = useAppSelector(selectMaterialDialog);

  const callback = async () => {
    try {
      await dispatch(deleteProduct((!!data && data.id) || 0)).unwrap();
      await dispatch(getProducts()).unwrap();
      enqueueSnackbar('Продукт успешно удален!', { variant: 'success' });
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
        Вы уверены что хотите удалить продукт?
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

export default ProfileAdminDeleteProduct;
