
import {Card, CardContent, Typography, Stack} from "@mui/material"
import { useState, useEffect } from "react";

const AuctionCard = ({auction, closed}) => {
  const [highestBid, setHighestBid] = useState(null);

  const padWithZero = num => {
    return num > 9 ? num : "0" + num;
  }
  const formatDate = date => {
    return `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;
  }
  useEffect(() => {
    const fetchBids = async() => {
      const bids = await fetch("http://localhost:5145/api/bud/100/" + auction.auktionID)
        .then(res => res.json())
        .then(data => data);
      const highest = bids.reverse()[0];
      setHighestBid(highest);
    }
    fetchBids();
  }, [])
  return (
    <Card className="auction-card" sx={{width: "350px", height:"300px"}}>
      <CardContent sx={{height:"100%"}}>
        <Stack direction="column" sx={{ height:"100%"}}>
          
          <Typography textAlign="start" variant="h5" gutterBottom >{auction.titel}</Typography>
          <Typography textAlign="start" variant="body1" gutterBottom sx={{marginTop:"15px", marginBottom:"auto"}}>{auction.beskrivning}</Typography>
          <Typography textAlign="start" variant="body1" gutterBottom sx={{marginTop:"15px"}}>Utropspris: {auction.utropspris} kr</Typography>
          {closed ?
            <Typography textAlign="start" variant="body1" gutterBottom sx={{marginTop:"15px"}}>{highestBid ? "Vinnande bud: "  + highestBid.summa + " kr, av " + highestBid.budgivare : "Vinnande bud: Inget"}</Typography>
            :
            <Typography textAlign="start" variant="body1" gutterBottom sx={{marginTop:"15px"}}>{highestBid ? "Högsta bud: "  + highestBid.summa + " kr, av " + highestBid.budgivare : "Högsta bud: Inga bud lagda."}</Typography>

          }
          {closed ? 
            <Typography textAlign="start" variant="subtitle1">Auktionen stängdes {formatDate(new Date(auction.slutDatum))}.</Typography>
            :
            <Typography textAlign="start" variant="subtitle1">Stänger: {formatDate(new Date(auction.slutDatum))}</Typography>
}
        </Stack>
      </CardContent>
    </Card>
  )
}

export default AuctionCard