import 'app/assets/styles/app.scss';
import React from 'react';

import withProviders from './providers';
import { Routing } from 'pages';

const App: React.FC = () => {
    return (
        <div className="App">
            <Routing />
        </div>
    );
};

export default withProviders(App);
