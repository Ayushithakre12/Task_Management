import React, { useState } from 'react';

const StatusFilter = ({ onStatusChange }) => {   // Receive onStatusChange prop
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    onStatusChange(event.target.value); // Pass selected status to parent component
  };

  return (
    <div className="flex items-center">
      <label htmlFor="status" className="mr-2 text-base font-medium">Status:</label>
      <select
        id="status"
        value={selectedStatus}
        onChange={handleStatusChange}
        className="border rounded  px-2 py-1 bg-gray-500 w-19/20 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="incompleted">Incompleted</option>
      </select>
    </div>
  );
};

export default StatusFilter;
