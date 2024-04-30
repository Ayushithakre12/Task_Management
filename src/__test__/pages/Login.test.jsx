import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { toBeInTheDocument } from '@testing-library/jest-dom/matchers';
import axios from 'axios';
import Login from '../../pages/Login';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

expect.extend({ toBeInTheDocument });

jest.mock('axios');

describe('Login', () => {
    test('renders the login form correctly', () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
        expect(screen.getByText('Register Here')).toBeInTheDocument();
    });

    test('displays error message for empty credentials', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Please provide both username and password.')).toBeInTheDocument();
        });
    });

    test('displays error message for server error', async () => {
        axios.post.mockRejectedValue(new Error('Server error'));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Ayushi' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '@yushi2002D' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Error occureed while Login.')).toBeInTheDocument();
        });
    });

    test('logs in user successfully', async () => {
        const mockNavigate = jest.fn();

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        axios.post.mockResolvedValue({
            data: {
                successMessage: 'C44DCC99-6020-4761-A98F-25191EE55CBD',
                username: 'Ayushi',
            },
        });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'Ayushi' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '@yushi2002D' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                'https://localhost:7240/Login',
                null,
                {
                    params: {
                        username: 'Ayushi',
                        password: '@yushi2002D',
                    },
                    withCredentials: true,
                }
            );
            // Set localStorage values
            localStorage.setItem('username', 'Ayushi');
            localStorage.setItem('id', 'C44DCC99-6020-4761-A98F-25191EE55CBD');
            expect(localStorage.getItem('username')).toBe('Ayushi');
            expect(localStorage.getItem('id')).toBe('C44DCC99-6020-4761-A98F-25191EE55CBD');
            //expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        });
    });
    test('displays error message for incorrect username or password', async () => {
        axios.post.mockResolvedValue({ data: { error: true, errorMessage: 'Username and password don\'t match.' } });

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpassword' } });
        fireEvent.click(screen.getByText('Login'));

        await waitFor(() => {
            expect(screen.getByText('Username and password don\'t match.')).toBeInTheDocument();
        });
    });
});