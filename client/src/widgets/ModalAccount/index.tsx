import React from "react";
import { MdExitToApp, MdManageAccounts } from "react-icons/md";
import { useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { fetchUserLogout } from "features/logout/api";
import ModalWindow from "../../shared/UI/ModalWindow";

interface IModalAccountProps {
  modalRef: React.Ref<HTMLDivElement>
}

const ModalAccount: React.FC<IModalAccountProps> = ({ modalRef }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAccount = () => {
    navigate('/personal')
  }

  const reloadPage = () => {
    navigate('/');
    navigate(0);
  }

  const handleExit = async () => {
    await dispatch(fetchUserLogout());
    reloadPage();
  }
  return (
    <ModalWindow refModal={modalRef} listArray={[
      {
        text: 'Профиль',
        icon: <MdManageAccounts/>,
        clickEvent: () => handleAccount
      },
      {
        text: 'Выйти',
        icon: <MdExitToApp/>,
        clickEvent: () => handleExit
      }
    ]}/>
  );
};

export default ModalAccount;