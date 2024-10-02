import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
  primary: { main: '#a00' },
  typography: {
    secondary: { main: '#0a0' },
  }
})

const AppTheme = ({ children}) => {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
}

export default AppTheme
