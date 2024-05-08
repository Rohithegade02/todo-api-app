import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList'
import SignUp from './components/SignUp'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import PrivateRoute from './components/PrivateRoute'

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  return (
    <div className='max-w-[100vw]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          {/* Private route only can be accessed when authenticated */}
          <Route
            path='/todo'
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <TodoList />
              </PrivateRoute>
            }
          />
          {/* Redirect to login if not authenticated */}
          <Route
            path='/todo'
            element={
              !isAuthenticated ? <Navigate to='/login' replace /> : <TodoList />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
