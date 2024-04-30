import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import Register from '../../pages/Register';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';

expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('Register', () => {
    test('renders the registration form correctly', () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByText('Register')).toBeInTheDocument();
        expect(screen.getByText('Log in here')).toBeInTheDocument();
    });

    test('displays error message when passwords do not match', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'differentpassword' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Passwords do not match.')).toBeInTheDocument();
        });
    });

    test('displays error message for invalid password format', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'weakpassword' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'weakpassword' } });
        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Password must be at least 8 characters long and contain at least one number, one capital letter, and one special character.')).toBeInTheDocument();
        });
    });
    test('successfully registers a user', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPassword123!' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'StrongPassword123!' } });

        axios.post.mockResolvedValue({ data: { sucess: true } });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Registration successful!')).toBeInTheDocument();
        });
    });
    test('displays error message for failed registration', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'StrongPassword123!' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'StrongPassword123!' } });

        axios.post.mockResolvedValue({ data: { sucess: false, errorMessage: 'Email already in use' } });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Email already in use')).toBeInTheDocument();
        });
    });
    test('displays error message for weak password', async () => {
        render(
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'weakpassword' } });
        fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'weakpassword' } });

        axios.post.mockResolvedValue({ data: { sucess: false, errorMessage: 'Password must be at least 8 characters long and contain at least one number, one capital letter, and one special character.' } });

        fireEvent.click(screen.getByText('Register'));

        await waitFor(() => {
            expect(screen.getByText('Password must be at least 8 characters long and contain at least one number, one capital letter, and one special character.')).toBeInTheDocument();
        });
    });
});
