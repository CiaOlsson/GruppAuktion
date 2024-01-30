import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useUserContext } from '../../context/UserContextProvider'


// Några inputs och en knapp för att skicka vidare formuläret. 
const CreateAuction = () => {
    const { user } = useUserContext();
    const date = new Date()

    const closingDate = () => {

        date.setDate(date.getDate() + 7)

        return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric' });
    };

    const auctionClosingDate = closingDate();
    const currentDate = date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'numeric', year: 'numeric' });


    const [formData, setFormData] = useState({ Titel: "", Beskrivning: "", StartDatum: currentDate, SlutDatum: auctionClosingDate, Gruppkod: "100", Utropspris: "", SkapadAv: user });


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
            headers: { "content-type": "application/json" }
        })
    };

    return (<>
        <Container justifyContent='center' width="70%">
            <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ m: 5 }}
            >
                Lägg till auktionsobjekt
            </Typography>


            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap" >
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
                    sx={{ maxWidth: "100%" }}
                    fullWidth
                    multiline
                    rows={10} />

                <TextField InputProps={{ readOnly: true, }}
                    id="startDate-input"
                    label="Startdatum"
                    name="StartDatum"
                    value={formData.StartDatum}
                    variant="filled"
                /> {/* stardatum ska sättas automatiskt. */}
                <TextField InputProps={{ readOnly: true, }}
                    id="endDate-input"
                    label="Slutdatum"
                    name="SlutDatum"
                    value={formData.SlutDatum}
                    variant="filled"
                />
                <Button variant="contained" onClick={handleSubmit}>Skapa auktion</Button>
            </Stack>
        </Container>




    </>)

}

export default CreateAuction;


