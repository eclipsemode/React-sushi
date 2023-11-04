import { render, screen } from '@testing-library/react';
import Banner from '@components/Banner/Banner';
import '@testing-library/jest-dom';

describe('Banner tests', () => {
  beforeAll(() => {
    render(<Banner />);
  });
  // it('Should be defined', () => {
  //     render(<Banner />);
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
