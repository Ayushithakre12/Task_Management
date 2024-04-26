import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className=' flex min-h-screen h-screen gap-4 w-full text-wrap overflow-hidden'>
            <div className='w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between'>
                <Sidebar />
            </div>
            <div className='w-5/6 border border-gray-500 rounded-xl p-4 overflow-y-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home
