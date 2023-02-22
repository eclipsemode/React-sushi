import logoImg from "app/assets/img/logo.png";
import { Link, NavLink } from "react-router-dom";
import styles from "./index.module.css";

import React  from "react";

import { selectCart } from "entities/cart";
import { useAppSelector } from "app/hooks";
import { CartBlock } from "shared/UI";
import { ModalAccount } from "widgets/index";
import { PhoneOutlined, UserOutlined } from "@ant-design/icons";

const Header: React.FC = () => {
  const { totalPrice, totalAmount } = useAppSelector(selectCart);
  const { isAuth, user } = useAppSelector(state => state.userReducer);
  const [accModal, setAccModal] = React.useState<boolean>(false);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const modalRef = React.useRef<HTMLDivElement>(null);

  const isHandleClassName = React.useCallback(() => {
    window.scrollY > 0
      ? headerRef.current?.classList.add(styles.root__fixed)
      : headerRef.current?.classList.remove(styles.root__fixed);
  }, []);

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
                    {
                      user && (
                        <div>
                          <p>Добро пожаловать!</p>
                          <p>{user.name} {user.surname}</p>
                        </div>
                      )
                    }
                    <UserOutlined width={32} height={32} />
                    {accModal && <ModalAccount modalRef={modalRef} />}
                  </div>
                )
                : <UserOutlined width={32} height={32} />
            }
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
};

export default Header;
