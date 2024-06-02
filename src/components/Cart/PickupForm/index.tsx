import React from 'react';
import styles from './index.module.scss';
import SimpleButton from '@shared/UI/SimpleButton';
import { SubmitHandler, useForm } from 'react-hook-form';
import BlockForm from '@shared/UI/BlockForm';
import Agreement from '../Agreement';
import { useAppDispatch } from '@store/hooks';
import { setFormData } from '@store/features/order/api';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import CustomInput from '@shared/UI/CustomInput';
import Select from '@shared/UI/Select';
import { IFormData } from '@store/features/order/model';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import { useTimeArray } from '@hooks/useTimeArray';
import { IUser } from '@store/features/user/model';

interface IPickupProps {
  clickEvent: () => void;
  userInfo: Partial<IUser> | null;
}

const PickupForm: React.FC<IPickupProps> = ({ clickEvent, userInfo }) => {
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      clientName: userInfo?.profile?.name,
      clientEmail: userInfo?.profile?.email,
    },
  });
  const [utensils, setUtensils] = React.useState<number>(0);
  const timeStamps = useTimeArray();

  React.useEffect(() => {
    setValue('utensils', utensils.toString());
  }, [utensils, setValue]);

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(setFormData(data));
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.SEND_ORDER_PICKUP,
      })
    );
  };

  return (
    <form
      className={styles.root}
      onSubmit={handleSubmit(onSubmit)}
      name="pickup-form"
    >
      <BlockForm>
        <div className={styles.root__title}>
          <h3>Оформление самовывоза</h3>
          <h4>По адресу: г. Армавир, ул. Кропоткина 194</h4>
          <SimpleButton type="button" clickEvent={clickEvent}>
            Изменить тип заказа
          </SimpleButton>
        </div>
        <div className={styles.root__content}>
          <fieldset>
            <label className={styles.root__required}>Имя</label>
            <CustomInput
              name="clientName"
              required={true}
              maxLength={16}
              register={register}
              error={!!errors.clientName}
            />
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label className={styles.root__required}>Телефон</label>
            <CustomInput
              inputMask={true}
              name="clientTel"
              required={true}
              register={register}
              error={!!errors.clientTel}
              pattern={
                /^(\+7|7|8)?[\s-]?\(?[89][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/gm
              }
              mask="+7 (999) 999-99-99"
              maskChar=""
              placeholder="+7 (***) *** ** **"
              defaultValue={userInfo?.tel}
            />
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label>E-MAIL</label>
            <CustomInput
              name="clientEmail"
              register={register}
              error={!!errors.clientEmail}
              pattern={
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              }
              placeholder="@"
            />
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label>Заберу</label>
            <Select register={register} name="day" required={true}>
              <option
                className={styles.option}
                value="today"
                defaultChecked={true}
              >
                сегодня
              </option>
            </Select>
          </fieldset>
          <fieldset className={styles.root__width_50}>
            <label>в</label>
            <Select register={register} name="time" required={true}>
              {timeStamps.map((value, index) => (
                <option
                  className={styles.option}
                  key={index + '-' + value}
                  value={value}
                  defaultChecked={true}
                >
                  {value}
                </option>
              ))}
            </Select>
          </fieldset>
          <fieldset>
            <label>Количество приборов</label>
            <div>
              <MinusCircleOutlined
                style={{ fontSize: '24px' }}
                onClick={() =>
                  setUtensils((prevState) =>
                    prevState > 0 ? prevState - 1 : 0
                  )
                }
              />
              <input
                {...register('utensils', {
                  valueAsNumber: true,
                  min: 0,
                  max: 20,
                })}
                value={utensils}
              />
              <PlusCircleOutlined
                style={{ fontSize: '24px' }}
                onClick={() => setUtensils((prevState) => prevState + 1)}
              />
            </div>
          </fieldset>
          <fieldset>
            <label>Оплата</label>
            <Select register={register} name="payment" required={true}>
              <option className={styles.option} value="CASH">
                Наличными
              </option>
              <option className={styles.option} value="CARD">
                Картой
              </option>
            </Select>
          </fieldset>
          <fieldset>
            <label>Комментарий к заказу</label>
            <textarea
              {...register('commentary', { maxLength: 99 })}
              placeholder="Пожалуйста, укажите здесь любую информацию, которая поможет курьеру быстрее доставить Вам заказ!"
            ></textarea>
          </fieldset>
        </div>
      </BlockForm>

      <Agreement register={register} errors={errors} />

      <SimpleButton type="submit">Отправить заказ</SimpleButton>
    </form>
  );
};

export default PickupForm;
