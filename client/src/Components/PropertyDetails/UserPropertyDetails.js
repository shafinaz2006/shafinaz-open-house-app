
import React from 'react';
import './PropertyDetails.scss';
import Cookies from 'js-cookie';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

class UserPropertyDetails extends React.Component {
    state = {
        property: this.props.property
    }
    deleteProperty = (event) => {
        this.props.handleDeleteProperty(this.state.property.propertyId);
    }
    render() {
        let items = [];
        if (this.state.property.images.length > 0) {
            let imageList = [...this.state.property.images];
            const handleDragStart = (e) => e.preventDefault();
            items = imageList.map(image => {
                return <img src={image} alt='housePic' onDragStart={handleDragStart} className='propertyDetails__img' />
            })
        }
        if (this.state.property) {
            return (
                <section className='propertyDetails'>
                    {this.state.property ?
                        <>
                            <h2 className='propertyDetails__heading'>
                                {this.state.property.address.street}, {this.state.property.address.city}</h2>
                            <h2 className='propertyDetails__price'>Asking Price: {this.state.property.askingPrice} </h2>
                            {items ? <AliceCarousel disableButtonsControls infinite mouseTracking items={items} /> : ''}
                            <div className='propertyDetails__property'>
                                <h3 className='propertyDetails__subHeading'>Number of Rooms: {this.state.property.rooms}</h3>
                                <h3 className='propertyDetails__subHeading'>Number of Washrooms: {this.state.property.washrooms}</h3>
                                <h3 className='propertyDetails__subHeading'>Property Description: </h3>
                                <p className='propertyDetails__des'>{this.state.property.description}</p>
                                <h3 className='propertyDetails__subHeading'>Recent Upgradation: </h3>
                                <p className='propertyDetails__des'>{this.state.property.recentUpgrade}</p>

                                {this.state.property.seller.name ?
                                    <div className='propertyDetails__userButtons'>
                                        <a className='link button button--propertyDetails' href={`/users/${Cookies.get('userId')}/properties/${this.state.property.propertyId}/edit`}>Edit Property Information </a>
                                        <a className='button button--propertyDetails' href={`/users/${Cookies.get('userId')}/properties/${this.state.property.propertyId}/delete`}
                                            onClick={(event) => { this.deleteProperty(event) }} style={{ cursor: 'pointer' }}>Delete Property </a>
                                    </div>
                                    : ''
                                }
                            </div>
                        </> : <h2>Property is deleted</h2>
                    }
                </section>
            )
        } else {
            return (
                <section style={{ textAlign: 'center' }}><h1>Page loading</h1></section>
            )
        }
    }
}
export default UserPropertyDetails;