import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Login page by default', () => {
  render(<App />);
  const loginLink = screen.getByRole('link', { name: /log in/i });
  expect(loginLink).toBeInTheDocument();
});
