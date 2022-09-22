import React from "react";
import { fetchProducts, ProductsStatus, selectProducts } from "../../redux/features/productsSlice";
import { selectFilter, IFilterState, setCategoryNumber } from "../../redux/features/filterSlice";
import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Rejected, Pending, Fulfilled } from "./index";

const Products: React.FC = () => {
  const location = useLocation();
  const { searchValue, categoryNumber, sortType, sortOrder } = useAppSelector(selectFilter);
  const { productsStatus } = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isMounted = React.useRef<boolean>(false);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString: string = qs.stringify({
        categoryNumber
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryNumber, sortType, sortOrder, navigate]);

  React.useEffect(() => {
      if (location.search) {
        const queryStr = qs.parse(window.location.search.substring(1)) as unknown as IFilterState;
        dispatch(setCategoryNumber(queryStr.categoryNumber));
      }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
      dispatch(fetchProducts({ categoryNumber, sortType, sortOrder, searchValue }));

  }, [categoryNumber, dispatch, searchValue, sortOrder, sortType]);

  return productsStatus === ProductsStatus.PENDING ? (
    <Pending />
  ) : productsStatus === ProductsStatus.REJECTED ? (
    <Rejected />
  ) : (
    <Fulfilled />
  );
};

export default Products;
