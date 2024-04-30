import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import IncompletedTasks from '../../pages/IncompletedTasks';


expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('IncompletedTasks', () => {
  it('should fetch and display Incompleted tasks', async () => {
    const mockIncompletedTasks = [
      { id: 1, name: 'InCompleted Task 1', iscomplete: false },
      { id: 2, name: 'InCompleted Task 2', iscomplete: false },
    ];

    axios.get.mockResolvedValue({ data: { allTask: mockIncompletedTasks } });

    render(
      <BrowserRouter>
        <IncompletedTasks />
      </BrowserRouter>
    );
  });

  it('should hide filters', () => {
    render(
      <BrowserRouter>
        <IncompletedTasks />
      </BrowserRouter>
    );

    expect(screen.queryByText('Search tasks...')).not.toBeInTheDocument();
    expect(screen.queryByText('Start Date')).not.toBeInTheDocument();
    expect(screen.queryByText('End Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Status')).not.toBeInTheDocument();
  });
});
