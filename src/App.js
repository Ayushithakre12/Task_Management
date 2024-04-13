import React from 'react'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
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
          <Route exact path="/" element={<Home/>}>
            <Route index element={<Alltasks/>} />
            <Route path='/importantTasks' element={<ImportantTasks/>} />
            <Route path='/completedTasks' element={<CompletedTasks/>} />
            <Route path='/incompletedTasks' element={<IncompletedTasks/>} />
          </Route>
          
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App