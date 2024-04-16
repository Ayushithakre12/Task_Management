import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import DateFilter from '../components/DateFilter';
import StatusFilter from '../components/StatusFilter';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'https://localhost:7240/Task?search=null&status=null';
        if (selectedStatus) {
          url = `https://localhost:7240/Task?search=null&status=${selectedStatus === 'completed' ? 'true' : 'false'}`;
        }
        const response = await axios.get(url);
        if (response.data && response.data.allTask) {
          setTasks(response.data.allTask);
          setLoading(false);
        } else {
          setError('No tasks found.');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error.message);
        setError('Error fetching tasks. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function if needed
    };
  }, [selectedStatus]);

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === '') { 
      setTasks(tasks); 
    } else {
      try {
        const response = await axios.get(
          `https://localhost:7240/Task?search=${searchTerm}&status=null`
        );
        if (response.data && response.data.allTask) {
          setTasks(response.data.allTask);
        } else {
          setTasks([]); 
        }
      } catch (error) {
        console.error('Error searching tasks:', error.message);
        setTasks([]); 
      }
    }
  };
  const handleStatusChange = (newSelectedStatus) => {
    setSelectedStatus(newSelectedStatus);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div>
        <div className='w-full flex justify-center'>
          <DateFilter/>
          <StatusFilter onStatusChange={handleStatusChange}/>
          <SearchBar onSearch={handleSearch} />
        </div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button onClick={() => setInputDiv("fixed")}>
            <IoMdAddCircleOutline className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300 ' />
          </button>
        </div>
        <Cards tasks={tasks} home={"true"} searchTerm={searchTerm} selectedStatus={selectedStatus} setInputDiv={setInputDiv}  /> 
      </div>
      <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} />
    </>
  );
};

export default AllTasks;