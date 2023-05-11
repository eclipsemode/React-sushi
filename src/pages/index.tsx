import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from 'app/layouts';
import Home from 'pages/homePage';

const CartPage = React.lazy(() => import(/* webpackChunkName: "cart" */ 'pages/cartPage'));
const NotFoundPage = React.lazy(() => import(/* webpackChunkName: "notFound" */ 'pages/notFoundPage'));
const PersonalPage = React.lazy(() => import(/* webpackChunkName: "personal" */ 'pages/personalPage'));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "login" */ 'pages/loginPage'));
const ActivatedPage = React.lazy(() => import(/* webpackChunkName: "activated" */ 'pages/activatedPage'));
const ContactsPage = React.lazy(() => import(/* webpackChunkName: "contacts" */ 'pages/contactsPage'));
const SuccessfullyRegisteredPage = React.lazy(() => import(/* webpackChunkName: "registered" */ 'pages/SuccessfullyRegisteredPage'))

export const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="registration" element={<LoginPage />} />
                <Route path="personal" element={<PersonalPage />} />
                <Route path="contacts" element={<ContactsPage />} />
                <Route path="registered" element={<SuccessfullyRegisteredPage />} />
                <Route path="activate/:link" element={<ActivatedPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};
