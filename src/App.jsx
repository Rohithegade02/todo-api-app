import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom'
import TodoList from './components/TodoList'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import PrivateOutlet from './components/PrivateOutlet'

function App() {
  return (
    <div className='max-w-[100vw]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {/* Private route only can be accessed using token */}
          <Route
            path='/todo'
            element={
              <PrivateOutlet>
                <TodoList />
              </PrivateOutlet>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
