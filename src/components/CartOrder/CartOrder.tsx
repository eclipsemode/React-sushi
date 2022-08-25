import React from "react";
import { CartItem } from "../../components";
import { removeAll, selectCart } from "../../redux/features/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CartOrder.module.css";
import ClearButton from "../UI/ClearButton/ClearButton";
import ApplyButton from "../UI/ApplyButton/ApplyButton";

const CartOrder: React.FC = () => {
  const { items, totalPrice, totalAmount } = useSelector(selectCart);
  const dispatch = useDispatch();
  const deliveryPrice: 0 | 100 = totalPrice > 1200 ? 0 : 100;

  const handleRemoveAll = () => {
    if (window.confirm("Подтвердить удаление товаров?")) {
      dispatch(removeAll());
    }
  };

  return (
    <div className={styles.root}>
      <table className={styles.root__table}>
        <thead>
        <tr>
          <th>Товар</th>
          <th>Стоимость</th>
          <th>Колличество</th>
          <th>Общая стоимость</th>
        </tr>
        </thead>
        <tbody>
        {
          items.map((obj) => (
            <CartItem key={obj.id} obj={obj} />
          ))
        }
        </tbody>
        <tfoot>
        <tr>
          <td colSpan={4}>
            <div className={styles.root__footer}>
              <ClearButton handleClick={handleRemoveAll}>Очистить корзину</ClearButton>
              <div className={styles.root__order}>
                <div className={styles.root__total}>
                  <h4>Стоимость</h4>
                  <div><span>Количество</span><span>{totalAmount} шт.</span></div>
                  <div><span>Доставка</span><span>{deliveryPrice} ₽</span></div>
                  <div><span>Итого</span><span>{totalPrice} ₽</span></div>
                </div>
                <ApplyButton>Отправить заказ</ApplyButton>
              </div>
            </div>

          </td>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartOrder;
