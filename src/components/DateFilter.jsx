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
      <div className="flex items-left mb-2">
        <label htmlFor="startDate" className="mr-2">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={handleStartDateChange}
          className="border rounded  text-black px-2 py-1"
        />
      </div>
      <div className="flex items-left">
        <label htmlFor="endDate" className="mr-2">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={handleEndDateChange}
          className="border rounded  text-black px-2 py-1"
        />
      </div>
      <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded mt-2 ">
        Filter
      </button>
    </form>
  );
};

export default DateFilter;
