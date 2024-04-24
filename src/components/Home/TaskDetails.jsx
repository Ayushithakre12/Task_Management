import React from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";

const TaskDetails = ({ task, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center bg-gray-900 justify-center bg-opacity-75">
      <div className="bg-gray-800 rounded shadow-md px-8 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-white">{task.name}</h2>
          <button className="text-white hover:text-gray-700 focus:outline-none" onClick={onClose}>
            <IoCloseCircleOutline size={24} />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-white">Description: {task.description}</p>
          <div className="grid grid-cols-1 gap-2 mt-4">
            <p className="text-white">Priority: {task.priority}</p>
            <p className="text-white">Created Date: {task.createdDate}</p>
            <p className='text-white'>Collabarators: {task.collaborators ? task.collaborators.map(collaborator => collaborator.userName).join(', ') : 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
