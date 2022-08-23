import logoImg from '../../assets/img/logo.png';
import cartImg from '../../assets/img/shopping-cart.png';
import phoneImg from '../../assets/img/phone.png';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

import React from 'react';

import { selectCart } from '../../redux/features/cartSlice';
import {useAppSelector} from "../../redux/hooks";

const Header: React.FC = () => {
    const { totalPrice, totalAmount } = useAppSelector(selectCart);
    const headerRef = React.useRef<HTMLDivElement>(null);

    const isHandleClassName = React.useCallback(() => {
      window.scrollY > 0
        ? headerRef.current?.classList.add(styles.root__fixed)
        : headerRef.current?.classList.remove(styles.root__fixed);
    }, [])

    React.useEffect(() => {
      isHandleClassName();
      window.addEventListener('scroll', () => {
        isHandleClassName();
      })
    }, [isHandleClassName])

    return (
        <header ref={headerRef} className={styles.root}>
            <div className={styles.root__container}>
              <Link to={'/'}>
                <img className={styles.root__logo} width="60" height="60" src={logoImg} alt="Pizza logo"/>
              </Link>
                <ul className={styles.root__menu}>
                  <li className={styles.root__link}><Link to={'/'}>Главная</Link></li>
                  <li className={styles.root__link}><Link to={'/'}>Контакты</Link></li>
                </ul>
              <div className={styles.root__info}>
                <div className={styles.root__cart}>
                  <Link to={'/cart'}>
                  <img width="32" height="32" src={cartImg} alt="cart"/>
                  <div>{totalAmount}</div>
                  </Link>
                  <span>{totalPrice}</span>
                </div>
                <div className={styles.root__phone}>
                  <img width="32" height="32" src={phoneImg} alt="phone"/>
                  <span>8 (800) 200-27-92</span>
                </div>
              </div>
            </div>
        </header>
    );
};

export default Header;
