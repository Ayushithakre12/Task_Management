import React from 'react';
import AllTasks from './AllTasks'

const CompletedTasks = () => {
  return (
    <div>
      <AllTasks home={"false"} isHideFilters={true} route="completedTasks" />
    </div>
  );
}

export default CompletedTasks;
