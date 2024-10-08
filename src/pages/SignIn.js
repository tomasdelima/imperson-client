import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, Grid2, Typography } from '@mui/material'
import Field from '../components/Field.js'

import post from '../utils/post.js'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = async () => {
    try {
      const { auth_token: authToken } = await post('sessions', { email, password })
      localStorage.setItem('authToken', authToken)
      navigate('/')
    } catch {}
  }

  return <Box className='h-full flex flex-col justify-center items-center gap-4'>
    <Grid2 container spacing={4} direction='column'>
      <Field label='Email' value={email} onChange={e => setEmail(e.target.value)} />
      <Field label='Password' password value={password} onChange={e => setPassword(e.target.value)} />

      <Button onClick={signIn}>Enter</Button>

      {/* <Typography>
        Don't have an account? <a href='/sign-up' className='underline'>Sign up</a>
      </Typography> */}
    </Grid2>

    <Typography className='pt-8'>
      *By signing in you agree with the <a href='/terms-and-conditions'  target='_blank' className='underline'>terms and conditions</a> for using Imperson™.
    </Typography>
  </Box>
}

export default SignIn
