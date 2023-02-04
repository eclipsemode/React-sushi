import React from "react";
import styles from './index.module.css'
import { MdExitToApp, MdManageAccounts } from "react-icons/md";
import { useAppDispatch } from "app/hooks";
import { useNavigate } from "react-router-dom";
import { fetchUserLogout } from "features/logout/api";

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
    <div className={styles.root} ref={modalRef}>
      <ul>
        <li onClick={handleAccount}><MdManageAccounts/><span>Профиль</span></li>
        <li onClick={handleExit}><MdExitToApp/><span>Выйти</span></li>
      </ul>
    </div>
  );
};

export default ModalAccount;