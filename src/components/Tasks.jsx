import React, { useState } from 'react'
import './Tasks.css'
import add_icon from '../assets/add_icon.png'

const Tasks = () => {

  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // add the task to list
  const addTaskToList = () => {
    if(input.trim() !== ''){
      setTasks([...tasks,input]);
    }
  }

  // add tasks when enter key is pressed
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      addTaskToList();
      // clear the input field
      setInput('');
    }
  }

  // delete the tasks
  const deleteTasks = (index) => {
    setTasks(tasks.filter(((_,i)=> i !== index)))
  }

  // add tasks to completed list
  const addTasksToCompleted = () => {

  }

  // remove tasks from the completed list
  const removeCompletedTasks = () => {

  }

  return (
    <div className="tasks">
      <div className="add-task">
        <img src={add_icon} alt="add icon" />
        <input type="text" placeholder="Add a task" value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
      </div>
      <div className="task-list">
        {tasks.map((item,index)=>(
          <div className="item" key={index}>
            <div className="left">
              <input type="checkbox" />
              {item}
            </div>
            <span id="delete" onClick={()=>deleteTasks(index)}>Delete</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks