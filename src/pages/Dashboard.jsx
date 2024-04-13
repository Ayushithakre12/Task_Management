// Dashboard.jsx

import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold">Task Management Dashboard</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">New Task</button>
      </div>
      <div className="flex justify-between mb-6">
        <div>
          <button className="bg-gray-300 text-gray-800 hover:bg-gray-400 py-2 px-4 rounded mr-4">Total Tasks</button>
          <button className="bg-yellow-400 hover:bg-yellow-500 text-white py-2 px-4 rounded mr-4">Pending Tasks</button>
          <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded">Completed Tasks</button>
        </div>
        <div className="flex space-x-4">
          <input type="text" className="border-gray-300 border rounded px-4 py-2" placeholder="Task Status" />
          <input type="text" className="border-gray-300 border rounded px-4 py-2" placeholder="Task Date" />
          <input type="text" className="border-gray-300 border rounded px-4 py-2" placeholder="Search" />
        </div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Task Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Created Date</th>
            <th className="px-4 py-2">Expiry Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Example task rows */}
          <tr>
            <td className="border px-4 py-2">Task 1</td>
            <td className="border px-4 py-2">Description 1</td>
            <td className="border px-4 py-2">2024-04-12</td>
            <td className="border px-4 py-2">2024-04-30</td>
            <td className="border px-4 py-2">Pending</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Delete</button>
            </td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Task 2</td>
            <td className="border px-4 py-2">Description 2</td>
            <td className="border px-4 py-2">2024-04-10</td>
            <td className="border px-4 py-2">2024-04-25</td>
            <td className="border px-4 py-2">Completed</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2">Edit</button>
              <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
