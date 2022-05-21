import React,{useState} from 'react';
import Todo from './components/Todo';
import './App.css';

import { useDispatch, useSelector } from 'react-redux';
import Addfile from './components/Addfile'
import add from './assets/add_new_button.png'
import { Button } from '@mui/material';
import { DELETE_TODO } from './store/actionType';

export default function App() {
   const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent contextmenu from the backdrop to re-locale existing context menus.
          null,
    );
  };

  const handleClosed = () => {
    setContextMenu(null);
  };
  const dispatch = useDispatch();
   const handleDelete = ((id) => {
     dispatch({ type: DELETE_TODO, payload: id });
    
  })
  const [open, setOpen] = useState(false);
  const handleChange = () => {
    setOpen((preOpen)=>!preOpen)
  }
  const handleClose = () => {
    setOpen(false);
    setUpdateData(null);

  }
  const [updateData, setUpdateData] = useState(null);
  const handleUpdate = ((todo) => {
    console.log(todo);
    setUpdateData(todo);
    handleChange();
   
  })
  const todos = useSelector((state) => state.todos)
  const todolist = todos.map((todo, ind) => {
    return (<Todo todo={todo} key={ind} handleDelete={handleDelete} handleUpdate={handleUpdate} handleClosed={handleClosed} handleContextMenu={handleContextMenu} contextMenu={contextMenu}></Todo>
      )
  })
  return (
    <div className='app'>
    
      {todolist}
      <Button style={{ height:"3050",maxWidth:"100" }}   onClick={handleChange}>
       <img className="image" src={add} alt="Add file"></img>
      </Button>
      <Addfile open={open} handleChange={handleClose} todo={updateData}></Addfile>
      
            </div>
  )
}