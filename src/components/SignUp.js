import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Field from './Field.js'
import Grid2 from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'

import post from '../utils/post.js'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const navigate = useNavigate()

  const signUp = async () => {
    if (password !== passwordConfirmation) {
      alert('Password and password confirmation do not match')
      return
    }

    await post('users', { name, email, password })
    const { auth_token: authToken } = await post('sessions', { email, password })
    localStorage.setItem('authToken', authToken)
    navigate('/')
  }

  return <Box className='h-full flex flex-col justify-center items-center gap-4'>
    <Grid2 container spacing={4} direction='column'>
      <Field label='Name' value={name} onChange={e => setName(e.target.value)} />
      <Field label='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <Field label='Password' password value={password} onChange={e => setPassword(e.target.value)} />
      <Field label='Confirm Password' password value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)} />

      <Button onClick={signUp}>Join</Button>

      <Typography>
        Already have an account? <a href='/sign-in' className='underline'>Sign in.</a>
      </Typography>
    </Grid2>
  </Box>
}

export default SignUp
