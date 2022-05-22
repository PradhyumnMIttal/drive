import React from 'react'
import Todo from './File'

export default function FileList({ todos, handleDelete, handleUpdate,handleCurr }) {
     const todolist = todos.map((todo, ind) => {
    return (<Todo todo={todo} key={ind} handleDelete={handleDelete} handleUpdate={handleUpdate} handleCurr={handleCurr}  ></Todo>
      )
  })
  return (
      <div>{todolist}</div>
  )
}
