import React from 'react';
import Skeleton from '../Item/Skeleton';

const Pending: React.FC = () => {
    return (
        <div className="content__items">
            {[...new Array(12)].map((_, index) => (
                <Skeleton key={index} />
            ))}
        </div>
    );
};

export default Pending;
