import React from 'react'
import { Button, Menu, MenuItem } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import fileimg from '../assets/file.png'
import folderimg from '../assets/folder.png'
import './Todo.css'
export default function Todo({ todo, handleDelete, handleUpdate }) {
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

  const handleClose = () => {
    setContextMenu(null);
  };
  
  return (
     <div  onContextMenu={handleContextMenu} style={{  display:"inline-block",border: "none", boxShadow: "none", marginTop: "30px"}}>
            <Card style={{  display:"inline-block",border: "none", boxShadow: "none", marginTop: "30px"}} sx={{ maxWidth: 200,mx: 2, width:200  }} >
        <CardMedia
          component="img"
          width="400" 
          image={todo.type === 'file' ? fileimg : folderimg}
          alt="file"
        />
        <CardContent>
          <Typography gutterBottom variant="h8" component="div" style={{textAlign:"center"}}>
            {todo.title}
          </Typography>
        </CardContent>
      </Card>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem  onClick={() => {
          handleUpdate(todo)
        }}> <Button fullWidth  color="primary" onClick={handleClose}>
          Rename
        </Button></MenuItem>
        <MenuItem  onClick={ ()=>handleDelete(todo.id)}> <Button fullWidth  color="warning" onClick={handleClose}>
          Delete
        </Button></MenuItem>
        
      </Menu>
    </div>
  
  )
}
