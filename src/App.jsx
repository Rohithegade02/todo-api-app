import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TodoList from './components/TodoList'
import SignUp from './components/SignUp'
import Login from './components/Login'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Public />} /> */}
          <Route>
            <Route path='/todo' element={<TodoList />} />
          </Route>
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
