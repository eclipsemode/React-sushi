import React from 'react';
import Item from '../Item/Item';
import { IProduct, selectProducts } from 'entities/products/api';
import { useAppSelector } from "app/hooks";

const Fulfilled: React.FC = () => {
    const { products } = useAppSelector(selectProducts);
    return (
        <section className="content__items">
            {products.map((product: IProduct[]) => (
                <Item key={product.at(0)?.id} product={product} />
            ))}
        </section>
    );
};

export default Fulfilled;
