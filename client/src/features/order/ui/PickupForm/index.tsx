// @ts-nocheck
import React from "react";
import styles from './index.module.css'
import SimpleButton from "shared/UI/SimpleButton";
import { useForm } from "react-hook-form";
import { CartButtonMinus, CartButtonPlus } from "../../../../shared/UI";

const PickupForm: React.FC = () => {
  const { register, handleSubmit, watch } = useForm();
  const [timeStamps] = React.useState<string[]>(getTime())

  function getTime() {
    let current: Date = new Date();
    let timeArr: string[] = [];
    do {
      current = new Date(current.getTime() + 15*60000);
      timeArr.push(current.toLocaleTimeString().slice(0, 5));
    } while (current.toLocaleTimeString().slice(0, 2) < 23)

    return timeArr;
  }
  const onSubmit = () => {
    console.log(watch())
  }

  return (
    <div className={styles.root}>
      <div className={styles.root__title}>
        <h3>Оформление самовывоза</h3>
        <h4>По адресу: г. Армавир, ул. Кропоткина 194</h4>
        <SimpleButton clickEvent={() => console.log(1)}>Изменить тип доставки</SimpleButton>
      </div>
      <div className={styles.root__content}>
        <form onSubmit={handleSubmit(onSubmit)} name="pickup-form">
          <fieldset>
            <label htmlFor='name'>Имя</label>
            <input type="text" name='name' />
          </fieldset>
          <fieldset>
            <label htmlFor='phone'>Телефон</label>
            <input type="text" name='phone' placeholder='+7 (***) *** ** **' />
          </fieldset>
          <fieldset>
            <label htmlFor='email'>E-MAIL</label>
            <input type="email" name='email' placeholder='@' />
          </fieldset>
          <fieldset>
            <label htmlFor='day'>Заберу</label>
            <select name='day'>
              <option value="today" defaultChecked={true}>сегодня</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor='time'>в</label>
            <select name='time'>
              {
                timeStamps.map((value, index) => <option key={index + '-' +  value} value="time" defaultChecked={true}>{value}</option>)
              }
            </select>
          </fieldset>
          <fieldset>
            <label>Количество приборов</label>
            <div>
              <CartButtonMinus product={1} amount={1}/>
              1
              <CartButtonPlus product={1} amount={1}/>
            </div>
          </fieldset>
          <fieldset>
            <label htmlFor="payment">Оплата</label>
            <select name="payment">
              <option value="cash">Наличными</option>
              <option value="card">Картой</option>
            </select>
          </fieldset>
          <fieldset>
            <label htmlFor="commentary">Коментарий к заказу</label>
            <textarea name="commentary" placeholder="Пожалуйста, укажите здесь любую информацию, которая поможет курьеру быстрее доставить Вам заказ!"></textarea>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default PickupForm;