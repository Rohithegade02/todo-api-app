import { Delete } from "@mui/icons-material"
import { Button, Checkbox, Typography } from "@mui/material"


const TodoItem = ({ title, isCompleted, id, handleDelete, handleComplete,sortValue }) => {
console.log(sortValue)
    return (
        <div className={`flex mt-10 p-5 items-center justify-between h-20 bg-blue-400 rounded-md ${sortValue==="High" ? 'bg-red-800' : sortValue==='Medium' ?'bg-blue-400':'bg-green-500'}`}>
            <div>
                <Typography fontSize={20} color={'#fff'} fontWeight={600}>{title}</Typography>
            </div>
            <div>
                <Checkbox checked={isCompleted} onChange={()=>handleComplete(id)}/>
            </div>
            <div>
                <Button onClick={() => handleDelete(id)} >
                    <Delete sx={{ color: 'white' }}/>
                </Button>
            </div>
        </div>
    
  )
}

export default TodoItem