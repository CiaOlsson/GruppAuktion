import React, {useEffect} from 'react'
import {Container, Typography, Grid} from "@mui/material"
import AuctionCard from './AuctionCard'

const AuctionList = (props) => {
    
    return (
        <Grid container spacing={3}>
            {props.auctions.map((auction, idx) => {
                return <AuctionCard key={idx} auction={auction} />
            })}
        </Grid>
  )
}

export default AuctionList