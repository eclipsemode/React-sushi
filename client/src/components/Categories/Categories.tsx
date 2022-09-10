import React from "react";
import { useSelector, useDispatch } from "react-redux";
import cat1Img from "../../assets/img/1.png";
import cat2Img from "../../assets/img/2.png";
import cat3Img from "../../assets/img/3.png";
import cat4Img from "../../assets/img/4.png";
import cat5Img from "../../assets/img/5.png";
import cat6Img from "../../assets/img/6.png";

import categoryNames from "./categoryNames";

import { setCategoryNumber, selectFilter } from "../../redux/features/filterSlice";
// import axios from "axios";

const Categories: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  const { categoryNumber } = useSelector(selectFilter);
  // const [categories, setCategories] = React.useState<string[]>([]);

  // React.useEffect(() => {
  //   (async function fetchCategories() {
  //     try {
  //       const res = await axios.get('http://localhost:5000/api/category')
  //       const data = res.data;
  //       setCategories(data.map((obj: any) => obj.name));
  //     } catch (e: any) {
  //       setCategories(categoryNames.map((category: any) => category))
  //       console.error('Cannot get Categories')
  //     }
  //   })()
  // }, [])

  const handleClickCategory = (index: number) => {
    dispatch(setCategoryNumber(index));
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
        {categoryNames.map((category, index) => (
          <li
            key={index}
            onClick={() => handleClickCategory(index)}
            className={categoryNumber === index ? "categories-item--active" : ""}
          >
            <img width="42" height="42" src={categoryImg(index)} alt="category" />
            <span>{category}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
});

export default Categories;
