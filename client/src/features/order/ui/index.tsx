import React from "react";
import { CartItem, OrderDelivered } from "widgets";
import { removeAll, selectCart } from "entities/cart";
import styles from "./index.module.css";
import { ClearButton } from "shared/UI";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { IProducts } from "entities/products";
// import { fetchOrderCreate } from "features/order/api";
import { useNavigate } from "react-router-dom";
import { DeliveryPrice } from "features/order/utils";
import PickupForm from "./PickupForm";
import SimpleButton from "shared/UI/SimpleButton";
import Alert from "shared/UI/Alert";
import DeliveryForm from "./DeliveryForm";

type OrderType = "delivery" | "pickup" | null;

const CartOrder: React.FC = () => {
  const { items, totalPrice, totalAmount, deliveryPrice } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [popup, setPopup] = React.useState<boolean>(false);
  const [orderType, setOrderType] = React.useState<OrderType>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);

  const handleRemoveAll = () => {
    if (window.confirm("Подтвердить удаление товаров?")) {
      dispatch(removeAll());
    }
  };

  // const onSubmit = () => {
  //     dispatch(fetchOrderCreate());
  //     setPopup(true);
  // }

  const onClosePopup = React.useCallback(() => {
    setPopup(false);
    dispatch(removeAll());
    navigate("/");
  }, [dispatch, navigate]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent | React.PropsWithRef<any>) => {
      if (popupRef.current && !popupRef.current.contains(e.target) && popup) {
        onClosePopup();
      }
    };

    document.body.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClosePopup, popup]);

  return (
    <div className={styles.root}>
      {
        deliveryPrice !== 0 && <Alert type="error">Внимание! Для бесплатной доставки сумма заказа должны быть не
          менее {DeliveryPrice.MIN} ₽.</Alert>
      }
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
              <ClearButton handleClick={handleRemoveAll}>Очистить корзину</ClearButton>
              <div className={styles.root__order}>
                <div className={styles.root__total}>
                  <h4>Заказ</h4>
                  <div>
                    <span>Количество</span>
                    <span>{totalAmount} шт.</span>
                  </div>
                  <div>
                    <span>Стоимость</span>
                    <span>{totalPrice} ₽</span>
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
              </div>
            </div>
          </td>
        </tr>
        </tfoot>
      </table>

      {
        !orderType &&
        (
          <div className={styles.root__type}>
            <div className={styles.root__type_title}>
              <h3>ОФОРМИТЬ ЗАКАЗ</h3>
            </div>
            <div className={styles.root__type_buttons}>
              <SimpleButton type='button' clickEvent={() => setOrderType("delivery")}>Доставка</SimpleButton>
              <SimpleButton type='button' clickEvent={() => setOrderType("pickup")}>Самовывоз</SimpleButton>
            </div>
          </div>
        )
      }

      {
        orderType === "pickup" ? <PickupForm clickEvent={() => setOrderType(null)} /> : orderType === 'delivery' ? <DeliveryForm clickEvent={() => setOrderType(null)} /> : null
      }


      {
        popup && <OrderDelivered popupRef={popupRef} onClosePopup={onClosePopup} />
      }

    </div>
  );
};

export default CartOrder;
