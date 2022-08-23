import React from 'react';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';
import Footer from "../components/Footer/Footer";

const MainLayout: React.FC = () => {
    return (
      <>
      <Header />
        <div className="wrapper">
            <main className="content">
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
        <Footer/>
      </>
    );
};

export default MainLayout;
