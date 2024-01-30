import { useEffect, useState, useContext} from 'react';
import {useParams, useSearchParams, } from 'react-router-dom'
import './AuctionDetail.css'
import {useUserContext} from '../../context/UserContextProvider'

const AuctionDetail = () => {
    const params = useParams()
    const [searchParams,] = useSearchParams()
    const closed = searchParams.get("closed");
    console.log(closed)
    const [auction, setAuction] = useState(null)
    const [getBid, setGetBid] = useState(null)
    const {user} = useUserContext()
    const isAuctionActive = () =>{
    return new Date(auction.startDatum) < new Date(auction.slutDatum);

}
const handleUserLoggedIn = () =>{
   return (user.length > 0)

}

const handleBid = async (auktionsID, summa, budgivare) => {
    if (isAuctionActive()) {
        const bidData = {
            BudID: 0,
            Summa: parseInt(summa),
            AuktionID: auktionsID,
            Budgivare: budgivare
        };

        console.log(bidData); 

        fetch('http://localhost:5145/api/bud', {
            method: 'POST',
            body: JSON.stringify(bidData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error placing bid:', error));

        
    }
}





useEffect(() => {
    console.log(params.id)
    fetch(`http://localhost:5173/api/auktion/100/${params.id}`)
        .then(res => res.json())
        .then(data => setAuction(data))
        .catch(error => {
            console.error('Kan ej hämta auktioner:', error);
            
        });
}, [params.id]);

useEffect(() => {
    fetch(`http://localhost:5145/api/bud/100/${params.id}`)
        .then(res => res.json())
        .then(data => {
            setGetBid(data.reverse());
        })
        .catch(error => {
            console.error('Kan ej hämta bud', error);
        });
}, [params.id]);


const getMonthName = (dateString) => {
    return new Date(dateString).toLocaleDateString('sv-SE', { year: 'numeric' ,day: 'numeric', month: 'long' });
  };

  const auctionCompleted = () =>{
    if(isAuctionActive()){
        return <div>
             <p>Avslutas <br /> {getMonthName(auction.slutDatum)}</p>
        </div>
    }
    else{
        return <div>
            <h3>Auktionen är avslutad</h3>
        </div>
    }
  }
  const renderBidHistory = () => {
    if (!isAuctionActive()) {
        return <div className = "auction-completed">
            <h4>{getBid[0].budgivare} vann auktionen</h4>
            <p>Högsta vinnade budet {getBid[0].summa} kr</p>
        </div>;
    } else {
        return getBid.map(bid => (
            <div key={bid.budID} className="bid-item">
                <div className="bid-Name">
                    <p className="bidgivare">{bid.budgivare}</p>
                    <p className="summa">{bid.summa} kr</p>
                </div>
            </div>
        ));
    }
};

const bidStartPrice = () => {
    if (getBid && getBid.length > 0) {
        return getBid[0].summa;
    } else {
        return auction.utropspris;
    }
};

    return ( 
        <div className="auction-detail-container">

        {auction&&getBid ? (
            <div className="auction-detail">

                <div className="starter">
                    <div className="img-container">
                        <img className = "image"src="/traktor.jpg" alt="" />
                    </div>

                    <div className="title-container">
                    
                        <h2 className = "auction-title">{auction.titel}</h2>
                        </div>

                        <div className="description-container">
                            <h3 className = "de">Beskrivning</h3>
                            <p className="auction-description">{auction.beskrivning}</p>
                        </div>
                        <p className="start-date">Publicerad {getMonthName(auction.startDatum)}</p>
                </div>
                <div className="start">
                    <div className="auction-end">
                    {auctionCompleted()}
                    </div>
                    <div className="start-price-container">
                        <div className="bid-button">
                        <h2 className="start-price">{bidStartPrice()} kr</h2>
                        <div className="line-1"></div>
                        <input className = "bid-input" type="text" placeholder ='Lägg bud'  disabled={!isAuctionActive()||!handleUserLoggedIn()}/>
                        <button
                                className="add"
                                onClick={handleBid}
                                disabled={!isAuctionActive()||!handleUserLoggedIn()}
                            >
                                Lägg bud
                            </button>
                        </div>
                    </div>

                    <p className="created-by">Skapad av {auction.skapadAv}</p>

                    <div className="bids-container">
                        <div className="bidhistory-text">
                            <h3>Budhistorik  </h3>
                            <div className="bid-line"></div>
                        </div>
                    <div className="bids-detail">
                        
                       <div className = "bid-history-container">
                        <h3>Budgivare</h3>
                        <h3>Bud</h3>

                       </div>

                       <div>
                        {renderBidHistory()}

                       </div>
                    </div>
                </div>
                </div>
            </div>
        ): <h2>Laddar...</h2>}
        
        </div>
     );
}
export default AuctionDetail;