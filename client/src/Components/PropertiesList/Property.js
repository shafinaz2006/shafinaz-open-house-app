import React from 'react';
import './PropertiesList.scss';
const Property = ({property}) =>{
    let imageSrc = property.images[1]? property.images[1]: property.images[0];
    return(
        <div className='property'>
            <img className='property__img' src={imageSrc} alt='property'/>
            <h3 className='property__rooms'>No of Rooms: {property.rooms}</h3>
            <h2 className='property__price'> Asking Price: {property.askingPrice}</h2>
            <a href={`/properties/${property.propertyId}`} className='link button button--propList property__link'> Check Details </a>
        </div>
    )
}
export default Property;