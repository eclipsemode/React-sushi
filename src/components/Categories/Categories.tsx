import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryNumber, selectFilter } from '../../redux/features/filterSlice';

const Categories: React.FC = () => {
    const categories: String[] = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
    const dispatch = useDispatch();
    const { categoryNumber } = useSelector(selectFilter);

    const handleClickCategory = (index: number) => {
        dispatch(setCategoryNumber(index));
    };

    return (
        <nav className="categories">
            <ul>
                {categories.map((name, index) => (
                    <li
                        key={index}
                        onClick={() => handleClickCategory(index)}
                        className={categoryNumber === index ? 'categories-item--active' : ''}
                    >
                        {name}
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Categories;
