import React from 'react';
import { fetchProducts, ProductsStatus, selectProducts } from 'entities/products/api';
import { selectFilter, setCategoryNumber } from 'features/filter/api';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { Rejected, Pending, Fulfilled } from './index';

const Products: React.FC = () => {
    const location = useLocation();
    const { categoryNumber, sortType, sortOrder } = useAppSelector(selectFilter);
    const { productsStatus } = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isMounted = React.useRef<boolean>(false);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString: string = qs.stringify({
                categoryNumber,
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryNumber, sortType, sortOrder, navigate]);

    React.useEffect(() => {
        if (location.search) {
            const queryStr = qs.parse(location.search.substring(1)) as { categoryNumber: string };
            dispatch(setCategoryNumber(Number(queryStr.categoryNumber)));
        }
    }, [dispatch, location]);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [categoryNumber, dispatch, sortOrder, sortType]);

    return productsStatus === ProductsStatus.PENDING ? (
        <Pending />
    ) : productsStatus === ProductsStatus.REJECTED ? (
        <Rejected />
    ) : (
        <Fulfilled />
    );
};

export default Products;
