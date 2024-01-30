import { Typography } from "@mui/material";

const AuctionsHeader = (props) => {
    const text = props.q ? "Auktioner" : props.closed ? "Stängda auktioner" : "Öppna auktioner";
    return (
        <Typography variant="h5">{text}</Typography>
    )
}

export default AuctionsHeader