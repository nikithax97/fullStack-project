import React, { useState } from 'react';

function TaskList({ tasks, updateTask, deleteTask }) {
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const handleEdit = (task) => {
    setEditId(task.id);
    setEditTitle(task.title);
  };

  const handleSave = (task) => {
    updateTask(task.id, { title: editTitle, completed: task.completed });
    setEditId(null);
    setEditTitle('');
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className="task">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() =>
              updateTask(task.id, {
                title: task.title,
                completed: !task.completed,
              })
            }
          />
          {editId === task.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button onClick={() => handleSave(task)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <span className={task.completed ? 'completed' : ''}>{task.title}</span>
              <button onClick={() => handleEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;