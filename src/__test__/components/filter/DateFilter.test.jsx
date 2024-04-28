import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import DateFilter from '../../../components/filter/DateFilter';

describe('DateFilter Component', () => {
  it('should render DateFilter component correctly', () => {
    const mockOnFilter = jest.fn();
    const { getByLabelText, getByText } = render(<DateFilter onFilter={mockOnFilter} />);

    const startDateInput = getByLabelText('Start Date:');
    const endDateInput = getByLabelText('End Date:');
    const filterButton = getByText('Filter');

    expect(startDateInput).toBeInTheDocument();
    expect(endDateInput).toBeInTheDocument();
    expect(filterButton).toBeInTheDocument();
  });

  it('should call onFilter with correct dates when form is submitted', () => {
    const mockOnFilter = jest.fn();
    const { getByLabelText, getByText } = render(<DateFilter onFilter={mockOnFilter} />);

    const startDateInput = getByLabelText('Start Date:');
    const endDateInput = getByLabelText('End Date:');
    const filterButton = getByText('Filter');

    fireEvent.change(startDateInput, { target: { value: '2024-04-01' } });
    fireEvent.change(endDateInput, { target: { value: '2024-04-30' } });
    fireEvent.click(filterButton);

    expect(mockOnFilter).toHaveBeenCalledWith('2024-04-01', '2024-04-30');
  });
});