import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '', // New state variable for confirm password
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            setIsSubmitting(false);
            return;
        }
    
        // Password validation
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must be at least 8 characters long and contain at least one number, one capital letter, and one special character.');
            setIsSubmitting(false);
            return;
        }
    
        try {
            const queryStringParams = new URLSearchParams({
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });
    
            const response = await axios.post(`https://localhost:7240/Login/RegisterUser?${queryStringParams.toString()}`);
    
            if (response.data.sucess) {
                console.log('Registration successful:', response.data);
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: '', // Clear confirm password field
                });
                setError(null);
    
                toast.success('Registration successful!', { autoClose: 5000 });
                setTimeout(() => {
                    navigate('/');
                }, 4000);
            } else {
                console.log('Error message in response:', response.data.errorMessage);
                setError(response.data.errorMessage || 'Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error registering user:', error.response.data);
            setError('Error registering user. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className='p-4 w-2/6 rounded bg-gray-800'>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create an account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='username'
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='email'
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input
                                    type='password'
                                    placeholder='Confirm Password'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Register'}
                            </button>
                        </div>
                    </form>
                    <div className="text-sm text-center">
                        <p className="font-medium text-white">Already have an account? <a href="/" className="text-indigo-600 hover:text-indigo-500">Log in here</a></p>
                    </div>
                    {error && <div className="text-red-500 mt-4">{error}</div>}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Register;
