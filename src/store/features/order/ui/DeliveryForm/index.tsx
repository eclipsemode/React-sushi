import React from "react";
import styles from "./index.module.scss";
import BlockForm from "@shared/UI/BlockForm";
import SimpleButton from "@shared/UI/SimpleButton";
import Agreement from "../Agreement";
import {SubmitHandler, useForm} from "react-hook-form";
import Radio from "@shared/UI/Radio";
import {calcTime} from "../../utils/calcTime";
import {useAppDispatch} from "@store/hooks";
import {MinusCircleOutlined, PlusCircleOutlined} from "@ant-design/icons";
import Input from "@shared/UI/input";
import Select from "@shared/UI/Select";
import {setMaterialDialog} from "@store/features/materialDialog/api";
import {MaterialDialogTypes} from "@store/features/materialDialog/model";
import {IFormData} from "../../model";
import {setFormData} from "../../api";

interface IDeliveryFormProps {
  clickEvent: () => void;
}

export type PaymentType = "cash" | "card";
export type TelType = `+${number} (${number}${number}${number}) ${number}${number}${number}-${number}${number}-${number}${number}`;

const DeliveryForm: React.FC<IDeliveryFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<IFormData>();
  const [utensils, setUtensils] = React.useState<number>(0);
  const [timeStamps] = React.useState<string[]>(calcTime(15));

  React.useEffect(() => {
    setValue("deliveryTime", 1);
    setValue("entrance", null);
    setValue("floor", null);
    setValue("room", null);
  }, [setValue]);

  React.useEffect(() => {
    setValue("utensils", utensils);
  }, [utensils, setValue]);
  const onSubmit: SubmitHandler<IFormData> = data => {
    if (Number(data.deliveryTime) === 1) {
      data.day = null;
      data.time = null;
    }
    dispatch(setFormData(data));
    dispatch(setMaterialDialog({
      opened: true,
      dialogType: MaterialDialogTypes.SEND_ORDER_DELIVERY
    }))
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit(onSubmit)} name="pickup-form">
      <BlockForm>
        <div className={styles.root__title}>
          <h3>Оформление доставки</h3>
          <SimpleButton type="button" clickEvent={props.clickEvent}>Изменить тип заказа</SimpleButton>
        </div>
        <div className={styles.root__content}>
          <fieldset>
            <label className={styles.root__required}>Имя</label>
            <Input register={register} name='name' error={!!errors.name} required={true} maxLength={16} />
          </fieldset>
          <fieldset>
            <label className={styles.root__required}>Адрес</label>
            <Input register={register} name='address' error={!!errors.address} required={true} maxLength={24} />
          </fieldset>
          <fieldset className={styles.root__width_33}>
            <label>Подъезд</label>
            <Input register={register} name='entrance' type='number' error={!!errors.entrance} maxLength={2} />
          </fieldset>
          <fieldset className={styles.root__width_33}>
            <label>Этаж</label>
            <Input register={register} name='floor' type='number' error={!!errors.floor} maxLength={2} />
          </fieldset>
          <fieldset className={styles.root__width_33}>
            <label>Квартира</label>
            <Input register={register} name='room' type='number' error={!!errors.room} maxLength={4} />
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label className={styles.root__required}>Телефон</label>
            <Input inputMask={true} name='tel' required={true} register={register} error={!!errors.tel}
                   pattern={/^(\+7|7|8)?[\s-]?\(?[89][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm}
                   mask='+7 (999) 999-99-99' maskChar='' placeholder='+7 (***) *** ** **'/>
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label>E-MAIL</label>
            <Input register={register} name='email' error={!!errors.email} pattern={/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/} placeholder='@' />
          </fieldset>
          <fieldset className={styles.root__radio + " " + styles.root__width_50}>
            <Radio register={register} watch={watch} value={1} defaultChecked={true}>Как можно скорее</Radio>
          </fieldset>
          <fieldset className={styles.root__radio + " " + styles.root__width_50}>
            <Radio register={register} watch={watch} value={2}>К определенному времени</Radio>
          </fieldset>

          {
            Number(watch("deliveryTime")) === 2
            &&
            <>
              <fieldset className={styles.root__width_50}>
                <label>Доставить</label>
                <Select register={register} name='day' required={true}>
                  <option value="today" defaultChecked={true}>сегодня</option>
                </Select>
              </fieldset>
              <fieldset className={styles.root__width_50}>
                <label>в</label>
                <Select register={register} name='time' required={true}>
                  {
                    timeStamps.map((value, index) => <option key={index + "-" + value} value={value}
                                                             defaultChecked={true}>{value}</option>)
                  }
                </Select>
              </fieldset>
            </>
          }


          <fieldset className={styles.root__counter}>
            <label>Количество приборов</label>
            <div>
              <MinusCircleOutlined style={{fontSize: '24px'}} className={utensils === 0 ? styles.root__btn_disabled : ''} onClick={() => setUtensils((prevState) => prevState > 0 ? prevState - 1 : 0)} />
              <input {...register("utensils", { valueAsNumber: true, min: 0, max: 20 })} value={utensils} />
              <PlusCircleOutlined style={{fontSize: '24px'}} onClick={() => setUtensils((prevState) => prevState + 1)} />
            </div>
          </fieldset>
          <fieldset>
            <label>Оплата</label>
            <Select register={register} name='payment' required={true}>
              <option value="cash">Наличными</option>
              <option value="card">Картой</option>
            </Select>
          </fieldset>
          <fieldset>
            <label>Коментарий к заказу</label>
            <textarea {...register("commentary", { maxLength: 99 })}
                      placeholder="Пожалуйста, укажите здесь любую информацию, которая поможет курьеру быстрее доставить Вам заказ!"></textarea>
          </fieldset>
        </div>
      </BlockForm>

      <Agreement delivery={true} register={register} errors={errors} />

      <SimpleButton type="submit">Отправить заказ</SimpleButton>
    </form>
  );
};

export default DeliveryForm;