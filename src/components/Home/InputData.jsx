import React, { useState, useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';

const InputData = ({ InputDiv, fetchData, setInputDiv }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    const [collaborators, setCollaborators] = useState([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    useEffect(() => {
        fetchCollaborators();
    }, []);

    const fetchCollaborators = async () => {
        try {
            const response = await axios.get('https://localhost:7240/Task/RetriveAllUser', { withCredentials: true });
            if (response.data && response.data.allUser) {
                setCollaborators(response.data.allUser);
            }
        } catch (error) {
            console.error('Error fetching collaborators:', error.message);
        }
    };


    const resetForm = () => {
        setName("");
        setDescription("");
        setPriority("");
        setSelectedCollaborators([]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('https://localhost:7240/Task?taskId=null', {
                name,
                description,
                priority,
                collaborators: selectedCollaborators,
            },
                { withCredentials: true }
            );

            // Set submit success state to true
            setSubmitSuccess(true);

            // Close the page after submission
            setInputDiv('hidden');

            fetchData();

            // Reset form fields
            resetForm();

            // Hide success message after 3 seconds
            setTimeout(() => {
                setSubmitSuccess(false);
            }, 2000);
        } catch (error) {
            console.error('Error adding task:', error.message);
            // Handle error, e.g., display error message to the user
        }
    };

    return (
        <>
            {/* Pop-up message */}
            {submitSuccess && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-green-600 p-6 rounded shadow-lg">
                        <p className="text-lg text-center text-white">Task submitted successfully!</p>
                    </div>
                </div>
            )}

            {/* Input form */}
            <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
            <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-3/6 bg-gray-900 p-4 rounded'>
                    <div className='flex justify-between items-center'>
                        <h2 className="text-xl font-semibold text-white">Add Task</h2>
                        <button className='text-2xl' onClick={() => setInputDiv('hidden')}>
                            <IoCloseCircleOutline />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Title'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                        />
                        <textarea
                            placeholder='Description...'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                            rows="4"
                        ></textarea>
                        <select
                            placeholder='Select Priority'
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-700  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded my-3"
                        >
                            <option value="">Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        <div className="my-3">
                            <label htmlFor="collaborators" className="block text-sm font-medium text-gray-300">Select Collaborators:</label>
                            <select
                                multiple
                                value={selectedCollaborators}
                                onChange={(e) => setSelectedCollaborators(Array.from(e.target.selectedOptions, option => option.value))}
                                className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded my-3"
                            >
                                {collaborators.map(collaborator => (
                                    <option key={collaborator.id} value={collaborator.id}>{collaborator.name}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold my-3'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InputData;
