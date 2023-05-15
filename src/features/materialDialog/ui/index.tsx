import {Dialog, useMediaQuery} from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Colors from "app/utils/Colors";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {selectMaterialDialog, setOpened} from "../api";
import {MaterialDialogTypes} from "../model";
import LogoutMaterialDialog from "./materialDialogs/LogoutMaterialDialog";

const MaterialDialog = () => {
    const { opened, dialogType } = useAppSelector(selectMaterialDialog);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setOpened({
            opened: false,
            dialogType: null
        }))
    };

    const renderMaterialDialog = (): JSX.Element => {
        switch (dialogType) {
            case MaterialDialogTypes.LOGOUT: return <LogoutMaterialDialog />;
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