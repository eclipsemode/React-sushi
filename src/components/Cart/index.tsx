import React from 'react';
import { selectCart } from '@store/features/cart/api';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { DeliveryPrice } from '@store/features/order/utils';
import PickupForm from './PickupForm';
import SimpleButton from '@shared/UI/SimpleButton';
import Alert from '@shared/UI/Alert';
import DeliveryForm from './DeliveryForm';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import DeleteIcon from '@mui/icons-material/Delete';
import Colors from '@shared/utils/Colors';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import CustomInput from '@shared/UI/CustomInput';
import { Box, CircularProgress, Stack } from '@mui/material';
import {
  clearPromocodeData,
  fetchPromocodeCheck,
  setPromocodeError,
} from '@store/features/promocode/api';
import InfoIcon from '@mui/icons-material/Info';
import Divider from '@mui/material/Divider';
import { selectUser } from '@store/features/user/api';
import { TOrderType } from '@store/features/order/model';
import CartItem from '@components/CartItem';

const CartOrder: React.FC = () => {
  const { products, totalPrice, deliveryPrice, pizzasDiscount } =
    useAppSelector(selectCart);
  const { user } = useAppSelector(selectUser);
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { promocode, promocodeError, promocodeLoadSaveProcess } =
    useAppSelector((state) => state.promocodeReducer);
  const dispatch = useAppDispatch();
  const [promoCodeAccepted, setPromoCodeAccepted] =
    React.useState<boolean>(false);
  const [promoCodeValue, setPromoCodeValue] = React.useState<string>('');
  const [orderType, setOrderType] = React.useState<TOrderType | null>(null);

  React.useEffect(() => {
    if (promocode) {
      setPromoCodeAccepted(true);
    } else {
      setPromoCodeAccepted(false);
    }
  }, [promocode]);

  const handleRemoveAll = () => {
    dispatch(
      setMaterialDialog({
        opened: true,
        dialogType: MaterialDialogTypes.CLEAR_CART,
      })
    );
  };

  const checkPromocode = async () => {
    try {
      if (promoCodeValue !== null && promoCodeValue.length > 0) {
        dispatch(fetchPromocodeCheck(promoCodeValue)).unwrap();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const renderDesktopTableHeader = () => (
    <tr>
      <th>Товар</th>
      <th>Стоимость</th>
      <th>Количество</th>
      <th>Общая стоимость</th>
    </tr>
  );

  const renderMobileTableHeader = () => (
    <tr>
      <th>Корзина</th>
    </tr>
  );

  const getTotalPriceWithPizzasDiscount = () => {
    return totalPrice - pizzasDiscount;
  };

  const renderDiscount = (text: string) => (
    <div className={styles.discount}>
      <span>Действует акция: {text}</span>
    </div>
  );

  return (
    <div className={styles.root}>
      {deliveryPrice !== 0 && orderType !== 'PICKUP' && (
        <Alert type="error">
          Внимание! Для бесплатной доставки сумма заказа должны быть не менее{' '}
          {DeliveryPrice.MIN} ₽.
        </Alert>
      )}
      <br />
      <table className={styles.root__table}>
        <thead>
          {deviceType === DeviceType.DESKTOP
            ? renderDesktopTableHeader()
            : renderMobileTableHeader()}
        </thead>
        <tbody>
          {products.flatMap((obj) =>
            obj.productSize.map((x) => (
              <CartItem
                key={x.id}
                obj={{
                  ...obj,
                  productSize: [x],
                }}
              />
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4}>
              <div className={styles.root__footer}>
                {deviceType === DeviceType.DESKTOP ? (
                  <SimpleButton
                    color={Colors.$mainColor}
                    type="reset"
                    variant="contained"
                    clickEvent={handleRemoveAll}
                  >
                    Очистить корзину
                  </SimpleButton>
                ) : (
                  <DeleteIcon
                    sx={{ color: Colors.$rootTextActive, cursor: 'pointer' }}
                    onClick={handleRemoveAll}
                  />
                )}
                <h4 className={styles.root__footer_price}>
                  Сумма заказа: {getTotalPriceWithPizzasDiscount()} ₽
                </h4>
              </div>
              {!!pizzasDiscount &&
                renderDiscount('3-я пицца наименьшая по стоимости в подарок!')}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className={styles.root__type}>
        <div className={styles.root__type_title}>
          <h3>ПРОМОКОД</h3>
        </div>
        <div className={styles.root__type_buttons}>
          <Box sx={{ maxWidth: '300px' }}>
            <CustomInput
              error={promocodeError}
              value={promoCodeValue || ''}
              disabled={promoCodeAccepted}
              endAdornment={
                promocodeLoadSaveProcess ? (
                  <CircularProgress size={20} />
                ) : (
                  <Box width={20}></Box>
                )
              }
              onChangeEvent={(value) => {
                if (promocodeError) {
                  dispatch(setPromocodeError(false));
                }
                setPromoCodeValue(value || '');
              }}
            />
          </Box>
          {promoCodeAccepted ? (
            <SimpleButton
              type="button"
              color={Colors.$mainColor}
              clickEvent={() => {
                dispatch(clearPromocodeData());
                setPromoCodeAccepted(false);
                setPromoCodeValue('');
              }}
            >
              Отменить
            </SimpleButton>
          ) : (
            <SimpleButton type="button" clickEvent={checkPromocode}>
              Применить
            </SimpleButton>
          )}
        </div>
        {promoCodeAccepted && (
          <Stack
            sx={{
              justifyContent: 'center',
              textAlign: 'center',
              paddingBottom: '20px',
              rowGap: '10px',
            }}
          >
            <span style={{ fontSize: '22px' }}>ПРОМОКОД АКТИВИРОВАН</span>
            <span style={{ fontSize: '20px' }}>
              Ваша скидка - {promocode?.discount}
              {promocode?.type === 'RUB' ? '₽' : '%'}
            </span>
            <Divider sx={{ borderColor: Colors.$infoColor }} variant="middle" />
            <Stack direction="row">
              <InfoIcon sx={{ color: Colors.$infoColor }} />
              <span
                style={{
                  fontSize: '14px',
                  marginTop: '5px',
                  color: Colors.$infoColor,
                }}
              >
                Сумма скидки промокода в рублях не может превышать 50% от
                стоимости заказа, в противном случае, сумма промокода будет
                пересчитана для текущего заказа.
              </span>
            </Stack>
            <Stack direction="row">
              <InfoIcon sx={{ color: Colors.$infoColor }} />
              <span
                style={{
                  fontSize: '14px',
                  marginTop: '5px',
                  color: Colors.$infoColor,
                }}
              >
                Сумма скидки промокода рассчитывается только на основную сумму
                заказа. Стоимость доставки (при наличии) не входит в сумму
                заказа.
              </span>
            </Stack>
            <Stack direction="row">
              <InfoIcon sx={{ color: Colors.$infoColor }} />
              <span
                style={{
                  fontSize: '14px',
                  marginTop: '5px',
                  color: Colors.$infoColor,
                }}
              >
                Сумма заказа с примененным промокодом должна быть выше
                минимальной суммы заказа ({DeliveryPrice.MIN}₽). В противном
                случае будет начислена сумма за доставку.
              </span>
            </Stack>
          </Stack>
        )}
      </div>

      {!orderType && (
        <div className={styles.root__type}>
          <div className={styles.root__type_title}>
            <h3>ОФОРМИТЬ ЗАКАЗ</h3>
          </div>
          <div className={styles.root__type_buttons}>
            <SimpleButton
              type="button"
              clickEvent={() => setOrderType('DELIVERY')}
            >
              Доставка
            </SimpleButton>
            <SimpleButton
              type="button"
              clickEvent={() => setOrderType('PICKUP')}
            >
              Самовывоз
            </SimpleButton>
          </div>
        </div>
      )}

      {orderType === 'PICKUP' ? (
        <PickupForm clickEvent={() => setOrderType(null)} userInfo={user} />
      ) : orderType === 'DELIVERY' ? (
        <DeliveryForm clickEvent={() => setOrderType(null)} userInfo={user} />
      ) : null}
    </div>
  );
};

export default CartOrder;
