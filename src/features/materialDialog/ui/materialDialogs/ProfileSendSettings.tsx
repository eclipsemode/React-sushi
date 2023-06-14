import {DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import SimpleButton from "shared/UI/SimpleButton";
import Colors from "app/utils/Colors";
import {selectMaterialDialog, setMaterialDialog} from "../../api";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {enqueueSnackbar} from "notistack";
import {fetchPatchUserInfo} from "entities/user";

const ProfileSendSettings = () => {
    const dispatch = useAppDispatch();
    const { data } = useAppSelector(selectMaterialDialog)
    const {email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room} = data;

    const callback = () => {
        dispatch(fetchPatchUserInfo({email, name, surname, dateOfBirth, tel, street, house, floor, entrance, room}))
    }

    const handleAgree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null,
            data: null
        }));

        callback();
        enqueueSnackbar('Данные успешно изменены!', { variant: 'success' });
    }

    const handleDisagree = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null,
            data: null
        }))
    }

    return (
        <>
            <DialogTitle id="responsive-dialog-title">
                Вы уверены что хотите изменить данные?
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Подтвердите или отмените действие.
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

export default ProfileSendSettings;