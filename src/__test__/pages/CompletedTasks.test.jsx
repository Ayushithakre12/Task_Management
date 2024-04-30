import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import CompletedTasks from '../../pages/CompletedTasks';

expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('CompletedTasks', () => {
  it('should fetch and display completed tasks', async () => {
    const mockCompletedTasks = [
      { id: 1, name: 'Completed Task 1', iscomplete: true },
      { id: 2, name: 'Completed Task 2', iscomplete: true },
    ];

    axios.get.mockResolvedValue({ data: { allTask: mockCompletedTasks } });

    render(
      <BrowserRouter>
        <CompletedTasks />
      </BrowserRouter>
    );
  });

  it('should hide filters', () => {
    render(
      <BrowserRouter>
        <CompletedTasks />
      </BrowserRouter>
    );

    expect(screen.queryByText('Search tasks...')).not.toBeInTheDocument();
    expect(screen.queryByText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
  });
});
