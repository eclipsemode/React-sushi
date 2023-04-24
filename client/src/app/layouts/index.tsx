import React from 'react';
import { Header } from 'widgets';
import { Outlet } from 'react-router-dom';
import Footer from 'widgets/Footer/Footer';
import ToTopArrow from 'widgets/ToTopArrow/ToTopArrow';
import { useLocation } from 'react-router';

const MainLayout: React.FC = () => {
    const location = useLocation();

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

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
