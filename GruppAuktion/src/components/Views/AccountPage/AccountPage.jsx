import {Container, Paper, Stack, Typography} from "@mui/material"
import {useUserContext} from "../../../context/UserContextProvider";
import {useEffect, useState} from "react";

const AccountPage = () => {
    const {user} = useUserContext();

    useEffect(() => {
        const fetchUserdata = async() => {
            const auctions = await fetch()
        }
    }, [user])
    return (
        <Container>
            <Typography variant="h3">Välkommen {user}</Typography>
        </Container>
    )
}


export default AccountPage;