import { useState, useEffect } from 'react'
import './App.css'
import { Button, Stack, Box, TextField, List, ListItem, ListItemText, ListItemButton  } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import axios from 'axios';


function App() {

  // let serverURL = 'http://localhost:3001';
  let serverURL = process.env.SERVER_URL;

  const [todoId, setTodoId] = useState(0);
  const hideId = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);

  const [todoList, setTodoList] = useState([]);

  const getTodoList = () => {
    axios.get(serverURL + '/api/todo/view')
    .then((res) => setTodoList(res.data))
    .catch((err) => console.log(err))
  }

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(serverURL + '/api/todo/add', {
      title,
      date
    })
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err))
  }

  const handleDelete = (e) => {
    e.preventDefault();
    axios.delete(serverURL + `/api/todo/delete/${id}`)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err))
  }

  const handleTransfer = (_id) => {
    axios.get(serverURL + `/api/todo/view/${_id}`)
    .then((res) => {
      console.log(res);
      window.location.reload();
    })
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getTodoList();
  }, [])

  return (
    <Box className='main-container'>
      <Box className='form-div'>
        <Stack className='header-title'>
          <h1>Todo List</h1>
        </Stack>
        <form onSubmit={handleSubmit} action="">
          <Stack sx={{gap: 2, border: "1px solid grey", padding: 2, width: 480}}>
            <TextField sx={{display: 'none'}} value={todoId} onChange={(e) => setTodoId(e.target.value)} id="todoId-id" label="Id" variant="outlined" />
            <TextField value={title} onChange={(e) => setTitle(e.target.value)} id="title-id" label="Title" variant="outlined" />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker value={date} onChange={(selectedDate) => setDate(formatDate(selectedDate))} label="Date" />
            </LocalizationProvider>

            <Button type="submit" variant='contained'>Add</Button>
          </Stack>
        </form>
      </Box>
      <Box sx={{ width: '100%', bgcolor: 'background.paper', border: "1px solid grey", marginTop: 2 }}>
        <List>
          {todoList.map((todo, key) => {
            return (
              <ListItem key={key}>
                <ListItemText hidden primary={todo.id} />
                <ListItemText primary={formatDate(todo.date) + " - " + todo.title} />
                <div style={{display: 'flex', gap: '5px'}}>
                  <Button onClick={() => handleTransfer(todo.id)} id='edit-button' color='success' variant='contained'>Edit</Button>
                  <Button onClick={handleDelete} id='delete-button' color='error' variant='contained'>Delete</Button>
                </div>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </Box>
  )
}

export default App
