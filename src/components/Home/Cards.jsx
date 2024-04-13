import React from 'react'
import { FcHighPriority } from "react-icons/fc"
import { BiEdit } from "react-icons/bi"
import { RiDeleteBin7Line } from "react-icons/ri"
import { IoMdAddCircleOutline } from "react-icons/io"
import { useState } from 'react'

const Cards = ({home, setInputDiv}) => {
    const data = [
        {
            title: "Complete Project Proposal",
            description: "Draft and finalize the project proposal document outlining project objectives, scope, deliverables, and timeline.",
            status: "Incomplete",
        },
        {
            title: "Develop Wireframes",
            description: "Create wireframes for the user interface design of the application to visualize layout and navigation.",
            status: "Completed",
        },
        {
            title: "Implement Backend API",
            description: "Set up backend server and endpoints to handle CRUD operations for tasks and user authentication.",
            status: "Incomplete",
        },
    ]
    //const [ImportantButton, setImportantButton] = useState("Incomplete")
    return (
        <div className='grid grid-cols-3 gap-4 p-4 hover:cursor-pointer transition-all duration-300'>
            {data && data.map((items, i) => (
                <div className='flex flex-col justify-between bg-gray-800 rounded p-4'>
                    <div>
                        <h3 className='text-xl font-semibold'>{items.title}</h3>
                        <p className='text-gray-300 my-2'>{items.description}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button
                            className={`${
                                items.status === "Incomplete" ? "bg-red-400" : "bg-green-700"
                                } p-2 rounded w-3/6`}>
                            {items.status}
                        </button>
                        <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                            <button>
                                <FcHighPriority />
                            </button>
                            <button>
                                <BiEdit />
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

export default Cards