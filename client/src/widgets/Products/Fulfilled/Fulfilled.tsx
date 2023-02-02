import React from 'react';
import Item from '../Item/Item';
import { IProducts, selectProducts } from 'entities/productsSlice';
import { useAppSelector } from "app/hooks";

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
