import React, { useState } from 'react';
import './app.css';

function TodoList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');

  const addTask = () => {
  setTasks([...tasks, { text: task, completed: false }]);
  setTask('');
     };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEditedTask = () => {
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex].text = editedTask;
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask('');
  };

  const deleting = (indexToDelete) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_,index) => index !== indexToDelete));
    }
  };

  const toggleCheckbox = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <div style={{ textAlign: 'center' }}>
        <h2 >To-Do List </h2>  
           <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: '10px', width: '200px' }}
        />
        <button onClick={addTask} style={{marginLeft: '40px'}}>+</button>

        <ol style={{ marginTop: '30px',paddingLeft: 0 }}>
          {tasks.map((item, index) => (
            <li key={index} style={{ marginBottom: '15px' }}>
             
              {editingIndex === index ? (
                <>
                  <input
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                    style={{ padding: '5px', width: '150px' }}
                  />
                  <button onClick={saveEditedTask} style={{ marginLeft: '10px' }}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
                    {item.text} 
                  </span>
                  <button onClick={() => startEditing(index)} style={{ marginLeft: '10px' }}>
                    Edit
                  </button>
                  <button onClick={() => deleting(index)} style={{ marginLeft: '10px' }}>
                    Delete
                  </button>
                  <button onClick={() => toggleCheckbox(index)} style={{ marginLeft: '10px' }}>
                    Mark as done/undone
                  </button>
                  <hr></hr>
                </>
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default TodoList;
