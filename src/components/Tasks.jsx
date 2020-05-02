import React from 'react'
import axios from 'axios'

import AddTask from './AddTask'
import Task from './Task'
import Edit from '../assets/img/edit.svg';
import Remove from '../assets/img/remove.svg';

function Tasks({lists, onEditTitle, onAddTask, onCompleteTask, onDeleteTask, onUpdateTask}) {
    
    const editTitle = (list) => {
        let newTitle = window.prompt('Write new list title', list.name)
        if (newTitle){
            // changing state
            onEditTitle(list.id, newTitle)
            // changing db
            let data = {id:list.id, newName:newTitle};
            axios.post('https://tojustdo-api.herokuapp.com/title-update', data)
            .then(function(response){
                console.log(response);
            //Perform action based on response
                })
            .catch(()=>{
                alert('Database error :((')
            })
        } else{
            return;
        }
    }
    const checkTask = (task) => {
        // changing state
        onCompleteTask(task.id, task.listId)
        // changing db
        let data = task;
        axios.post('https://tojustdo-api.herokuapp.com/tasks-check', data)
            .then(function(response){
                console.log(response);
            //Perform action based on response
                })
            .catch(()=>{
                alert('Database error :((')
            })
    }
    return (
        lists.map(list=>(
        <div key={list.id} className="tasks">
                <h2 className={"tasks__title " + list.color.name}>
                    {list.name}
                    <img onClick={()=>editTitle(list)} src={Edit} alt="Edit icon"/> 
                </h2>
                <ul className="tasks__items">
                {list.tasks&&list.tasks.length > 0 ? (list.tasks.map((i) => (
                    <Task 
                    key={i.id} 
                    task={i} 
                    checkTask={checkTask}
                    onDeleteTask ={onDeleteTask}
                    onUpdateTask={onUpdateTask}
                    Edit = {Edit}
                    Remove={Remove}
                    />
                    ))) :
                    <h2>No tasks</h2>} 
                </ul>
                <AddTask 
                list = {list}  
                onAddTask={onAddTask}
                />
        </div>
        ))
    )
}

export default Tasks;