import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Alltasks from './pages/AllTasks';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';


const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen relative'>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Alltasks />} />
            <Route path='importantTasks' element={<ImportantTasks />} />
            <Route path='completedTasks' element={<CompletedTasks />} />
            <Route path='incompletedTasks' element={<IncompletedTasks />} />
          </Route>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;