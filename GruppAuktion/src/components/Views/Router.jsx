import {Route, Routes} from "react-router-dom";
import DummyComponent from "./DummyComponent";
import AuctionsPage from "./components/Views/AuctionsPage/AuctionsPage";
import CreateAuction from "./components/Views/CreateAuction";
import AuctionDetail from "./components/Views/AuctionDetail";

const Router = () => {
    return (
        <Routes>
            <Route exact path='/' Component={DummyComponent} />
            <Route path='/add-auction' Component={CreateAuction} /> {/* Cissi jobbar på denna lägg till auktion */}
            <Route path='/contact' Component={DummyComponent} />
            <Route path='/auctions' Component={AuctionsPage} />
            <Route path='/auctions/open' Component={AuctionsPage} />
            <Route path='/auktion/:id' Component={AuctionDetail} />
        </Routes>
    )
}

export default Router;