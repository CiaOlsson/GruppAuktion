import React, {useEffect} from 'react'
import {Container, Typography, Grid, Link} from "@mui/material"
import AuctionCard from './AuctionCard'
import {NavLink} from "react-router-dom"
import "./AuctionList.css";

const AuctionList = (props) => {

    const moreAuctions = new Array(12).fill([...props.auctions]).flat();
    return (
        <Grid sx={{marginBottom:"20px", marginTop:"20px", justifyContent:"space-between", width:"100%"}} container spacing={3}>
            {moreAuctions.map((auction, idx) => {
                const closed = props.closed ? "?closed=true" : ""
                const href = `/auktion/${auction.auktionID}${closed}` 
                return (
                <Grid className="auction-card" item key={idx}>
                    <Link underline="none" component={NavLink} to={href}>
                        <AuctionCard auction={auction} closed={props.closed} />
                    </Link>        
                </Grid>
                )
            })}
        </Grid>
  )
}

export default AuctionList