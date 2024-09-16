// Page404.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Page404 from './page404';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}));

describe('Page404 Component', () => {
  test('should render the component correctly', () => {
    render(<Page404 />);
    
    expect(screen.getByText('The page you have requested is not found')).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /Back to home/i })).toBeInTheDocument();
    
    const img = screen.getByAltText('gif_ing');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://i.postimg.cc/2yrFyxKv/giphy.gif');
  });

  test('should navigate to home page when button is clicked', () => {
    const mockNavigate = jest.fn();
    
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);
    
    render(<Page404 />);

    const button = screen.getByRole('button', { name: /Back to home/i });
    fireEvent.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
