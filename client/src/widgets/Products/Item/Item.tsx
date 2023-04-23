import React from 'react';
import styles from './Item.module.scss';
import { IProducts } from 'entities/products';
import { AddToCartButton } from 'shared/UI';
import { Link } from 'react-router-dom';

const Item: React.FC<IProducts> = ({ ...product }) => {
    const [imgScale, setImgScale] = React.useState<boolean>(false);

    const handleOnMouseOver = () => setImgScale(true);
    const handleOnMouseLeave = () => setImgScale(false);

    return (
        <div onMouseEnter={() => handleOnMouseOver()} onMouseLeave={() => handleOnMouseLeave()}>
            <Link className={styles.root} to="">
                <img
                    className={styles.image + ' ' + (imgScale ? styles.image__resize : null)}
                    src={process.env.REACT_APP_API_URL + product.image}
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
            </Link>
        </div>
    );
};

export default Item;
