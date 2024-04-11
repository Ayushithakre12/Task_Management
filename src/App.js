import React from 'react'
import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
  return (
    <div className='bg-gray-900 text-white h-screen p-2'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route path="/Login" element={Login}></Route>
        </Routes>
      </Router>
      
    </div>
  )
}

export default App