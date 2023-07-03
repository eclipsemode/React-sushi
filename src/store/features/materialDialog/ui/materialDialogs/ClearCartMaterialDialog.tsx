import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {useAppDispatch} from "@store/hooks";
import {setMaterialDialog} from "../../api";
import {removeAll} from "@store/features/cart/api";
import {clearOrderData, setFormData} from "../../../order/api";

const ClearCartMaterialDialog = () => {
    const dispatch = useAppDispatch();

    const callback = () => {
        dispatch(removeAll());
        dispatch(clearOrderData());
    }

    const handleAgree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }));

        callback();
        dispatch(setFormData(null));
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
                Вы уверены что хотите очистить корзину?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Подтвердите удаление всех товаров из корзины.
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

export default ClearCartMaterialDialog;