import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the `toBeInTheDocument` matcher
import Loader from '.';
import spinner from '../../assets/spinner.svg';

describe('Loader Component', () => {
  it('renders the Loader component', () => {
    render(<Loader />);
    expect(screen.getByAltText('loading icon')).toBeInTheDocument();
  });

  it('displays the spinner image correctly', () => {
    render(<Loader />);
    const spinnerImage = screen.getByAltText('loading icon');
    expect(spinnerImage).toHaveAttribute('src', spinner);
  });

  it('applies the provided className', () => {
    const { container } = render(<Loader className="test-class" />);
    const loaderDiv = container.querySelector('.loader');
    expect(loaderDiv).toHaveClass('test-class');
  });

  it('applies the provided style', () => {
    const style = { border: '2px solid red' };
    const { container } = render(<Loader style={style} />);
    const loaderDiv = container.querySelector('.loader');
    expect(loaderDiv).toHaveStyle(style);
  });
});
