import React from "react";
import styles from "./index.module.css";
import InputMask from "react-input-mask";
import SimpleButton from "shared/UI/SimpleButton";
import { SubmitHandler, useForm } from "react-hook-form";
import BlockForm from "../BlockForm";
import Checkbox from "antd/es/checkbox/Checkbox";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";

interface IPickupProps {
  clickEvent: () => void;
  totalPrice: number;
  deliveryPrice: number;
}

interface FormInputs {
  name: string,
  tel: string,
  email: string,
  day: 'today',
  time: string,
  utensils: number,
  payment: 'cash' | 'card',
  commentary: string
}



const PickupForm: React.FC<IPickupProps> = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [timeStamps] = React.useState<string[]>(getTime());
  const [utensils, setUtensils] = React.useState<number>(0);
  const agRef = React.useRef<HTMLInputElement>(null);

  function getTime() {
    let current: Date = new Date();
    let timeArr: string[] = [];
    do {
      current = new Date(current.getTime() + 15 * 60000);
      timeArr.push(current.toLocaleTimeString().slice(0, 5));
    } while (Number(current.toLocaleTimeString().slice(0, 2)) < 23);

    return timeArr;
  }

  const onSubmit: SubmitHandler<FormInputs> = data => {
    console.log(agRef.current?.checked)
    console.log(data);
  };

  return (

    <form className={styles.root} onSubmit={handleSubmit(onSubmit)} name="pickup-form">
      <BlockForm>
        <div className={styles.root__title}>
          <h3>Оформление самовывоза</h3>
          <h4>По адресу: г. Армавир, ул. Кропоткина 194</h4>
          <SimpleButton type="button" clickEvent={props.clickEvent}>Изменить тип доставки</SimpleButton>
        </div>
        <div className={styles.root__content}>
          <fieldset>
            <label className={styles.root__required}>Имя</label>
            <input className={styles.root__input + ' ' + (errors.name && styles.root__input_invalid)} {...register('name', { required: true, maxLength: 16 })} />
          </fieldset>
          <fieldset>
            <label className={styles.root__required}>Телефон</label>
            <InputMask
              className={styles.root__input + ' ' + (errors.tel && styles.root__input_invalid)}
              {...register("tel", {
                required: true,
                pattern: /^(\+7|7|8)?[\s-]?\(?[89][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm
              })}
              placeholder="+7 (***) *** ** **"
              mask="+7 (999) 999-99-99"
              maskChar="" />
          </fieldset>
          <fieldset>
            <label>E-MAIL</label>
            <input
              className={styles.root__input + ' ' + (errors.email && styles.root__input_invalid)}
              {...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
              placeholder="@" />
          </fieldset>
          <fieldset>
            <label>Заберу</label>
            <select {...register('day', { required: true })}>
              <option value="today" defaultChecked={true}>сегодня</option>
            </select>
          </fieldset>
          <fieldset>
            <label>в</label>
            <select {...register('time', { required: true })}>
              {
                timeStamps.map((value, index) => <option key={index + "-" + value} value={value} defaultChecked={true}>{value}</option>)
              }
            </select>
          </fieldset>
          <fieldset>
            <label>Количество приборов</label>
            <div>
              <IoIosRemoveCircleOutline className={utensils === 0 ? styles.root__btn_disabled : null} size={35} cursor="pointer" onClick={() => setUtensils((prevState) => prevState > 0 ? prevState - 1 : 0)}/>
              <input {...register('utensils', { valueAsNumber: true, min: 0, max: 20 })} value={utensils} />
              <IoIosAddCircleOutline size={35} cursor="pointer" onClick={() => setUtensils((prevState) => prevState + 1)}/>
            </div>
          </fieldset>
          <fieldset>
            <label>Оплата</label>
            <select {...register('payment', { required: true })}>
              <option value="cash">Наличными</option>
              <option value="card">Картой</option>
            </select>
          </fieldset>
          <fieldset>
            <label>Коментарий к заказу</label>
            <textarea { ...register('commentary', { maxLength: 99 }) } placeholder="Пожалуйста, укажите здесь любую информацию, которая поможет курьеру быстрее доставить Вам заказ!"></textarea>
          </fieldset>
        </div>
      </BlockForm>

      <BlockForm>
        <div className={styles.root__final}>
          <div className={styles.root__final_price}>
            <p>Итого</p>
            <p>{props.totalPrice + props.deliveryPrice} ₽</p>
          </div>
          <div className={styles.root__agreement}>
            <Checkbox ref={agRef} defaultChecked={true} className={styles.root__checkbox}>Осуществляя заказ на <a
              href="/">сайте</a>&nbsp;я подтверждаю, что ознакомился с правилами
              продажи товаров, а также cо всеми документами, размещенными на сайте по&nbsp;<a
                href="/">адресу</a>,&nbsp;и подтверждаю принятие правил продажи товаров на сайте в полном
              объеме без ограничений.</Checkbox>
          </div>
          <div className={styles.root__agreement}>
            <Checkbox defaultChecked={true} className={styles.root__checkbox}>Осуществляя заказ на <a
              href="/">сайте</a>&nbsp;я даю свое согласие на сбор и обработку моих
              персональных данных в соответствии с политикой <a href="/">конфиденциальности</a>.</Checkbox>
          </div>
          <div className={styles.root__agreement}>
            <Checkbox defaultChecked={true} className={styles.root__checkbox}>Осуществляя заказ на <a
              href="/">сайте</a>&nbsp;я даю свое согласие на получение направляемых
              мне смс-сообщений и электронных писем рекламного и информационного характера.</Checkbox>
          </div>
        </div>
      </BlockForm>

      <SimpleButton type="submit">Отправить заказ</SimpleButton>
    </form>

  );
};

export default PickupForm;