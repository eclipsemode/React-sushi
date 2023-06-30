import React from 'react';
import styles from './Item.module.scss';
import { IProduct } from 'entities/products/api';
import { AddToCartButton } from 'shared/UI';
import { Link } from 'react-router-dom';
import {ButtonGroup, SxProps} from "@mui/material";
import Button from "@mui/material/Button";
import Colors from "../../../../app/utils/Colors";

interface IProps {
    product: IProduct[]
}

const ButtonGroupStyles: SxProps = {
    '& > button': {
        background: Colors.$dark,
        borderColor: Colors.$paragraphColor + ' !important',
        height: '28px'
    },
    '& > button:hover': {
        background: Colors.$rootTextActive,
    }
}

const Item = ({product}: IProps) => {
    const [selectedSize, setSelectedSize] = React.useState<number>(product[0].sizeId);
    const foundProduct = product.find((item) => item.sizeId === selectedSize);
    return (
        <div>
            <Link className={styles.root} to="">
                <img className={styles.image} src={process.env.REACT_APP_API_URL + product[0].image} alt="Item" />
                <div className={styles.root__content}>
                    {
                        product.length > 1 && (
                            <ButtonGroup sx={ButtonGroupStyles} variant="contained" aria-label="outlined primary button group">
                                {
                                    product.map(item => (
                                        <Button key={item.sizeId} sx={{background: selectedSize === item.sizeId ? `${Colors.$rootTextActive} !important` : 'auto'}} className={styles.pizzaButton} onClick={() => setSelectedSize(item.sizeId)}>{item.size}</Button>
                                    ))
                                }
                            </ButtonGroup>
                        )
                    }
                    <h4 className={styles.title}>{product[0].name}</h4>
                    <div className={styles.root__description}>
                        <p>{product[0].description}</p>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.price}>{product.find((item) => item.sizeId === selectedSize)?.price} ₽</div>
                        {
                            foundProduct && (
                                <AddToCartButton product={{
                                    ...foundProduct,
                                    amount: 0
                                }} />
                            )
                        }

                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Item;
