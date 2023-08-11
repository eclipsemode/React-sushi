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
import {Badge, BottomNavigation, BottomNavigationAction, Box, Popover, Stack, Typography} from '@mui/material';
import RouterPath from '@shared/utils/menuPath';
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {IBranches, selectLocation} from "@store/features/location/api";
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";
import SimpleButton from "@shared/UI/SimpleButton";
import Colors from "@shared/utils/Colors";
import {usePosition} from "../../hooks/usePosition";
import {checkCookieExpire, setCookie} from "@shared/utils/Cookie";

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const {currentBranch, allBranches} = useAppSelector(selectLocation);
    const [activeMenu, setActiveMenu] = React.useState<number>(0);
    const {totalPrice, deliveryPrice} = useAppSelector(selectCart);
    const {isAuth, user} = useAppSelector((state) => state.userReducer);
    const {deviceType} = useAppSelector(selectAdaptiveServiceSlice);
    const [accModal, setAccModal] = React.useState<boolean>(false);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const modalRef = React.useRef<HTMLDivElement>(null);
    const {city} = usePosition();
    const [openedPopover, setOpenedPopover] = React.useState<boolean>(false);
    const popoverRef = React.useRef<HTMLSpanElement>(null);
    const [mounted, setMounted] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (!mounted) {
            const branchExists = allBranches.find((branch: IBranches) => branch.name === city);

            if (!checkCookieExpire('location-initial') && allBranches &&  city && !isAuth && (!isAuth || !branchExists)) {
                setOpenedPopover(true);

                if (!mounted) {
                    setCookie('location-initial', '1', 1);
                    setMounted(true)
                }
            }
        }
    }, [allBranches, city, isAuth])

    const handleClosePopover = () => {
        setOpenedPopover(false);
    };

    const setActiveMenuByLocation = React.useCallback(() => {
        switch (pathname) {
            case RouterPath.HOME:
                setActiveMenu(0);
                break;
            case RouterPath.CART:
                setActiveMenu(2);
                break;
            case RouterPath.PROFILE:
                setActiveMenu(3);
                break;
            case RouterPath.CONTACTS:
                setActiveMenu(1);
                break;
            default:
                setActiveMenu(0);
        }
    }, [pathname])

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

    const onCityPickClick = () => {
        if (openedPopover) {
            setOpenedPopover(false)
        }
        dispatch(setMaterialDialog({
            opened: true,
            dialogType: MaterialDialogTypes.HEADER_PICK_CITY
        }))
    }

    const renderPopover = () => (
        <Popover
            sx={{
                '& .MuiPaper-root': {
                    marginTop: '5px',
                    background: Colors.$rootCardBackground
                }
            }}
            disableScrollLock={true}
            open={openedPopover}
            anchorEl={popoverRef.current}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <Stack sx={{padding: '15px'}}>
                <Typography sx={{ p: 2, color: Colors.$rootText }}>Ваш город {currentBranch}?</Typography>
                <SimpleButton variant='contained' clickEvent={handleClosePopover}>Подтвердить</SimpleButton>
                <SimpleButton variant='text' clickEvent={onCityPickClick}>Выбрать город</SimpleButton>
            </Stack>
        </Popover>
    )

    const renderDesktopMenu = () => (
        <header ref={headerRef} className={styles.root}>
            <div className={styles.root__container}>
                <Link href={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>
                    <Image width={150} height={50} src={'/images/logo.png'} priority alt="Item logo"/>
                </Link>
                <Stack spacing={0.5}>
                    <span className={styles.city}>
                        город: <span ref={popoverRef} onClick={onCityPickClick}>{currentBranch}</span>
                    </span>
                    {renderPopover()}
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
                    <Link href={RouterPath.PROFILE}>
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
                                <PersonIcon width={32} height={32}/>
                                {accModal && <ModalAccount modalRef={modalRef}/>}
                            </div>
                        ) : (
                            <div className={styles.root__auth}>
                                <span>Войти в аккаунт</span>
                                <PersonIcon width={32} height={32}/>
                            </div>

                        )}
                    </Link>

                    <Badge
                        badgeContent={totalPrice > 0 ? totalPrice + '₽' : null}
                        max={10000}
                        color="success"
                        sx={{cursor: 'pointer'}}
                        onClick={() => router.push(RouterPath.CART)}
                    >
                        <ShoppingCartIcon/>
                    </Badge>
                    <div className={styles.root__phone}>
                        <PhoneIcon width={32} height={32}/>
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
                        <Image width={150} height={50} src={'/images/logo.png'} alt="Item logo"/>
                    </Link>

                    <Stack spacing={0.5} textAlign="right">
                        <span className={styles.city}>
                            город: <span ref={popoverRef} onClick={onCityPickClick}>{currentBranch}</span>
                        </span>
                        {renderPopover()}
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
                                router.push(RouterPath.PROFILE)
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
                        icon={<HomeIcon/>}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 1 ? styles.mobileButtonActive : styles.mobileButton}
                        label="Контакты"
                        icon={<LocationOnIcon/>}
                    />
                    <BottomNavigationAction
                        className={activeMenu === 2 ? styles.mobileButtonActive : styles.mobileButton}
                        label="Корзина"
                        icon={
                            <Badge
                                badgeContent={totalPrice + deliveryPrice > 0 ? totalPrice + deliveryPrice + '₽' : null}
                                sx={{'&>span': {right: '-8px'}}}
                                max={10000}
                                color="success"
                            >
                                <ShoppingCartIcon/>
                            </Badge>
                        }
                    />
                    <BottomNavigationAction
                        className={activeMenu === 3 ? styles.mobileButtonActive : styles.mobileButton}
                        label="Профиль"
                        icon={<PersonIcon/>}
                    />
                </BottomNavigation>
            </Box>
        </header>
    );

    return deviceType === DeviceType.DESKTOP ? renderDesktopMenu() : renderMobileMenu();
};

export default Header;
