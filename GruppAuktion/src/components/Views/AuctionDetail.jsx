import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import './AuctionDetail.css'

const AuctionDetail = () => {
    const params = useParams()
    const [auction, setAuction] = useState(null)

const isAuctionActive = () =>{
    return new Date(auction.startDatum) < new Date(auction.slutDatum);
}

const handleBid = () =>{
    if (isAuctionActive()) {
        
        console.log('Bud genomförd');
    } else {
        console.log('Auktion inte tillgänglig');
    }

}

useEffect(() => {
    console.log(params.id)
    fetch(`http://localhost:5173/api/auktion/100/${params.id}`)
        .then(res => res.json())
        .then(data => setAuction(data))
        .catch(error => {
            console.error('Error fetching auction details:', error);
            
        });
}, [params.id]);

const getMonthName = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', { year: 'numeric' ,day: 'numeric', month: 'long' });
  };

    return ( 
        <div className="auction-detail-container">

        {auction ? (
            <div className="auction-detail">

                <div className="starter">
                    <div className="img-container">
                        <img className = "image"src="/traktor.jpg" alt="" />
                    </div>

                    <div className="title-container">
                    
                        <h2 className = "auction-title">{auction.titel}</h2>
                        </div>

                        <div className="description-container">
                            <h3 clasName = "de">Beskrivning</h3>
                            <p className="auction-description">{auction.beskrivning}</p>
                        </div>
                        <p className="start-date">Publicerad {getMonthName(auction.startDatum)}</p>

                </div>


                <div className="start">
                    <div className="auction-end">
                        <p>Avslutas <br /> {getMonthName(auction.slutDatum)}</p>
                    </div>


                    <div className="start-price-container">
                        <div className="price-button">
                        <h2 className="start-price">{auction.utropspris} kr</h2>
                        <div className="line-1"></div>
                        <button
                                className="add"
                                onClick={handleBid}
                                disabled={!isAuctionActive()}
                            >
                                Lägg bud
                            </button>
                        </div>
                    </div>

                    <p className="created-by">Skapad av {auction.skapadAv}</p>

                    
                </div>
                
            </div>
        ): <h2>Laddar...</h2>}
        
        </div>
     );
}
 
export default AuctionDetail;