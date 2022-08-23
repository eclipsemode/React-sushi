import React from "react";

import { Categories, Sort, Products } from "../components";
import { useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/features/filterSlice";
import categoryNames from "../components/Categories/categoryNames";

const Home: React.FC = () => {
  const { categoryNumber } = useAppSelector(selectFilter);
  React.useEffect(() => {

  }, [categoryNumber]);
  return (
    <>
      <div className="content__top">
        <Categories />
      </div>
      <section className="content__head">
        <h2 className="content__title">{categoryNames[categoryNumber]}</h2>
        <Sort />
      </section>
      <Products />
    </>
  );
};

export default Home;
