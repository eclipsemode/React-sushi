import './assets/styles/app.css';
import React from 'react';

import Router from './router/Router';

const App: React.FC = () => {
  return (
      <div className="App">
        <Router />
      </div>
  );
};

export default App;
