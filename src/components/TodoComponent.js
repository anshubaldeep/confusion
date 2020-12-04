import React, { useState } from 'react';
import { Button } from 'reactstrap';
//import classes from '*.module.css';


const Todo=(props)=>{
    const [taskDone,setTaskDone]=useState(true);
    const clickHandler=()=>{
        setTaskDone(!taskDone);
    }
    const todos=taskDone?<p style={{color:'black'}}>{props.todo}-------------------&gt;</p>:<strike style={{color:'red'}}><p style={{color:'red'}}>{props.todo}-------------------&gt;</p></strike>
        return(
            <div  id={props.id} className='row mt-2 mb-2'>
                <div className='col-6' onClick={clickHandler}>
                {todos}
                </div>
                <Button color='danger' onClick={props.deleteTask}>Completed</Button>
            </div>
        );
}

export default Todo;