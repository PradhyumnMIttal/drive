import React,{useState} from 'react';

import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import Addfile from './components/Addfile'
import add from './assets/add_new_button.png'
import { DELETE_TODO } from './store/actionType';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileList from './components/FileList';


export default function App() {
const todos = useSelector((state) => state.todos)
  
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
  
  return (
    <div className='app'>
      <Router>
         <Routes>
          <Route path="/" 
          element={ <><FileList todos={todos} handleDelete={handleDelete} handleUpdate={handleUpdate} /></>} />
          <Route path="/folder" element={<FileList todos={todos[0].fol_contents} handleDelete={handleDelete} handleUpdate={handleUpdate}/>} />
        </Routes>
    
       <img onClick={handleChange}className="image" src={add} alt="Add file"></img>
        <Addfile open={open} handleChange={handleClose} todo={updateData}></Addfile>
        </Router>
    </div>
   
  )
}