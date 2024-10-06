import React from 'react'

import AppRoutes from './AppRoutes.js'
import AppTheme from './AppTheme.js'

const App = () => {
  return <div className="h-screen flex flex-col justify-start bg-stone-100">
    <AppTheme>
      <AppRoutes />
    </AppTheme>
  </div>
}

export default App
