import React from "react";
import styles from "./index.module.css";
import BlockForm from "../BlockForm";
import SimpleButton from "shared/UI/SimpleButton";
import InputMask from "react-input-mask";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import Agreement from "../Agreement";
import { SubmitHandler, useForm } from "react-hook-form";
import Radio from "shared/UI/Radio";
import { calcTime } from "../../utils/calcTime";
import { useAppDispatch } from "../../../../app/hooks";
import { fetchOrderCreate } from "../../api";
import { removeAll } from "entities/cart";
import { Modal } from "antd";

interface IDeliveryFormProps {
  clickEvent: () => void;
}

export type PaymentType = "cash" | "card";
export type TelType = `+${number} (${number}${number}${number}) ${number}${number}${number}-${number}${number}-${number}${number}`;
type DeliveryTimeType = 1 | 2;

export interface IFormInputs {
  name: string,
  address?: string | null,
  entrance?: number | null,
  floor?: number | null,
  room?: number | null,
  tel: TelType,
  email: string,
  day: "today" | null,
  time: string | null,
  utensils: number,
  payment: PaymentType,
  commentary: string,
  deliveryTime?: DeliveryTimeType
}

const DeliveryForm: React.FC<IDeliveryFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormInputs>();
  const [utensils, setUtensils] = React.useState<number>(0);
  const [agreement, setAgreement] = React.useState<boolean>(true);
  const [timeStamps] = React.useState<string[]>(calcTime(15));

  React.useEffect(() => {
    setValue("deliveryTime", 1);
    setValue('entrance', null);
    setValue('floor', null);
    setValue('room', null);
  }, [setValue]);

  React.useEffect(() => {
    setValue('utensils', utensils)
  }, [utensils, setValue]);
  const onSubmit: SubmitHandler<IFormInputs> = data => {
    if (agreement) {

      if (Number(data.deliveryTime) === 1) {
        data.day = null;
        data.time = null;
      }
      dispatch(fetchOrderCreate(data));
      success();
    }
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
          <h3>Оформление доставки</h3>
          <SimpleButton type="button" clickEvent={props.clickEvent}>Изменить тип доставки</SimpleButton>
        </div>
        <div className={styles.root__content}>
          <fieldset>
            <label className={styles.root__required}>Имя</label>
            <input
              className={styles.root__input + " " + (errors.name && styles.root__input_invalid)} {...register("name", {
              required: true,
              maxLength: 16
            })} />
          </fieldset>
          <fieldset>
            <label className={styles.root__required}>Адрес</label>
            <input
              className={styles.root__input + " " + (errors.name && styles.root__input_invalid)} {...register("address", {
              required: true,
              maxLength: 24
            })} />
          </fieldset>
          <fieldset className={styles.root__width_33}>
            <label>Подъезд</label>
            <input
              className={styles.root__input + " " + (errors.name && styles.root__input_invalid)} {...register("entrance", { maxLength: 2 })} />
          </fieldset>
          <fieldset className={styles.root__width_33}>
            <label>Этаж</label>
            <input
              className={styles.root__input + " " + (errors.name && styles.root__input_invalid)} {...register("floor", { maxLength: 2 })} />
          </fieldset>
          <fieldset className={styles.root__width_33}>
            <label>Квартира</label>
            <input
              className={styles.root__input + " " + (errors.name && styles.root__input_invalid)} {...register("room", { maxLength: 4 })} />
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label className={styles.root__required}>Телефон</label>
            <InputMask
              className={styles.root__input + " " + (errors.tel && styles.root__input_invalid)}
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
              className={styles.root__input + " " + (errors.email && styles.root__input_invalid)}
              {...register("email", { pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })}
              placeholder="@" />
          </fieldset>
          <fieldset className={styles.root__radio + " " + styles.root__width_50}>
            <Radio register={register} watch={watch} value={1} defaultChecked={true} />
          </fieldset>
          <fieldset className={styles.root__radio + " " + styles.root__width_50}>
            <Radio register={register} watch={watch} value={2} />
          </fieldset>

          {
            Number(watch("deliveryTime")) === 2
            &&
            <>
              <fieldset className={styles.root__width_50}>
                <label>Доставить</label>
                <select {...register("day", { required: true })}>
                  <option value="today" defaultChecked={true}>сегодня</option>
                </select>
              </fieldset>
              <fieldset className={styles.root__width_50}>
                <label>в</label>
                <select {...register("time", { required: true })}>
                  {
                    timeStamps.map((value, index) => <option key={index + "-" + value} value={value}
                                                             defaultChecked={true}>{value}</option>)
                  }
                </select>
              </fieldset>
            </>
          }


          <fieldset className={styles.root__counter}>
            <label>Количество приборов</label>
            <div>
              <IoIosRemoveCircleOutline className={utensils === 0 ? styles.root__btn_disabled : null} size={35}
                                        cursor="pointer"
                                        onClick={() => setUtensils((prevState) => prevState > 0 ? prevState - 1 : 0)} />
              <input {...register("utensils", { valueAsNumber: true, min: 0, max: 20 })} value={utensils} />
              <IoIosAddCircleOutline size={35} cursor="pointer"
                                     onClick={() => setUtensils((prevState) => prevState + 1)} />
            </div>
          </fieldset>
          <fieldset>
            <label>Оплата</label>
            <select {...register("payment", { required: true })}>
              <option value="cash">Наличными</option>
              <option value="card">Картой</option>
            </select>
          </fieldset>
          <fieldset>
            <label>Коментарий к заказу</label>
            <textarea {...register("commentary", { maxLength: 99 })}
                      placeholder="Пожалуйста, укажите здесь любую информацию, которая поможет курьеру быстрее доставить Вам заказ!"></textarea>
          </fieldset>
        </div>
      </BlockForm>

      <Agreement delivery={true} setAgreement={setAgreement} />

      <SimpleButton type="submit">Отправить заказ</SimpleButton>
    </form>
  );
};

export default DeliveryForm;