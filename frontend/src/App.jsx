import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import AiAssistant from './components/AiAssistant';
import './index.css';

const API_URL = 'http://localhost:8001/tasks';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then(res => setTasks(res.data));
  }, []);

  const addTask = (title) => {
    axios.post(API_URL, { title, completed: false }).then(res => {
      setTasks([...tasks, res.data]);
    });
  };

  const updateTask = (id, updatedTask) => {
    axios.put(`${API_URL}/${id}`, updatedTask).then(res => {
      setTasks(tasks.map(task => task.id === id ? res.data : task));
    });
  };

  const deleteTask = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setTasks(tasks.filter(task => task.id !== id));
    });
  };

  return (
    <div className="container">
      <h2>Task Manager</h2>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
      <hr />
      <AiAssistant />
    </div>
  );
}

export default App;