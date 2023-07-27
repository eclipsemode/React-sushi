"use client"
import React from 'react';
import styles from './index.module.scss';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import {selectCart} from '@store/features/cart/api';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {ModalAccount} from '@components/index';
import {DeviceType, selectAdaptiveServiceSlice} from '@store/features/adaptive';
import {Badge, BottomNavigation, BottomNavigationAction, Box, Menu, MenuItem, Stack} from '@mui/material';
import RouterPath from '@shared/utils/menuPath';
import {selectCity} from '@store/features/city';
import Colors from "@shared/utils/Colors";
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";
import {SelectedType, setPage} from "@store/features/account/api";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const { city } = useAppSelector(selectCity);
    const { page } = useAppSelector(state => state.ordersReducer);
    const [activeMenu, setActiveMenu] = React.useState<number>(0);
    const { totalPrice, deliveryPrice } = useAppSelector(selectCart);
    const { isAuth, user } = useAppSelector((state) => state.userReducer);
    const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
    const [accModal, setAccModal] = React.useState<boolean>(false);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const setActiveMenuByLocation = React.useCallback(() => {
        switch (pathname) {
            case RouterPath.HOME:
                setActiveMenu(0);
                break;
            case RouterPath.CART:
                setActiveMenu(2);
                break;
            case RouterPath.AUTH:
                setActiveMenu(3);
                break;
            case RouterPath.PERSONAL:
                setActiveMenu(3);
                break;
            case RouterPath.CONTACTS:
                setActiveMenu(1);
                break;
            default:
                setActiveMenu(0);
        }
    }, [router])
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setActiveMenuByLocation();
    };

    const handleClickMenu = (page: SelectedType) => {
        router.push(RouterPath.PERSONAL);
        dispatch(setPage(page));
        handleClose();
    }

    React.useEffect(() => {
        setActiveMenuByLocation();
    }, [router, setActiveMenuByLocation]);

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
                <Link href={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>
                    <Image width={150} height={50} src={'/images/logo.png'} priority alt="Item logo" />
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
                        <Link href={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>Главная</Link>
                    </li>
                    <li className={styles.root__link}>
                        <Link href={RouterPath.CONTACTS}>Контакты</Link>
                    </li>
                </ul>
                <div className={styles.root__info}>
                    <Link href={isAuth ? '' : RouterPath.AUTH}>
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
                            <div className={styles.root__auth}>
                                <span>Войти в аккаунт</span>
                                <PersonIcon width={32} height={32} />
                            </div>

                        )}
                    </Link>

                    <Badge
                        badgeContent={totalPrice > 0 ? totalPrice + '₽' : null}
                        max={10000}
                        color="success"
                        sx={{ cursor: 'pointer' }}
                        onClick={() => router.push(RouterPath.CART)}
                    >
                        <ShoppingCartIcon />
                    </Badge>
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
                    <Link href={RouterPath.HOME}>
                        <Image width={150} height={50} src={'/images/logo.png'} alt="Item logo" />
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
                                router.push(RouterPath.HOME);
                                break;
                            case 1:
                                router.push(RouterPath.CONTACTS);
                                break;
                            case 2:
                                router.push(RouterPath.CART);
                                break;
                            case 3:
                                break;
                            default:
                                router.push(RouterPath.HOME);
                        }
                        setActiveMenu(newValue);
                    }}
                >
                    <BottomNavigationAction
                        className={activeMenu === 0 ? styles.mobileButtonActive : styles.mobileButton}
                        label="Главная"
                        icon={<HomeIcon />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 1 ? styles.mobileButtonActive : styles.mobileButton}
                        label="Контакты"
                        icon={<LocationOnIcon />}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 2 ? styles.mobileButtonActive : styles.mobileButton}
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
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        className={activeMenu === 3 ? styles.mobileButtonActive : styles.mobileButton}
                        label="Профиль"
                        onClick={(event) => isAuth ? handleClick(event) : router.push(RouterPath.AUTH)}
                        icon={<PersonIcon />}
                    />
                </BottomNavigation>

                <Menu
                    sx={{
                        '& > .MuiPaper-root': {
                            background: Colors.$rootCardBackground,
                            color: Colors.$rootText
                        },
                        '& li:hover': {
                            background: Colors.$rootTextHover
                        }
                    }}
                    disableScrollLock={true}
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleClickMenu('profile')} selected={pathname === RouterPath.PERSONAL && page === 'profile'}>Профиль</MenuItem>
                    <MenuItem onClick={() => handleClickMenu('orders')} selected={pathname === RouterPath.PERSONAL && page === 'orders'}>История заказов</MenuItem>
                    <MenuItem onClick={() => handleClickMenu('settings')} selected={pathname === RouterPath.PERSONAL && page === 'settings'}>Редактировать профиль</MenuItem>
                    <MenuItem onClick={() => {
                        handleClose();
                        dispatch(setMaterialDialog({
                            opened: true,
                            dialogType: MaterialDialogTypes.LOGOUT
                        }))
                    }}>Выйти</MenuItem>
                </Menu>
            </Box>
        </header>
    );

    return deviceType === DeviceType.DESKTOP ? renderDesktopMenu() : renderMobileMenu();
};

export default Header;
