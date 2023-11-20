import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { usePathname, useRouter } from 'next/navigation';
import menuPath from '@shared/utils/menuPath';
import { useAppDispatch } from '@store/hooks';
import styles from './index.module.scss'

interface IProps {
  isAdmin: boolean
}

const AsideMenu = ({isAdmin}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  return (
    <aside className={styles.root}>
      <ul>
        <li
          className={pathname === menuPath.ACCOUNT_MAIN ? styles.root__selected : ''}
          onClick={() => router.push(menuPath.ACCOUNT_MAIN)}
        >
          <PersonIcon />
          <span>Мой профиль</span>
        </li>
        <li
          className={pathname === menuPath.ACCOUNT_HISTORY ? styles.root__selected : ''}
          onClick={() => router.push(menuPath.ACCOUNT_HISTORY)}
        >
          <HistoryIcon />
          <span>История заказов</span>
        </li>
        <li
          className={pathname === menuPath.ACCOUNT_EDIT ? styles.root__selected : ''}
          onClick={() => router.push(menuPath.ACCOUNT_EDIT)}
        >
          <SettingsIcon />
          <span>Редактировать профиль</span>
        </li>
        {isAdmin && (
          <li
            className={pathname === menuPath.ACCOUNT_ADMIN ? styles.root__selected : ''}
            onClick={() => router.push(menuPath.ACCOUNT_ADMIN)}
          >
            <AdminPanelSettingsIcon />
            <span>Админ-панель</span>
          </li>
        )}
        <li
          onClick={() =>
            dispatch(
              setMaterialDialog({
                opened: true,
                dialogType: MaterialDialogTypes.LOGOUT,
              })
            )
          }
        >
          <ExitToAppIcon />
          <span>Выйти</span>
        </li>
      </ul>
    </aside>
  );
};

export default AsideMenu;