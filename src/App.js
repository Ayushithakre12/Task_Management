import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ImportantTasks from './pages/ImportantTasks';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import AllTasks from './pages/AllTasks';

const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen relative'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<AllTasks/>} />
            <Route path='/importantTasks' element={<ImportantTasks />} />
            <Route path='/completedTasks' element={<CompletedTasks />} />
            <Route path='/incompletedTasks' element={<IncompletedTasks />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
