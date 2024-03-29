import React from 'react';
import styles from './index.module.scss';
import { IProduct } from '@store/features/products/api';
import { AddToCartButton } from '@shared/UI';
import { ButtonGroup, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import Colors from '@shared/utils/Colors';
import Image from 'next/image';

interface IProps {
  product: IProduct[];
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
  const [selectedSize, setSelectedSize] = React.useState<number>(
    product[0]?.sizeId
  );
  const foundProduct = product.find((item) => item.sizeId === selectedSize);
  return (
    <div className={styles.root}>
      <Image
        width={302}
        loading="lazy"
        height={170}
        placeholder="blur"
        blurDataURL="data:images/blur.png"
        className={styles.image}
        src={process.env.REACT_APP_API_URL + product[0]?.image}
        alt={product[0]?.name}
      />
      <div className={styles.root__content}>
        {product.length > 1 && (
          <ButtonGroup
            sx={ButtonGroupStyles}
            variant="contained"
            aria-label="outlined primary button group"
          >
            {product.map((item) => (
              <Button
                key={item.sizeId}
                sx={{
                  background:
                    selectedSize === item.sizeId
                      ? `${Colors.$rootTextActive} !important`
                      : 'auto',
                }}
                className={styles.pizzaButton}
                onClick={() => setSelectedSize(item.sizeId)}
              >
                {item.size}
              </Button>
            ))}
          </ButtonGroup>
        )}
        <h4 className={styles.title}>{product[0]?.name}</h4>
        <div className={styles.root__description}>
          <p>{product[0]?.description}</p>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>
            {product.find((item) => item.sizeId === selectedSize)?.price} ₽
          </div>
          {foundProduct && (
            <AddToCartButton
              product={{
                ...foundProduct,
                amount: 0,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
