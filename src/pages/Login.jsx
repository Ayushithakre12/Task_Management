import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('https://localhost:7240/Login', {
                username,
                password
            });

            // Assuming your backend returns some data upon successful login
            // For example, if it returns a token, you can store it in localStorage
            localStorage.setItem('token', response.data.token);

            // Redirect or perform any other action upon successful login
            console.log(response);
        } catch (error) {
            
            console.error(error.message);
            // Handle login error, e.g., display error message to the user
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
                    <div className="text-sm text-white py-2">
                        <a href='#' className="text-indigo-400 hover:text-indigo-500 font-semibold text-large mr-10 text-left"> Forget Password </a>
                        <p className="font-medium inline-block text-right text-large mr-10"> Don't have an account? </p>
                        <a href="#" className="text-indigo-400 hover:text-indigo-500 font-semibold text-large text-right"> Register  Here </a>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Login;
