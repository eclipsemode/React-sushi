import React from 'react';
import styles from './Pizza.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../../redux/features/cartSlice';
import { RootState } from '../../../redux/store';
import { ProductsType } from '../../../redux/features/productsSlice';

const Pizza: React.FC<ProductsType> = ({ ...product }) => {
    const pizzaTypes: string[] = ['Тонкое', 'Традиционное'];
    const dispatch = useDispatch();
    const cartItem = useSelector<RootState>((state) => state.cart.items.find((obj: any) => obj.id === product.id));
    // @ts-ignore
    const amount = !cartItem ? 0 : cartItem.amount;

    const [pizzaType, setPizzaType] = React.useState<number>(product.types[0]);

    const [pizzaSize, setPizzaSize] = React.useState<number>(0);

    const handleClickType = (type: number) => {
        setPizzaType(type);
    };

    const handleClickSize = (size: number) => {
        setPizzaSize(size);
    };

    const handleAddProduct = () => {
        dispatch(addItem({ ...product }));
    };

    return (
        <div className={styles.root}>
            <img className={styles.image} src={product.imageUrl} alt="Pizza" />
            <h4 className={styles.title}>{product.name}</h4>
            <div className={styles.selector}>
                <ul>
                    {product.types.map((type, index) => (
                        <li
                            onClick={() => handleClickType(type)}
                            className={pizzaType === type ? styles.active_btn : ''}
                            key={index}
                        >
                            {pizzaTypes[type]}
                        </li>
                    ))}
                </ul>
                <ul>
                    {product.sizes.map((size, index) => (
                        <li
                            onClick={() => handleClickSize(index)}
                            key={index}
                            className={index === pizzaSize ? styles.active_btn : ''}
                        >
                            {size} см.
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.bottom}>
                <div className={styles.price}>от {product.price} ₽</div>
                <div className="button button--outline button--add" onClick={() => handleAddProduct()}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить</span>
                    {amount > 0 && <i>{amount}</i>}
                </div>
            </div>
        </div>
    );
};

export default Pizza;
