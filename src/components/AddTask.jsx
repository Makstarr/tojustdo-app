import React, {useState}  from 'react'
import axios from 'axios'

export default function AddTask({onAddTask, list}) {
    const [popUp, showPopUp] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [load, setLoad] = useState(false);
    
    const addTask = () => {
        if (!inputValue){
            alert("A task without a name? Excuese me mister");
            return;
        }
        setLoad(true);

        let data = {
            id: (Math.random()*1000),
            listId: list.id,
            text: inputValue, 
            completed: false}
        axios.post('https://tojustdo-api.herokuapp.com/tasks-add', data)
        .then(function(response){
            console.log(response);
        //Perform action based on response
            })
            .catch(()=>{
                alert('Database error :((')
            })
        .then(() => {
            onAddTask(data, list.id);
            setInputValue("");
            showPopUp(false)
        })
        .finally(()=>{
            setLoad(false);
        })
    }

    return (
        <div className="add-task">
            
           { !popUp ? (
            <div onClick={(()=>{showPopUp(true)})} className="add-task__title"> + Add new task</div>
           ) : load ? ( 
            <div className="add-task__title"> Loading... </div>
           ) : (
            <div className="add-task__popup">
                <input 
                className="field"
                type="text" 
                placeholder="Task name"
                value={inputValue}
                onChange={(event)=>setInputValue(event.target.value)}/>
                <div className="add-task__buttons">
                    <button className="button" onClick={addTask} >Submit</button>
                    <button className="button cancel-btn" onClick={()=>{showPopUp(false); setInputValue("")}}>Close</button>
                </div>
            </div>) 
            }       
        </div>
    )
}
