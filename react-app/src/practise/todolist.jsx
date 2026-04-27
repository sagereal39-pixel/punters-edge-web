import React, { useState } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState([]);

  function inputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask.trim() !== '') {
      setTasks((t) => [...t, newTask]);
      setNewTask('');
    }
  }

  function deleteTask(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function moveTaskUp(index) {
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [
        updatedTasks[index - 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [
        updatedTasks[index + 1],
        updatedTasks[index],
      ];
      setTasks(updatedTasks);
    }
  }

  return (
    <div className='to-do-lis'>
      <h1>TO-DO-LIST</h1>

      <div>
        <input
          type='text'
          placeholder='Enter A Task...'
          value={newTask}
          onChange={inputChange}
        />

        <button className='add-button' onClick={addTask}>
          Add Task
        </button>
      </div>

      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            <span className='text'>{task}</span>
            <button className='delete' onClick={() => deleteTask(index)}>
              Delete
            </button>
            <button className='move-up' onClick={() => moveTaskUp(index)}>
              Move Up 🔼
            </button>
            <button className='move-up' onClick={() => moveTaskDown(index)}>
              Move Down 🔽
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
