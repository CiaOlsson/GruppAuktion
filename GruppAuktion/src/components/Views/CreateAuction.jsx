import { useNavigate } from 'react-router';
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import {useUserContext} from '../../context/UserContextProvider'


// Några inputs och en knapp för att skicka vidare formuläret. 
const CreateAuction = () => {
    const {user} = useUserContext();
    // ta fram dagens datum
    const [formData, setFormData] = useState({ Titel: "", Beskrivning: "", StartDatum: {datum}, SlutDatum: "", Gruppkod: "100", Utropspris: "", SkapadAv: {user} });


    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData((currentData) => {
            currentData[changedField] = newValue;
            return { ...currentData };
        });
    };

    const handleSubmit = () => {

        const url = "http://localhost:5145/api/auktion";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(formData),
            // man kan också skicka med headers såhär:
            headers: { "content-type": "application/json" }
        })
    };

    // useEffect(() => {
    //     // const url = "http://localhost:5145/api/auktion"; 

    //     // fetch(url, {
    //     //     method: "POST",
    //     //     body: JSON.stringify(formData),
    //     //     // man kan också skicka med headers såhär:
    //     //     headers: { "content-type": "application/json" }
    //     // })
    //         // .then(response => response.json())
    //         // .then(newId => {
    //         //     document.querySelector("#responstext").innerText = newId.id;
    //         // })
    //     // console.log(formData)

    // })

    return (<>
        <Typography
            variant="h4"
            noWrap
            component="div"
            textAlign="center"
            sx={{ m: 5 }}
        >
            Lägg till auktionsobjekt
        </Typography>
        <Container sx={{
            m: 4,
            height: '100vh',
        }}>

            {/* Gör lite margins och padding mellan boxarna och så att innehållet centreras på sidan. 
        Samt fixa logiken, testa göra ett put request */}

            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
                <TextField required
                    id="heading-input"
                    label="Rubrik"
                    name="Titel"
                    value={formData.Titel}
                    variant="filled"
                    onChange={handleChange} />
                <TextField required
                    id="price-input"
                    label="Pris"
                    name="Utropspris"
                    value={formData.Utropspris}
                    variant="filled"
                    onChange={handleChange} />
                <TextField
                    id="description-input"
                    label="Beskrivning"
                    name="Beskrivning"
                    value={formData.Beskrivning}
                    variant="filled"
                    onChange={handleChange}
                    sx={{ maxWidth: "90%" }}
                    fullWidth
                    multiline
                    rows={10} />
                <TextField required
                    id="endDate-input"
                    label="Slutdatum"
                    name="SlutDatum"
                    value={formData.SlutDatum}
                    variant="filled"
                    onChange={handleChange} />
                <TextField InputProps={{ readOnly: true, }}
                    id="startDate-input"
                    label="Startdatum"
                    name="StartDatum"
                    value={formData.StartDatum}
                    variant="filled"
                    onChange={handleChange} /> {/* stardatum ska sättas automatiskt. */}
            </Stack>
            <Button onClick={handleSubmit}>KNAPP som inte syns??</Button>

            <Button>KNAPP som inte syns??</Button>
            <Button>Ändra styling på knapparna så att de syns</Button>
        </Container>


        {/* <button onClick={() => navigate("/")}>Tillbaka med en knapp</button> */}
    </>)

}

export default CreateAuction;

