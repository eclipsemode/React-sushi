import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import { CartOrderLoader, NotFoundBlockLoader } from '../components';
const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ '../pages/Cart'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ '../pages/NotFound'));

const Router: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route
                    path="cart"
                    element={
                        <React.Suspense fallback={<CartOrderLoader />}>
                            <Cart />
                        </React.Suspense>
                    }
                />
                <Route
                    path="*"
                    element={
                        <React.Suspense fallback={<NotFoundBlockLoader />}>
                            <NotFound />
                        </React.Suspense>
                    }
                />
            </Route>
        </Routes>
    );
};

export default Router;
