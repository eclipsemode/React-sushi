import "./assets/styles/app.css";
import React from "react";

import Router from "./router/Router";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { fetchUserInfo } from "./redux/features/userSlice";

const App: React.FC = () => {
  const { isAuth } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchUserInfo());
  }, [isAuth]);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
