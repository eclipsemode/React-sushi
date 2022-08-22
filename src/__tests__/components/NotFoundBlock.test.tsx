import {NotFoundBlock} from '../../components';
import { render } from '@testing-library/react';

describe('NotFoundBlock testing', () => {
    test('Should find text', () => {
        const { getByText } = render(<NotFoundBlock/>)

        expect(getByText('Ничего не найдено.')).toBeInTheDocument()
    })
})