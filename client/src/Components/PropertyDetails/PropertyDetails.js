
import React from 'react';
import './PropertyDetails.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const PropertyDetails = ({property}) =>{
    console.log('in details' ,property);
    let items = [];
    if(property.images.length>0){
        let imageList= [...property.images];
        const handleDragStart = (e) => e.preventDefault();
        
        items= imageList.map(image =>{
            return <img src={image} alt='housePic'onDragStart={handleDragStart} className='propertyDetails__img'/>
        })
    }
    

    return(
        <section className='propertyDetails'>
            <h2 className='propertyDetails__heading'> 
                {property.address.street}, {property.address.city}</h2>
            <h2 className='propertyDetails__price'>Asking Price: {property.askingPrice} </h2>
            {items?<AliceCarousel  disableButtonsControls infinite mouseTracking items={items} />: ''}
            <div className='propertyDetails__property'>
                <h3 className='propertyDetails__rooms'>Number of Rooms: {property.rooms}</h3>
                <h3 className='propertyDetails__washrooms'>Number of Washrooms: {property.washrooms}</h3>
                <h3 className='propertyDetails__desc'>Property Description: </h3>
                <p className='propertyDetails__des'>{property.description}</p>
                <h3 className='propertyDetails__desc'>Recent Upgradation: </h3>
                <p className='propertyDetails__des'>{property.recentUpgrade}</p>
                <h3 className='propertyDetails__sellerInfo'>Seller Information: </h3>
                {property.seller.userId? 
                <div>
                    <p className='propertyDetails__sellerName'>{property.seller.name? property.seller.name: 'Not available'}</p>
                    <p className='propertyDetials__sellerPhone'>{property.seller.phone? property.seller.phone: 'Not available'}</p>
                    <p className='propertyDetials__sellerEmail'>{property.seller.email? property.seller.email: 'Not available'}</p>
                </div>:
                <p className='propertyDetails__sellerName'>Seller's contact information is not available.</p>
                }
                {property.seller.name?
                <div className='propertyDetails__userButtons'>
                    <a className='link button button--propertyDetails' href='/home'>Connect with seller </a>
                </div>: ''
                }
            </div>
        </section>
    )
}
export default PropertyDetails;