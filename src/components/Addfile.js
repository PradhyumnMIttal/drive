import React,{useState,useEffect}  from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import Typography from '@mui/material/Typography';
import { FormControl, InputLabel, MenuItem, TextField ,Select} from '@mui/material';
import { useDispatch } from 'react-redux';
import { ADD_TODO ,UPDATE_TODO} from '../store/actionType';
const initalState = {
  title: '', type: ''
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    width: 300
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2  ,align:'center'}} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function Addfile({ open, handleChange,todo }) {
  const dispatch = useDispatch();
  const [formdata, setFormdata] = useState(initalState)
  const { title, type } = formdata;
   const handleform= (e,key) => {
    // console.log(e.target.value, key);
     const {value}=e.target
     setFormdata({ ...formdata, [key]: value })
     
   }
  const handleUpdate = () => {
    dispatch({ type: UPDATE_TODO, payload: formdata })
    setFormdata(initalState);
    handleChange();
   
  }
  const handleSubmit = () => {
    dispatch({ type: ADD_TODO, payload: { ...formdata,id:Math.random() } })
    handleChange();
    setFormdata(initalState);
  }
 
  useEffect(() => {
    if (todo)
      setFormdata(todo);
  },[todo])
  return (
    <div>
      <BootstrapDialog
       
        maxWidth='md'
        onClose={handleChange}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle sx={{ m: 0, p: 2 }}  id="customized-dialog-title-bd" onClose={handleChange}>
        { todo?"Rename":"Create New"}
        </BootstrapDialogTitle>
         <form onSubmit={handleSubmit}>
        <DialogContent >
          <br></br>
        {todo?<FormControl style={{ display: "none" }}
        fullWidth required >
        <InputLabel  id="type"></InputLabel>
        <Select 
          labelId="type"
          id="type"
        value={type}
              label="Folder/File"
                onChange={(e)=>handleform(e,'type')}
        >
          <MenuItem value='folder'>Folder</MenuItem>
          <MenuItem value='file'>File</MenuItem>
        </Select>
            </FormControl>:<FormControl 
               fullWidth  required >
                
        <InputLabel id="type" >Type</InputLabel>
        <Select 
          labelId="type"
          id="type"
        value={type}
              label="Folder/File"
                onChange={(e)=>handleform(e,'type')}
        >
          <MenuItem  value='folder'>Folder</MenuItem>
          <MenuItem value='file'>File</MenuItem>
        </Select>
            </FormControl>}
    <br>
            </br>
            <br>
            </br>
           <div className='Text'>        
       <TextField fullWidth
                autoFocus
                required
              id="title"
              value={title}
          label="Name"
          onChange={(e)=>handleform(e,'title')}
        />
            </div>
        </DialogContent>
        <DialogActions>
         { todo?<Button autoFocus onClick={handleUpdate}>
            Rename
          </Button>:<Button autoFocus onClick={handleSubmit}>
           Create
          </Button>}
          </DialogActions>
           </form>
      </BootstrapDialog>
    </div>
  );
}
