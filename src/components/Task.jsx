import React, {useState} from 'react'
import classNames from 'classnames'
import axios from 'axios'

export default function Task({task, checkTask, onDeleteTask, onUpdateTask, Remove}) {

    const [taskText, setTaskText] = useState(task.text)
    const [taskIsUpdated, updateTaskNow] = useState(true)

    const updateTask =  (taskId, listId) => {
        onUpdateTask(taskId, listId, taskText)

        let data = {id:taskId, newText:taskText};

        axios.post('https://tojustdo-api.herokuapp.com/tasks-update', data)
        .then(function(response){
            console.log(response);
        //Perform action based on response
            })
            .catch(()=>{
                alert('Database error :((')
            }).finally(()=>{
            updateTaskNow(true)
        })
        
    }

    const updateText = (event) =>{
        setTaskText(event.target.value)
        updateTaskNow(false)
    }
    
    const deleteTask = (taskId, listId) => {
        onDeleteTask(taskId, listId)
        let data = {id:taskId};
        fetch('/tasks-delete',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;'
            },
            body: JSON.stringify(data)})
            .catch(()=>{
                alert('Database error :((')
            })
    }
    return (
        <li key={task.id} className="tasks__item">
            <div className="checkbox">
                <input 
                id={"check-"+ task.id} 
                type="checkbox" 
                checked={task.completed}
                onChange={()=>checkTask(task)}
                />
                <label 
                htmlFor={"check-"+task.id} 
                >
                    <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="white" 
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </label>
            </div> 
            <textarea className={classNames("tasks__item-text", {'line-through':task.completed})} type="text" value={taskText} 
            onChange={event=>updateText(event)}></textarea>
            <div className="tasks__item-buttons">
                <div className="tasks__item-submit">
                    <input 
                    className="tasks__item-saveChange-check"
                    id={"submit-"+ task.id} 
                    type="checkbox" 
                    checked={taskIsUpdated}
                    onChange={()=>updateTask(task.id, task.listId)}
                    />
                    <label 
                    className="tasks__item-saveChange"
                    htmlFor={"submit-"+task.id} 
                    >
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"
                            viewBox="0 0 49 49"  fill="#fff">
                        <g>
                            <rect x="27.5" y="5" width="6" height="10"/>
                            <path d="M39.914,0H0.5v49h48V8.586L39.914,0z M10.5,2h26v16h-26V2z M39.5,47h-31V26h31V47z"/>
                            <path d="M13.5,32h7c0.553,0,1-0.447,1-1s-0.447-1-1-1h-7c-0.553,0-1,0.447-1,1S12.947,32,13.5,32z"/>
                            <path d="M13.5,36h10c0.553,0,1-0.447,1-1s-0.447-1-1-1h-10c-0.553,0-1,0.447-1,1S12.947,36,13.5,36z"/>
                            <path d="M26.5,36c0.27,0,0.52-0.11,0.71-0.29c0.18-0.19,0.29-0.45,0.29-0.71s-0.11-0.521-0.29-0.71c-0.37-0.37-1.04-0.37-1.41,0
                                c-0.19,0.189-0.3,0.439-0.3,0.71c0,0.27,0.109,0.52,0.29,0.71C25.979,35.89,26.229,36,26.5,36z"/>
                        </g>
                        </svg>
                    </label>
                </div>
                <img className="tasks__item-delete"onClick={()=>deleteTask(task.id, task.listId)} src={Remove} alt="Remove icon"/> 
            </div>
        </li> 
    )
}
