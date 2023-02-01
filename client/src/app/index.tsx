import "app/index.css";
import React from "react";

import withProviders from './providers';
import { Routing } from "pages";
import { useAppDispatch } from "app/utils";
import { fetchAuth } from "../processes/auth";

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchAuth())
  }, [dispatch])

  return (
    <div className="App">
      <Routing/>
    </div>
  );
};

export default withProviders(App);
