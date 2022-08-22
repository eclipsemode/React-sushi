import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton: React.FC = (props) => (
    <ContentLoader
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <circle cx="143" cy="118" r="115" />
        <rect x="0" y="265" rx="10" ry="10" width="280" height="27" />
        <rect x="0" y="313" rx="10" ry="10" width="280" height="88" />
        <rect x="0" y="430" rx="10" ry="10" width="90" height="27" />
        <rect x="128" y="420" rx="30" ry="30" width="152" height="45" />
    </ContentLoader>
);

export default Skeleton;
