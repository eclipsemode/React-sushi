import React from 'react';
import styles from './index.module.scss';
import { AddToCartButton } from '@shared/UI';
import { ButtonGroup, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Colors from '@shared/utils/Colors';
import Image from 'next/image';
import { IProduct } from '@store/features/products/model';
import { ICartProductSize } from '@store/features/cart/model';

interface IProps {
  product: IProduct;
}

const ButtonGroupStyles: SxProps = {
  '& > button': {
    background: Colors.$dark,
    borderColor: Colors.$paragraphColor + ' !important',
    height: '28px',
  },
  '& > button:hover': {
    background: Colors.$rootTextActive,
  },
};

const ProductItem = ({ product }: IProps) => {
  const [selectedSizeId, setSelectedSizeId] = React.useState<string>(
    product.productSize[0].id || ''
  );

  const renderSizeButtons = () => (
    <ButtonGroup
      sx={ButtonGroupStyles}
      variant="contained"
      aria-label="outlined primary button group"
    >
      {product.productSize.map((item) => (
        <Button
          key={item.id}
          sx={{
            background:
              selectedSizeId === item.id
                ? `${Colors.$rootTextActive} !important`
                : 'auto',
          }}
          className={styles.pizzaButton}
          onClick={() => setSelectedSizeId(item.id || '')}
        >
          {item.name}
        </Button>
      ))}
    </ButtonGroup>
  );

  return (
    <div className={styles.root}>
      <Image
        width={302}
        loading="lazy"
        height={170}
        placeholder="blur"
        blurDataURL="data:images/blur.png"
        className={styles.image}
        src={
          product.image
            ? `${process.env.REACT_APP_API_URL}/images/products/${product.image}`
            : '/images/logo_short.png'
        }
        alt={product.name}
      />
      <div className={styles.root__content}>
        {product.productSize.length > 1 && renderSizeButtons()}
        <h4 className={styles.title}>{product.name}</h4>
        <div className={styles.root__description}>
          <p>{product.description}</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            {
              product.productSize.find((item) => item.id === selectedSizeId)
                ?.price
            }{' '}
            ₽
          </div>

          <AddToCartButton
            product={{
              ...product,
              productSize: [
                product.productSize.find(
                  (x) => x.id === selectedSizeId
                ) as ICartProductSize,
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
