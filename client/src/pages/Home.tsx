import React from "react";

import { Categories, Sort, Products, Banner } from "../components";
import { useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/features/filterSlice";

const Home: React.FC = () => {
  const { categoryNumber } = useAppSelector(selectFilter);
  const { categories } = useAppSelector(state => state.category)

  return (
    <>
      <div className="content__top">
        <Banner />
        <Categories />
      </div>
      <section className="content__head">
        <h2 className="content__title">{ categories.length !== 0 ?
          categories.find(category => category.id === categoryNumber)?.name
         : 'Загрузка...' }</h2>
        <Sort />
      </section>
      <Products />
    </>
  );
};

export default Home;
