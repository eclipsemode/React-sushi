import "app/index.css";
import React from "react";

import { useAppDispatch, useAppSelector } from "redux/hooks";
import { fetchAuth } from "redux/features/userSlice";
import withProviders from './providers';
import { Routing } from "pages";

const App: React.FC = () => {
  const { isAuth } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchAuth())
    }
  }, [isAuth, dispatch]);

  return (
    <div className="App">
      <Routing/>
    </div>
  );
};

export default withProviders(App);
