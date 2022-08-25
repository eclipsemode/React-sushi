import { render, screen } from '@testing-library/react';
import { NotFoundBlock } from '../index';

describe('NotFoundBlock', () => {
    test('Should render element', () => {
        render(<NotFoundBlock />);
        const element = screen.getByText(/ничего не найдено/i);
        expect(element).toBeInTheDocument();
    });

    test('Should get heading', () => {
        render(<NotFoundBlock />);
        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    test('Should match snapshot', () => {
        const component = render(<NotFoundBlock />);

        expect(component).toMatchSnapshot();
    });
});
