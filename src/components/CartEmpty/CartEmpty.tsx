import React from 'react';
import SimpleButton from '@shared/UI/SimpleButton';
import Image from 'next/image';
import Link from 'next/link';
import MenuPath from '@shared/utils/menuPath';

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
      <Image
        src={'/images/empty-cart.png'}
        width="400"
        height="200"
        style={{ height: '100%', width: '100%' }}
        priority
        alt="Empty cart"
      />
      <Link href={MenuPath.HOME}>
        <SimpleButton>Вернуться на главную</SimpleButton>
      </Link>
    </div>
  );
};

export default CartEmpty;
