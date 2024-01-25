import { DarkTheme } from "./theme/theme";
import { ThemeProvider, CssBaseline } from "@mui/material"
import { Routes, Route } from "react-router";
import DummyComponent from "./DummyComponent";
import SearchContextProvider from "./context/SearchContextProvider";
import './App.css'
import NavBar from './components/NavBar'
import UserContextProvider from "./context/UserContextProvider";
import AuctionsPage from "./components/Views/AuctionsPage/AuctionsPage";
import CreateAuction from "./components/Views/CreateAuction";
import AuctionDetail from "./components/Views/AuctionDetail";

const App = () => {
  return (
    <ThemeProvider theme={DarkTheme}>
      <SearchContextProvider>
        <UserContextProvider>
          <CssBaseline />
          <NavBar />
          <Routes>
            <Route exact path='/' Component={DummyComponent} />
            <Route path='/add-auction' Component={CreateAuction} /> {/* Cissi jobbar på denna lägg till auktion */}
            <Route path='/contact' Component={DummyComponent} />
            <Route path='/auctions' Component={AuctionsPage} />
            <Route path='/auctions/open' Component={AuctionsPage} />
            <Route path='/auktion/:id' Component={AuctionDetail} />
          </Routes>
        </UserContextProvider>
      </SearchContextProvider>
    </ThemeProvider>
  )
}

export default App
