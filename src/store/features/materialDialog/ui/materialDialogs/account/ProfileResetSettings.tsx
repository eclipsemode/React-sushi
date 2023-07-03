import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {setMaterialDialog} from "../../../api";
import {useAppDispatch} from "@store/hooks";
import {enqueueSnackbar} from "notistack";

const ProfileSendSettings = () => {
    const dispatch = useAppDispatch();

    const callback = () => {
        window.scrollTo({
            top: 0
        });
    }

    const handleAgree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null,
            applyCallback: true
        }));
        callback();
        enqueueSnackbar('Данные успешно сброшены!', {variant: 'success'});
    }

    const handleDisagree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null,
        }))
    }

    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Вы уверены что хотите вернуть первоначальные настройки?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Подтвердите или отмените действие.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{justifyContent: 'center'}}>
                <SimpleButton clickEvent={handleDisagree} color={Colors.$mainColor}
                              variant='contained'>Отменить</SimpleButton>
                <SimpleButton type={'reset'} clickEvent={handleAgree} variant='contained'>Подтвердить</SimpleButton>
            </DialogActions>
        </>
    );
};

export default ProfileSendSettings;