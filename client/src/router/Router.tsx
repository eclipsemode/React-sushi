import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "../pages/Cart"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "../pages/NotFound"));
const Personal = React.lazy(() => import(/* webpackChunkName: "Personal" */ "../pages/Personal"));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ "../pages/LoginPage"));

const Router: React.FC = () => {
  return (
    <React.Suspense fallback="Загрузка...">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<LoginPage />} />
          <Route path="personal" element={<Personal/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default Router;
