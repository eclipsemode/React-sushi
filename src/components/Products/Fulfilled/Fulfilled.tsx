import React from 'react';
import Item from '../Item/Item';
import { useSelector } from 'react-redux';
import { ProductsType, selectProducts } from '../../../redux/features/productsSlice';

const Fulfilled: React.FC = () => {
    const { products } = useSelector(selectProducts);
    return (
        <section className="content__items">
            {products.map((product: ProductsType) => (
                <Item key={product.id} {...product} />
            ))}
        </section>
    );
};

export default Fulfilled;
