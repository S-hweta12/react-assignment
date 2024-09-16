import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

function renderWithRouter(ui, { route = '/' } = {}) {
  window.history.pushState({}, 'Test page', route);
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

export default renderWithRouter;
