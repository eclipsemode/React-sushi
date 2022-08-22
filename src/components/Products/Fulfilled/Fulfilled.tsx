import React from 'react';
import Pizza from '../Pizza/Pizza';
import { useSelector } from 'react-redux';
import { ProductsType, selectProducts } from '../../../redux/features/productsSlice';

const Fulfilled: React.FC = () => {
    const { products } = useSelector(selectProducts);
    return (
        <div className="content__items">
            {products.map((product: ProductsType) => (
                <Pizza key={product.id} {...product} />
            ))}
        </div>
    );
};

export default Fulfilled;
