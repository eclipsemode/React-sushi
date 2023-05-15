import React from 'react';
import { Header } from 'widgets';
import { Outlet } from 'react-router-dom';
import Footer from 'widgets/Footer/Footer';
import ToTopArrow from 'widgets/ToTopArrow/ToTopArrow';
import { useLocation } from 'react-router';
import RouterPath from "../utils/menuPath";
import {useAppDispatch} from "../hooks";
import {fetchCategories} from "../../entities/categories";
import MaterialDialog from "../../features/materialDialog/ui";

const MainLayout: React.FC = () => {
    const [currentLocation, setCurrentLocation] = React.useState<string>(RouterPath.HOME);
    const dispatch = useAppDispatch();
    const location = useLocation();

    React.useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    React.useEffect(() => {
        if (currentLocation !== location.pathname) {
            window.scrollTo(0, 0);
            setCurrentLocation(location.pathname)
        }
    }, [location, currentLocation]);

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
            <MaterialDialog />
        </>
    );
};

export default MainLayout;
