import React from "react";
import cat1Img from "app/assets/img/1.png";
import cat2Img from "app/assets/img/2.png";
import cat3Img from "app/assets/img/3.png";
import cat4Img from "app/assets/img/4.png";
import cat5Img from "app/assets/img/5.png";
import cat6Img from "app/assets/img/6.png";

import { setCategoryNumber } from "features/filter/api";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { fetchCategories } from "entities/categories";
import CategoriesSkeleton from "./CategoriesSkeleton";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();
  const { categoriesStatus, categories } = useAppSelector(state => state.categoriesReducer);
  const { categoryNumber } = useAppSelector(state => state.filterReducer)

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
            : categories.map((category, index) => (
              <Link to={`/?categoryNumber=${category.id}`} key={category.id} onClick={() => handleClickCategory(category.id)}>
              <li

              className={categoryNumber === category.id ? "categories-item--active" : ""}
            >
              <img width="42" height="42" src={categoryImg(index)} alt="category" />
              <span>{category.name}</span>
            </li>
          </Link>
            ))
        }
      </ul>
    </nav>
  );
};

export default Categories;
