import React from 'react';
import logoImg from 'app/assets/img/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LogoShortImg from 'app/assets/img/logo_short.png';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';

import { selectCart } from 'entities/cart';
import { useAppSelector } from 'app/hooks';
import { CartBlock } from 'shared/UI';
import { ModalAccount } from 'widgets/index';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { DeviceType, selectAdaptiveServiceSlice } from '../../processes/services/adaptiveService/adaptiveService';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import RouterPath from '../../app/utils/menuPath';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = React.useState<number>(0);
    const { totalPrice, totalAmount } = useAppSelector(selectCart);
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
    const [accModal, setAccModal] = React.useState<boolean>(false);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        switch (location.pathname) {
            case RouterPath.HOME:
                setActiveMenu(0);
                break;
            case RouterPath.CART:
                setActiveMenu(2);
                break;
            case RouterPath.LOGIN:
                setActiveMenu(3);
                break;
            case RouterPath.CONTACT:
                setActiveMenu(1);
                break;
            default:
                setActiveMenu(0);
        }
    }, [location]);

    const isHandleClassName = React.useCallback(() => {
        window.scrollY > 0
            ? headerRef.current?.classList.add(styles.root__fixed)
            : headerRef.current?.classList.remove(styles.root__fixed);
    }, []);

    React.useEffect(() => {
        isHandleClassName();
        window.addEventListener('scroll', isHandleClassName);

        return () => {
            window.removeEventListener('scroll', isHandleClassName);
        };
    }, [isHandleClassName]);

    const accHandle = (e: React.MouseEvent) => {
        e.preventDefault();
        setAccModal(!accModal);
    };

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent | React.PropsWithRef<any>) {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setAccModal(false);
            }
        }

        document.body.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const renderDesktopMenu = () => (
        <header ref={headerRef} className={styles.root}>
            <div className={styles.root__container}>
                <Link to={'/'}>
                    <img className={styles.root__logo} src={logoImg} alt="Item logo" />
                </Link>
                <ul className={styles.root__menu}>
                    <li className={styles.root__link}>
                        <Link to={'/'}>Главная</Link>
                    </li>
                    <li className={styles.root__link}>
                        <a href="#footer">Контакты</a>
                    </li>
                </ul>
                <div className={styles.root__info}>
                    <NavLink to={isAuth ? '' : 'login'}>
                        {isAuth ? (
                            <div className={styles.root__auth} onClick={(e: React.MouseEvent) => accHandle(e)}>
                                {user && (
                                    <div>
                                        <p>Добро пожаловать!</p>
                                        <p>
                                            {user.name} {user.surname}
                                        </p>
                                    </div>
                                )}
                                <UserOutlined width={32} height={32} />
                                {accModal && <ModalAccount modalRef={modalRef} />}
                            </div>
                        ) : (
                            <UserOutlined width={32} height={32} />
                        )}
                    </NavLink>

                    <CartBlock totalPrice={totalPrice} totalAmount={totalAmount} />
                    <div className={styles.root__phone}>
                        <PhoneOutlined width={32} height={32} />
                        <span>8 (800) 200-27-92</span>
                    </div>
                </div>
            </div>
        </header>
    );

    const renderMobileMenu = () => (
        <header>
            <Box className={styles.mobileHeader}>
                <BottomNavigation
                    showLabels
                    value={activeMenu}
                    onChange={(_, newValue) => {
                        switch (newValue) {
                            case 0:
                                navigate(RouterPath.HOME);
                                break;
                            case 1:
                                navigate(RouterPath.CONTACT);
                                break;
                            case 2:
                                navigate(RouterPath.CART);
                                break;
                            case 3:
                                navigate(RouterPath.LOGIN);
                                break;
                            default:
                                navigate('/');
                        }
                        setActiveMenu(newValue);
                    }}
                >
                    <BottomNavigationAction
                        className={activeMenu === 0 ? styles.mobileButtonActive : null}
                        icon={<img src={LogoShortImg} width={30} height={30} alt="logo" />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 1 ? styles.mobileButtonActive : null}
                        label="Контакты"
                        icon={<LocationOnIcon />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 2 ? styles.mobileButtonActive : null}
                        label="Корзина"
                        icon={<ShoppingCartIcon />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 3 ? styles.mobileButtonActive : null}
                        label="Профиль"
                        icon={<PersonIcon />}
                    />
                </BottomNavigation>
            </Box>
        </header>
    );

    return deviceType === DeviceType.DESKTOP ? renderDesktopMenu() : renderMobileMenu();
};

export default Header;
