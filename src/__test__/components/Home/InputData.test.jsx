import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import InputData from '../../../components/Home/InputData';

expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('InputData Component', () => {

  test('renders InputData component correctly', () => {
    render(
      <InputData
        InputDiv="block"
        fetchData={() => { }}
        setInputDiv={() => { }}
      />
    );

    expect(screen.getByText('Add Task')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description...')).toBeInTheDocument();
    expect(screen.getByText('Select Priority')).toBeInTheDocument();
    expect(screen.getByText('Select Collaborators:')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  test('handles form submission correctly', async () => {
    const mockFetchData = jest.fn();
    const mockSetInputDiv = jest.fn();
    const mockCollaborators = [
      { id: '1', name: 'Collaborator 1' },
      { id: '2', name: 'Collaborator 2' },
    ];

    axios.get.mockResolvedValue({ data: { allUser: mockCollaborators } });
    axios.post.mockResolvedValue({ data: { success: true } });

    render(
      <InputData
        InputDiv="block"
        fetchData={mockFetchData}
        setInputDiv={mockSetInputDiv}
      />
    );

    // Fill in the form fields
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description...'), {
      target: { value: 'This is a new task' },
    });
    fireEvent.change(screen.getByPlaceholderText('Select Priority'), {
      target: { value: 'high' },
    });

    // Leave the collaborators unselected

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'https://localhost:7240/Task?taskId=null',
        {
          name: 'New Task',
          description: 'This is a new task',
          priority: 'high',
          collaborators: [],
        },
        { withCredentials: true }
      );
      expect(mockFetchData).toHaveBeenCalled();
      expect(mockSetInputDiv).toHaveBeenCalledWith('hidden');
    });

    // Check if the success message is displayed
    expect(screen.getByText('Task submitted successfully!')).toBeInTheDocument();
  });

  test('fetches collaborators successfully', async () => {
    // Mock successful response from Axios
    const mockResponse = { data: { allUser: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] } };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(
      <InputData />
    );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });
});
