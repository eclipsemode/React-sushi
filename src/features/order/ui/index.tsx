import React from 'react';
import { CartItem } from 'widgets';
import { removeAll, selectCart } from 'entities/cart';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { IProducts } from 'entities/products';
import { DeliveryPrice } from 'features/order/utils';
import PickupForm from './PickupForm';
import SimpleButton from 'shared/UI/SimpleButton';
import Alert from 'shared/UI/Alert';
import DeliveryForm from './DeliveryForm';
import Colors from "../../../app/utils/Colors";

export type OrderType = 'delivery' | 'pickup' | null;

const CartOrder: React.FC = () => {
    const { items, totalPrice, deliveryPrice } = useAppSelector(selectCart);
    const dispatch = useAppDispatch();
    const [orderType, setOrderType] = React.useState<OrderType>(null);

    const handleRemoveAll = () => {
        if (window.confirm('Подтвердить удаление товаров?')) {
            dispatch(removeAll());
        }
    };

    return (
        <div className={styles.root}>
            {deliveryPrice !== 0 && orderType !== 'pickup' && (
                <Alert type="error">
                    Внимание! Для бесплатной доставки сумма заказа должны быть не менее {DeliveryPrice.MIN} ₽.
                </Alert>
            )}
            <br />
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
                                <SimpleButton color={Colors.$mainColor} type='reset' variant='contained' clickEvent={handleRemoveAll}>Очистить корзину</SimpleButton>
                                <h4 className={styles.root__footer_price}>Сумма заказа: {totalPrice} ₽</h4>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>

            {!orderType && (
                <div className={styles.root__type}>
                    <div className={styles.root__type_title}>
                        <h3>ОФОРМИТЬ ЗАКАЗ</h3>
                    </div>
                    <div className={styles.root__type_buttons}>
                        <SimpleButton type="button" clickEvent={() => setOrderType('delivery')}>
                            Доставка
                        </SimpleButton>
                        <SimpleButton type="button" clickEvent={() => setOrderType('pickup')}>
                            Самовывоз
                        </SimpleButton>
                    </div>
                </div>
            )}

            {orderType === 'pickup' ? (
                <PickupForm clickEvent={() => setOrderType(null)} />
            ) : orderType === 'delivery' ? (
                <DeliveryForm clickEvent={() => setOrderType(null)} />
            ) : null}
        </div>
    );
};

export default CartOrder;
