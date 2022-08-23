import React from "react";
import styles from "./Pizza.module.css";
import { ProductsType } from "../../../redux/features/productsSlice";
import { AddToCartButton } from "../../UI";

const Pizza: React.FC<ProductsType> = ({ ...product }) => {
  const [imgScale, setImgScale] = React.useState<boolean>(false);

  const handleOnMouseOver = () => setImgScale(true);
  const handleOnMouseLeave = () => setImgScale(false);

  return (
    <div className={styles.root} onMouseEnter={() => handleOnMouseOver()} onMouseLeave={() => handleOnMouseLeave()}>
      <img className={styles.image + ' ' + (imgScale ? styles.image__resize : null)} src={product.imageUrl} alt="Pizza" />
      <div className={styles.root__content}>
        <h4 className={styles.title}>{product.name}</h4>
        <div className={styles.root__rating}>
          <span className={styles.root__rate}>4.9</span>
          <div className={styles.root__stars}>
            <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>{product.price} ₽</div>
          <AddToCartButton product={product}/>
        </div>
      </div>
    </div>
  );
};

export default Pizza;
