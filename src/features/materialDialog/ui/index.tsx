import {Dialog, useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Colors from "app/utils/Colors";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectMaterialDialog, setMaterialDialog} from "../api";
import {MaterialDialogTypes} from "../model";
import LogoutMaterialDialog from "./materialDialogs/LogoutMaterialDialog";
import ClearCartMaterialDialog from "./materialDialogs/ClearCartMaterialDialog";
import SendOrderMaterialDialog from "./materialDialogs/SendOrderMaterialDialog";
import PromocodeSuccess from "./materialDialogs/PromocodeSuccess";
import PromocodeInvalid from "./materialDialogs/PromocodeInvalid";
import ProfileSendSettings from "./materialDialogs/ProfileSendSettings";
import ProfileResetSettings from "./materialDialogs/account/ProfileResetSettings";

const MaterialDialog = () => {
    const { opened, dialogType } = useAppSelector(selectMaterialDialog);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setMaterialDialog({
            opened: false,
            dialogType: null,
            data: null
        }))
    };

    const renderMaterialDialog = (): JSX.Element => {
        switch (dialogType) {
            case MaterialDialogTypes.LOGOUT: return <LogoutMaterialDialog />;
            case MaterialDialogTypes.CLEAR_CART: return <ClearCartMaterialDialog />;
            case MaterialDialogTypes.SEND_ORDER_DELIVERY: return <SendOrderMaterialDialog />
            case MaterialDialogTypes.SEND_ORDER_PICKUP: return <SendOrderMaterialDialog />
            case MaterialDialogTypes.PROMOCODE_INVALID: return <PromocodeInvalid />
            case MaterialDialogTypes.PROMOCODE_SUCCESS: return <PromocodeSuccess />
            case MaterialDialogTypes.PROFILE_SETTINGS_SEND: return <ProfileSendSettings />
            case MaterialDialogTypes.PROFILE_SETTINGS_RESET: return <ProfileResetSettings />

            default: return <></>
        }
    }

    return (
        <Dialog
            sx={{
                ' .MuiPaper-root': {
                    background: Colors.$rootCardBackground,
                    borderRadius: '12px',
                    padding: '25px'
                },
                ' h2': {
                    color: Colors.$rootText
                },
                ' p': {
                    color: Colors.$rootText
                }
            }}
            disableScrollLock
            fullScreen={fullScreen}
            open={opened}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            { renderMaterialDialog() }
        </Dialog>
    );
};

export default MaterialDialog;