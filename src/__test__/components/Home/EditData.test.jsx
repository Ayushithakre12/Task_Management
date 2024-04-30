import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import { toast } from 'react-toastify';
import EditData from '../../../components/Home/EditData';

expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('EditData Component', () => {
  test('renders form elements correctly', async () => {
    const { getByPlaceholderText, getByText, getByLabelText } = render(<EditData />);

    expect(getByPlaceholderText('Name')).toBeInTheDocument();
    expect(getByPlaceholderText('Description...')).toBeInTheDocument();
    expect(getByText('Select Priority')).toBeInTheDocument();
    expect(getByText('Completed')).toBeInTheDocument();
    expect(getByLabelText('Completed')).toBeInTheDocument();
  });

  test('handles task update correctly', async () => {
    const mockOnUpdate = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <EditData
        task={{ id: '1', name: 'Task 1', description: 'Description 1', priority: 'high', iscompleted: false }}
        onUpdate={mockOnUpdate}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Updated Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description...'), { target: { value: 'Updated Description' } });
    // Toggle the "Completed" checkbox
    fireEvent.click(screen.getByLabelText('Completed'));
    fireEvent.click(screen.getByText('Update'));

    await waitFor(() => {
      expect(mockOnUpdate).toHaveBeenCalledWith({
        id: '1',
        name: 'Updated Task',
        description: 'Updated Description',
        priority: 'high',
        iscompleted: true,
        collaborators: []
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('handles task addition correctly', async () => {
    const mockOnAdd = jest.fn();
    const mockOnClose = jest.fn();

    render(
      <EditData
        onAdd={mockOnAdd}
        onClose={mockOnClose}
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'New Task' } });
    fireEvent.change(screen.getByPlaceholderText('Description...'), { target: { value: 'New Description' } });
    fireEvent.click(screen.getByText('Add'));

    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith({
        name: 'New Task',
        description: 'New Description',
        priority: '',
        iscompleted: false,
        collaborators: []
      });
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('fetches collaborators successfully', async () => {
    // Mock successful response from Axios
    const mockResponse = { data: { allUser: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] } };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(
      <EditData />
    );

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });
  });


});