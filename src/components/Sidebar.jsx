import React from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
const Sidebar = () => {
    const data = [
        {
            title : "All task",
            icon: <CgNotes />,
        },
        {
            title : "Important task",
            icon: <MdLabelImportant />,
        },
        {
            title : "Completed task",
            icon: <FaCheckDouble />,
        },
        {
            title : "Incompleted task",
            icon: <TbNotebookOff />,
        },
    ]
    return (
    <>
            <div>
                <h2 className='text-xl font-semibold'>Ayushi thakre</h2>
                <h4 className='my-1 text-gray-400'>ayushithakre8@gmail.com</h4>
                <hr />
            </div>
            <div>
                {data.map((items, i) => (
                    <div className='my-2 flex items-center'>{items.icon}{items.title}</div>
                ))}
            </div>
            <div>
                <button className='bg-gray-600 w-full p-2 rounded'>Log Out</button>
            </div>
        </>
    )
}

export default Sidebar;