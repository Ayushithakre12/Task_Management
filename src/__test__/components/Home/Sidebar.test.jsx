import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toBeInTheDocument, toHaveAttribute, toHaveValue } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Sidebar from '../../../components/Home/Sidebar';

expect.extend({ toBeInTheDocument, toHaveValue, toHaveAttribute });

jest.mock('axios');

describe('Sidebar', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'Test User');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders the component correctly', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('All task')).toBeInTheDocument();
    expect(screen.getByText('Important task')).toBeInTheDocument();
    expect(screen.getByText('Completed task')).toBeInTheDocument();
    expect(screen.getByText('Incompleted task')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();
  });

  test('navigates to the correct page when a link is clicked', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('All task'));
    expect(screen.getByRole('link', { name: 'All task' })).toHaveAttribute('href', '/dashboard');

    fireEvent.click(screen.getByText('Important task'));
    expect(screen.getByRole('link', { name: 'Important task' })).toHaveAttribute('href', '/importantTasks');

    fireEvent.click(screen.getByText('Completed task'));
    expect(screen.getByRole('link', { name: 'Completed task' })).toHaveAttribute('href', '/completedTasks');

    fireEvent.click(screen.getByText('Incompleted task'));
    expect(screen.getByRole('link', { name: 'Incompleted task' })).toHaveAttribute('href', '/incompletedTasks');
  });

  test('logs out the user successfully', async () => {
    axios.put.mockResolvedValue({});

    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Log Out'));

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith('https://localhost:7240/Login');
      expect(localStorage.getItem('id')).toBeNull();
      expect(localStorage.getItem('username')).toBeNull();
    });
  });
});