import React from 'react';

import { Categories, Sort, Products } from '../components';

const Home: React.FC = () => {
    return (
        <>
            <div className="content__top">
                <Categories />
            </div>
          <div className="content__head">
            <h2 className="content__title">Все пиццы</h2>
            <Sort/>
          </div>
            <Products />
        </>
    );
};

export default Home;
