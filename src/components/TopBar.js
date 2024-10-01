import { useState } from 'react'
import Button from './Button'

const TopBar = ({ user }) => {
  const [open, setOpen] = useState(false)

  return <div className='flex justify-end p-4 mr-8 relative'>
    <Button label={user.name} onClick={() => setOpen(!open)} />
    {open && <div className='absolute top-16 right-4 .bg-white border border-gray-300 rounded-lg p-4'>
      <Button label='Logout' onClick={() => {
        localStorage.removeItem('token')
        window.location.reload()
      }} />
    </div>}
  </div>
}

export default TopBar
