import { DarkTheme } from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material"
import SearchContextProvider from "./context/SearchContextProvider";
import './App.css'
import NavBar from './components/NavBar'
import UserContextProvider from "./context/UserContextProvider";
import Router from "./components/Views/Router";

const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <SearchContextProvider>
        <UserContextProvider>
          <CssBaseline />
          <NavBar />
          <Router />
        </UserContextProvider>
      </SearchContextProvider>
    </ThemeProvider>
  )
}

export default App
