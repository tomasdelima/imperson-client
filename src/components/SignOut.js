import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
  const navigate = useNavigate()

  const signOut = async () => {
    localStorage.removeItem('authToken')
    navigate('/sign-in')
  }

  useEffect(() => {
    signOut()
  }, [])

  return <div />
}

export default SignOut
