"use client"
import React from 'react';
import {fetchProducts, ProductsStatus, selectProducts} from '@store/features/products/api';
import {selectFilter, setCategoryNumber} from '@store/features/filter/api';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {Rejected, Pending, Fulfilled} from './index';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import qs from 'qs'

const Products: React.FC = () => {
    const {categoryNumber, sortType, sortOrder} = useAppSelector(selectFilter);
    const {categories} = useAppSelector(state => state.categoriesReducer);
    const {productsStatus} = useAppSelector(selectProducts);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const isMounted = React.useRef<boolean>(false);

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString: string = qs.stringify({
                categoryNumber,
            });

            router.push(`?${queryString}`);
        }

        isMounted.current = true;
    }, [categoryNumber, sortType, sortOrder, router]);

    React.useEffect(() => {
        if (pathname) {
            const searchCategoryNumber = Number(searchParams.get('categoryNumber'));
            dispatch(setCategoryNumber(searchCategoryNumber || categories[0].id));
        }
    }, [dispatch, pathname, router, searchParams]);

    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [categoryNumber, dispatch, sortOrder, sortType]);

    return productsStatus === ProductsStatus.PENDING ? (
        <Pending/>
    ) : productsStatus === ProductsStatus.REJECTED ? (
        <Rejected/>
    ) : (
        <Fulfilled/>
    );
};

export default Products;
