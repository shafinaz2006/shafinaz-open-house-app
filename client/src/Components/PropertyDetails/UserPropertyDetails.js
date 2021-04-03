
import React from 'react';
import './PropertyDetails.scss';
import Cookies from 'js-cookie';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

class UserPropertyDetails extends React.Component{
    state = {
        property: this.props.property
    }
    deleteProperty = (event) =>{
        // event.preventDefault();
         console.log('in delete property', this.state.property.propertyId)
         this.props.handleDeleteProperty(this.state.property.propertyId);
 
     }
    render(){
        
        let items = [];
        if(this.state.property.images.length>0){
            let imageList= [...this.state.property.images];
            const handleDragStart = (e) => e.preventDefault();
            items= imageList.map(image =>{
                return <img src={image} alt='housePic'onDragStart={handleDragStart} className='propertyDetails__img'/>
            })
        }

    return(
        
        <section className='propertyDetails'>
            {this.state.property?
            <>
            <h2 className='propertyDetails__heading'> 
                {this.state.property.address.street}, {this.state.property.address.city}</h2>
            <h2 className='propertyDetails__price'>Asking Price: {this.state.property.askingPrice} </h2>
            {items?<AliceCarousel  disableButtonsControls infinite mouseTracking items={items} />: ''}
            <div className='propertyDetails__property'>
                <h3 className='propertyDetails__rooms'>Number of Rooms: {this.state.property.rooms}</h3>
                <h3 className='propertyDetails__washrooms'>Number of Washrooms: {this.state.property.washrooms}</h3>
                <h3 className='propertyDetails__desc'>Property Description: </h3>
                <p className='propertyDetails__des'>{this.state.property.description}</p>
                <h3 className='propertyDetails__desc'>Recent Upgradation: </h3>
                <p className='propertyDetails__des'>{this.state.property.recentUpgrade}</p>
                
                {this.state.property.seller.name?
                <div className='propertyDetails__userButtons'>
                <a className='link button button--userPropertyDetails' href='/home'>Edit Property Information </a>
                <a className='button button--userPropertyDetails' href={`/users/${Cookies.get('userId')}/properties/${this.state.property.propertyId}/delete`}
                    onClick={(event) => {this.deleteProperty(event)}} style={{cursor: 'pointer'}}>Delete Property </a>
                </div>
                : '' }
            </div>
            </>: <h2>Property is deleted</h2>
            }
        </section>
    )
        }
}
export default UserPropertyDetails;