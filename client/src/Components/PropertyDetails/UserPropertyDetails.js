
import React from 'react';
import './PropertyDetails.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

const UserPropertyDetails = (props) =>{
    console.log('in details' ,props.property);
    let property = props.property;
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
                
                {property.seller.name?
                <div className='propertyDetails__userButtons'>
                <a className='link button button--userPropertyDetails' href='/home'>Edit Property Information </a>
                <a className='link button button--userPropertyDetails' href='/home'>Delete Property </a>
                </div>
                : '' }
            </div>
        </section>
    )
}
export default UserPropertyDetails;