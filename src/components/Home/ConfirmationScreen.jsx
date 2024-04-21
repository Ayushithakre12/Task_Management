import React from 'react';

const ConfirmationScreen = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="bg-gray-800 rounded-lg p-8">
                <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this task?</h2>
                <div className="flex justify-between">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-500 text-white rounded mr-4">Cancel</button>
                    <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationScreen;