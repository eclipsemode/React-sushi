import React from 'react';
import logoImg from 'app/assets/img/logo.png';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

import { selectCart } from 'entities/cart';
import { useAppSelector } from 'app/hooks';
// import { CartBlock } from 'shared/UI';
import { ModalAccount } from 'widgets/index';
import { DeviceType, selectAdaptiveServiceSlice } from '../../processes/services/adaptiveService/adaptiveService';
import { Badge, BottomNavigation, BottomNavigationAction, Box, Stack } from '@mui/material';
import RouterPath from '../../app/utils/menuPath';
import { selectCity } from '../../entities/city';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { city } = useAppSelector(selectCity);
    const [activeMenu, setActiveMenu] = React.useState<number>(0);
    const { totalPrice, deliveryPrice } = useAppSelector(selectCart);
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
                <Link to={RouterPath.HOME}>
                    <img className={styles.root__logo} src={logoImg} alt="Item logo" />
                </Link>
                <Stack spacing={0.5}>
                    <span className={styles.city}>
                        город: <span>{city}</span>
                    </span>
                    <span className={styles.phoneAdditional}>тел: 8 (800) 200-27-92</span>
                    <span className={styles.time}>Доставка 10:00-23:30</span>
                </Stack>
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
                                <PersonIcon width={32} height={32} />
                                {accModal && <ModalAccount modalRef={modalRef} />}
                            </div>
                        ) : (
                            <PersonIcon width={32} height={32} />
                        )}
                    </NavLink>

                    <Badge
                        badgeContent={totalPrice + deliveryPrice > 0 ? totalPrice + deliveryPrice + '₽' : null}
                        max={10000}
                        color="success"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(RouterPath.CART)}
                    >
                        <ShoppingCartIcon />
                    </Badge>
                    {/*<CartBlock totalPrice={totalPrice} totalAmount={totalAmount} />*/}
                    <div className={styles.root__phone}>
                        <PhoneIcon width={32} height={32} />
                        <span>8 (800) 200-27-92</span>
                    </div>
                </div>
            </div>
        </header>
    );

    const renderMobileMenu = () => (
        <header>
            <div className="container">
                <Stack
                    className={styles.mobileTopMenu}
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Link to={RouterPath.HOME}>
                        <img className={styles.root__logo} src={logoImg} alt="Item logo" />
                    </Link>

                    <Stack spacing={0.5} textAlign="right">
                        <span className={styles.city}>
                            город: <span>{city}</span>
                        </span>
                        <span className={styles.time}>Доставка 10:00-23:30</span>
                    </Stack>
                </Stack>
            </div>
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
                        label="Главная"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 1 ? styles.mobileButtonActive : null}
                        label="Контакты"
                        icon={<LocationOnIcon />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 2 ? styles.mobileButtonActive : null}
                        label="Корзина"
                        icon={
                            <Badge
                                badgeContent={totalPrice + deliveryPrice > 0 ? totalPrice + deliveryPrice + '₽' : null}
                                sx={{ '&>span': { right: '-8px' } }}
                                max={10000}
                                color="success"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        }
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
