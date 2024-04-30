import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import ImportantTasks from '../../pages/ImportantTasks';

expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('ImportantTasks', () => {
  it('should fetch and display important tasks', async () => {
    const mockImportantTasks = [
      { id: 1, name: 'Completed Task 1', priority: 'high' },
      { id: 2, name: 'Completed Task 2', priority: 'high' },
    ];

    axios.get.mockResolvedValue({ data: { allTask: mockImportantTasks } });

    await act(async () => {
      render(
        <BrowserRouter>
          <ImportantTasks />
        </BrowserRouter>
      );
    });

  });

  it('should handle errors from the API call', async () => {
    const error = new Error(false);
    axios.get.mockRejectedValue(error);

    await act(async () => {
      render(
        <BrowserRouter>
          <ImportantTasks />
        </BrowserRouter>
      );
    });
  });

  it('should hide filters', () => {
    render(
      <BrowserRouter>
        <ImportantTasks />
      </BrowserRouter>
    );

    expect(screen.queryByText('Search tasks...')).not.toBeInTheDocument();
    expect(screen.queryByText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
  });
});
