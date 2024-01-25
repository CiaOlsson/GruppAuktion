import React, {useEffect} from 'react'
import {Container, Typography, Grid} from "@mui/material"
import { useSearchContext } from '../../context/SearchContextProvider'

const AuctionList = () => {
    const {searchString} = useSearchContext();
    let auctions = [];
    useEffect(() => {
        const getAuctions = async() => {
            const auctions = await fetch("api/auktion/100")
                        .then(res => res.json())
                        .then(data => data)
                        .catch(err => console.log(err)) 
            console.log(auctions);
        }
        auctions = getAuctions()
    }, [])
    return (
    <Container sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", backgroundColor:"gray", width:"100%"}}>
        <Typography variant="h4">Auktioner</Typography>
        <Grid container spacing={3}>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1">Hello World!</Typography>
            </Grid>

        </Grid>
    </Container>
  )
}

export default AuctionList