import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "shared/UI/SimpleButton";
import {setMaterialDialog} from "../../api";
import {useAppDispatch} from "app/hooks";

const PromocodeSuccess = () => {
    const dispatch = useAppDispatch();

    const handleAgree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null
        }));
    }

    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Промокод применен
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы можете продолжить оформление заказа.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <SimpleButton clickEvent={handleAgree} variant='contained'>Хорошо</SimpleButton>
            </DialogActions>
        </>
    );
};

export default PromocodeSuccess;