import React, {useState, useEffect}  from 'react'
import axios from 'axios'
import classNames from 'classnames'

import List from './List'
import Close from '../assets/img/close.svg'

const AddList  = ({onAdd, colors}) =>{
    const [popUp, showPopUp] = useState(false);
    const [selectedColor, selectColor] = useState(1);
    const [inputValue, setInputValue] = useState("");
    const [load, setLoad] = useState(false);

    useEffect(() => {
        if (colors){
            selectColor(colors[0]["id"])
        }
    },[colors]);

    const addList  = () =>{
        if (!inputValue){
            alert("A list without a name? Excuese me mister");
            return;
        }
        setLoad(true);

        let data = {
            name:inputValue, 
            colorId: selectedColor,
            color: colors.find(color => color.id===selectedColor),
            tasks:[]
        };
        axios.post('https://tojustdo-api.herokuapp.com/lists-add', data)
        .then(function(response){
            data.id = response.data.id;
            console.log(data);
            onAdd(data);
            showPopUp(!popUp);
            setInputValue("");
            selectColor(colors[0]["id"])
        //Perform action based on response
            })
            .catch(function(error){
                alert(`Database failed:${error}`);
        //Perform action based on error
            })
        .finally(()=>{
            setLoad(false);
        })
    };

    return <div  className= 'add-list'  >  
        <List onClickAdd={() => showPopUp(!popUp)} items= {[
            {
            className: 'add-list__button',
            icon: <svg width="15" height="15" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 1V15" stroke="#eeeeee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M1 8H15" stroke="#eeeeee" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>,
            name:'Add list'
            }
        ]}
        setActive={(i)=>{}}
        isRemovable={false}/>
        {popUp && <div className="add-list__popup">
                <button onClick={()=>showPopUp(false)} className="add-list__close">
                    <i>
                       {<img src={Close} alt="CLOSE POPUP"/>  }
                    </i>
                </button>
                
                <input 
                className="field" 
                type="text" 
                maxLength = "250"
                placeholder="Task name" 
                value={inputValue}
                onChange={(event)=>setInputValue(event.target.value)}/>
                {colors?(
                <ul className="add-list__colors">
                    {
                    colors.map((i) => (<li 
                        onClick={()=>selectColor(i.id)} 
                        key={i.id} 
                        className= {classNames("add-list__circle", i.name, {'active':(i.id===selectedColor)})}>
                        </li>)) 
                    }
                </ul>) :
                <div style={{padding: 10 + 'px'}}>Loading...</div>
                }
                <button onClick={addList} className="add-list__button button">{load ? 'Working...' : 'Add list'}</button>
            </div>}
    </div> 
}

export default AddList;



