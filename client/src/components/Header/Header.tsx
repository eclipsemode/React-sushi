import logoImg from "../../assets/img/logo.png";
import phoneImg from "../../assets/img/phone.png";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

import React  from "react";

import { selectCart } from "../../redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import CartBlock from "../UI/CartBlock/CartBlock";
import { BsPersonCircle } from "react-icons/bs";
import { fetchUserInfo } from "../../redux/features/userSlice";
import { ModalAccount } from "../index";

interface IUserInfo {
  name: string,
  surname: string
}

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const { totalPrice, totalAmount } = useAppSelector(selectCart);
  const { isAuth } = useAppSelector(state => state.user);
  const [userInfo, setUserInfo] = React.useState<IUserInfo>();
  const [accModal, setAccModal] = React.useState<boolean>(false);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const isHandleClassName = React.useCallback(() => {
    window.scrollY > 0
      ? headerRef.current?.classList.add(styles.root__fixed)
      : headerRef.current?.classList.remove(styles.root__fixed);
  }, []);

  React.useEffect(() => {
    if (isAuth) {
      (async function getUserInfo() {
        const { payload } = await dispatch(fetchUserInfo());
        setUserInfo(payload as IUserInfo);
      })();
    }
  }, [dispatch, isAuth])

  React.useEffect(() => {
    isHandleClassName();
    window.addEventListener("scroll", isHandleClassName);

    return () => {
      window.removeEventListener("scroll", isHandleClassName);
    };
  }, [isHandleClassName]);

  const accHandle = (e: React.MouseEvent) => {
    e.preventDefault();
    setAccModal(!accModal);
  };

  React.useEffect(() => {
    function handleClickOutside (event: MouseEvent | React.PropsWithRef<any>) {
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
        <Link to={"/"}>
          <img className={styles.root__logo} width="60" height="60" src={logoImg} alt="Item logo" />
        </Link>
        <ul className={styles.root__menu}>
          <li className={styles.root__link}><Link to={"/"}>Главная</Link></li>
          <li className={styles.root__link}><a href='#footer'>Контакты</a></li>
        </ul>
        <div className={styles.root__info}>
          <NavLink to={isAuth ? '' : 'login'}>
            {
              isAuth
                ? (
                  <div className={styles.root__auth} onClick={(e: React.MouseEvent) => accHandle(e)}>
                    <div>
                      <p>Добро пожаловать!</p>
                      <p>{userInfo?.name} {userInfo?.surname}</p>
                    </div>
                    <BsPersonCircle className={styles.root__authSvg} />
                    {accModal && <ModalAccount modalRef={modalRef} />}
                  </div>
                )
                : <BsPersonCircle />
            }
          </NavLink>

          <CartBlock totalPrice={totalPrice} totalAmount={totalAmount} />
          <div className={styles.root__phone}>
            <img width="32" height="32" src={phoneImg} alt="phone" />
            <span onClick={() => console.log(userInfo)}>8 (800) 200-27-92</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
