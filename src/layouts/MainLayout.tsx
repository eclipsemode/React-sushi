import React from 'react';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import ToTopArrow from "../components/ToTopArrow/ToTopArrow";

const MainLayout: React.FC = () => {
    return (
      <>
      <Header />
        <div id="top" className="wrapper">
            <main className="content">
                <div className="container">
                    <Outlet />
                </div>
            </main>
        </div>
        <Footer/>
        <ToTopArrow/>
      </>
    );
};

export default MainLayout;
