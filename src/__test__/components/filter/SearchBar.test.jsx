import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument, toHaveBeenCalledWith } from '@testing-library/jest-dom';
import SearchBar from '../../../components/filter/SearchBar';

describe('SearchBar Component', () => {
  it('should render SearchBar component correctly', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = getByPlaceholderText('Search...');
    const searchButton = getByText('Search');

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });

  it('should update the search term when the input value changes', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText } = render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = getByPlaceholderText('Search...');

    fireEvent.change(searchInput, { target: { value: 'test' } });

    expect(searchInput).toHaveValue('test');
  });

  it('should call onSearch with the correct search term when the form is submitted', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={mockOnSearch} />);

    const searchInput = getByPlaceholderText('Search...');
    const searchButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });
});