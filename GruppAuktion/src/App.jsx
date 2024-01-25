import {DarkTheme} from "./theme/theme";
import {ThemeProvider, CssBaseline} from "@mui/material"
import {Routes, Route} from "react-router";
import DummyComponent from "./DummyComponent";
import SearchContextProvider from "./context/SearchContextProvider";
import './App.css'
import NavBar from './components/NavBar'
import UserContextProvider from "./context/UserContextProvider";
import AuctionList from "./components/Views/AuctionList";

const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <SearchContextProvider>
        <UserContextProvider>
          <CssBaseline/>
          <NavBar/>
          <Routes>
            <Route exact path='/' Component={AuctionList} />
            <Route path='/about' Component={DummyComponent} />
            <Route path='/contact' Component={DummyComponent} />
          </Routes>
        </UserContextProvider>
      </SearchContextProvider>
    </ThemeProvider>
  )
}

export default App
