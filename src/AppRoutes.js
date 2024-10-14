import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import AppLayout from './AppLayout.js'
import Chat from './pages/Chat.js'
import SignIn from './pages/SignIn.js'
// import SignUp from './pages/SignUp.js'
import SignOut from './pages/SignOut.js'
import TermsAndConditions from './pages/TermsAndConditions.js'
import Profile from './pages/Profile.js'

const AppRoutes = () => <BrowserRouter>
  <Routes>
    <Route element={<AppLayout />}>
      <Route path='/' element={<Chat />} />
      <Route path='/npcs/:id' element={<Chat />} />
      <Route path='/profile' element={<Profile />} />
    </Route>

    <Route path='/sign-in' element={<SignIn />} />
    {/* <Route path='/sign-up' element={<SignUp />} /> */}
    <Route path='/sign-out' element={<SignOut />} />
    <Route path='/terms-and-conditions' element={<TermsAndConditions />} />
  </Routes>
</BrowserRouter>

export default AppRoutes
