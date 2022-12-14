import React from 'react';
import Item from '../Item/Item';
import { IProducts, selectProducts } from '../../../redux/features/productsSlice';
import { useAppSelector } from "../../../redux/hooks";

const Fulfilled: React.FC = () => {
    const { products } = useAppSelector(selectProducts);
    return (
        <section className="content__items">
            {products.map((product: IProducts) => (
                <Item key={product.id} {...product} />
            ))}
        </section>
    );
};

export default Fulfilled;
