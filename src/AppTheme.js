import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({})

const AppTheme = ({ children}) => {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
}

export default AppTheme
