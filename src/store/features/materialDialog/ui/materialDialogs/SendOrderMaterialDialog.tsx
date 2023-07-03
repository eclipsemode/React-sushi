import {useAppDispatch, useAppSelector} from "@store/hooks";
import {selectMaterialDialog, setMaterialDialog} from "../../api";
import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {removeAll} from "@store/features/cart/api";
import {clearOrderData, fetchOrderCreate} from "@store/features/order/api";
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
                await dispatch(fetchOrderCreate({
                    name: formData?.name || '',
                    address: formData?.address,
                    entrance: formData?.entrance,
                    floor: formData?.floor,
                    room: formData?.room,
                    tel: formData?.tel || '+7 (918) 000-00-00',
                    email: formData?.email || '',
                    day: formData?.day ?? null,
                    time: formData?.time ?? null,
                    utensils: formData?.utensils ?? 0,
                    payment: formData?.payment || 'cash',
                    commentary: formData?.commentary ?? null,
                    deliveryTime: formData?.deliveryTime,
                    agreement_1: formData?.agreement_1,
                    agreement_2: formData?.agreement_2,
                    agreement_3: formData?.agreement_3,
                    type: 'delivery'
                })).unwrap();
            } else {
                await dispatch(fetchOrderCreate({
                    name: formData?.name || '',
                    address: formData?.address,
                    entrance: formData?.entrance,
                    floor: formData?.floor,
                    room: formData?.room,
                    tel: formData?.tel || '+7 (918) 000-00-00',
                    email: formData?.email || '',
                    day: formData?.day ?? null,
                    time: formData?.time ?? null,
                    utensils: formData?.utensils ?? 0,
                    payment: formData?.payment || 'cash',
                    commentary: formData?.commentary ?? null,
                    deliveryTime: formData?.deliveryTime,
                    agreement_1: formData?.agreement_1,
                    agreement_2: formData?.agreement_2,
                    agreement_3: formData?.agreement_3,
                    type: 'pickup'
                })).unwrap();
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