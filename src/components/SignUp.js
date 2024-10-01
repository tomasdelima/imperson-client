import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from './Button.js'
import post from '../utils/post.js'

const TextField = ({ label, value, type, onChange }) => {
  return <div className="flex flex-row gap-16">
    <label className="w-40 leading-10">{label}</label>
    <input className="w-80 p-2 text-[#282c34]" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
}

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

  return <div className="h-full flex flex-col justify-center items-center p-16 gap-4">
    <TextField label="Name" type="text" value={name} onChange={setName} />
    <TextField label="Email" type="text" value={email} onChange={setEmail} />
    <TextField label="Password" type="password" value={password} onChange={setPassword} />
    <TextField label="Confirm Password" type="password" value={passwordConfirmation} onChange={setPasswordConfirmation} />

    <Button label="Join" onClick={signUp} buttonClass="m-8" />

    <span>
      Already have an account? <a href="/sign-in" className="underline">Sign in.</a>
    </span>
  </div>
}

export default SignUp
