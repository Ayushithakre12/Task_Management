import React, { useState } from 'react';

const DateFilter = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onFilter(startDate, endDate);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center mb-4">
        <label htmlFor="startDate" className="mr-2">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="border rounded text-black p-2"
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="endDate" className="mr-2">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          className="border  text-black rounded p-2"
        />
      </div>
      <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
        Filter
      </button>
    </form>
  );
};

export default DateFilter;
