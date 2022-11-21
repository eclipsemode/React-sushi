import "./assets/styles/app.css";
import React from "react";

import Router from "./router/Router";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchAuth } from "./redux/features/userSlice";

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
      <Router />
    </div>
  );
};

export default App;
