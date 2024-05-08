import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setData } from '../slice/UserSlice'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'
const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    //initialized user state
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [nameError, setNameError] = useState({
    //name error state
    status: false,
    message: '',
  })
  const [emailError, setEmailError] = useState({
    //email error state
    status: false,
    message: '',
  })
  const [passwordError, setPasswordError] = useState({
    //password error state
    status: false,
    message: '',
  })
  const [confirmPasswordError, setConfirmPasswordError] = useState({
    //confirm password error state
    status: false,
    message: '',
  })

  const handleChange = e => {
    const value = e.target.value
    const name = e.target.name
    setUser({ ...user, [name]: value })
    if (name === 'name' && value.trim() !== '') {
      setNameError({
        status: false,
        message: '',
      })
    } else if (name === 'email' && value.trim() !== '') {
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
  const generateToken = () => {
    //  token generation in frontend
    return (
      Math.random().toString(36).substr(2) +
      Math.random().toString(36).substr(2)
    )
  }
  const handleSubmit = e => {
    e.preventDefault()

    setNameError({
      message: '',
      status: false,
    })
    setEmailError({
      message: '',
      status: false,
    })
    setPasswordError({
      message: '',
      status: false,
    })
    setConfirmPasswordError({
      message: '',
      status: false,
    })

    if (!user.name) {
      setNameError({
        status: true,
        message: 'Name is required',
      })
      return
    } else if (!user.email) {
      setEmailError({
        status: true,
        message: 'Email is required',
      })
      return
    } else if (!user.password) {
      setPasswordError({
        status: true,
        message: 'Password is required',
      })
      return
    } else if (user.password !== user.confirmPassword) {
      setConfirmPasswordError({
        status: true,
        message: 'Passwords do not match',
      })
    } else {
      const token = generateToken() //generate token
      const hashedPassword = bcrypt.hashSync(
        //using bcrypt libaray to generate hashed password
        user.password,
        import.meta.env.VITE_HASHED_PASSWORD,
      )

      const { confirmPassword, ...userData } = user
      const data = { ...userData, password: hashedPassword, token }

      dispatch(setData(data))
      localStorage.setItem('user', JSON.stringify(data))

      setUser({ name: '', email: '', password: '', confirmPassword: '' })
      navigate('/login') //navigate to login page
    }
  }

  return (
    <div className='border border-slate-900'>
      <form
        onSubmit={handleSubmit}
        className='flex justify-center h-[100vh] flex-col items-center gap-5 border-5 border-[#000] p-5'
      >
        <p className='text-[20px] font-bold'>Sign Up</p>
        <div>
          <TextField
            label='Name'
            name='name'
            type='text'
            value={user.name}
            onChange={handleChange}
            placeholder='Name'
            error={nameError.status}
            helperText={nameError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
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
            error={emailError.status}
            helperText={emailError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
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
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
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
            password={confirmPasswordError.status}
            helperText={confirmPasswordError.message}
            sx={{
              width: '60vw',
              '@media (min-width: 600px)': { width: '30vw' },
              '@media (max-width: 1024px)': { width: '50vw' },
            }}
          />
        </div>
        <Button
          type='submit'
          sx={{
            background: '#2196F3',
            color: 'white',
            '&:hover': {
              backgroundColor: '#2196F3',
            },
            textTransform: 'none',
            width: '60vw',
            '@media (min-width: 600px)': { width: '30vw' },
            '@media (max-width: 1024px)': { width: '50vw' },
          }}
        >
          Sign Up
        </Button>
        <div>
          <p>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className='text-[#2196f3] cursor-pointer'
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
