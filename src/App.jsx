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

function App() {
  return (
    <div className='max-w-[100vw]'>
      <BrowserRouter>
        <Routes>
          {/* Private route only can be accessed using token */}
          <Route element={<PrivateOutlet />}>
            <Route path='/todo' element={<TodoList />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
//private outlet function check whether component is authenticated or not (if not it redirects to the login page)
function PrivateOutlet() {
  const auth = useSelector(state => state?.auth?.isAuthenticated)
  return auth ? <Outlet /> : <Navigate to='/login' />
}
export default App
