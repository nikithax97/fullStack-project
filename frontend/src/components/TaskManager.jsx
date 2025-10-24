import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskManager.css";

const API_URL = "http://127.0.0.1:8001/tasks";

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch all tasks
  useEffect(() => {
    axios.get(API_URL).then((res) => setTasks(res.data));
  }, []);

  // Add or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      if (editId !== null) {
        const existing = tasks.find((t) => t.id === editId);
        const updatedTask = {
          id: editId,
          title: newTask,
          completed: existing ? existing.completed : false,
        };
        await axios.put(`${API_URL}/${editId}`, updatedTask);
        setTasks(tasks.map((t) => (t.id === editId ? updatedTask : t)));
        setEditId(null);
      } else {
        const newTaskObj = { id: Date.now(), title: newTask, completed: false };
        await axios.post(API_URL, newTaskObj);
        setTasks([...tasks, newTaskObj]);
      }
      setNewTask("");
    } catch (err) {
      console.error("Error saving task:", err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setNewTask(task.title);
    setEditId(task.id);
  };

  // Toggle completed
  const toggleComplete = async (task) => {
    const updatedTask = { ...task, completed: !task.completed };
    try {
      await axios.put(`${API_URL}/${task.id}`, updatedTask);
      setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  return (
    <div className="task-manager">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">{editId ? "Update" : "Add"}</button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.completed ? "done" : ""}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task)}
            />
            <span>{task.title}</span>
            <div className="actions">
              <button onClick={() => handleEdit(task)}>✏️</button>
              <button onClick={() => handleDelete(task.id)}>🗑️</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
