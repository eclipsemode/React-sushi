import { render, screen } from '@testing-library/react';
import Index from '@components/Banner';
import '@testing-library/jest-dom';

describe('Index tests', () => {
  beforeAll(() => {
    render(<Index />);
  });
  // it('Should be defined', () => {
  //     render(<Index />);
  //
  //     const header = screen.getByRole('heading');
  //     const headerText = 'Тест'
  //
  //     expect(header).toHaveTextContent(headerText);
  // })

  it('Should have an img', () => {
    const img = screen.getAllByRole('img');

    img.forEach((image) => {
      expect(image).toBeInTheDocument();
    });
  });

  // it('Should have alt for all images', async () => {
  //     const carousel = screen.getByTestId('carousel');
  //
  //     expect(carousel).toBeInTheDocument();
  // })
});
