import React from 'react';
import Skeleton from '../Item/Skeleton';

const Pending: React.FC = () => {
    return (
        <section className="content__items">
            {[...new Array(12)].map((_, index) => (
                <Skeleton key={index} />
            ))}
        </section>
    );
};

export default Pending;
