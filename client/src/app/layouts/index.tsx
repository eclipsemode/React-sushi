import React from 'react';
import { Header } from 'widgets';
import { Outlet } from 'react-router-dom';
import Footer from 'widgets/Footer/Footer';
import ToTopArrow from 'widgets/ToTopArrow/ToTopArrow';

const MainLayout: React.FC = () => {
    return (
        <>
            <Header />
            <main className="content">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <Footer />
            <ToTopArrow />
        </>
    );
};

export default MainLayout;
