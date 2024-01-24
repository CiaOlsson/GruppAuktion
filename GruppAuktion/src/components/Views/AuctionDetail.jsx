import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'

const AuctionDetail = () => {
    const params = useParams()
    const [auction, setAuction] = useState(null)

    useEffect(() => {
        fetch(`${params.id}`)
        .then(res => res.json())
        .then(data => setAuction(data.detail))
    },[params.id])

    return ( 
        <div className="auction-detail-container">

        {auction ? (
            <div className="auction-detail">
                <img src="" alt="" />
                
            </div>
        ): <h2>Laddar...</h2>}
        
        </div>
     );
}
 
export default AuctionDetail;