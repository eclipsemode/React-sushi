import React from 'react';
import styles from './index.module.scss';
import Link from 'next/link';
import RouterPath from '@shared/utils/menuPath';
import Image from 'next/image';
import { Badge, Stack } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { ModalAccount } from '@components/index';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PhoneIcon from '@mui/icons-material/Phone';
import PopoverLocation, { IPopoverLocationProps } from '@components/Header/PopoverLocation';
import { useRouter } from 'next/navigation';
import { IUser } from '@store/features/user';

interface IProps extends IPopoverLocationProps {
  totalPrice: number,
  isAuth: boolean,
  user: IUser | null
}

const DesktopHeader = ({openedPopover, popoverRef, handleClosePopover, currentBranch, handleAgreePopover, onCityPickClick, totalPrice, isAuth, user}: IProps) => {
  const router = useRouter();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [accModal, setAccModal] = React.useState<boolean>(false);

  const renderPopover = () => <PopoverLocation
    openedPopover={openedPopover}
    popoverRef={popoverRef}
    handleClosePopover={handleClosePopover}
    currentBranch={currentBranch}
    handleAgreePopover={handleAgreePopover}
    onCityPickClick={onCityPickClick} />

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

  return (
    <header ref={headerRef} className={styles.root}>
      <div className={styles.root__container}>
        <Link href={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>
          <Image
            width={150}
            height={50}
            src={'/images/logo.png'}
            priority
            alt="Index logo"
          />
        </Link>
        <Stack spacing={0.5}>
          <span className={styles.city}>
            город:{' '}
            <span ref={popoverRef} onClick={onCityPickClick}>
              {currentBranch}
            </span>
          </span>
          {renderPopover()}
          <span className={styles.phoneAdditional}>тел: 8 (800) 200-27-92</span>
          <span className={styles.time}>Доставка 10:00-23:30</span>
        </Stack>
        <ul className={styles.root__menu}>
          <li className={styles.root__link}>
            <Link href={RouterPath.HOME} onClick={() => window.scrollTo(0, 0)}>
              Главная
            </Link>
          </li>
          <li className={styles.root__link}>
            <Link href={RouterPath.CONTACTS}>Контакты</Link>
          </li>
        </ul>
        <div className={styles.root__info}>
          <Link href={RouterPath.ACCOUNT_MAIN}>
            {isAuth ? (
              <div
                className={styles.root__auth}
                onClick={(e: React.MouseEvent) => accHandle(e)}
              >
                {user && (
                  <div>
                    <p>Добро пожаловать!</p>
                    {user.name ? (
                      <p>
                        {user.name} {user.surname}
                      </p>
                    ) : (
                      <p>Гость</p>
                    )}
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
};

export default DesktopHeader;