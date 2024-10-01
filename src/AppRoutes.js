import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import AppLayout from './AppLayout.js'
import ChooseNpc from './components/ChooseNpc.js'
import SignIn from './components/SignIn.js'
import SignUp from './components/SignUp.js'
import SignOut from './components/SignOut.js'

const AppRoutes = () => <BrowserRouter>
  <Routes>
    <Route element={<AppLayout />}>
      <Route path='/' element={<ChooseNpc />} />
    </Route>

    <Route path='/sign-in' element={<SignIn />} />
    <Route path='/sign-up' element={<SignUp />} />
    <Route path='/sign-out' element={<SignOut />} />
  </Routes>
</BrowserRouter>

export default AppRoutes
