import React from 'react'
import classNames from 'classnames'
import axios from 'axios'

import removeBtn from '../assets/img/remove.svg'

const List = ({items, isRemovable, onClickAdd, onClickItem, onRemove, activeItem, setActive}) =>{

    const removeList = (i) => {
        if (window.confirm('Are you sure you wanna delete this whole list?')){
            let data = {id:i.id}
            onRemove(i.id)
            axios.post('https://tojustdo-api.herokuapp.com/lists-delete', data)
            .then(function(response){
                console.log(response);
            //Perform action based on response
                })
            .catch(()=>{
                alert('Database error :((')
            });
        }
    }
    
    return (
        <ul onClick={onClickAdd} className="todo__list" >
            {  
                items?(items.map((i, index) => ( 
                <li 
                key={index} 
                className={classNames(i.className, {'active': activeItem&&(activeItem.id===i.id)} )}
                onClick={()=>onClickItem?onClickItem(i):"none"} 
                >
                {i.icon ?  <div className='i'>{i.icon}</div> : <div className={classNames('circle', i.color.name, 'i')}>{
                i.tasks?(i.tasks.length>0?i.tasks.length:""):""
                }</div>
                }
                <span>{
                i.name
                }</span>
                {isRemovable ? <button className="list__remove-icon"  onClick={()=>removeList(i)}>  
                                <img src={removeBtn} alt="Remove the list button"/>
                               </button> :""} 
                </li>
                ))):""
            }
        </ul> 
    );
};

export default List;