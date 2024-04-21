import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { API } from "../../pages/api/axios";

const Sidebar = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await API.put('/Login');
            localStorage.removeItem('token'); // Clear token from local storage
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error logging out:', error);
            // Handle error if needed
        }
    };

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
    ];

    return (
        <>
            <div>
                <h2 className='text-xl font-semibold'>Ayushi thakre</h2>
                <h4 className='my-1 text-gray-400'>ayushithakre8@gmail.com</h4>
                <hr />
            </div>
            <div>
                {data.map((item, index) => (
                    <Link
                        to={item.link}
                        key={index}
                        className='my-2 flex items-center hover:bg-gray-600 py-2 rounded transition-all duration-300'
                    >
                        {item.icon}{item.title}
                    </Link>
                ))}
            </div>
            <div>
                <button onClick={handleLogout} className='bg-gray-600 w-full p-2 rounded'>Log Out</button>
            </div>
        </>
    );
};

export default Sidebar;
