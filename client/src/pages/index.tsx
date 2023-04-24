import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from 'app/layouts';
import Home from 'pages/homePage';
import SuccessfullyRegisteredPage from './SuccessfullyRegisteredPage';

const CartPage = React.lazy(() => import(/* webpackChunkName: "Index" */ 'pages/cartPage'));
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "Index" */ 'pages/notFoundPage'));
const PersonalPage = React.lazy(() => import(/* webpackChunkName: "Index" */ 'pages/personalPage'));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "Index" */ 'pages/loginPage'));
const ActivatedPage = React.lazy(() => import(/* webpackChunkName: "Index" */ 'pages/activatedPage'));

export const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<LoginPage />} />
                <Route path="personal" element={<PersonalPage />} />
                <Route path="registered" element={<SuccessfullyRegisteredPage />} />
                <Route path="activate/:link" element={<ActivatedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
