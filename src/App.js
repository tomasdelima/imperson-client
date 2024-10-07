import React from 'react'

import AppRoutes from './AppRoutes.js'
import AppTheme from './AppTheme.js'
import { Card } from '@mui/material'

const App = () => {
  return <AppTheme>
    <Card className="h-screen flex flex-col justify-start" sx={{ bgcolor: 'background.default' }}>
      <AppRoutes />
    </Card>
  </AppTheme>
}

export default App
