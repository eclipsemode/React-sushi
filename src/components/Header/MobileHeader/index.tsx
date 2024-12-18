import React from 'react';
import {
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Stack,
} from '@mui/material';
import styles from './index.module.scss';
import Link from 'next/link';
import RouterPath from '@shared/utils/menuPath';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import { usePathname, useRouter } from 'next/navigation';
import PopoverLocation, {
  IPopoverLocationProps,
} from '@components/Header/PopoverLocation';
import { useAppSelector } from '@store/hooks';
import { selectAuth } from '@store/features/auth/api';

interface IProps extends IPopoverLocationProps {
  totalPrice: number;
}

const MobileHeader = ({
  handleAgreePopover,
  onCityPickClick,
  currentBranch,
  totalPrice,
}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuth } = useAppSelector(selectAuth);
  const [activeMenu, setActiveMenu] = React.useState<number>(0);

  const setActiveMenuByLocation = React.useCallback(() => {
    switch (pathname) {
      case RouterPath.HOME:
        setActiveMenu(0);
        break;
      case RouterPath.CART:
        setActiveMenu(2);
        break;
      case RouterPath.ACCOUNT_MAIN:
        setActiveMenu(3);
        break;
      case RouterPath.CONTACTS:
        setActiveMenu(1);
        break;
      default:
        setActiveMenu(0);
    }
  }, [pathname]);

  React.useEffect(() => {
    setActiveMenuByLocation();
  }, [router, setActiveMenuByLocation]);

  const renderPopover = () => (
    <PopoverLocation
      currentBranch={currentBranch}
      handleAgreePopover={handleAgreePopover}
      onCityPickClick={onCityPickClick}
    />
  );

  return (
    <header>
      <div className={styles.innerContainer}>
        <Stack
          className={styles.mobileTopMenu}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href={RouterPath.HOME}>
            <Image
              width={150}
              height={50}
              priority={true}
              src={'/images/logo.png'}
              alt="Index logo"
            />
          </Link>

          <Stack spacing={0.5} textAlign="right">
            <span className={styles.city}>
              город:{' '}
              <span onClick={onCityPickClick}>
                {currentBranch?.name}
              </span>
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
                if (isAuth) {
                  router.push(RouterPath.ACCOUNT_MAIN);
                } else {
                  router.push(RouterPath.AUTH);
                }

                break;
              default:
                router.push(RouterPath.HOME);
            }
            setActiveMenu(newValue);
          }}
        >
          <BottomNavigationAction
            className={
              activeMenu === 0 ? styles.mobileButtonActive : styles.mobileButton
            }
            label="Главная"
            icon={<HomeIcon />}
          />
          <BottomNavigationAction
            className={
              activeMenu === 1 ? styles.mobileButtonActive : styles.mobileButton
            }
            label="Контакты"
            icon={<LocationOnIcon />}
          />
          <BottomNavigationAction
            className={
              activeMenu === 2 ? styles.mobileButtonActive : styles.mobileButton
            }
            label="Корзина"
            icon={
              <Badge
                badgeContent={totalPrice > 0 ? totalPrice + '₽' : null}
                sx={{ '&>span': { right: '-8px' } }}
                max={10000}
                color="success"
              >
                <ShoppingCartIcon />
              </Badge>
            }
          />
          <BottomNavigationAction
            className={
              activeMenu === 3 ? styles.mobileButtonActive : styles.mobileButton
            }
            label="Профиль"
            icon={<PersonIcon />}
          />
        </BottomNavigation>
      </Box>
    </header>
  );
};

export default MobileHeader;
