import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import './css/TaskModify.css'
  
  
  function TaskModify() {
    const [task, SetTask] = useState<any>(null);

    const { id } = useParams<{id: string}>();
  
    useEffect(() => {
      // Calling the Express API
      fetch(`http://localhost:3000/tasks/${id}`)
        .then(res => res.json())
        .then(data => SetTask(data));
    }, [id]);
  

    // --- THE GUARD ---
  if (!task) {
    return <div>Loading task details...</div>;
  }
  // -----------------
    return (
      <div>

        {/* TODO copy from addtask and continue */}
      </div>
    )
  }
  
  export default TaskModify
  