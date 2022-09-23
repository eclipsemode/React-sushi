import React from "react";
import styles from './ModalAccaunt.module.css'
import { MdExitToApp, MdManageAccounts } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { setAuth, setUser } from "../../redux/features/userSlice";
import { useNavigate } from "react-router-dom";

interface IModalAccountProps {
  modalRef: React.Ref<HTMLDivElement>
}

const ModalAccount: React.FC<IModalAccountProps> = ({ modalRef }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAccount = () => {
    navigate('/personal')
  }

  const handleExit = () => {
    localStorage.removeItem('token');
    dispatch(setUser({}));
    dispatch(setAuth(false));
    navigate('')
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