import React from 'react';
import Cookies from 'js-cookie';
import errorIcon from '../../assets/icons/error.svg';
import cross from '../../assets/icons/cross.svg';
import './AddProperty.scss';

class UpdateProperty extends React.Component {
    state = {
        street: this.props.property.address.street, city: this.props.property.address.city,
        rooms: this.props.property.rooms, washrooms: this.props.property.washrooms,
        description: this.props.property.description, recentUpgrade: this.props.property.recentUpgrade,
        askingPrice: (this.props.property.askingPrice.replace(/[^0-9]/g, '')),
        selectedImage: this.props.property.images, updatedImageCol: this.props.property.images,

        streetError: false, cityError: false,
        descriptionError: false, askingPriceError: false,
        isValidPrice: true, isValid: true, isFormSubmitted: false,

    }
    // Alert div after validation:

    Alert = () => <div className='input--errorContainer'>
        <img src={errorIcon} alt="error" className='input--error-img' />
        <span className='input--error-msg'>This field is required </span>
    </div>

    // Alert div for askingPrice:

    AlertAskingPrice = () => <div className='input--errorContainer'>
        <img src={errorIcon} alt="error" className='input--error-img' />
        <span className='input--error-msg'>Only numbers are required </span>
    </div>

    // Asking Price validation:

    checkAskingPrice = () => {
        let priceRegex = /^[0-9]*$/;
        if (this.state.askingPrice.match(priceRegex)) {
            this.setState({ isValidPrice: true });
            return true;
        }
        else {
            this.setState({ isValidPrice: false });
            return false;
        }
    }

    // handle onChange:

    handleChange = (event) => {
        let x = event.target.name + 'Error'
        if (event.target.value === '') { this.setState({ [x]: true }); }
        else { this.setState({ [x]: false }); }
        this.setState({ [event.target.name]: event.target.value })
    }

    // Image input handle: 

    imageInputHandler = (event) => {
        console.log(event.target.files);
        this.setState({ selectedImage: event.target.files });
    }

    // Form validation:

    isFormValid = () => {
        this.checkAskingPrice();
        if(!this.state.street) this.setState({streetError: true});
        if(!this.state.city) this.setState({cityError: true});
        if(!this.state.description) this.setState({descriptionError: true});
        if(!this.state.askingPrice) this.setState({askingPriceError: true});

        if (!this.state.street || this.state.streetError || !this.state.city || this.state.cityError ||
            !this.state.description || this.state.descriptionError || !this.state.askingPrice || this.state.askingPriceError
            || !this.checkAskingPrice()) {
            // this.setState({ isValid: false });
            return false;
        }
        else {
            // this.setState({ isValid: true });
            return true;
        }
    }

    deleteImage = (event,i) =>{
        event.preventDefault();
        console.log('inside deleteImage ', i);
        console.log(event.target);
        let imageCol = this.state.updatedImageCol; 
        console.log(imageCol, i)
        imageCol.splice(i, 1);
        console.log(imageCol);
        
        this.setState({updatedImageCol: imageCol});
        console.log(this.state.updatedImageCol);
    }
    // Form Submit:

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ isFormSubmitted: true });
            let newData = new FormData();
            newData.append('propertyId', this.props.property.propertyId);
            newData.append('street', this.state.street);
            newData.append('city', this.state.city);
            newData.append('rooms', this.state.rooms);
            newData.append('washrooms', this.state.washrooms);
            newData.append('description', this.state.description);
            newData.append('recentUpgrade', this.state.recentUpgrade);
            newData.append('askingPrice', this.state.askingPrice);
            newData.append('newImageCol', this.state.updatedImageCol);
            if (this.state.selectedImage.length) {
                for (let i = 0; i < this.state.selectedImage.length; i++) {
                    newData.append('image', this.state.selectedImage[i]);
                }
            }
            newData.append('sellerId', this.props.match.params.userId);
            // console.log('client side new property data', newData);
            this.props.handleUpdateProperty(newData, this.props.property.propertyId );
        }
    }

    render() {
        console.log(this.props);
        return (
            <section className='addProperty'>
                {this.state.isFormSubmitted ?
                    <div className='addProperty__section addProperty__formSubmitted--status'>
                        <h3 className="addProperty__heading addProperty__heading--status"> Thank you!!! Your property is Updated!!</h3>
                        <a href='/home' className="link button button--auth">Home</a>
                    </div> :
                    <div className='addProperty__section'>
                        <h3 className='addProperty__heading'>Edit your property</h3>
                        <form onSubmit={this.handleFormSubmit} className='addProperty__formSubmitted'>
                            <label className='input-label'> Address: </label>
                            <label className='input-label'>Street:
                                        <input type='text' name='street' className='input' defaultValue={this.props.property.address.street} onChange={this.handleChange} />
                                {this.state.streetError ? this.Alert() : ''}
                            </label>
                            <label htmlFor='city' className='input-label'>City:
                                        <input type='text' name='city' id='city' defaultValue={this.props.property.address.city}
                                    className='input' onChange={this.handleChange} />
                                {this.state.cityError ? this.Alert() : ''}
                            </label>
                            <div className='addProperty__roomWashroomContainer'>
                                <label htmlFor='rooms' className='input-label addProperty__room'>Rooms:
                                            <input type='number' name='rooms' id='rooms' className='input' min='1'
                                        defaultValue={this.props.property.rooms} onChange={this.handleChange} />
                                </label>
                                <label htmlFor='washrooms' className='input-label addProperty__room'>Washrooms:
                                            <input type='number' name='washrooms' id='washrooms' className='input'
                                        min='1' defaultValue={this.props.property.washrooms} onChange={this.handleChange} />
                                </label>
                            </div>
                            <label htmlFor='description' className='input-label'>Description:
                                        <input type='text' name='description' id='description' className='input'
                                    defaultValue={this.props.property.description} onChange={this.handleChange} />
                                {this.state.descriptionError ? this.Alert() : ''}
                            </label>
                            <label htmlFor='recentUpgrade' className='input-label'>Recent Upgrade:
                                        <input type='text' name='recentUpgrade' id='recentUpgrade' className='input'
                                    defaultValue={this.props.property.recentUpgrade} onChange={this.handleChange} />
                            </label>
                            <label htmlFor='askingPrice' className='input-label'>Asking Price:
                                        <input type='text' name='askingPrice' id='askingPrice' className='input'
                                    defaultValue={this.state.askingPrice} onChange={this.handleChange} />
                                {this.state.askingPriceError ? this.Alert() : ''}
                                {this.state.isValidPrice ? '' : this.AlertAskingPrice()}
                            </label>
                            <div className='updateProperty__imgGroup'>
                            {this.props.property.images.map((image, i) =>{
                                return (<div key={i} className='updateProperty__imgWithCross'onClick={(event) =>{this.deleteImage(event, i)} }><img  className='updateProperty__img' src={image} alt='savedPic'/>
                                        <img className='updateProperty__imgCross' src={cross} alt='cross' 
                                            /></div>)
                            })}
                            </div>
                            <label className='input-label input-label--image'>Image:
                                        <input type='file' name='image' multiple onChange={this.imageInputHandler} className='input--image' />
                            </label>
                            <input type='submit' className='button button--register' value='Update' />
                        </form>
                    </div>
                }
            </section>
        )
    }
}
export default UpdateProperty;