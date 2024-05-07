import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../slice/authSlice'

const Login = () => {
  const token = useSelector(state => state?.user?.user?.token)
  console.log(token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [error, setError] = useState('')

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    if (name === 'email' && value.trim() !== '') {
      setEmailError('')
    } else if (name === 'password' && value.trim() !== '') {
      setPasswordError('')
    }
  }
  const handleSubmit = e => {
    e.preventDefault()

    setEmailError('')
    setPasswordError('')
    const storedUser = JSON.parse(localStorage.getItem('user'))
    if (!user.email) {
      setEmailError('Email is required')
      return
    } else if (!user.password) {
      setPasswordError('Password is required')
      return
    } else if (
      storedUser.email !== user.email ||
      storedUser.password !== user.password
    ) {
      setError('Invalid Credentials')
      return
    } else {
      setError('')
      dispatch(login({ token, user }))
      navigate('/todo')
    }
  }

  return (
    <div className='border border-slate-900'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center h-[100vh] flex-col items-center gap-5 border-5 border-[#000] p-5'
      >
        <Typography fontSize={20} fontWeight={600}>
          Login
        </Typography>

        <div>
          <TextField
            label='Email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
            placeholder='Email'
            error={emailError}
            helperText={emailError}
          />
        </div>
        <div>
          <TextField
            label='Password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleChange}
            placeholder='password'
            error={passwordError}
            helperText={passwordError}
          />
        </div>
        {error}
        <Button type='submit'>Login</Button>
        <div>
          <p>
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className='text-[blue] cursor-pointer'
            >
              Create
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login
