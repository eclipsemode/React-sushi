import React from 'react';
import { Header } from '../components';
import { Outlet } from 'react-router-dom';
import Footer from "../components/Footer/Footer";
import ToTopArrow from "../components/ToTopArrow/ToTopArrow";
import { useAppDispatch } from "../redux/hooks";
import { fetchAuth } from "../redux/features/userSlice";

const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchAuth())
    }
  }, [dispatch])

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
