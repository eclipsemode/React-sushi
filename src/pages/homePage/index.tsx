import React from 'react';

import { Banner, Categories } from 'widgets';
import { useAppSelector } from 'app/hooks';
import { Sort } from 'features/filter/ui';
import {Skeleton} from "@mui/material";
import Products from "entities/products/ui/Products";

const Index: React.FC = () => {
    const { categories } = useAppSelector((state) => state.categoriesReducer);
    const { categoryNumber } = useAppSelector((state) => state.filterReducer);

    return (
        <>
            <Banner />
            <div className="content__top">
                <Categories />
            </div>
            <section className="content__head">
                <h2 className="content__title">
                    {categories.length !== 0 ? (
                        categories.find((category) => category.id === categoryNumber)?.name
                    ) : <Skeleton animation="wave" width={150} height={50} />
                    }
                </h2>
                <Sort />
            </section>
            <Products />
        </>
    );
};

export default Index;
