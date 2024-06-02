import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectMaterialDialog, setMaterialDialog } from '../../api';
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import SimpleButton from '@shared/UI/SimpleButton';
import Colors from '@shared/utils/Colors';
import { removeAll } from '@store/features/cart/api';
import { clearOrderData, createOrder } from '@store/features/order/api';
import { MaterialDialogTypes } from '../../model';
import { enqueueSnackbar } from 'notistack';

const SendOrderMaterialDialog = () => {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.orderReducer);
  const { dialogType } = useAppSelector(selectMaterialDialog);

  const success = () => {
    dispatch(removeAll());
    dispatch(clearOrderData());
  };

  const callback = async () => {
    try {
      if (dialogType === MaterialDialogTypes.SEND_ORDER_DELIVERY) {
        await dispatch(
          createOrder({
            clientName: formData?.clientName || '',
            clientAddress: formData?.clientAddress,
            clientEntrance: formData?.clientEntrance,
            clientFloor: formData?.clientFloor,
            clientRoom: formData?.clientRoom,
            clientTel: formData?.clientTel || '',
            clientEmail: formData?.clientEmail,
            day: formData?.day ?? null,
            time: formData?.time ?? null,
            utensils: formData?.utensils ?? '0',
            payment: formData?.payment || 'CASH',
            commentary: formData?.commentary ?? '',
            deliveryTime: formData?.deliveryTime,
            agreement_1: formData?.agreement_1,
            agreement_2: formData?.agreement_2,
            agreement_3: formData?.agreement_3,
            type: 'DELIVERY',
          })
        ).unwrap();
      } else {
        await dispatch(
          createOrder({
            clientName: formData?.clientName || '',
            clientAddress: formData?.clientAddress,
            clientEntrance: formData?.clientEntrance,
            clientFloor: formData?.clientFloor,
            clientRoom: formData?.clientRoom,
            clientTel: formData?.clientTel || '',
            clientEmail: formData?.clientEmail,
            day: formData?.day ?? null,
            time: formData?.time ?? null,
            utensils: formData?.utensils ?? '0',
            payment: formData?.payment || 'CASH',
            commentary: formData?.commentary ?? '',
            deliveryTime: formData?.deliveryTime,
            agreement_1: formData?.agreement_1,
            agreement_2: formData?.agreement_2,
            agreement_3: formData?.agreement_3,
            type: 'PICKUP',
          })
        ).unwrap();
      }
      enqueueSnackbar(
        'Заказ отправлен, оператор перезвонит для подтверждения в течении 5 минут!',
        { variant: 'success' }
      );
    } catch (e) {
      console.error(e);
      enqueueSnackbar('Ошибка создания заказа, попробуйте позднее', {
        variant: 'error',
      });
    }
    success();
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
        Вы уверены что хотите отправить заказ?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Подтвердите оформление заказа.</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <SimpleButton
          clickEvent={handleDisagree}
          color={Colors.$mainColor}
          variant="contained"
        >
          Отменить
        </SimpleButton>
        <SimpleButton clickEvent={handleAgree} variant="contained">
          Подтвердить
        </SimpleButton>
      </DialogActions>
    </>
  );
};

export default SendOrderMaterialDialog;
