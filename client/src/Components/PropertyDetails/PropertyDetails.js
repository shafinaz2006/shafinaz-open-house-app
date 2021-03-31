
import React from 'react';
import './PropertyDetails.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const PropertyDetails = ({property}) =>{
    console.log('in details' ,property);
    let imageList= [...property.images];
    const handleDragStart = (e) => e.preventDefault();
    
    const items= imageList.map(image =>{
        return <img src={image} alt='housePic'onDragStart={handleDragStart} className='propertyDetails__img'/>
    })

    return(
        <section className='propertyDetails'>
            <h2 className='propertyDetails__heading'> 
                {property.address.street}, {property.address.city}</h2>
            <h2 className='propertyDetails__price'>Asking Price: {property.askingPrice} </h2>
            <AliceCarousel  disableButtonsControls mouseTracking items={items} />
            <h3 className='propertyDetails__rooms'>Number of Rooms: {property.rooms}</h3>
            <h3 className='propertyDetails__washrooms'>Number of Washrooms: {property.washrooms}</h3>
            <h3 className='propertyDetails__desc'>Property Description: </h3>
            <p className='propertyDetails__des'>{property.description}</p>
            <h3 className='propertyDetails__sellerInfo'>Seller Information: </h3>
            <p className='propertyDetails__sellerName'>{property.seller.name}</p>
            <p className='propertyDetials__sellerPhone'>{property.seller.phone}</p>
            <a className='link button propertyDetails__connect' href='/home'>Connect with seller </a>

        </section>
    )
}
export default PropertyDetails;