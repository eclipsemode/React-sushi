import React from "react";
import styles from "./Account.module.scss";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {Orders, Profile, Settings} from "./index";
import {
    Backdrop,
    Breadcrumbs,
    CircularProgress,
    Skeleton,
    Typography
} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RouterPath from "@shared/utils/menuPath";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {selectAuth} from "@store/features/auth";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";
import {DeviceType, selectAdaptiveServiceSlice} from "@store/features/adaptive";
import Admin from "./Admin";
import {SelectedType} from "../api";
import {useRouter} from "next/navigation";
import Link from 'next/link'

const Account: React.FC = () => {
    const [openBackdrop, setOpenBackdrop] = React.useState(true);
    const {isAuth, user} = useAppSelector(state => state.userReducer);
    const { page } = useAppSelector(state => state.ordersReducer);
    const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
    const {loading} = useAppSelector(selectAuth);
    const [selected, setSelected] = React.useState<SelectedType>(page);
    const router = useRouter();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        setSelected(page);
    }, [page])

    React.useEffect(() => {
        if (!loading && !isAuth) {
            router.push(RouterPath.HOME)
        }
    }, [isAuth, router, loading])

    const breadcrumbs = [
        <Link key={1} href={RouterPath.HOME}>
            Главная
        </Link>,
        <Link key={2} href={RouterPath.PERSONAL}>
            Аккаунт
        </Link>,
        <Typography key={3}>
            {
                loading ? <Skeleton animation='wave' height={24} width={100}/> :
                    selected === 'profile' ? 'Мой профиль' : selected === 'orders' ? 'История заказов' : selected === 'settings' ? 'Редактировать профиль' : 'Админ-панель'
            }
        </Typography>,
    ];

    const handleClose = () => {
        setOpenBackdrop(false);
    };

    const renderAsideMenu = () => (
        <aside>
            <ul>
                <li className={selected === "profile" ? styles.root__selected : ''}
                    onClick={() => setSelected("profile")}>
                    <PersonIcon/><span>Мой профиль</span></li>
                <li className={selected === "orders" ? styles.root__selected : ''}
                    onClick={() => setSelected("orders")}>
                    <HistoryIcon/><span>История заказов</span></li>
                <li className={selected === "settings" ? styles.root__selected : ''}
                    onClick={() => setSelected("settings")}>
                    <SettingsIcon/><span>Редактировать профиль</span></li>
                {
                    user?.role === 'ADMIN' && (
                        <li className={selected === "admin" ? styles.root__selected : ''}
                            onClick={() => setSelected("admin")}>
                            <AdminPanelSettingsIcon/><span>Админ-панель</span></li>
                    )
                }
                <li onClick={() => dispatch(setMaterialDialog({
                    opened: true,
                    dialogType: MaterialDialogTypes.LOGOUT
                }))}>
                    <ExitToAppIcon/><span>Выйти</span></li>
            </ul>
        </aside>
    )

    return (
        <div className={styles.root}>
            <div className={styles.root__head}>
                <Breadcrumbs className={styles.breadcrumbs}
                             separator={<NavigateNextIcon fontSize="small"/>}
                             aria-label="breadcrumb"
                >
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            {
                loading ? <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={openBackdrop}
                        onClick={handleClose}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop> :
                    (
                        <div className={styles.root__body}>
                            {deviceType === DeviceType.DESKTOP && renderAsideMenu()}
                            {selected === "profile" && <Profile/>}
                            {selected === "orders" && <Orders/>}
                            {selected === "settings" && <Settings/>}
                            {selected === "admin" && <Admin/>}
                        </div>
                    )
            }
        </div>
    );
};

export default Account;