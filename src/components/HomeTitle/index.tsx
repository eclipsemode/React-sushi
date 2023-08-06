'use client'
import React from 'react';
import {Skeleton} from "@mui/material";
import {useAppSelector} from "@store/hooks";

const HomeTitle = () => {
    const {categories} = useAppSelector((state) => state.categoriesReducer);
    const {categoryNumber} = useAppSelector((state) => state.filterReducer);
    return <h2 className="content__title">
        {categories.length !== 0 ? (
            categories.find((category) => category.id === categoryNumber)?.name
        ) : <Skeleton animation="wave" width={150} height={50}/>
        }
    </h2>
};

export default HomeTitle;