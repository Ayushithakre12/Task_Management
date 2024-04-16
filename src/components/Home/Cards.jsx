import React, { useState, useEffect } from 'react';
import { FcHighPriority } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import axios from 'axios';

const Cards = ({ home, setInputDiv, route, searchTerm, selectedStatus }) => {
    const [allTask, setAllTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost:7240/Task?search=null&status=null');
                if (response.data && response.data.allTask) {
                    setAllTasks(response.data.allTask);
                    setLoading(false);
                } else {
                    setError('No tasks found.');
                }
            } catch (error) {
                console.error('Error fetching tasks:', error.message);
                setError('Error fetching tasks. Please try again later.');
            }
        };

        fetchData();

        return () => {
            // Cleanup function if needed
        };
    }, []);

    const deleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`https://localhost:7240/Task?taskId=${taskId}`);
            if (!response.data.errorMessage) {
                // If there is no error message, update state to reflect successful deletion
                setAllTasks(allTask.filter(task => task.id !== taskId));
            } else {
                setError('Error deleting task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
            setError('Error deleting task. Please try again later.');
        }
    };

    const filteredTasks = (route === "importantTasks" && allTask.filter(task => task.priority === "high")) ||
        (route === "completedTasks" && allTask.filter(task => task.iscomplete === true)) ||
        (route === "incompletedTasks" && allTask.filter(task => task.iscomplete === false)) ||
        allTask.filter(task => {
            const searchTermLower = searchTerm.toLowerCase();
            const taskNameLower = task.name.toLowerCase();
            const taskDescriptionLower = task.description ? task.description.toLowerCase() : '';

            let isIncluded = taskNameLower.includes(searchTermLower) ||
                taskDescriptionLower.includes(searchTermLower);

            // Filter by selected status (if any)
            if (selectedStatus) {
                isIncluded = isIncluded && (task.iscomplete === (selectedStatus === 'completed'));
            }

            return isIncluded;
        });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='grid grid-cols-3 gap-4 p-4 hover:cursor-pointer transition-all duration-300'>
            {filteredTasks.map((task) => (
                <div key={task.id} className='flex flex-col justify-between bg-gray-800 rounded p-4'>
                    <div>
                        <h3 className='text-xl font-semibold'>{task.name}</h3>
                        <p className='text-gray-300 my-2'>{task.description}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={`${task.iscomplete ? "bg-green-700" : "bg-red-400"} p-2 rounded w-3/6`}>
                            {task.iscomplete ? "Completed" : "Incomplete"}
                        </button>
                        <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                            <button onClick={() => setInputDiv("fixed")}>
                                <BiEdit />
                            </button>
                            <button className={`${task.priority === "high" ? "bg-red-400" : (task.priority === "medium" ? "bg-yellow-400" : "bg-green-400")} p-2 rounded w-1.5/6 items-center`}>
                                <FcHighPriority />
                            </button>
                            <button onClick={() => deleteTask(task.id)}>
                                <RiDeleteBin7Line />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && (
                <button className='flex flex-col justify-center items-center bg-gray-800 rounded p-4 text-gray-300 hover:scale-105' onClick={() => setInputDiv("fixed")}>
                    <IoMdAddCircleOutline className='text-4xl' />
                    <h1 className='text-2xl mt-4'>Add Task</h1>
                </button>
            )}
        </div>
    );
};

export default Cards;
