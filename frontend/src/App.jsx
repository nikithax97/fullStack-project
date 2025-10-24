import React from "react";
import TaskManager from "./components/TaskManager";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      <TaskManager />
    </div>
  );
}

export default App;
