
import {Card, CardContent, Typography, Stack} from "@mui/material"

const AuctionCard = ({auction}) => {
  const padWithZero = num => {
    return num > 9 ? num : "0" + num;
  }
  const formatDate = date => {
    return `${date.getFullYear()}-${padWithZero(date.getMonth())}-${padWithZero(date.getDate())}`;
  }
  return (
    <Card className="auction-card" sx={{minWidth: "200px", minHeight:"150px"}}>
      <CardContent sx={{height:"100%"}}>
        <Stack direction="column" sx={{justifyContent: "space-between", height:"100%"}}>
          <Typography textAlign="start" variant="h5" gutterBottom >{auction.titel}</Typography>
          <Typography textAlign="start" variant="body1" gutterBottom>{auction.beskrivning}</Typography>
          <Typography textAlign="start" variant="subtitle1">Stänger: {formatDate(new Date(auction.slutDatum))}</Typography>

        </Stack>
      </CardContent>
    </Card>
  )
}

export default AuctionCard