import React, { useState } from 'react';
import { Button, Form, FormGroup, Input, Col} from 'reactstrap';
import Todo from './TodoComponent.js';
const TodoList=()=>{
        const [todo,setTodo]=useState('');
        const [todos,setTodos]=useState([]);
        const handleChange=(event)=>{
            setTodo(event.target.value)
        }
        const handleSubmit=(event)=>{ 
            if(todo!==''){
                setTodos([...todos,todo])
            }
            else{
                alert('Value cannot be empty');
            }
            //console.log(todos);
            event.preventDefault();
            setTodo('');
        }

        const handleDelete=(key)=>{
                const updatedTodos=todos.filter((item,index) => index !== key);
                console.log(updatedTodos)
                setTodos(updatedTodos);
        }
        
        const Todos=todos.map((todo,index)=><Todo id={index} deleteTask={()=>handleDelete(index)}  todo={todo}/>)
        return(
            <div className='container mt-5'>
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                    <Col md={8}>
                    <Input type='text' id='todo' placeholder='Add task here' onChange={(event)=>handleChange(event)} value={todo}></Input>
                    </Col>
                    <Button color='success'>Submit</Button>
                    </FormGroup>
                </Form>
                {Todos}
            </div>
        );
}

export default TodoList;