import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import post from '../utils/post.js'

const TextField = ({ label, value, type, onChange }) => {
  return <div className="flex flex-row gap-16">
    <label className="w-40 leading-10">{label}</label>
    <input className="w-80 p-2 text-[#282c34]" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const save = async () => {
    const { auth_token: authToken } = await post('sessions', { email, password })
    localStorage.setItem('authToken', authToken)
    navigate('/')
  }

  return <div className="h-full flex flex-col justify-center items-center p-16 gap-4">
    <TextField label="Email" type="text" value={email} onChange={setEmail} />
    <TextField label="Password" type="password" value={password} onChange={setPassword} />

    <button
      className="cursor-pointer rounded hover:bg-gray-900 px-4 py-2 mt-8 transition-all duration-200 select-none"
      onClick={save}
    >
      Save
    </button>
  </div>
}

export default Login
