import React, {useEffect} from 'react'
import {Container, Typography, Grid, Link} from "@mui/material"
import AuctionCard from './AuctionCard'
import {NavLink} from "react-router-dom"
import "./AuctionList.css";

const AuctionList = (props) => {

    const moreAuctions = new Array(12).fill([...props.auctions]).flat();
    console.log(moreAuctions)
    return (
        <Grid sx={{marginBottom:"20px", marginTop:"20px"}} container spacing={3}>
            {moreAuctions.map((auction, idx) => {
                const href = `/auktion/${auction.auktionID}` 
                return (
                <Grid className="auction-card" item key={idx}>
                    <Link underline="none" component={NavLink} to={href}>
                        <AuctionCard auction={auction} />
                    </Link>        
                </Grid>
                )
            })}
        </Grid>
  )
}

export default AuctionList