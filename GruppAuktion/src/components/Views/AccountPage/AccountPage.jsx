import {Container, Stack, Typography, Button} from "@mui/material"
import {useUserContext} from "../../../context/UserContextProvider";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
    const {user} = useUserContext();
    const [loading, setLoading] = useState(true);
    const [auctions, setAuctions] = useState([]);
    const navigate = useNavigate();


    const handleChangeClick = (id) => {
        navigate("/change-auction?id=" + id)
    }
    const handleRemoveClick = async(id) => {
        await fetch("http://localhost:5145/api/auktion/100/" + id, {
            method: "DELETE",
        })
        fetchAuctionsAndBids();
    }
    const fetchUserdata = async() => {
        const auctions = await fetch("http://localhost:5145/api/auktion/100")
                            .then(res => res.json())
                            .then(data => data)
                            .catch(error => console.log(error));
        console.log(auctions);
        const filterByUser = auctions.filter(auction => auction.skapadAv === user);
        
        console.log(filterByUser);
        return filterByUser;
    }
    const fetchAuctionBids = async(id) => {
        const bud = await fetch("http://localhost:5145/api/bud/100/" + id)
                        .then(res => res.json())
                        .then(data => data)
                        .catch(error => console.log(error));
        return bud.length;
    }
    const fetchAuctionsAndBids = async() => {
        const auctions = await fetchUserdata()
        const output = [];
        for (let i = 0; i < auctions.length; i++) {
            const auction = auctions[i];
            auction.amountOfBids = await fetchAuctionBids(auction.auktionID);
            output.push(auction);
        }
        setAuctions(output);
        setLoading(false);
        console.log(output);
    }
    const ZeroPadding = nr => {
        return nr > 9 ? nr : "0" + nr;
    }
    const FullDate = date => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${ZeroPadding(year)}-${ZeroPadding(month)}-${ZeroPadding(day)}`;
    }

    useEffect(() => {
        if (user.length > 0) {
            fetchAuctionsAndBids();
        }
        else {
            //navigate("/")
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    return (
        <Container>
            {loading ? <h1>Loading...</h1> : 
            <Stack spacing={3}>
                <Typography variant="h3">Välkommen {user}</Typography>
                <Stack spacing={3} sx={{justifyContent:"center", alignItems:"center"}}>
                    <Typography variant="h4">Dina auktioner</Typography>
                    <Stack sx={{border:"2px solid white", width:"40%"}}>
                        {auctions.map((auction,idx) => {
                            return (
                                <Stack key={idx} direction="column" spacing={1} sx={{padding: "15px"}}>
                                    <Typography textAlign="center" sx={{fontSize: "1.2rem", fontWeight:"bold"}}>Titel: {auction.titel}</Typography>
                                    <Typography textAlign="start">Startdatum: {FullDate(new Date(auction.startDatum))}</Typography>
                                    <Typography textAlign="start">Slutdatum: {FullDate(new Date(auction.slutDatum))}</Typography>
                                    <Typography textAlign="start">Utropspris: {auction.utropspris}</Typography>
                                    {auction.amountOfBids === 0 ? 
                                    <Stack direction="row" sx={{justifyContent:"center"}} spacing={5}>
                                        <Button variant="contained" onClick={() => handleChangeClick(auction.auktionID)}>Ändra</Button>
                                        <Button variant="contained" onClick={() => handleRemoveClick(auction.auktionID)}>Ta bort</Button>
                                    </Stack>
                                    :
                                    <Typography textAlign="start">Antal bud: {auction.amountOfBids}</Typography>
                                    }                                    
                                </Stack>
                            )
                            
                        })}

                    </Stack>
                </Stack>
            </Stack>

            }
        </Container>
    )
}


export default AccountPage;