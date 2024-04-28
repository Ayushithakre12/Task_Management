import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom';
import TaskDetails from '../../../components/Home/TaskDetails';

const mockTask = {
  name: 'Sample Task',
  description: 'Sample Description',
  priority: 'High',
  createdDate: '2024-04-27',
  collaborators: [{ userName: 'John Doe' }, { userName: 'Jane Smith' }]
};

describe('TaskDetails Component', () => {
    it('should render TaskDetails component correctly', () => {
        const mockOnClose = jest.fn();
        const { getByText, getByRole } = render(<TaskDetails task={mockTask} onClose={mockOnClose} />);
      
        const taskName = getByText('Sample Task');
        const closeButton = getByRole('button');
      
        expect(taskName).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
      });

  it('should call onClose when the Close button is clicked', () => {
    const mockOnClose = jest.fn();
    const { getByRole } = render(<TaskDetails task={mockTask} onClose={mockOnClose} />);
  
    const closeButton = getByRole('button');
  
    fireEvent.click(closeButton);
  
    expect(mockOnClose).toHaveBeenCalled();
  });

//   it('should display task details correctly', () => {
//     const mockOnClose = jest.fn();
//     const { getByText } = render(<TaskDetails task={mockTask} onClose={mockOnClose} />);

//     const descriptionText = getByText('Description: Sample Description');
//     const priorityText = getByText('Priority: High');
//     const createdDateText = getByText('Created Date: 2024-04-27');
//     const collaboratorsText = getByText(`/Collaborators:.*$/i`);

//     expect(descriptionText).toBeInTheDocument();
//     expect(priorityText).toBeInTheDocument();
//     expect(createdDateText).toBeInTheDocument();
//     expect(collaboratorsText).toBeInTheDocument();
//   });
  
});
