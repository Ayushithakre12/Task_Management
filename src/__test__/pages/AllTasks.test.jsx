import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import AllTasks from '../../pages/AllTasks';

expect.extend({ toBeInTheDocument });
jest.mock('axios');

describe('AllTasks Component', () => {
  test('renders loading state initially', () => {
    render(<AllTasks />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });


});