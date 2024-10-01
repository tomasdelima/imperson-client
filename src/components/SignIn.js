import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import post from '../utils/post.js'

import Button from '@mui/material/Button'

const TextField = ({ label, value, type, onChange }) => {
  return <div className="flex flex-row gap-16">
    <label className="w-40 leading-10">{label}</label>
    <input className="w-80 p-2" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
}

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = async () => {
    const { auth_token: authToken } = await post('sessions', { email, password })
    localStorage.setItem('authToken', authToken)
    navigate('/')
  }

  return <div className="h-full flex flex-col justify-center items-center p-16 gap-4">
    <TextField label="Email" type="text" value={email} onChange={setEmail} />
    <TextField label="Password" type="password" value={password} onChange={setPassword} />

    <Button onClick={signIn}>Enter</Button>

    <span>
      Don't have an account? <a href="/sign-up" className="underline">Sign up</a>
    </span>
  </div>
}

export default SignIn
