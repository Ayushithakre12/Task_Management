import React from 'react'
import Cards from '../components/Home/Cards'

const IncompletedTasks = () => {  
  return (
    <div>
      <Cards home={"false"} route="incompletedTasks"/>
    </div>
  )
}

export default IncompletedTasks