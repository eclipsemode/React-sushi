import React from 'react';
import { Link } from 'react-router-dom';
import emptyCartImg from '../../assets/img/empty-cart.png';
import Button from "../UI/Button/Button";

const CartEmpty: React.FC = () => {
    return (
        <div className="cart cart--empty">
            <h2>
                Корзина пустая <span>😕</span>
            </h2>
            <p>
                Вы еще ничего не добавили в корзину.
                <br />
                Для заказа, вернитесь на главную страницу.
            </p>
            <img src={emptyCartImg} alt="Empty cart" />
          <Link to={'/'}>
          <Button>Вернуться на главную</Button>
          </Link>
        </div>
    );
};

export default CartEmpty;
