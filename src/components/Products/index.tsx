'use client';
import React, { useEffect } from 'react';
import { fetchProducts, selectProducts } from '@store/features/products/api';
import { selectFilter, setCategoryId } from '@store/features/filter/api';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import Rejected from './Rejected';
import Fulfilled from './Fulfilled';
import Pending from './Pending';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'qs';
import { ProductsStatus } from '@store/features/products/model';

const Products: React.FC = () => {
  const { categoryId, sortType, sortOrder } = useAppSelector(selectFilter);
  const { categories } = useAppSelector((state) => state.categoriesReducer);
  const { productsStatus } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchCategoryId = searchParams.get('categoryId');
  const isMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (!isMounted.current && !searchCategoryId && categories[0]) {
      const queryString: string = qs.stringify({
        categoryId: categories[0]?.id,
      });
      router.push(`?${queryString}`);
      isMounted.current = true;
    }
  }, [categories]);

  useEffect(() => {
    if (searchCategoryId) {
      dispatch(setCategoryId(searchCategoryId));
    }
  }, []);

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [categoryId, dispatch, sortOrder, sortType]);

  return productsStatus === ProductsStatus.PENDING ? (
    <Pending />
  ) : productsStatus === ProductsStatus.REJECTED ? (
    <Rejected />
  ) : (
    <Fulfilled />
  );
};

export default Products;
