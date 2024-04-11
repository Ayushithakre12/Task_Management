import React from 'react'

const Login = () => {
    return (
        <div className='h-[98vh] flex items-center justify-center'>
            <div className='p-4 w-2/6 rounded bg-gray-800'>
                <div className='text-2xl font-bold text-center'>Welcome</div>
                <input
                    type='username'
                    placeholder='ayushi12'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                    name='username'
                />
                <input
                    type='password'
                    placeholder='password'
                    className='bg-gray-700 px-3 py-2 my-3 w-full rounded'
                    name='password'
                />
                <div className='flex items-center justify-center py-2'>
                    <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
    )
}

export default Login