import {DarkTheme} from "./theme/theme";
import {ThemeProvider, CssBaseline} from "@mui/material"
// import './App.css'
import NavBar from './components/NavBar'
const App = () => {

  return (
    <ThemeProvider theme={DarkTheme}>
      <CssBaseline/>
      <NavBar/>
    </ThemeProvider>
  )
}

export default App
