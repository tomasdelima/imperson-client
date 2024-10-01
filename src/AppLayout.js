import React, { useEffect, useState } from 'react'

import TopBar from './components/TopBar'

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

  return <>
    <TopBar user={user} />
    <Outlet />
  </>
}

export default AppLayout
