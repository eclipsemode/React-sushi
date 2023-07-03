import React, { LegacyRef } from "react";
import styles from './index.module.css';
import { Button } from "@shared/UI";

interface IOrderDelivered {
  onClosePopup: () => void;
  popupRef: LegacyRef<HTMLDivElement>;
}

const OrderDelivered: React.FC<IOrderDelivered> = ({ onClosePopup, popupRef }) => {
  return (
    <div className={styles.root}>
      <div className={styles.root__modal} ref={popupRef}>
        <h2>Ваш заказ отправлен.</h2>
        <p>Оператор перезвонит для подтверждения в течении 5 минут.</p>
        <Button clickEvent={onClosePopup}>Закрыть</Button>
      </div>
    </div>
  );
};

export default OrderDelivered;