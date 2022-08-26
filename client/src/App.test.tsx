import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

test('renders react element', () => {
    const { getByText } = render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>,
    );

    expect(getByText(/главная/i)).toBeInTheDocument();
});
