import React from 'react';
import AllTasks from './AllTasks'

const ImportantTasks = () => {
  return (
    <div>
      <AllTasks home={"false"} isHideFilters={true} route="importantTasks" />
    </div>
  );
}

export default ImportantTasks;
