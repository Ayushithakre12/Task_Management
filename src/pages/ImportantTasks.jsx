import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import axios from 'axios';

const ImportantTasks = () => {
  const [highPriorityTasks, setHighPriorityTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7240/Task?search=null&status=null');
        if (response.data && response.data.allTask) {
          const allTasks = response.data.allTask;
          // Filter tasks with priority "high" before setting state
          const highPriorityTasks = allTasks.filter(task => task.priority === "high");
          setHighPriorityTasks(highPriorityTasks);
          setLoading(false);
        } else {
          setError('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        setError('Error fetching tasks. Please try again later.');
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Pass the route prop to Cards component */}
      <Cards tasks={highPriorityTasks} route="importantTasks" />
    </div>
  );
}

export default ImportantTasks;
