import React, { useState, useEffect } from 'react';
import Cards from '../components/Home/Cards';
import { IoMdAddCircleOutline } from "react-icons/io";
import InputData from '../components/Home/InputData';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import DateFilter from '../components/DateFilter';
import StatusFilter from '../components/StatusFilter';
import { API } from './api/axios';

const AllTasks = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let url = '/Task?search=null&status=null';
      if (selectedStatus) {
        url = `/Task?search=null&status=${selectedStatus === 'completed' ? 'true' : 'false'}`;
      }

      const response = await API.get(url);
      
      if (response.data && response.data.allTask) {
        setTasks(response.data.allTask);
      } else {
        setError('No tasks found.');        
      }
      setLoading(false);

    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      setError('Error fetching tasks. Please try again later.');
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm === '') {
      fetchData();
    } else {
      try {
        const response = await API.get(
          `/Task?search=${searchTerm}&status=null`
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

  const handleDateFilter = async (startDate, endDate) => {

    setStartDate(startDate);
    setEndDate(endDate);
    try {
      const response = await API.get(
        `/Task?status=null&year=${new Date(startDate).getFullYear()}&month=${new Date(startDate).getMonth() + 1}&day=${new Date(startDate).getDate()}&search=null`
      );

      if (response.data && response.data.allTask) {
        setTasks(response.data.allTask);
      } else {
        setTasks([]);
      }

    } catch (error) {
      console.error('Error filtering tasks by date:', error.message);
      setTasks([]);
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
        <div className='w-full flex justify-between px-4 py-2'>
          <DateFilter onFilter={handleDateFilter} />
          <StatusFilter onStatusChange={handleStatusChange} />
          <SearchBar onSearch={handleSearch} />
          <button onClick={() => setInputDiv("fixed")}>
            <IoMdAddCircleOutline className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300 ' />
          </button>
        </div>
        <Cards
          tasks={tasks}
          setTasks={setTasks}
          fetchData={fetchData}
          home={"true"}
          searchTerm={searchTerm}
          selectedStatus={selectedStatus}
          setInputDiv={setInputDiv}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
      <InputData fetchData={fetchData} InputDiv={InputDiv} setInputDiv={setInputDiv} />
    </>
  );
};

export default AllTasks;
