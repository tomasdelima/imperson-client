import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import { Outlet } from 'react-router-dom'

import get from './utils/get.js'

const AppLayout = () => {
  const [user, setUser] = useState(null)
  const fetchMe = async () => {
    const response = await get('me')
    setUser(response)
  }

  useEffect(() => {
    fetchMe()
  }, [])

  if (!user) return

  return <Box className='h-full'>
    <Outlet />
  </Box>
}

export default AppLayout
