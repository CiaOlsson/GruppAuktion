import { Typography, Stack, Grid, Container } from '@mui/material'
import {useSearchParams, useLocation} from "react-router-dom";
import { useState, useEffect } from 'react';
import AuctionsHeader from './components/AuctionsHeader';
import AuctionList from './components/AuctionList';
import "./AuctionsPage.css";

const AuctionsPage = () => {
  const location = useLocation();
  const [searchParams, setsearchParams] = useSearchParams();
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const q = searchParams.get("q");
  const closed = searchParams.get("closed");

  const filterAuctions = (input) => {
    if (closed) {
      const closedAuctions = input.filter(auction => {
        const now = new Date();
        const auctionEndDate = new Date(auction.slutDatum);
        if (now > auctionEndDate) {
          return auction;
        }
      })
      return closedAuctions;
    }
    if (q) {
      return input.filter((auction) => {
        const qLower = q.toLowerCase();
        if (auction.beskrivning.toLowerCase().includes(qLower) ||
            auction.titel.toLowerCase().includes(qLower)) {
              return auction;
        }
      })
    }

    const openAuctions = input.filter(auction => {
      const now = new Date();
      const auctionEndDate = new Date(auction.slutDatum);
      if (now < auctionEndDate) {
        return auction;
      }
    })
    return openAuctions;
    //Filtrera baserat på söksträngen om en sökning gjorts. 
  }
  useEffect(() => {
    const getAuctions = async() => {
        const auctionsFromAPI = await fetch("http://localhost:5145/api/auktion/100")
                    .then(res => res.json())
                    .then(data => data)
                    .catch(err => console.log(err)) 
        return auctionsFromAPI;
    }
    const filteredFetchedAuctions = async() => {
      const allAuctions = await getAuctions()
      const filteredAuctions = filterAuctions(allAuctions);
      return filteredAuctions;
    }
    
    const getAndFilterFetchedAuctions = async() => {
      const resultAuctions = await filteredFetchedAuctions()
      console.log(resultAuctions)
      setAuctions(resultAuctions);
      setLoading(false);
    }
    getAndFilterFetchedAuctions();
    return (() => {
      setLoading(true);
    })
  }, [location])
  return (
    <>
      {loading ? <h1>loading...</h1> : 
      <Container className="auction-page-container" sx={{width:"80%", height:"100%"}}>
          <AuctionsHeader closed={closed} q={q}/>
          {q ? <Typography variant="h5">{auctions?.length} {auctions.length === 1 ? "träff" : "träffar"} på sökning: {q}</Typography> : <></> }
          <AuctionList auctions={auctions} />

      </Container>
        
      }
    </>
    
  )
}

export default AuctionsPage