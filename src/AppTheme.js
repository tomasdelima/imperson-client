import { createTheme, ThemeProvider } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    primary: blueGrey,
    secondary: blueGrey,
    primaryBg: blueGrey,
    secondaryBg: blueGrey,
  },
})

const AppTheme = ({ children}) => {
  return <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
}

export default AppTheme
