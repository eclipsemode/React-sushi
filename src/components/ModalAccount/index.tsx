import React from 'react';
import {useAppDispatch} from '@store/hooks';
import ModalWindow from '../../shared/UI/ModalWindow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";
import {useRouter} from "next/navigation";
import MenuPath from "@shared/utils/menuPath";

interface IModalAccountProps {
    modalRef: React.Ref<HTMLDivElement>;
}

const ModalAccount: React.FC<IModalAccountProps> = ({ modalRef }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleAccount = () => {
        router.push(MenuPath.PERSONAL);
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
