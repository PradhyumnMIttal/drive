import { ADD_TODO, DELETE_TODO, UPDATE_TODO,FOLDER_LIST } from "./actionType";

const initalState = {
    todos:[
    {
      id: 1, title: "Images", type: "folder", fol_contents: [
        {
          id: 13, title: "folder1", type: "folder",
          fol_contents:[]
        },
        {
          id: 14, title: "folder2", type: "folder",
          fol_contents:[] 
        }
    ]},
    {
      id:2,title: "photo.pdf", type: "file",fol_contents: [
        {
          id: 13, title: "New FOlder", type: "folder",
          fol_contents:[]
        },
        {
          id: 14, title: "New FOld2er", type: "folder",
          fol_contents:[] 
        }]
    }, {
      id:3,title: "Music", type: "folder",fol_contents: [
        {
          id: 13, title: "New FOlder", type: "folder",
          fol_contents:[]
        },
        {
          id: 14, title: "New FOld2er", type: "folder",
          fol_contents:[] 
        }]
    },{
      id: 4, title: "index.js", type: "file", fol_contents: [
        {
          id: 13, title: "New FOlder", type: "folder",
          fol_contents:[]
        },
        {
          id: 14, title: "New FOld2er", type: "folder",
          fol_contents:[] 
        }]
    }]
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
      case FOLDER_LIST:
        return state;
        
      default:
        return state;
      
    }
}