import { render, screen } from '@testing-library/react';
import { CartEmpty } from '../index';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

describe('CartEmpty', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <CartEmpty />
                </Provider>
            </BrowserRouter>,
        );
    });
    test('Should render an element', () => {
        expect(screen.getByText(/Корзина пустая/i)).toBeInTheDocument();
    });

    test('Should render elements by role', () => {
        expect(screen.getByRole('button', { name: /вернуться на главную/i })).toBeInTheDocument();
        const img = screen.queryByRole('img');
        expect(img).toBeInTheDocument();
    });

    test('Should render img with alt name', () => {
        expect(screen.getByAltText(/empty cart/i)).toBeInTheDocument();
    });

    test('Should have link attr', () => {
        expect(screen.getByRole('link')).toHaveAttribute('href', '/');
    });

    test('Should match snapshot', () => {
        expect(screen.getByRole('link')).toMatchSnapshot();
    });
});
