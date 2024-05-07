import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../slice/authSlice'
import { compareSync } from 'bcryptjs'
const Login = () => {
  const token = useSelector(state => state?.user?.user?.token) //subscribe to store token
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [emailError, setEmailError] = useState({
    //email error
    status: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    // password error
    status: false,
    message: '',
  })
  const [error, setError] = useState('') //throws error when on invalid crentionals

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    if (name === 'email' && value.trim() !== '') {
      setEmailError({
        status: false,
        message: '',
      })
    } else if (name === 'password' && value.trim() !== '') {
      setPasswordError({
        status: false,
        message: '',
      })
    }
  }
  const handleSubmit = e => {
    e.preventDefault()

    setEmailError({
      status: false,
      message: '',
    })
    setPasswordError({
      status: false,
      message: '',
    })
    const storedUser = JSON.parse(localStorage.getItem('user')) //fetching signup data from local storage
    if (storedUser) {
      if (!user.email) {
        //if email is not present
        setEmailError({
          status: true,
          message: 'Email is required',
        })
        return
      } else if (!user.password) {
        //if password is not present
        setPasswordError({
          status: true,
          message: 'Password is required',
        })
        return
      } else if (
        storedUser.email !== user.email || //check whether the local storage email is equal to current user email
        compareSync(user.password, storedUser.password) === false //used bcrypt to compare password
      ) {
        setError('Invalid Credentials')
        return
      } else {
        setError('')
        dispatch(login({ token, user }))
        navigate('/todo')
      }
    } else {
      setError('Please register to Login')
      return
    }
  }

  return (
    <div className='border border-slate-900'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center h-[100vh] flex-col items-center gap-5  p-5'
      >
        <p className='text-[20px] font-bold'>Login</p>

        <div>
          <TextField
            label='Email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleChange}
            placeholder='Email'
            error={emailError.status}
            helperText={emailError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
            }}
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
            error={passwordError.status}
            helperText={passwordError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
            }}
          />
        </div>
        <p className='text-[#cc0000]'>{error} </p>
        <Button
          type='submit'
          sx={{
            background: '#2196F3',
            color: 'white',
            width: '60vw',
            textTransform: 'none',
            '@media (min-width: 600px)': { width: '30vw' },
            '&:hover': {
              backgroundColor: '#2196F3',
            },
          }}
        >
          Login
        </Button>
        <div>
          <p>
            Don&apos;t have an account?{' '}
            <span
              onClick={() => navigate('/')}
              className='text-[#2196f3] cursor-pointer underline-offset-1'
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
