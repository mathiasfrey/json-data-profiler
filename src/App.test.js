import { render, screen } from '@testing-library/react';
import App from './App';

deactivated_test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/simply drag/i);
  expect(linkElement).toBeInTheDocument();
});
