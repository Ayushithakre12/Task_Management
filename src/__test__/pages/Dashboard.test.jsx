import React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import Dashboard from '../../pages/Dashboard';

jest.mock('../../components/Home/Sidebar', () => () => <div data-testid="sidebar">Mock Sidebar</div>);
jest.mock('react-router-dom', () => ({
  Outlet: () => <div data-testid="outlet">Mock Outlet</div>,
}));

test('renders Dashboard component with Sidebar and Outlet', () => {
  render(<Dashboard />);

  // Assert Sidebar presence
  const sidebar = screen.getByTestId('sidebar');
  expect(sidebar).toBeInTheDocument();

  // Assert Outlet presence
  const outlet = screen.getByTestId('outlet');
  expect(outlet).toBeInTheDocument();
});
