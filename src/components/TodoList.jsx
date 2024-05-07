import { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
// import { useDispatch, useSelector } from 'react-redux'
// import { fetchData } from '../slice/dataSlice'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../slice/dataSlice'

const TodoList = () => {
  const dispatch = useDispatch()
  const { data, status, error } = useSelector(state => state.data)
  console.log(data)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [type, setType] = useState('')
  const [sortValue, setSortValue] = useState('')

  //adding a todo item to the todlist
  const handleSubmit = e => {
    e.preventDefault()
    const id = Date.now()
    setTasks([...tasks, { id, title, isCompleted, type, sortValue }])
    console.log(tasks)
    localStorage.setItem(
      'tasks',
      JSON.stringify([...tasks, { id, title, isCompleted, type, sortValue }]),
    )
    setTitle('')
    setType('')
  }
  //fetching saved todo item from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])
  //deleting a todo item from the todolist
  const handleDelete = id => {
    setTasks(tasks.filter(item => item.id !== id))
    localStorage.removeItem(
      'tasks',
      JSON.stringify(tasks.filter(item => item.id !== id)),
    )
  }
  //updating thw todo item where its completed or not
  const handleComplete = id => {
    setTasks(
      tasks.map(task => {
        if (task.id === id) {
          return { ...task, isCompleted: !task.isCompleted }
        } else {
          return task
        }
      }),
    )
    localStorage.setItem(
      'tasks',
      JSON.stringify(
        tasks.map(task => {
          if (task.id === id) {
            return { ...task, isCompleted: !task.isCompleted }
          } else {
            return task
          }
        }),
      ),
    )
  }
  useEffect(() => {
    dispatch(fetchData())
  }, [])
  const sortTasks = (tasks, sortValue) => {
    const sortedTasks = [...tasks] // Create a copy of the tasks array

    if (sortValue === 'High') {
      return sortedTasks.sort((a, b) => {
        if (a.title < b.title) return 1
        if (a.title > b.title) return -1
        return 0
      })
    } else if (sortValue === 'Low') {
      return sortedTasks.sort((a, b) => {
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      })
    } else if (sortValue === 'Medium') {
      return sortedTasks.sort((a, b) => a.title.localeCompare(b.title))
    } else {
      return sortedTasks // Return the original tasks array if sortValue is not valid
    }
  }
  const sortedTasks = sortTasks(tasks, sortValue)
  return (
    <div className='flex flex-col items-center gap-x-10 '>
      <div>Todo List</div>
      <form onSubmit={handleSubmit}>
        <TextField
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <Autocomplete
          id=''
          freeSolo
          options={['High', 'Medium', 'Low']}
          value={sortValue}
          onChange={(e, value) => setSortValue(value)}
          renderInput={params => <TextField {...params} label='Sort' />}
        />
        <Autocomplete
          id=''
          freeSolo
          options={['Outdoor', 'Indoor']}
          value={type}
          onChange={(e, value) => setType(value)}
          renderInput={params => <TextField {...params} label='Type' />}
        />
        <Button
          className='p-5'
          primary
          type='submit'
          disabled={title.length === 0}
        >
          Add
        </Button>
      </form>
      <div>
        {sortedTasks?.map(item => {
          return (
            <TodoItem
              handleComplete={handleComplete}
              sortValue={sortValue}
              handleDelete={handleDelete}
              key={item.id}
              {...item}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TodoList
