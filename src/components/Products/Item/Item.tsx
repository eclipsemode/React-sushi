import React from 'react';
import styles from './Item.module.css';
import { ProductsType } from '../../../redux/features/productsSlice';
import { AddToCartButton } from '../../UI';

const Item: React.FC<ProductsType> = ({ ...product }) => {
    const [imgScale, setImgScale] = React.useState<boolean>(false);

    const handleOnMouseOver = () => setImgScale(true);
    const handleOnMouseLeave = () => setImgScale(false);

    return (
        <div className={styles.root} onMouseEnter={() => handleOnMouseOver()} onMouseLeave={() => handleOnMouseLeave()}>
            <img
                className={styles.image + ' ' + (imgScale ? styles.image__resize : null)}
                src={product.imageUrl}
                alt="Item"
            />
            <div className={styles.root__content}>
                <h4 className={styles.title}>{product.name}</h4>
                <div className={styles.root__description}>
                    <p>{product.description}</p>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.price}>{product.price} ₽</div>
                    <AddToCartButton product={product} />
                </div>
            </div>
        </div>
    );
};

export default Item;
