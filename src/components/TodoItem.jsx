import { Delete, Info } from '@mui/icons-material'
import { Button, Checkbox, IconButton, Tooltip } from '@mui/material'
//TodoItem.jsx
const TodoItem = ({
  title,
  isCompleted,
  id,
  handleDelete,
  handleComplete,
  sortValue,
  type,
  weatherData,
}) => {
  return (
    <div
      className={`flex mt-10 p-5 items-center w-[80vw] lg:w-[30vw] justify-between h-20 bg-blue-400 rounded-md ${
        sortValue === 'High' //consider for high priority as red background
          ? 'bg-red-800'
          : sortValue === 'Medium' //consider for medium priority as yellow background
          ? 'bg-yellow-500'
          : 'bg-green-500' //consider for green background for lower priority
      }`}
    >
      <div className='flex items-center'>
        <div>
          <Checkbox
            checked={isCompleted}
            onChange={() => handleComplete(id)}
            sx={{ color: 'white' }}
          />
        </div>
        <div>
          {isCompleted ? ( //if the task is completed then title will get cancelled
            <div className=' '>
              <span
                style={{
                  color: 'white',
                  textDecoration: 'line-through',
                  textTransform: 'capitalize',
                }}
              >
                {title}
              </span>
            </div>
          ) : (
            <div className='text-white capitalize'>{title}</div>
          )}
        </div>
        <div className='ml-2 px-0.5 text-[10px] bg-white '>
          {type === 'Outdoor' ? <p>OUT</p> : <p>IN</p>}
        </div>
      </div>

      <div className='flex items-center'>
        <div>
          <Button onClick={() => handleDelete(id)}>
            <Delete sx={{ color: 'white' }} />
          </Button>
        </div>
        <div>
          {/* for only outdoor Activity if conditions are cloudy or rain if will show a tooltip will tells Ensure to check the weather before going outside */}
          {(weatherData?.current?.condition?.text.includes('cloudy') ||
            weatherData?.current?.condition?.text.includes('rain')) &&
          type === 'Outdoor' ? (
            <Tooltip title='Ensure to check the weather before going outside'>
              <IconButton>
                <Info sx={{ color: 'white' }} />
              </IconButton>
            </Tooltip>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoItem
