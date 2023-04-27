import React from 'react';
import { useAppDispatch } from 'app/hooks';
import { useNavigate } from 'react-router-dom';
import { fetchUserLogout } from 'features/logout/api';
import ModalWindow from '../../shared/UI/ModalWindow';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';

interface IModalAccountProps {
    modalRef: React.Ref<HTMLDivElement>;
}

const ModalAccount: React.FC<IModalAccountProps> = ({ modalRef }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleAccount = () => {
        navigate('/personal');
    };

    const reloadPage = () => {
        navigate('/');
        navigate(0);
    };

    const handleExit = async () => {
        await dispatch(fetchUserLogout());
        reloadPage();
    };
    return (
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
    );
};

export default ModalAccount;
