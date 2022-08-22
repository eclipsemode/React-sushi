import React from 'react';

import { Categories, Sort, Products } from '../components';

const Home: React.FC = () => {
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <Products />
        </>
    );
};

export default Home;
