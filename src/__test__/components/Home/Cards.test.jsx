import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Cards from '../../../components/Home/Cards';


expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('Cards Component', () => {

    test('renders Cards component', () => {
        const mockNavigate = jest.fn(); // Mock useNavigate
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={[]}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    test('handles click on task', () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false }];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Task 1'));
        expect(screen.getAllByText('Task 1')).toHaveLength(2);

    });

    test('displays task details on click', () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false }];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Task 1'));
        expect(screen.getByText('Description: Description 1')).toBeInTheDocument();
    });

    test('renders tasks correctly', () => {
        const tasks = [
            { id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false },
            { id: 2, name: 'Task 2', description: 'Description 2', iscomplete: true },
        ];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        tasks.forEach(task => {
            expect(screen.getByText(task.name)).toBeInTheDocument();
            expect(screen.getByText(task.description)).toBeInTheDocument();
        });
    });


    test('handles task deletion', async () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false }];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Task 1'));
        fireEvent.click(screen.getByTestId('delete-button'));

        await waitFor(() => {
            expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Delete'));

        // Ensure task is deleted
        await waitFor(() => {
            expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        });
    });

    test('handles editing of task', async () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false }];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Task 1'));
        fireEvent.click(screen.getByTestId('edit-button'));

        // Ensure the edit form is displayed
        await waitFor(() => {
            expect(screen.getByText('Edit Task')).toBeInTheDocument();
        });
    });

    test('displays add task button correctly', () => {
        const tasks = [];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Add Task')).toBeInTheDocument();
    });

    test('opens edit form when clicking on edit button', async () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false }];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByTestId('edit-button'));

        await waitFor(() => {
            expect(screen.getByText('Edit Task')).toBeInTheDocument();
        });
    });
    test('displays filtered tasks based on search term', () => {
        const tasks = [
            { id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false },
            { id: 2, name: 'Task 2', description: 'Description 2', iscomplete: true },
            { id: 3, name: 'Task 3', description: 'Description 3', iscomplete: false },
        ];
        const searchTerm = 'Task 1';
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm={searchTerm}
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Task 1')).toBeInTheDocument();
        expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
        expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });
    test('displays filtered tasks based on selected status', () => {
        const tasks = [
            { id: 1, name: 'Task 1', description: 'Description 1', iscomplete: false },
            { id: 2, name: 'Task 2', description: 'Description 2', iscomplete: true },
            { id: 3, name: 'Task 3', description: 'Description 3', iscomplete: false },
        ];
        const selectedStatus = 'completed';
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus={selectedStatus}
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Task 2')).toBeInTheDocument();
        expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });
    test('displays "Completed" button when task is completed', () => {
        const tasks = [{ id: 1, name: 'Task 1', description: 'Description 1', iscomplete: true }];
        render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Completed')).toBeInTheDocument();
    });
    test('displays "Add Task" button when home prop is true', () => {
        const tasks = [];
        const { getByText } = render(
            <MemoryRouter>
                <Cards
                    home="true"
                    setInputDiv={() => { }}
                    setTasks={jest.fn()}
                    tasks={tasks}
                    route=""
                    searchTerm=""
                    selectedStatus=""
                    startDate=""
                    endDate=""
                />
            </MemoryRouter>
        );

        expect(getByText('Add Task')).toBeInTheDocument();
    });


});

