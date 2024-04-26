import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogout = async () => {
        try {
            await axios.put('https://localhost:7240/Login');
            localStorage.removeItem('id'); 
            localStorage.removeItem('username'); 
            navigate('/login'); 
        } catch (error) {
            console.error('Error logging out:', error);
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
                <h1 className='text-xl font-semibold'>{username}</h1>
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
