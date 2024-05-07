import { Button, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setData } from '../slice/UserSlice'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    if (name === 'name' && value.trim() !== '') {
      setNameError('')
    } else if (name === 'email' && value.trim() !== '') {
      setEmailError('')
    } else if (name === 'password' && value.trim() !== '') {
      setPasswordError('')
    }
  }
  const generateToken = () => {
    // Simple token generation (for demonstration only)
    return (
      Math.random().toString(36).substr(2) +
      Math.random().toString(36).substr(2)
    )
  }
  const handleSubmit = e => {
    e.preventDefault()

    setNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    if (!user.name) {
      setNameError('Name is required')
      return
    } else if (!user.email) {
      setEmailError('Email is required')
      return
    } else if (!user.password) {
      setPasswordError('Password is required')
      return
    } else if (user.password !== user.confirmPassword) {
      setConfirmPasswordError('Confirm Password should match password')
    } else {
      const token = generateToken()
      const data = { ...user, token }
      dispatch(setData(data))
      localStorage.setItem('user', JSON.stringify(data))
      setUser({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      navigate('/login')
    }
  }
  return (
    <div className='border border-slate-900'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center h-[100vh] flex-col items-center gap-5 border-5 border-[#000] p-5'
      >
        <Typography fontSize={20} fontWeight={600}>
          Sign Up
        </Typography>
        <div>
          <TextField
            label='Name'
            name='name'
            type='text'
            value={user.name}
            onChange={handleChange}
            placeholder='Name'
            error={nameError}
            helperText={nameError}
          />
        </div>
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
        <div>
          <TextField
            label='Confirm Password'
            type='password'
            name='confirmPassword'
            value={user.confirmPassword}
            onChange={handleChange}
            placeholder='Confirm Password'
            password={confirmPasswordError}
            helperText={confirmPasswordError}
          />
        </div>
        <Button type='submit'>Sign Up</Button>
        <div>
          <p>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className='text-[blue] cursor-pointer'
            >
              Login
            </span>
          </p>
        </div>
      </form>
    </div>
  )
}

export default SignUp
