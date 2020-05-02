import React, {useState, useEffect} from 'react'; 

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
  const [activeItem, setActiveItem] = useState({ 
    allTasks: true
   })
  useEffect(() => {
    fetch('https://tojustdoit-api.herokuapp.com/colors').then(res => res.json()).then(data => {
      setColors(data)
    });
    fetch('https://tojustdoit-api.herokuapp.com/lists').then(res => res.json()).then(data => {
      setLists(data)
    });
  }, []);
  
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
    <div className="app">
    <div className="todo">
      <section className="todo__sidebar">
        <List items= {[
          { 
            icon: <img src={listSvg} alt="list icon"/>,
            name:'All tasks',
            allTasks: true,
            active:true
           }
        ]}
        activeItem={activeItem}
        onClickItem={(i) => {
          i.active=true
          setActiveItem(i)}}
        isRemovable={false}/>
        {lists?(
        <List items= {lists} 
        onRemove = {(id)=>
          setLists(lists.filter(item => item.id !== id))}
        onClickItem={(i) => {
          i.active=true
          setActiveItem(i)}}
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
    </div>
  );
}

export default App;