import React from 'react';
import { FcHighPriority } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from 'react';

const Cards = ({home, setInputDiv}) => {
    const data = [
        {
            id: 1, // Unique identifier
            title: "Complete Project Proposal",
            description: "Draft and finalize the project proposal document outlining project objectives, scope, deliverables, and timeline.",
            status: "Incomplete",
            priority: "high" // Added priority for demonstration
        },
        {
            id: 2, // Unique identifier
            title: "Develop Wireframes",
            description: "Create wireframes for the user interface design of the application to visualize layout and navigation.",
            status: "Completed",
            priority: "medium" // Added priority for demonstration
        },
        {
            id: 3, // Unique identifier
            title: "Implement Backend API",
            description: "Set up backend server and endpoints to handle CRUD operations for tasks and user authentication.",
            status: "Incomplete",
            priority: "low" // Added priority for demonstration
        },
    ];

    return (
        <div className='grid grid-cols-3 gap-4 p-4 hover:cursor-pointer transition-all duration-300'>
            {data && data.map((item) => ( // Removed index i
                <div key={item.id} className='flex flex-col justify-between bg-gray-800 rounded p-4'> {/* Added key={item.id} */}
                    <div>
                        <h3 className='text-xl font-semibold'>{item.title}</h3>
                        <p className='text-gray-300 my-2'>{item.description}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button
                            className={`${
                                item.status === "Incomplete" ? "bg-red-400" : "bg-green-700"
                                } p-2 rounded w-3/6`}>
                            {item.status}
                        </button>
                        <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                           
                            <button onClick={()=>setInputDiv("fixed")}>
                                <BiEdit />
                            </button>
                            <button 
                            className={`${
                                item.status === "Incomplete" ? 
                                    (item.priority === "high" ? "bg-red-400" : 
                                        (item.priority === "medium" ? "bg-yellow-400" : "bg-yellow-400")) 
                                    : "bg-green-700"
                                } p-2 rounded w-1.5/6 items-center`}>
                                <FcHighPriority />
                            </button>
                            <button>
                                <RiDeleteBin7Line />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                 <button className='flex flex-col justify-center items-center bg-gray-800 rounded p-4  text-gray-300 hover:scale-105 '
                 onClick={()=>setInputDiv("fixed")}>
                 <IoMdAddCircleOutline className='text-4xl'  />
                 <h1 className='text-2xl mt-4'>Add Task</h1>
                </button>
            )}
        </div>
    )
}

export default Cards;
