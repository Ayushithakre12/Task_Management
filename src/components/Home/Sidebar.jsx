import React from 'react'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';
const Sidebar = () => {
    const data = [
        {
            title: "All task",
            icon: <CgNotes />,
            link: "/",
        },
        {
            title: "Important task",
            icon: <MdLabelImportant />,
            link: "/importantTasks",
        },
        {
            title: "Completed task",
            icon: <FaCheckDouble />,
            link: "/completedTasks",
        },
        {
            title: "Incompleted task",
            icon: <TbNotebookOff />,
            link: "/incompletedTasks",
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
                    <Link
                        to={items.link}
                        key={i}
                        className='my-2 flex items-center hover:bg-gray-600 py-2 rounded transition-all duration-300'>
                        {items.icon}{items.title}
                    </Link>
                ))}
            </div>
            <div>
                <button className='bg-gray-600 w-full p-2 rounded'>Log Out</button>
            </div>
        </>
    )
}

export default Sidebar;