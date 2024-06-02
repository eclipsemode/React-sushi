import React from 'react';
import {
  addItem,
  removeItem,
  removeItemBySizeId,
  selectCart,
} from '@store/features/cart/api';
import styles from './index.module.scss';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import {
  CloseOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  DeviceType,
  selectAdaptiveServiceSlice,
} from '@store/features/adaptive';
import { Stack } from '@mui/material';
import { setMaterialDialog } from '@store/features/materialDialog/api';
import { MaterialDialogTypes } from '@store/features/materialDialog/model';
import Image from 'next/image';
import { ICartProduct } from '@store/features/cart/model';

export type CartItemProps = {
  obj: ICartProduct;
};

const CartItem: React.FC<CartItemProps> = ({ obj }) => {
  const { deviceType } = useAppSelector(selectAdaptiveServiceSlice);
  const { products, totalAmount } = useAppSelector(selectCart);
  const dispatch = useAppDispatch();

  const handleAddItem = () => {
    dispatch(addItem(obj));
  };

  const handleRemoveItem = () => {
    if (products.length === 1 && totalAmount === 1) {
      dispatch(
        setMaterialDialog({
          opened: true,
          dialogType: MaterialDialogTypes.CLEAR_CART,
        })
      );
    } else {
      dispatch(removeItem(obj.productSize[0].id));
    }
  };

  const handleRemoveItemById = () => {
    if (products.length === 1) {
      dispatch(
        setMaterialDialog({
          opened: true,
          dialogType: MaterialDialogTypes.CLEAR_CART,
        })
      );
    } else {
      dispatch(removeItemBySizeId(obj.productSize[0].id));
    }
  };

  const renderDesktopMenuItem = () => (
    <tr className={styles.root}>
      <td className={styles.root__product}>
        <CloseOutlined onClick={handleRemoveItemById} />
        <Image
          width={200}
          height={133}
          src={
            obj.image
              ? `${process.env.REACT_APP_API_URL}/images/products/${obj.image}`
              : '/images/logo_short.png'
          }
          alt="productImg"
        />
        <h5>
          {obj.name} {obj.isPizza && obj.productSize[0].name}
        </h5>
      </td>
      <td className={styles.root__price}>{obj.productSize[0].price} ₽</td>
      <td className={styles.root__amount}>
        <div>
          <MinusCircleOutlined
            style={{ fontSize: '24px' }}
            className={styles.root__minus}
            onClick={() => handleRemoveItem()}
          />
          <span>{obj.productSize[0].amount}</span>
          <PlusCircleOutlined
            style={{ fontSize: '24px' }}
            className={styles.root__plus}
            onClick={() => handleAddItem()}
          />
        </div>
      </td>
      <td className={styles.root__total}>
        {obj.productSize[0].price * obj.productSize[0].amount} ₽
      </td>
    </tr>
  );

  const renderMobileMenuItem = () => (
    <tr className={styles.mobile__root}>
      <td className={styles.mobile__product}>
        <img
          width={100}
          src={
            obj.image
              ? `${process.env.REACT_APP_API_URL}/images/products/${obj.image}`
              : '/images/logo_short.png'
          }
          alt="productImg"
        />
        <Stack justifyContent="space-between">
          <Stack>
            <h5>
              {obj.name} {obj.isPizza && obj.productSize[0].name}
            </h5>
            <span className={styles.mobile__price}>
              Цена за 1 шт. - {obj.productSize[0].price} ₽
            </span>
          </Stack>
          <span className={styles.mobile__priceTotal}>
            Цена - {obj.productSize[0].price * obj.productSize[0].amount} ₽
          </span>
        </Stack>
      </td>
      <td className={styles.mobile__amount}>
        <div>
          <MinusCircleOutlined
            style={{ fontSize: '24px' }}
            className={styles.root__minus}
            onClick={() => handleRemoveItem()}
          />
          <span className={styles.mobile__amountNumber}>
            {obj.productSize[0].amount}
          </span>
          <PlusCircleOutlined
            style={{ fontSize: '24px' }}
            className={styles.root__plus}
            onClick={() => handleAddItem()}
          />
        </div>
      </td>
    </tr>
  );

  return deviceType === DeviceType.DESKTOP
    ? renderDesktopMenuItem()
    : renderMobileMenuItem();
};

export default CartItem;
