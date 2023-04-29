import React from 'react';
import { Header } from 'widgets';
import { Outlet } from 'react-router-dom';
import Footer from 'widgets/Footer/Footer';
import ToTopArrow from 'widgets/ToTopArrow/ToTopArrow';
import { useLocation } from 'react-router';
import RouterPath from "../utils/menuPath";

const MainLayout: React.FC = () => {
    const [currentLocation, setCurrentLocation] = React.useState<string>(RouterPath.HOME);
    const location = useLocation();

    React.useEffect(() => {
        if (currentLocation !== location.pathname) {
            window.scrollTo(0, 0);
            setCurrentLocation(location.pathname)
        }
    }, [location, currentLocation]);

    React.useEffect(() => {

    }, [])

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
