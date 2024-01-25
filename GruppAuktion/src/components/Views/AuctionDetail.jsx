import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import './AuctionDetail.css'

const AuctionDetail = () => {
    const params = useParams()
    const [auction, setAuction] = useState(null)


useEffect(() => {
    fetch(`http://localhost:5145/api/auktion/${params.id}`)
        .then(res => res.json())
        .then(data => setAuction(data[0]))
        .catch(error => {
            console.error('Error fetching auction details:', error);
            
        });
}, [params.id]);

    

    return ( 
        <div className="auction-detail-container">

        {auction ? (
            <div className="auction-detail">

                <div className="img-container">
                    <img src="/traktor.jpg" alt="" />
                    <div className="description-container">
                        <h3>Beskrivning</h3>
                        
                        <p className="auction-description">{auction.beskrivning}</p>
                       
                    </div>
                </div>

                <div className="start">
                    <div className="title-container">
                    <p className="start-date">{auction.startDatum}</p>

                        <h2 className = "auction-title">{auction.titel}</h2>
                    </div>

                    <div className="start-price container">
                        <h2 className="start-price">{auction.utropspris}</h2>
                        <button className = "add" >Lägg bud</button>
                    </div>



                   
                    <p className="slut-datum">{(auction.slutDatum)}</p>
                    <p className="created-by">Skapad av {auction.skapadAv}</p>

                    
                </div>
                
            </div>
        ): <h2>Laddar...</h2>}
        
        </div>
     );
}
 
export default AuctionDetail;