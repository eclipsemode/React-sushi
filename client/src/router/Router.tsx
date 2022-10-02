import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import { PulseLoader } from "react-spinners";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "../pages/Cart"));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ "../pages/NotFound"));
const Personal = React.lazy(() => import(/* webpackChunkName: "Personal" */ "../pages/Personal"));
const LoginPage = React.lazy(() => import(/* webpackChunkName: "LoginPage" */ "../pages/LoginPage"));

const Router: React.FC = () => {
  const loader = (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <PulseLoader color='#8ba4f9' />
    </div>
  )
  return (
    <React.Suspense fallback={loader}>
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
