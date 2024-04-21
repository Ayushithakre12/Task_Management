import React, { useState } from 'react';
import { FcHighPriority } from "react-icons/fc";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin7Line } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import TaskDetails from './TaskDetails'
import EditData from './EditData';
import ConfirmationScreen from './ConfirmationScreen';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Cards = ({ home, setInputDiv, setTasks, tasks, route, searchTerm, selectedStatus, startDate, endDate }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editTaskOpen, setEditTaskOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);  
    const navigate = useNavigate();    

    const deleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`https://localhost:7240/Task?taskId=${taskId}`);
            if (!response.data.errorMessage) {
                // If there is no error message, update state to reflect successful deletion
                setTasks([...tasks.filter(task => task.id !== taskId)]);
                toast.success('Task deleted successfully!');
                setSelectedTask(null); 
            } else {
                setError('Error deleting task.');
            }
        } catch (error) {
            console.error('Error deleting task:', error.message);
            setError('Error deleting task. Please try again later.');
        }
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await axios.post(`https://localhost:7240/Task?taskId=${updatedTask.id}`, updatedTask);
            if (response.data && response.data.sucess) {
                // Update state to reflect the updated task
                navigate(0);
                setEditTaskOpen(false);
            } else {
                setError(response.data.errorMessage && 'Error updating task.');
            }
        } catch (error) {
            console.error('Error updating task:', error.message);
            setError('Error updating task. Please try again later.');
        }
    };
    
    const handleAddTask = async (newTask) => {
        try {
            const response = await axios.post('https://localhost:7240/Task?taskId=null', newTask);
            if (response.data && response.data.sucess) {
                // Update state directly to add the new task and reflect it immediately
                setTasks([...tasks, response.data.task]);
                setEditTaskOpen(false);
            } else {
                setError('Error adding task.');
            }
        } catch (error) {
            console.error('Error adding task:', error.message);
            setError('Error adding task. Please try again later.');
        }
    };
       
    const handleEditTask = (task) => {
        setSelectedTask(task); // Set the selected task for editing
        setEditTaskOpen(true); // Open the edit form
    };
    const handleTaskClick = (task) => {
        setSelectedTask(task);
    };

    const handleCloseTaskDetails = () => {
        setSelectedTask(null);
    };
    const handleCloseEditTask = () => {
        setEditTaskOpen(false); // Close the edit form
        setSelectedTask(null); // Clear the selected task
    };
    const handleConfirmDelete = () => {
        deleteTask(selectedTask.id);
        setConfirmDelete(false);
    };

    const handleCancelDelete = () => {
        setConfirmDelete(false);
    };

    const filteredTasks = (route === "importantTasks" && tasks.filter(task => task.priority === "high")) ||
        (route === "completedTasks" && tasks.filter(task => task.iscomplete === true)) ||
        (route === "incompletedTasks" && tasks.filter(task => task.iscomplete === false)) ||
        tasks.filter(task => {
            const taskDate = task.createdDate ? new Date(task.createdDate) : null;

            // Check if the task falls within the selected date range
            const isWithinSelectedDate = (!startDate || !taskDate || taskDate.toDateString() === new Date(startDate).toDateString());
            const isEndAfterStart = (!endDate || !startDate || new Date(endDate) >= new Date(startDate));

            let isIncluded = true;

            // Filter by search term
            if (searchTerm) {
                const searchTermLower = searchTerm.toLowerCase();
                const taskNameLower = task.name.toLowerCase();
                const taskDescriptionLower = task.description ? task.description.toLowerCase() : '';

                isIncluded = taskNameLower.includes(searchTermLower) ||
                    taskDescriptionLower.includes(searchTermLower);
            }

            // Filter by selected status (if any)
            if (selectedStatus) {
                isIncluded = isIncluded && (task.iscomplete === (selectedStatus === 'completed'));
            }

            return isWithinSelectedDate && isEndAfterStart && isIncluded;
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
                <div key={task.id} className='flex flex-col justify-between bg-gray-800 rounded p-4' onClick={() => handleTaskClick(task)}>
                    <div>
                        <h3 className='text-xl font-semibold'>{task.name}</h3>
                        <p className='text-gray-300 my-2'>{task.description}</p>
                    </div>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={`${task.iscomplete ? "bg-green-700" : "bg-red-400"} p-2 rounded w-3/6`}>
                            {task.iscomplete ? "Completed" : "Incomplete"}
                        </button>
                        <div className='text-white p-2 w-3/6 text-2xl font-semibold flex justify-around'>
                           <button onClick={() => handleEditTask(task)}>
                                <BiEdit />
                            </button>
                            <button className={`${task.priority === "high" ? "bg-red-400" : (task.priority === "medium" ? "bg-yellow-400" : "bg-green-400")} p-2 rounded w-1.5/6 items-center`}>
                                <FcHighPriority />
                            </button>
                            <button onClick={() => setConfirmDelete(true)}>
                                <RiDeleteBin7Line />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {/* Render TaskDetails if a task is selected */}
            {selectedTask && <TaskDetails task={selectedTask} onClose={handleCloseTaskDetails} />}
            {editTaskOpen && (
                <EditData
                    task={selectedTask}
                    onClose={handleCloseEditTask}
                    onUpdate={handleUpdateTask}
                    onAdd={handleAddTask} // Pass the handleAddTask function to EditData
                />
            )}
             {confirmDelete && <ConfirmationScreen onCancel={handleCancelDelete} onConfirm={handleConfirmDelete} />}
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
