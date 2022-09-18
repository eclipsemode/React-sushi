import './assets/styles/app.css';
import React from 'react';

import Router from './router/Router';
import { useAppDispatch } from "./redux/hooks";
import { fetchAuth } from "./redux/features/userSlice";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch])

  return (
      <div className="App">
        <Router />
      </div>
  );
};

export default App;
