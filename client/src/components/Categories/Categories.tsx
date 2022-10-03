import React from "react";
import cat1Img from "../../assets/img/1.png";
import cat2Img from "../../assets/img/2.png";
import cat3Img from "../../assets/img/3.png";
import cat4Img from "../../assets/img/4.png";
import cat5Img from "../../assets/img/5.png";
import cat6Img from "../../assets/img/6.png";

import { setCategoryNumber, selectFilter } from "../../redux/features/filterSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCategories } from "../../redux/features/categoriesSlice";
import CategoriesSkeleton from "./CategoriesSkeleton";

const Categories: React.FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const { categories, categoriesStatus } = useAppSelector(state => state.category);
  const { categoryNumber } = useAppSelector(selectFilter);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  const handleClickCategory = (id: number) => {
    dispatch(setCategoryNumber(id));
  };

  const categoryImg = (i: number) => {
    switch (i) {
      case 0:
        return cat1Img;
      case 1:
        return cat2Img;
      case 2:
        return cat3Img;
      case 3:
        return cat4Img;
      case 4:
        return cat5Img;
      case 5:
        return cat6Img;
    }
  };

  return (
    <nav className="categories">
      <ul>
        {
          categoriesStatus === 'pending' || categoriesStatus === 'rejected'
            ? [...new Array(6)].map((_, index) => (
              <CategoriesSkeleton key={index}/>
            ))
            : categories.map((category, index) => (<li
              key={category.id}
              onClick={() => handleClickCategory(category.id)}
              className={categoryNumber === category.id ? "categories-item--active" : ""}
            >
              <img width="42" height="42" src={categoryImg(index)} alt="category" />
              <span>{category.name}</span>
            </li>))
        }

        {/*{*/}
        {/*  categories.map((category, index) => (<li*/}
        {/*    key={category.id}*/}
        {/*    onClick={() => handleClickCategory(category.id)}*/}
        {/*    className={categoryNumber === category.id ? "categories-item--active" : ""}*/}
        {/*  >*/}
        {/*    <img width="42" height="42" src={categoryImg(index)} alt="category" />*/}
        {/*    <span>{category.name}</span>*/}
        {/*  </li>))*/}
        {/*}*/}
      </ul>
    </nav>
  );
});

export default Categories;
