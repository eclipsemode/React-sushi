import React from 'react';
import styles from './index.module.scss';
import { addItem, removeItem } from '@store/features/cart/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ICartProduct } from '@store/features/cart/model';

type AddToCartButtonProps = {
  product: ICartProduct;
};

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.cartReducer);

  const currentProduct = products?.find((x) => x.id === product.id);
  const currentProductAmount =
    currentProduct?.productSize.find((x) => x.id === product.productSize[0].id)
      ?.amount || 0;

  const handleAddItem = () => {
    dispatch(addItem(product));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem(product.productSize[0].id));
  };

  const handleAddProduct = () => {
    dispatch(addItem(product));
  };

  const renderMinusPlusButton = () => (
    <div className={styles.root__amountBlock}>
      <MinusCircleOutlined
        style={{ fontSize: '24px' }}
        className={styles.root__minus}
        onClick={() => handleRemoveItem()}
      />
      <span>{currentProductAmount}</span>
      <PlusCircleOutlined
        style={{ fontSize: '24px' }}
        className={styles.root__plus}
        onClick={() => handleAddItem()}
      />
    </div>
  );

  const renderSingleButton = () => (
    <button className={styles.root} onClick={handleAddProduct}>
      <span>Добавить</span>
      <span>
        {currentProductAmount === 0 ? '+' : 'x' + currentProductAmount}
      </span>
    </button>
  );

  return currentProductAmount > 0
    ? renderMinusPlusButton()
    : renderSingleButton();
};

export default AddToCartButton;
