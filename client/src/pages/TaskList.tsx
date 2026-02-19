import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './css/TaskList.css'

interface Task{
  id: number;
  title: string;
}


function App() {
  const [tasks, SetTasks] = useState<Task[]>([]);

  useEffect(() => {
    // Calling the Express API
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => SetTasks(data));
  }, []);

  return (
    <div>
      <h1>My Tasks</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}><Link to={`/task/${task.id}`}>{task.title}</Link></li>
        //   <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
