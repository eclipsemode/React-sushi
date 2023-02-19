import React from "react";
import styles from "./index.module.css";
import InputMask from "react-input-mask";
import SimpleButton from "shared/UI/SimpleButton";
import { SubmitHandler, useForm } from "react-hook-form";
import BlockForm from "shared/UI/BlockForm";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import Agreement from "../Agreement";
import { calcTime } from "../../utils/calcTime";
import { Modal } from "antd";
import { removeAll } from "entities/cart";
import { useAppDispatch } from "app/hooks";
import { fetchOrderCreate } from "features/order/api";
import { IFormInputs } from "../DeliveryForm";

interface IPickupProps {
  clickEvent: () => void;
}
const PickupForm: React.FC<IPickupProps> = (props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInputs>();
  const [timeStamps] = React.useState<string[]>(calcTime(15));
  const [utensils, setUtensils] = React.useState<number>(0);

  React.useEffect(() => {
    setValue('utensils', utensils);
  }, [utensils, setValue])

  const onSubmit: SubmitHandler<IFormInputs> = data => {
      dispatch(fetchOrderCreate({ ...data, type: 'pickup' }));
      success();
  };

  const success = () => {
    Modal.success({
      title: 'Ваш заказ отправлен.',
      content: 'Оператор перезвонит для подтверждения в течении 5 минут.'
    });
    dispatch(removeAll());
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
          <fieldset className={styles.root__width_50}>
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
          <fieldset className={styles.root__width_50}>
            <label>E-MAIL</label>
            <input
              className={styles.root__input + ' ' + (errors.email && styles.root__input_invalid)}
              {...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
              placeholder="@" />
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label>Заберу</label>
            <select {...register('day', { required: true })}>
              <option value="today" defaultChecked={true}>сегодня</option>
            </select>
          </fieldset>
          <fieldset className={styles.root__width_50}>
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

      <Agreement register={register} errors={errors} />

      <SimpleButton type="submit">Отправить заказ</SimpleButton>
    </form>

  );
};

export default PickupForm;