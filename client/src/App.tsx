import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails'

function App(){

  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>My Tasks</Link>
        <Link to="/add">+ Add New Task</Link>
      </nav>

      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add" element={<AddTask />} /> 
        <Route path="/task/:id" element={<TaskDetails />} />
      </Routes>
    </Router>
  );


}

export default App;