import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom'

import ChooseNpc from './components/ChooseNpc.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import SignOut from './components/SignOut.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChooseNpc />,
  },
  {
    path: '/sign-in',
    element: <SignIn />,
  },
  {
    path: '/sign-up',
    element: <SignUp />,
  },
  {
    path: '/sign-out',
    element: <SignOut />,
  },
])

const App = () => {
  return <div className="h-screen p-4 flex flex-col justify-start">
    <RouterProvider router={router} />
  </div>
}

export default App
