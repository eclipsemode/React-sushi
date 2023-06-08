import {useAppDispatch, useAppSelector} from "app/hooks";
import {selectMaterialDialog, setMaterialDialog} from "../../api";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "shared/UI/SimpleButton";
import Colors from "app/utils/Colors";
import {Modal} from "antd";
import {removeAll} from "entities/cart";
import {fetchOrderCreate, setFormData} from "features/order/api";
import {MaterialDialogTypes} from "../../model";

const SendOrderMaterialDialog = () => {
    const dispatch = useAppDispatch();
    const { formData } = useAppSelector(state => state.orderCreateReducer);
    const { dialogType } = useAppSelector(selectMaterialDialog)

    const success = () => {
        Modal.success({
            title: "Ваш заказ отправлен.",
            content: "Оператор перезвонит для подтверждения в течении 5 минут."
        });
        dispatch(removeAll());
        dispatch(setFormData(null));
    };

    const callback = () => {
        if (dialogType === MaterialDialogTypes.SEND_ORDER_DELIVERY) {
            dispatch(fetchOrderCreate({...formData, type: 'delivery'}));
        } else {
            dispatch(fetchOrderCreate({...formData, type: 'pickup'}));
        }
        success();
    }

    const handleAgree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }));
        callback();
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