import React from 'react';
import styles from './Item.module.scss';
import { IProduct } from 'entities/products/api';
import { AddToCartButton } from 'shared/UI';
import { Link } from 'react-router-dom';

const Item: React.FC<IProduct> = ({ ...product }) => {
    return (
        <div>
            <Link className={styles.root} to="">
                <img className={styles.image} src={process.env.REACT_APP_API_URL + product.image} alt="Item" />
                <div className={styles.root__content}>
                    <h4 className={styles.title}>{product.name}</h4>
                    <div className={styles.root__description}>
                        <p>{product.description}</p>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.price}>{product.price} ₽</div>
                        <AddToCartButton product={{...product, amount: 0}} />
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Item;
