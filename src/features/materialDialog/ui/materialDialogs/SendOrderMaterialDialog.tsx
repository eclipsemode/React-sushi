import {useAppDispatch, useAppSelector} from "app/hooks";
import {selectMaterialDialog, setMaterialDialog} from "../../api";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "shared/UI/SimpleButton";
import Colors from "app/utils/Colors";
import {removeAll} from "entities/cart";
import {clearOrderData, fetchOrderCreate} from "features/order/api";
import {MaterialDialogTypes} from "../../model";
import {enqueueSnackbar} from "notistack";

const SendOrderMaterialDialog = () => {
    const dispatch = useAppDispatch();
    const { formData } = useAppSelector(state => state.orderCreateReducer);
    const { dialogType } = useAppSelector(selectMaterialDialog)

    const success = () => {
        dispatch(removeAll());
        dispatch(clearOrderData());
    };

    const callback = async () => {
        try {
            if (dialogType === MaterialDialogTypes.SEND_ORDER_DELIVERY) {
                await dispatch(fetchOrderCreate({...formData, type: 'delivery'})).unwrap();
            } else {
                await dispatch(fetchOrderCreate({...formData, type: 'pickup'})).unwrap();
            }
            enqueueSnackbar('Заказ отправлен, оператор перезвонит для подтверждения в течении 5 минут!', { variant: 'success' });
        } catch (e) {
            console.error(e);
            enqueueSnackbar('Ошибка создания заказа, попробуйте позднее', { variant: 'error' });
        }
        success();
    }

    const handleAgree = async () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }));
        await callback();
    }

    const handleDisagree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }))
    }
    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Вы уверены что хотите отправить заказ?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Подтвердите оформление заказа.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <SimpleButton clickEvent={handleDisagree} color={Colors.$mainColor}
                              variant='contained'>Отменить</SimpleButton>
                <SimpleButton clickEvent={handleAgree} variant='contained'>Подтвердить</SimpleButton>
            </DialogActions>
        </>
    );
};

export default SendOrderMaterialDialog;