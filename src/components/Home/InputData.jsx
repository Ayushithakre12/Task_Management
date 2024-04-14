import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5"
import axios from 'axios';

const InputData = ({ InputDiv, setInputDiv }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("");
    //const [createDate, setDueDate] = useState("");
    //const [collaborator, setCollaborator] = useState("");
    const [taskId, setTaskId] = useState(""); // New state for createdBy

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:7240/Task', {
                title,
                description,
                priority,
                //collaborator,

               
            },{params:(taskId)}); 

            console.log(response.data); // Log the response from the backend
            // Optionally, you can handle the response further, e.g., show a success message to the user
        } catch (error) {
            console.error('Error adding task:', error.message);
            // Handle error, e.g., display error message to the user
        }
    };

    return (
        <>
            <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
            <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className='w-3/6 bg-gray-900 p-4 rounded'>
                    <div className='flex justify-end'>
                        <button className='text-2xl' onClick={() => setInputDiv('hidden')}>
                            <IoCloseCircleOutline />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type='text'
                            placeholder='Title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                        />
                        <input
                            type='taskId'
                            placeholder='Task Id '
                            value={taskId}
                            onChange={(e) => setTaskId(e.target.value)}
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
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-700  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded my-3"
                        >
                            <option value="">Select Priority</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        {/* <input
                            type='date'
                            value={createDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                        />                        */}
                         {/* <input
                            type='text'
                            placeholder='Collaborator'
                            value={collaborator}
                            onChange={(e) => setCollaborator(e.target.value)}
                            className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                        /> */}
                        <button type="submit" className='px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold my-3'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default InputData;
