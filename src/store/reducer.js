import { ADD_TODO, DELETE_TODO, UPDATE_TODO } from "./actionType";

const initalState = {
    todos:[
    {id:10,title: "Lets walk",type: "folder"},
    {
      id:20,title: "Lets talk", type: "file"
    }, {
      id:30,title: "Lets chat", type: "folder"
    },{id:40,title: "Lets Play",type: "file"}]
}
export const reducer = (state=initalState, action) => {
    const { type, payload } = action;
    switch (type)
    {
        case ADD_TODO :
        return { todos: [...state.todos, payload] };
      case DELETE_TODO:
        return { todos: state.todos.filter(todo => todo.id !== payload) };
      case UPDATE_TODO: 
        return {
          todos: state.todos.map(todo => {
            if (todo.id === payload.id) {
              return payload;
            }
            else
              return todo;
          })
      }
      default:
        return state;
      
    }
}