// Register.jsx

import React from 'react';

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className='p-4 w-2/6 rounded bg-gray-800'>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Create an account</h2>
                    </div>
                    <form className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input
                                    type='username'
                                    placeholder='username'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='username'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    type='email'
                                    placeholder='email'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='xyz@abc.com'
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input
                                    type='password'
                                    placeholder='password'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='password'
                                />
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                <input
                                    type='confirm password'
                                    placeholder='confirm password'
                                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                                    name='confirm password'
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="text-sm text-center">
                        <p className="font-medium text-white">Already have an account? <a href="#" className="text-indigo-600 hover:text-indigo-500">Log in here</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
