import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'

import ChooseNpc from './components/ChooseNpc.js'
import Login from './components/Login.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChooseNpc />,
  },
  {
    path: '/login',
    element: <Login />,
  },
])

const App = () => {
  return <div className="h-screen p-4 flex flex-col justify-start">
    <RouterProvider router={router} />
  </div>
}

export default App
