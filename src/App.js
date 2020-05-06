import React, {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";


import AddList from './components/AddList'
import List from './components/List'
import Tasks from './components/Tasks'

import listSvg from  './assets/img/list.svg'
import doIt from  './assets/img/do-it.png'
import './css/reset.css';
import './css/index.min.css';
import './css/List.min.css';
import './css/AddList.min.css';
import './css/Tasks.min.css';
import './css/AddTasks.min.css';



function App() {
  const [lists, setLists] = useState(null)
  const [colors, setColors] = useState(null)
  const [activeItem, setActiveItem] = useState(null)
  let history = useHistory()

  useEffect(() => {
    fetch('https://tojustdo-api.herokuapp.com/colors').then(res => res.json()).catch(function(error){
      alert(`Database failed :(((\nTry to reload the page`)}).then(data => {
      setColors(data)
    });
    fetch('https://tojustdo-api.herokuapp.com/lists').then(res => res.json()).catch(function(error){
      alert(`Database failed :((`)}).then(data => {
      setLists(data)
      if (history.location.pathname.split('lists/')[1]){
        let newActiveItem = data.find(item=>item.id == history.location.pathname.split('/')[2])
        if(!newActiveItem){
          history.push('/')
          alert('No shuch list found! :((')
          return
        }
        setActiveItem(newActiveItem)
      }
    });
  }, []);


  useEffect(() => {
    if (lists&&history.location.pathname.split('/')[2]){
        console.log(activeItem)
        let newActiveItem = lists.find(item=>item.id == history.location.pathname.split('/')[2])
        console.log(newActiveItem)
        setActiveItem(newActiveItem)
    }
    else {
      setActiveItem({allTasks: true, id: 0})
    }
},[history.location.pathname]);

  const onAddList = (obj) =>{
    setLists([...lists, obj])
  }

  const onAddTask = ((obj, id) =>{
    setLists(
      lists.map((i) => {
        if (i.id === id){
          i.tasks = [...i.tasks, obj]
        }
        return i;
      })
    );
  })

  const onCompleteTask=(taskId, listId)=>{
    setLists(lists.map(list=>
      {
        if (list.id === listId)
        {
          list.tasks.map(task =>
            {
              if (task.id===taskId){
                task.completed=!task.completed;
              }
              return task
            }
          )
        }
      return list;
    }))
  }

  const onEditTitle = (id, newTitle) => {
    const newLists = lists.map((i) => {
      if (i.id===id){
        i.name = newTitle;
      }
      return i
    });
    setLists(newLists)
  }

  return (
      <div className="todo">
        <section  className="todo__sidebar">
          <List items= {[
            { 
              icon: <img src={listSvg} alt="list icon"/>,
              name:'All tasks',
              allTasks: true,
              active:false,
              id: 0
            }
          ]}
          activeItem={activeItem}
          onClickItem={(i) => {
            history.push(`/`);
            i.active=true}}
          isRemovable={false}/>
          {lists?(
          <List items= {lists} 
          onRemove = {(id)=>
            setLists(lists.filter(item => item.id !== id))}
          onClickItem={(i) => {
            history.push(`/lists/${i.id}`);
            i.active=true
            }}
          activeItem={activeItem}
          isRemovable/>
          ) : <div style={{padding: 10 + 'px'}}>Loading...</div>}
          <AddList onAdd={onAddList} colors={colors}/>
          <img className ="shai"src={doIt} alt="list icon"/>
        </section>
        <section className="todo__tasks">
          {lists?<Tasks 
          onEditTitle={onEditTitle} 
          lists={!activeItem.allTasks?[activeItem]:lists}
          onAddTask={onAddTask}
          onCompleteTask={onCompleteTask}
          onDeleteTask={(taskId, listId) =>{
              setLists(lists.map(list=>{
                if(list.id === listId){
                  list.tasks = list.tasks.filter(item => item.id !== taskId)
                }
                  return list;
                })
              );
            }
          }
          onUpdateTask={(taskId, listId, newText)=>{
            setLists(lists.map(list=>{
              if(list.id === listId){
                list.tasks.find(item => item.id === taskId).text = newText
              }
                return list;
              })
            );
          }
        }
          />:""}
        </section>
      </div>
  );
}

export default App;