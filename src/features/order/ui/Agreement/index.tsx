import React from "react";
import styles from "./index.module.scss";
import BlockForm from "shared/UI/BlockForm";
import { useAppSelector } from "app/hooks";
import Checkbox from "../../../../shared/UI/Checkbox";
import {IFormData} from "../../model";

interface IAgreementProps {
  delivery?: boolean;
  register?: any;
  errors?: IFormData | any;
}

const Agreement: React.FC<IAgreementProps> = (props) => {
  const { totalPrice, deliveryPrice, totalAmount } = useAppSelector(state => state.cartReducer);

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
                <span>{props.delivery ? totalPrice + deliveryPrice : totalPrice} ₽</span>
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