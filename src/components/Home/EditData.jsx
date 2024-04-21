import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditData = ({ task, onClose, onUpdate, onAdd }) => {
    const [name, setName] = useState(task ? task.name : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : '');
    const [isComplete, setIsComplete] = useState(task ? task.iscomplete : false);
    const [collaborators, setCollaborators] = useState(task ? task.collaborators : []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (task) {
                // If task is provided, it's an update operation
                const updatedTask = {
                    ...task,
                    name,
                    description,
                    priority,
                    iscomplete: isComplete,
                    collaborators
                };
                await onUpdate(updatedTask);
                toast.success('Task updated successfully!', { autoClose: 5000 });
            } else {
                // If task is not provided, it's an add operation
                const newTask = {
                    name,
                    description,
                    priority,
                    iscomplete: isComplete,
                    collaborators
                };
                await onAdd(newTask);
                toast.success('New Task added successfully!', { autoClose: 5000 });
            }
            onClose(); // Close the modal after successful update or addition
        } catch (error) {
            console.error('Error:', error.message);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center bg-gray-900 justify-center bg-opacity-75">
            <div className="bg-gray-800 rounded shadow-md px-8 py-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-white">{task ? 'Edit Task' : 'Add Task'}</h2>
                    <button className="text-white hover:text-gray-700 focus:outline-none" onClick={onClose}>
                        <IoCloseCircleOutline size={24} />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                    />
                    <textarea
                        placeholder="Description..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                        rows="4"
                    ></textarea>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded my-3"
                    >
                        <option value="">Select Priority</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                    <select
                        multiple
                        value={collaborators}
                        onChange={(e) => setCollaborators(Array.from(e.target.selectedOptions, option => option.value))}
                        className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded my-3"
                    >
                        <option value="Ayushi">Ayushi</option>
                        <option value="xyz">xyz</option>
                        <option value="abc">abc</option>
                        <option value="root">Root</option>
                    </select>
                    <div className="flex items-center my-3">
                        <input
                            type="checkbox"
                            id="iscomplete"
                            checked={isComplete}
                            onChange={(e) => setIsComplete(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-indigo-600 rounded mr-2"
                        />
                        <label htmlFor="iscomplete" className="text-gray-300">Completed</label>
                    </div>
                    <button type="submit" className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold my-3">{task ? 'Update' : 'Add'}</button>
                </form>
            </div>
            {/* ToastContainer removed */}
        </div>
    );
};

export default EditData;
