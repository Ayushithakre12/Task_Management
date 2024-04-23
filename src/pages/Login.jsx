import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:7240/Login', null, {
                params: {
                    username,
                    password
                },
                withCredentials: true
            });

            if (response.data.sucessMessage) {
                localStorage.setItem('username', response.data.username)
                localStorage.setItem('id',response.data.sucessMessage)

                navigate('/');
            } else {
                setErrorMessage("Username and password don't match.");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className='h-[98vh] flex items-center justify-center'>
                <div className='p-4 w-2/6 rounded bg-gray-800'>
                    <div className='text-2xl font-bold text-center'>Welcome</div>
                    <input
                        type='text'
                        placeholder='Username'
                        className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className='flex items-center justify-center py-2'>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Login
                        </button>
                    </div>
                    {errorMessage && (
                        <div className="text-red-500 text-center">{errorMessage}</div>
                    )}
                    <div className="text-sm text-white py-2">
                        <p className="font-medium inline-block text-center text-large mr-4"> Don't have an account? </p>
                        <a href="/register" className="text-indigo-400 hover:text-indigo-500 font-semibold text-large text-right"> Register  Here </a>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
