import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

const EditData = ({ task, onClose, onUpdate, onAdd }) => {
    const [name, setName] = useState(task ? task.name : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [priority, setPriority] = useState(task ? task.priority : '');
    const [isCompleted, setIsCompleted] = useState(task ? task.iscomplete : false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task) {
            // If task is provided, it's an update operation
            onUpdate({
                ...task,
                name,
                description,
                priority,
                iscompleted: isCompleted
            });
        } else {
            // If task is not provided, it's an add operation
            onAdd({
                name,
                description,
                priority,
                iscompleted: isCompleted
            });
        }
        onClose();
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
                    <div className="flex items-center my-3">
                        <input
                            type="checkbox"
                            id="isCompleted"
                            checked={isCompleted}
                            onChange={(e) => setIsCompleted(e.target.checked)}
                            className="form-checkbox h-5 w-5 text-indigo-600 rounded mr-2"
                        />
                        <label htmlFor="isCompleted" className="text-gray-300">Completed</label>
                    </div>
                    <button type="submit" className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold my-3">{task ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
};

export default EditData;
