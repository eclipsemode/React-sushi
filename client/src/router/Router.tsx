import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "../pages/Cart"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "../pages/NotFound"));

const Router: React.FC = () => {
  return (
    <React.Suspense fallback="Загрузка...">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="registration" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
};

export default Router;
