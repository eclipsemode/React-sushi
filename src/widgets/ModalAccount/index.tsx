import React from 'react';
import {useAppDispatch} from 'app/hooks';
import {useNavigate} from 'react-router-dom';
import ModalWindow from '../../shared/UI/ModalWindow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import {setMaterialDialog} from "features/materialDialog/api";
import {MaterialDialogTypes} from "features/materialDialog/model";

interface IModalAccountProps {
    modalRef: React.Ref<HTMLDivElement>;
}

const ModalAccount: React.FC<IModalAccountProps> = ({ modalRef }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAccount = () => {
        navigate('/personal');
    };

    const handleExit = () => {
        dispatch(setMaterialDialog({
            opened: true,
            dialogType: MaterialDialogTypes.LOGOUT
        }))
    };

    return (
        <>
            <ModalWindow
                refModal={modalRef}
                listArray={[
                    {
                        text: 'Профиль',
                        icon: <LoginIcon />,
                        clickEvent: () => handleAccount,
                    },
                    {
                        text: 'Выйти',
                        icon: <ExitToAppIcon />,
                        clickEvent: () => handleExit,
                    },
                ]}
            />
        </>

    );
};

export default ModalAccount;
