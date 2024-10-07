import { createTheme, ThemeProvider } from '@mui/material'
import { blueGrey, grey } from '@mui/material/colors'
import useMediaQuery from '@mui/material/useMediaQuery'

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      light: blueGrey[400],
      main: blueGrey[700],
      dark: blueGrey[900],
    },
    lightPrimary: { main: blueGrey[100] },
    background: {
      default: grey[50],
    }
  },
  typography: {
    fontSize: 16,
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: blueGrey[100],
      main: blueGrey[200],
      dark: blueGrey[900],
    },
    lightPrimary: { main: blueGrey[100] },
    background: {
      default: grey[900],
    }
  },
  typography: {
    fontSize: 16,
  },
})

const AppTheme = ({ children }) => {
  const darkMode = useMediaQuery('(prefers-color-scheme: dark)')

  return <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
    {children}
  </ThemeProvider>
}

export default AppTheme
