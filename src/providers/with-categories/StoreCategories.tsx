"use client"
import React from 'react';
import {useAppDispatch} from "@store/hooks";
import {ICategories, setCategories} from "@store/features/categories";

interface IProps {
    categories: ICategories[]
}

const StoreCategories = ({ categories }: IProps) => {
    const dispatch = useAppDispatch();

    React.useEffect( () => {
        dispatch(setCategories(categories));
    }, [categories, dispatch]);

    return <></>;
};

export default StoreCategories;