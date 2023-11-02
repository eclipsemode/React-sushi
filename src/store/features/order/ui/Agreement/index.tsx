import React from "react";
import styles from "./index.module.scss";
import BlockForm from "@shared/UI/BlockForm";
import {useAppSelector} from "@store/hooks";
import Checkbox from "@shared/UI/Checkbox";
import {IFormData} from "../../model";

interface IAgreementProps {
  delivery?: boolean;
  register?: any;
  errors?: IFormData | any;
}

const Agreement: React.FC<IAgreementProps> = (props) => {
  const { totalPrice, deliveryPrice, totalAmount, pizzasDiscount } = useAppSelector(state => state.cartReducer);
  const { promocode } = useAppSelector(state => state.promocodeReducer)
  
  const calculateTotalPrice = React.useCallback(() => {
    let newPrice: number;
    if (!!promocode) {
      if (!!props.delivery) {
        newPrice = promocode.type === 'RUB' ? (totalPrice - promocode.discount)  + deliveryPrice : (totalPrice - (totalPrice / 100 * promocode.discount)) + deliveryPrice;
      } else {
        newPrice = promocode.type === 'RUB' ? totalPrice - promocode.discount : totalPrice - (totalPrice / 100 * promocode.discount);
      }
    } else {
      if (!!props.delivery) {
        newPrice = totalPrice + deliveryPrice;
      } else {
        newPrice = totalPrice;
      }
    }

    return newPrice - pizzasDiscount;
  }, [deliveryPrice, promocode, props.delivery, totalPrice])

  const calculateTotalWithPromocode = React.useCallback((price: number) => {
    let newPrice: number;

    if (!!props.delivery && promocode?.type !== 'percent') {
      if (price < (totalPrice / 2) + deliveryPrice) {
        newPrice = (totalPrice / 2) + deliveryPrice;
      } else {
        newPrice = price;
      }
    } else {
      if (price < totalPrice / 2 && promocode?.type !== 'percent') {
        newPrice = totalPrice / 2;
      } else {
        newPrice = price;
      }
    }

    return Math.trunc(newPrice);
  }, [deliveryPrice, promocode?.type, props.delivery, totalPrice])

  const calculatePromocode = React.useCallback((price: number) => {
    let newPrice: number;

    if (promocode?.type !== 'percent') {

      if (!!props.delivery) {

        if (price < (totalPrice / 2) + deliveryPrice) {
          newPrice = totalPrice / 2
        } else {
          newPrice = promocode?.discount ?? 0
        }

      } else {

        if (price < totalPrice / 2) {
          newPrice = totalPrice / 2
        } else {
          newPrice = promocode?.discount ?? 0
        }

      }

    } else {
      newPrice = price;
    }

    return newPrice;

  }, [deliveryPrice, promocode?.discount, promocode?.type, props.delivery, totalPrice])

  return (
    <BlockForm>
      <div className={styles.root}>
        <div className={styles.root__price}>
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

              {
                  !!promocode &&
                  (
                      <div className={styles.delivery}>
                        <span>Промокод</span>
                        <span>-{promocode.type === 'RUB' ? calculatePromocode(calculateTotalPrice()) + '₽' : promocode.discount + '%'}</span>
                      </div>
                  )
              }

              {
                !!pizzasDiscount &&
                  (
                      <div className={styles.delivery}>
                        <span>Скидка</span>
                        <span>-{pizzasDiscount + ' ₽'}</span>
                      </div>
                  )
              }

              {
                  props.delivery &&
                  (
                      <div className={styles.delivery}>
                        <span>Доставка</span>
                        <span>{deliveryPrice} ₽</span>
                      </div>
                  )
              }

              <div>
                <span>Итого</span>
                <span>{calculateTotalWithPromocode(calculateTotalPrice())} ₽</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.root__agreement}>
          <Checkbox name='agreement_1' register={props.register} errors={props.errors} checked={true}>Осуществляя заказ на <a
            href="/">сайте</a> я подтверждаю, что ознакомился с правилами
            продажи товаров, а также cо всеми документами, размещенными на сайте по <a
              href="/">адресу</a>, и подтверждаю принятие правил продажи товаров на сайте в полном
            объеме без ограничений.</Checkbox>

          <Checkbox name='agreement_2' register={props.register} errors={props.errors} checked={true}>Осуществляя заказ на <a
            href="/">сайте</a> я даю свое согласие на сбор и обработку моих
            персональных данных в соответствии с политикой <a href="/">конфиденциальности</a>.</Checkbox>

          <Checkbox name='agreement_3' register={props.register} errors={props.errors} checked={true}>Осуществляя заказ на <a
            href="/">сайте</a> я даю свое согласие на получение направляемых
            мне смс-сообщений и электронных писем рекламного и информационного характера.</Checkbox>
        </div>
      </div>
    </BlockForm>
  );
};

export default Agreement;