import { useEffect, useState} from 'react';
import {useParams, useSearchParams, } from 'react-router-dom'
import './AuctionDetail.css'
import {useUserContext} from '../../context/UserContextProvider'

const AuctionDetail = () => {
    const params = useParams()
    const [searchParams,] = useSearchParams()
    const closed = searchParams.get("closed");
    const [auction, setAuction] = useState(null)
    const [getBid, setGetBid] = useState(null)
    const [bidAmount, setBidAmount] = useState("");
    const {user} = useUserContext()

    const handleUserLoggedIn = () =>{
        
    return (user.length > 0)

    }

    const handleBid = async () => {
        const newBid = Number(bidAmount);
        const currentHighest = getBid.length > 0 ? getBid[0].summa : 0;
        if (newBid <= currentHighest || newBid <= auction.utropspris) {
            alert('För lågt bud');
            return;
        }
        if (!closed && handleUserLoggedIn()) {
            const bidData = {
                BudID: 0,
                Summa: Number(bidAmount),
                AuktionID: params.id,
                Budgivare: user 
            };

            console.log(bidData);

            await fetch('/api/bud', {
                method: 'POST',
                body: JSON.stringify(bidData),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });


            const newBid = {budgivare:user, summa: Number(bidAmount)}
            setGetBid([newBid, ...getBid])
            
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
        const fetchBidData = async () => {
            try {
                const response = await fetch(`http://localhost:5145/api/bud/100/${params.id}`);
                const data = await response.json();
                setGetBid(data.reverse());
            } catch (error) {
                console.error('Kan ej hämta bud', error);
            }
        };
        fetchBidData();
        // const interval = setInterval(fetchBidData, 50); 

        // return () => clearInterval(interval); 
    }, [params.id]);



    const getMonthName = (dateString) => {
        return new Date(dateString).toLocaleDateString('sv-SE', { year: 'numeric' ,day: 'numeric', month: 'long' });
    };

    const auctionCompleted = () =>{
        if(!closed){
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
        // console.log(getBid, getBid.length)
        console.count("rendered")
        if(closed && getBid.length === 0 ){
            return <div className = "auction-completed">
                <h4>Ingen vann auktionen</h4>
            </div>;
        }
        else if (closed) {
            return <div className = "auction-completed">
                <h4>{getBid[0].budgivare} vann auktionen</h4>
                <p>Högsta vinnade budet {getBid[0].summa} kr</p>
            </div>;
        } 
        
        else if (getBid && getBid.length < 0) {
            return <div className = "no-bids">
                
            </div>;
        } 
        else {
            return getBid.map((bid, idx) => (
                <div key={bid.budID + idx + bid.summa} className="bid-item">
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
                        <input
                        className="bid-input"
                        type="text"
                        placeholder="Lägg bud"
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        disabled={closed || !handleUserLoggedIn()}
                    />
                        <button
                                className="add"
                                onClick={handleBid}
                                disabled={closed||!handleUserLoggedIn()}
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