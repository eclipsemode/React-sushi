import Banner from '@components/Banner/Banner';
import {Sort} from "@store/features/filter/ui";
import Products from "@store/features/products/ui/Products";
import React from "react";
import HomeTitle from "@components/HomeTitle";
import Categories from "@store/features/categories/ui/Categories";
import HomeInfo from "@components/HomeInfo";

const Home = () => {
    return (
        <>
            <Banner/>
            <HomeInfo />
            <div className="content__top">
                <Categories/>
            </div>
            <section className="content__head">
                <HomeTitle/>
                <Sort/>
            </section>
            <Products/>
        </>
    );
}

export default Home;