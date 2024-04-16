import React from 'react';
import Cards from '../components/Home/Cards';

const CompletedTasks = () => {
  return (
    <div>
      <Cards home={"false"} route="completedTasks" />
    </div>
  )
}

export default CompletedTasks