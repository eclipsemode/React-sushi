import React from "react";

import { Categories, Sort, Products, Banner } from "../components";
import { useAppSelector } from "../redux/hooks";
import { selectFilter } from "../redux/features/filterSlice";
import ContentLoader from "react-content-loader";

const Home: React.FC = () => {
  const { categoryNumber } = useAppSelector(selectFilter);
  const { categories } = useAppSelector(state => state.category);

  return (
    <>
      <div className="content__top">
        <Banner />
        <Categories />
      </div>
      <section className="content__head">
        <h2 className="content__title">{categories.length !== 0 ?
          categories.find(category => category.id === categoryNumber)?.name
          : (
            <ContentLoader
              speed={2}
              width={205}
              height={35}
              viewBox="0 0 205 35"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="892" y="0" rx="50" ry="50" width="206" height="70" />
              <rect x="1115" y="0" rx="50" ry="50" width="206" height="70" />
              <rect x="25" y="36" rx="0" ry="0" width="205" height="35" />
              <rect x="0" y="0" rx="12" ry="12" width="205" height="35" />
            </ContentLoader>
          )
        }
        </h2>
        <Sort />
      </section>
      <Products />
    </>
  );
};

export default Home;
