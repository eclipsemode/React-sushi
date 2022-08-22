import React from 'react';
import ContentLoader from 'react-content-loader';

const CartOrderLoader: React.FC = () => (
    <div className="container container--cart">
        <div className="cart">
            <div className="cart__top">
                <ContentLoader
                    speed={4}
                    width={820}
                    height={392}
                    viewBox="0 0 820 392"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="165" y="451" rx="4" ry="4" width="230" height="53" />
                    <rect x="0" y="45" rx="4" ry="4" width="820" height="30" />
                    <rect x="0" y="91" rx="4" ry="4" width="820" height="1" />
                    <rect x="0" y="122" rx="4" ry="4" width="820" height="111" />
                    <rect x="0" y="261" rx="0" ry="0" width="820" height="30" />
                    <rect x="0" y="313" rx="20" ry="20" width="210" height="45" />
                    <rect x="610" y="313" rx="0" ry="0" width="210" height="45" />
                </ContentLoader>
            </div>
        </div>
    </div>
);

export default CartOrderLoader;
