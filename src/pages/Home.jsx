import React from 'react'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Sidebar from '../components/Sidebar'


const Home = () => {
    return (
        <div className='flex h-[98vh] gap-4'>
            <div className='w-1/6 border border-gray-500 rounded-xl p-4 flex flex-col justify-between bg-purple-700'>
                <Sidebar />
            </div>
            <div className='w-5/6 border border-gray-500 rounded-xl p-4'>hello2</div>
        </div>
    )
}

export default Home