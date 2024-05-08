import { useEffect, useState } from 'react'
import TodoItem from './TodoItem'
import {
  Autocomplete,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from '../slice/dataSlice'
import { logout } from '../slice/authSlice'

const TodoList = () => {
  const dispatch = useDispatch()
  const { data, status, error } = useSelector(state => state.data)
  const weatherData = data
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [type, setType] = useState('')
  const [sortValue, setSortValue] = useState('')
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [todoError, setTodoError] = useState('')
  const priorities = ['High', 'Medium', 'Low']
  const [filterTask, setFilterTask] = useState('all')

  //adding a todo item to the todlist
  const handleSubmit = e => {
    e.preventDefault()
    const id = Date.now()
    if (!title || !type || !sortValue) {
      setTodoError('Add all conditions')
      return
    } else {
      handleClose()
      setTodoError('')
      setTasks([...tasks, { id, title, isCompleted, type, sortValue }])

      localStorage.setItem(
        'tasks',
        JSON.stringify([...tasks, { id, title, isCompleted, type, sortValue }]), //saving tasks data in localStorage
      )
    }

    setTitle('')
    setType('')
    setSortValue('')
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
      JSON.stringify(tasks.filter(item => item.id !== id)), //updating the tasks
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
      //saving the updated task in localStorage
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
    dispatch(fetchData()) //fetch the weather data
  }, [])

  //sorting the tasks based on priority High ,medium and low priority
  const sortedTasks = tasks.sort(
    (a, b) => priorities.indexOf(a.sortValue) - priorities.indexOf(b.sortValue),
  )
  //additional tasks : filtering out finsihed task and showing it
  const finishedTask = tasks.filter(task => task.isCompleted)
  //additional tasks:filtering out unfinished tasks and showing it
  const unfinishedTask = tasks.filter(task => !task.isCompleted)
  return (
    <div
      style={{
        background:
          weatherData?.current?.condition &&
          weatherData?.current?.condition?.text.includes('cloudy') //if weather is cloudy then i have set background as linear-gradient(to right, #A2B2CB, #72839F, #475973)
            ? 'linear-gradient(to right, #A2B2CB, #72839F, #475973)'
            : weatherData?.current?.condition &&
              weatherData?.current?.condition?.text.includes('rain') //if weather is rain then i have set background as linear-gradient(to right, #817C78, #4D4E4F, #454749)
            ? 'linear-gradient(to right, #817C78, #4D4E4F, #454749)'
            : weatherData?.current?.condition &&
              weatherData?.current?.condition?.text === 'Sunny' //if weather is sunny then i have set background as linear-gradient(to right, #817C78, #4D4E4F, #454749)
            ? 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)'
            : 'linear-gradient(to right, #8AB1E2, #3F75B1, #3970AB)', //else this condition

        minHeight: '100vh',
      }}
    >
      <div>
        <Button
          sx={{
            position: 'absolute',
            top: '1%',
            left: '80%',
            color: 'white',
            bgcolor: 'black',
            padding: '10px',
            textTransform: 'none',
            fontWeight: 600,
            width: '20px',
            '&:hover': {
              backgroundColor: 'black',
            },
          }}
          onClick={() => dispatch(logout())} //logout functionality on click makes user as null
        >
          Logout
        </Button>
      </div>
      <div className={`flex flex-col justify-center items-center gap-x-10  `}>
        <div className='mt-10 font-extrabold text-white text-[30px]'>
          <p>TODO APP</p>
        </div>
        <div className='flex justify-between items-center w-[80vw] lg:w-[30vw] gap-10 mt-10'>
          <div>
            <Button
              sx={{
                background: 'black',
                color: '#fff',
                padding: '15px',
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'black',
                },
              }}
              onClick={handleOpen}
            >
              Add a Task
            </Button>
          </div>
          <div>
            <Select
              value={filterTask}
              label='Filter'
              sx={{
                backgroundColor: 'white',
                width: '10vw',
                '@media (max-width: 768px )': { width: '30vw' },
                '@media (max-width:1024px )': { width: '30vw' },
              }}
              onChange={e => setFilterTask(e.target.value)}
            >
              <MenuItem value='all'>All</MenuItem>
              <MenuItem value='finished'>Finished</MenuItem>
              <MenuItem value='in-progress'>In-Progress</MenuItem>
            </Select>
          </div>
        </div>
        <div>
          <Modal //created a modal to add tasks
            open={open}
            onClose={handleClose}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: 'white',
                width: '70vw',
                '@media (min-width: 600px)': { width: '30vw' },
                '@media (max-width: 768px )': { width: '60vw' },
                '@media (max-width:1024px )': { width: '60vw' },
              }}
            >
              <form
                onSubmit={handleSubmit}
                className='flex flex-col'
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    // on enter click creates a new task
                    handleSubmit(e)
                  }
                }}
              >
                <div className='flex flex-col items-center gap-1'>
                  <p className='text-[20px] font-bold ml-[40px]'>Task</p>
                  <div>
                    <TextField //to create title
                      type='text'
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder='Add a task'
                      label='Add a task'
                      className='bg-white rounded-md  lg:w-[20vw] md:w-[20vw] w-[50vw]'
                    />
                  </div>
                  <div>
                    <Autocomplete //to proirity the task
                      options={priorities}
                      value={sortValue}
                      onChange={(e, value) => setSortValue(value)}
                      renderInput={params => (
                        <TextField {...params} label='Priority Type' />
                      )}
                      className='bg-white rounded-md lg:w-[20vw] md:w-[20vw] w-[50vw]'
                    />
                  </div>
                  <div>
                    <Autocomplete //outdoor or indoor task
                      options={['Outdoor', 'Indoor']}
                      value={type}
                      onChange={(e, value) => setType(value)}
                      renderInput={params => (
                        <TextField {...params} label='Activity Type' />
                      )}
                      className='bg-white rounded-md lg:w-[20vw] md:w-[20vw] w-[50vw]'
                    />
                  </div>
                  <p className='text-[#cc0000] mx-3'>{todoError}</p>
                  {/* error when user adds insufficient data */}
                  <div>
                    <Button
                      type='submit'
                      style={{
                        backgroundColor: 'black',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        padding: '10px',
                        width: '20vw',
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </form>
            </Box>
          </Modal>
        </div>

        <div>
          {filterTask === 'all' && //filter tasks based on all tasks
            sortedTasks?.map(item => {
              return (
                <TodoItem
                  handleComplete={handleComplete}
                  sortValue={sortValue}
                  handleDelete={handleDelete}
                  type={type}
                  weatherData={weatherData}
                  key={item.id}
                  {...item}
                />
              )
            })}
          {filterTask === 'finished' && finishedTask.length > 0 ? ( //filter tasks based on all finished tasks
            finishedTask?.map(item => {
              return (
                <TodoItem
                  handleComplete={handleComplete}
                  sortValue={sortValue}
                  handleDelete={handleDelete}
                  type={type}
                  weatherData={weatherData}
                  key={item.id}
                  {...item}
                />
              )
            })
          ) : filterTask === 'finished' && finishedTask.length === 0 ? (
            <div>
              <p className='mt-10 text-white'>No Finished tasks are found</p>
            </div>
          ) : null}
          {filterTask === 'in-progress' && unfinishedTask.length > 0 ? (
            unfinishedTask?.map(item => {
              //filter tasks based on all unfinished tasks
              return (
                <TodoItem
                  handleComplete={handleComplete}
                  sortValue={sortValue}
                  handleDelete={handleDelete}
                  type={type}
                  weatherData={weatherData}
                  key={item.id}
                  {...item}
                />
              )
            })
          ) : filterTask === 'in-progress' && unfinishedTask.length === 0 ? (
            <div>
              <p className='mt-10 text-white'>No Un-Finished tasks are found</p>
            </div>
          ) : null}
          {sortedTasks.length === 0 && (
            <div className='flex justify-center items-center'>
              <p className='text-white mt-10'>No tasks to display</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoList
