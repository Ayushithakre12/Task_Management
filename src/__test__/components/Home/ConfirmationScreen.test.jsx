import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import ConfirmationScreen from '../../../components/Home/ConfirmationScreen';

describe('ConfirmationScreen Component', () => {
  it('should render ConfirmationScreen component correctly', () => {
    const mockOnCancel = jest.fn();
    const mockOnConfirm = jest.fn();
    const { getByText } = render(<ConfirmationScreen onCancel={mockOnCancel} onConfirm={mockOnConfirm} />);

    const cancelButton = getByText('Cancel');
    const deleteButton = getByText('Delete');

    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  it('should call onCancel when the Cancel button is clicked', () => {
    const mockOnCancel = jest.fn();
    const mockOnConfirm = jest.fn();
    const { getByText } = render(<ConfirmationScreen onCancel={mockOnCancel} onConfirm={mockOnConfirm} />);

    const cancelButton = getByText('Cancel');

    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalled();
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('should call onConfirm when the Delete button is clicked', () => {
    const mockOnCancel = jest.fn();
    const mockOnConfirm = jest.fn();
    const { getByText } = render(<ConfirmationScreen onCancel={mockOnCancel} onConfirm={mockOnConfirm} />);

    const deleteButton = getByText('Delete');

    fireEvent.click(deleteButton);

    expect(mockOnConfirm).toHaveBeenCalled();
    expect(mockOnCancel).not.toHaveBeenCalled();
  });
});