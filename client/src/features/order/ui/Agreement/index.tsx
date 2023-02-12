import React from "react";
import styles from './index.module.css'
import BlockForm from "../BlockForm";
import Checkbox from "antd/es/checkbox/Checkbox";
import { useAppSelector } from "app/hooks";

interface IAgreementProps {
  setAgreement: (value: boolean) => void;
}

const Agreement: React.FC<IAgreementProps> = (props) => {
  const { totalPrice, deliveryPrice } = useAppSelector(state => state.cartReducer);
  const [first, setFirst] = React.useState<boolean>(true);
  const [second, setSecond] = React.useState<boolean>(true);
  const [third, setThird] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (first && second && third) {
      props.setAgreement(true);
    } else {
      props.setAgreement(false);
    }
  }, [first, second, third, props])

  return (
    <BlockForm>
      <div className={styles.root}>
        <div className={styles.root__price}>
          <p>Итого</p>
          <p>{totalPrice + deliveryPrice} ₽</p>
        </div>
        <div className={styles.root__agreement}>
          <Checkbox checked={first} onChange={() => setFirst(prevState => !prevState)} className={styles.root__checkbox}>Осуществляя заказ на <a
            href="/">сайте</a>&nbsp;я подтверждаю, что ознакомился с правилами
            продажи товаров, а также cо всеми документами, размещенными на сайте по&nbsp;<a
              href="/">адресу</a>,&nbsp;и подтверждаю принятие правил продажи товаров на сайте в полном
            объеме без ограничений.</Checkbox>
        </div>
        <div className={styles.root__agreement}>
          <Checkbox checked={second} onChange={() => setSecond(prevState => !prevState)} className={styles.root__checkbox}>Осуществляя заказ на <a
            href="/">сайте</a>&nbsp;я даю свое согласие на сбор и обработку моих
            персональных данных в соответствии с политикой <a href="/">конфиденциальности</a>.</Checkbox>
        </div>
        <div className={styles.root__agreement}>
          <Checkbox checked={third} onChange={() => setThird(prevState => !prevState)} className={styles.root__checkbox}>Осуществляя заказ на <a
            href="/">сайте</a>&nbsp;я даю свое согласие на получение направляемых
            мне смс-сообщений и электронных писем рекламного и информационного характера.</Checkbox>
        </div>
      </div>
    </BlockForm>
  );
};

export default Agreement;