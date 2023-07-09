"use client"
import Banner from '@components/Banner/Banner';
import {Categories} from "@components/index";
import {Skeleton} from "@mui/material";
import {Sort} from "@store/features/filter/ui";
import Products from "@store/features/products/ui/Products";
import React from "react";
import {useAppSelector} from "@store/hooks";

async function Home() {
    const {categories} = useAppSelector((state) => state.categoriesReducer);
    const {categoryNumber} = useAppSelector((state) => state.filterReducer);

    return (
        <>
            <Banner/>
            <div className="content__top">
                <Categories/>
            </div>
            <section className="content__head">
                <h2 className="content__title">
                    {categories.length !== 0 ? (
                        categories.find((category) => category.id === categoryNumber)?.name
                    ) : <Skeleton animation="wave" width={150} height={50}/>
                    }
                </h2>
                <Sort/>
            </section>
            <Products/>
        </>
    );
}

export default Home;