import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import StatusFilter from '../../../components/filter/StatusFilter';

describe('StatusFilter Component', () => {
  it('should render StatusFilter component correctly', () => {
    const mockOnStatusChange = jest.fn();
    const { getByLabelText, getByRole } = render(<StatusFilter onStatusChange={mockOnStatusChange} />);

    const statusLabel = getByLabelText('Status:');
    const statusSelect = getByRole('combobox');

    expect(statusLabel).toBeInTheDocument();
    expect(statusSelect).toBeInTheDocument();
  });

  it('should update the selected status when the select value changes', () => {
    const mockOnStatusChange = jest.fn();
    const { getByRole } = render(<StatusFilter onStatusChange={mockOnStatusChange} />);

    const statusSelect = getByRole('combobox');

    fireEvent.change(statusSelect, { target: { value: 'completed' } });

    expect(statusSelect).toHaveValue('completed');
  });

  it('should call onStatusChange with the correct status when the select value changes', () => {
    const mockOnStatusChange = jest.fn();
    const { getByRole } = render(<StatusFilter onStatusChange={mockOnStatusChange} />);

    const statusSelect = getByRole('combobox');

    fireEvent.change(statusSelect, { target: { value: 'incompleted' } });

    expect(mockOnStatusChange).toHaveBeenCalledWith('incompleted');
  });
});