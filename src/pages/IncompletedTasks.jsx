import React from 'react';
import AllTasks from './AllTasks'

const IncompletedTasks = () => {
  return (
    <div>
      <AllTasks home={"false"} isHideFilters={true} route="incompletedTasks" />
    </div>
  );
}

export default IncompletedTasks;
