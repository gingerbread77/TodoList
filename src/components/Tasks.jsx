import React, { useEffect, useState } from 'react'
import './Tasks.css'
import add_icon from '../assets/add_icon.png'
import arrow_down from '../assets/arrow_down.png'

// obtain data from localstorage
const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

const Tasks = () => {

  const [tasks, setTasks] = useState(() => getLocalStorage('tasks'));
  const [input, setInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState(() => getLocalStorage('completedTasks'));


  // save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  // save completed tasks to localstorage
  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  }, [completedTasks])

  // add the task to list
  const addTaskToList = () => {
    if (input.trim() !== '') {
      setTasks(prevTasks => [...prevTasks,
      {
        text: input,
        isChecked: false
      }
      ]);
      // clear the input field
      setInput('');
    }
  }

  // add tasks when enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addTaskToList();

    }
  }

  // delete the task
  const deleteTask = (index, fromCompleted = false) => {
    const tasksList = fromCompleted ? completedTasks : tasks;
    const setTaskList = fromCompleted ? setCompletedTasks : setTasks;

    setTaskList(prevTasks => prevTasks.filter((_, i) => i !== index));
  }

  // add tasks to completed list
  const completeTask = (index) => {
    const task = tasks[index];
    setCompletedTasks(prevCompletedTasks => [...prevCompletedTasks, { ...task, isChecked: true }]);
    deleteTask(index);
  }

  // remove tasks from completed list
  const undoCompleted = (index) => {
    const task = completedTasks[index];
    setTasks([...tasks,
    { ...task, isChecked: false }
    ]);
    deleteTask(index, true);
  }

  const handleCheckBoxChange = (e, index, fromCompleted = false) => {
    if (e.target.checked) {
      fromCompleted ? undoCompleted(index) : completeTask(index);
    } else if (fromCompleted) {
      undoCompleted(index);
    }
  }

  return (
    <div className="tasks">
      <div className="add-task">
        <img src={add_icon} alt="add icon" />
        <input type="text" placeholder="Add a task" value={input} maxLength={60} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e)} />
      </div>
      <div className="task-list">
        {tasks.map((item, index) => (
          <div className="item" key={index}>
            <div className="left">
              <input type="checkbox" checked={item.isChecked} onChange={(e) => handleCheckBoxChange(e, index)} />
              {item.text}
            </div>
            <span className="delete" onClick={() => deleteTask(index)}>Delete</span>
          </div>
        ))}
      </div>
      {completedTasks.length > 0 && <div className="completed">
        <div className="completed-title">
          <img src={arrow_down} alt="arrow down" />
          <h3>Completed</h3>

        </div>
        <div className="completed-list">
          {completedTasks.map((item, index) => (
            <div className="item" key={index}>
              <div className="left">
                <input type="checkbox" checked={item.isChecked} onChange={(e) => handleCheckBoxChange(e, index, true)} />
                {item.text}
              </div>
              <span className="delete" onClick={(e) => deleteTask(index, true)}>Delete</span>
            </div>
          ))}
        </div>
      </div>}
    </div>
  )
}

export default Tasks