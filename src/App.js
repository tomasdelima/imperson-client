import React from 'react'

import AppRoutes from './AppRoutes.js'
import AppTheme from './AppTheme.js'
import { Box } from '@mui/material'

const App = () => {
  return <Box className="h-screen flex flex-col justify-start bg-stone-100">
    <AppTheme>
      <AppRoutes />
    </AppTheme>
  </Box>
}

export default App
