import React from 'react';
import { CartItem, OrderDelivered } from "widgets";
import { removeAll, selectCart } from 'entities/cart';
import styles from './CartOrder.module.css';
import { ClearButton, ApplyButton } from 'shared/UI';
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProducts } from 'entities/products';
import { fetchOrderCreate } from "features/order/api";
import { useNavigate } from "react-router-dom";

const CartOrder: React.FC = () => {
    const { items, totalPrice, totalAmount } = useAppSelector(selectCart);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const deliveryPrice: 0 | 100 = totalPrice > 1200 ? 0 : 100;
    const [popup, setPopup] = React.useState<boolean>(false);
    const popupRef = React.useRef<HTMLDivElement>(null);

    const handleRemoveAll = () => {
        if (window.confirm("Подтвердить удаление товаров?")) {
            dispatch(removeAll());
        }
    };

    const onSubmit = () => {
        dispatch(fetchOrderCreate());
        setPopup(true);
    }

    const onClosePopup = React.useCallback(() => {
        setPopup(false);
        dispatch(removeAll());
        navigate('/');
    }, [dispatch, navigate])

    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent | React.PropsWithRef<any>) => {
            if (popupRef.current && !popupRef.current.contains(e.target) && popup) {
                onClosePopup();
            }
        }

        document.body.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.body.removeEventListener('mousedown', handleClickOutside);
        }
    }, [onClosePopup, popup])

    return (
      <div className={styles.root}>
          <table className={styles.root__table}>
              <thead>
              <tr>
                  <th>Товар</th>
                  <th>Стоимость</th>
                  <th>Количество</th>
                  <th>Общая стоимость</th>
              </tr>
              </thead>
              <tbody>
              {items.map((obj: IProducts) => (
                        <CartItem key={obj.id} obj={obj} />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
                            <div className={styles.root__footer}>
                                <ClearButton handleClick={handleRemoveAll}>Очистить корзину</ClearButton>
                                <div className={styles.root__order}>
                                    <div className={styles.root__total}>
                                        <h4>Стоимость</h4>
                                        <div>
                                            <span>Количество</span>
                                            <span>{totalAmount} шт.</span>
                                        </div>
                                        <div>
                                            <span>Доставка</span>
                                            <span>{deliveryPrice} ₽</span>
                                        </div>
                                        <div>
                                            <span>Итого</span>
                                            <span>{totalPrice + deliveryPrice} ₽</span>
                                        </div>
                                    </div>
                                    <ApplyButton clickEvent={onSubmit}>Отправить заказ</ApplyButton>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
          {
              popup && <OrderDelivered popupRef={popupRef} onClosePopup={onClosePopup}/>
          }
        </div>
    );
};

export default CartOrder;
