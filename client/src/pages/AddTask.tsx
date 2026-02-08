import './css/Addtask.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); // to redirect after saving

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => { // TODO change Formevent
        e.preventDefault();

        // the data we're sending to the Express backend
        const newTask = { title, description };

        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(newTask),
        });

        // Go back to the main list page
        navigate('/')
    };

    return (
        <div style={{ padding: '2rem' }}>
          <h2>Add a New Task</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label><br />
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </div>
            <br />
            <div>
              <label>Description:</label><br />
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
              />
            </div>
            <br />
            <button type="submit">Save Task</button>
          </form>
        </div>
      );
};

export default AddTask;