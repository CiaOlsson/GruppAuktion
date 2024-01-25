import {DarkTheme} from "./theme/theme";
import {ThemeProvider, CssBaseline} from "@mui/material"
import {Routes, Route} from "react-router";
import DummyComponent from "./DummyComponent";
import SearchContextProvider from "./context/SearchContextProvider";
// import './App.css'
import NavBar from './components/NavBar'
import UserContextProvider from "./context/UserContextProvider";
import AuctionDetail from "./components/Views/AuctionDetail";


const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <SearchContextProvider>
        <UserContextProvider>
          <CssBaseline/>
          <NavBar/>
          <Routes>
            <Route exact path='/' Component={DummyComponent} />
            <Route path='/about' Component={DummyComponent} />
            <Route path='/contact' Component={DummyComponent} />
            <Route path='/auktion/:id' Component={AuctionDetail} />
          </Routes>
        </UserContextProvider>
      </SearchContextProvider>
    </ThemeProvider>
  )
}

export default App
