import React from "react";
import styles from "./Account.module.scss";
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "app/hooks";
import {Orders, Profile, Settings} from "./index";
import {Backdrop, Breadcrumbs, CircularProgress, Skeleton, Typography} from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import RouterPath from "app/utils/menuPath";
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';
import {selectAuth} from "../../processes/services";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {setMaterialDialog} from "features/materialDialog/api";
import {MaterialDialogTypes} from "features/materialDialog/model";

type SelectedType = "profile" | "orders" | "settings";

const Account: React.FC = () => {
    const [openBackdrop, setOpenBackdrop] = React.useState(true);
    const {isAuth} = useAppSelector(state => state.userReducer);
    const {loading} = useAppSelector(selectAuth);
    const [selected, setSelected] = React.useState<SelectedType>("profile");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!loading && !isAuth) {
            navigate(RouterPath.HOME)
        }
    }, [isAuth, navigate, loading])

    const breadcrumbs = [
        <Link key={1} to={RouterPath.HOME}>
            Главная
        </Link>,
        <Link key={2} to={RouterPath.PERSONAL}>
            Аккаунт
        </Link>,
        <Typography key={3}>
            {
                loading ? <Skeleton animation='wave' height={24} width={100}/> :
                    selected === 'profile' ? 'Мой профиль' : selected === 'orders' ? 'История заказов' : 'Редактировать профиль'
            }
        </Typography>,
    ];

    const handleClose = () => {
        setOpenBackdrop(false);
    };

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
                            <aside>
                                <ul>
                                    <li className={selected === "profile" ? styles.root__selected : null}
                                        onClick={() => setSelected("profile")}>
                                        <PersonIcon/><span>Мой профиль</span></li>
                                    <li className={selected === "orders" ? styles.root__selected : null}
                                        onClick={() => setSelected("orders")}>
                                        <HistoryIcon/><span>История заказов</span></li>
                                    <li className={selected === "settings" ? styles.root__selected : null}
                                        onClick={() => setSelected("settings")}>
                                        <SettingsIcon/><span>Редактировать профиль</span></li>
                                    <li onClick={() => dispatch(setMaterialDialog({
                                        opened: true,
                                        dialogType: MaterialDialogTypes.LOGOUT
                                    }))}>
                                        <ExitToAppIcon/><span>Выйти</span></li>
                                </ul>
                            </aside>
                            {selected === "profile" && <Profile/>}
                            {selected === "orders" && <Orders/>}
                            {selected === "settings" && <Settings/>}
                        </div>
                    )
            }
        </div>
    );
};

export default Account;