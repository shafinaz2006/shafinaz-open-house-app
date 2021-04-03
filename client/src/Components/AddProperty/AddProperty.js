import React from 'react';
import Cookies from 'js-cookie';
import errorIcon from '../../assets/icons/error.svg';
import './AddProperty.scss';

class AddProperty extends React.Component {
    state = {
        street: '', city: '',
        rooms: 1, washrooms: 1,
        description: '', recentUpgrade: 'Not Available',
        askingPrice: '',
        selectedImage: [],

        streetError: false, cityError: false,
        descriptionError: false, askingPriceError: false,

        isValidPrice: true, isValid: true, isFormSubmitted: false,

    }
    // Alert div after validation:

    Alert = () => <div className='input--errorContainer'>
        <img src={errorIcon} alt="error" className='input--error-img' />
        <span className='input--error-msg'>This field is required </span>
    </div>

    // Alert div (invisible)

    AlertInvisible = () => <div className='input--errorContainer-invisible'>
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
    // Form validation:

    isFormValid = () => {
        this.checkAskingPrice();
        if (this.state.streetError || this.state.cityError ||
            this.state.descriptionError || this.state.askingPriceError || !this.checkAskingPrice()) {
            this.setState({ isValid: false });
            return false;
        }
        else {
            this.setState({ isValid: true });
            return true;
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

    // Form Submit:

    handleFormSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            // console.log('Cookies in addProperty: ', Cookies.get('username'), Cookies.get('userId'));
            this.setState({ isFormSubmitted: true });
            let newData = new FormData();
            newData.append('street', this.state.street);
            newData.append('city', this.state.city);
            newData.append('rooms', this.state.rooms);
            newData.append('washrooms', this.state.washrooms);
            newData.append('description', this.state.description);
            newData.append('recentUpgrade', this.state.recentUpgrade);
            newData.append('askingPrice', this.state.askingPrice);
            if (this.state.selectedImage.length) {
                for (let i = 0; i < this.state.selectedImage.length; i++) {
                    newData.append('image', this.state.selectedImage[i]);
                }
            }
            newData.append('sellerId', Cookies.get('userId'));
            console.log('client side new property data', newData);
            this.props.handleAddProperty(newData);
        }
    }

    render() {
        let cookieName = Cookies.get('username');
        return (
            <section className='addProperty'>
                {!cookieName ? <h1>Login</h1> :
                    <div>
                        {this.state.isFormSubmitted ?
                            <div className='addProperty__formSubmitted'>
                                <h3 className="addProperty__heading addProperty__heading--status"> Thank you!!! Your property is added!!</h3>
                                <a href='/home' className="link button button--auth">Home</a>
                            </div> : <div>
                                <h3 className='addProperty__heading'>Add new property</h3>
                                <form onSubmit={this.handleFormSubmit} className='addProperty__formSubmitted'>
                                    <label className='input-label'> Address: </label>
                                    <label className='input-label'>Street:
                                        <input type='text' name='street' className='input' placeholder='street' onChange={this.handleChange} />
                                            {this.state.streetError ? this.Alert() : ''}
                                    </label>
                                    <label htmlFor='city' className='input-label'>City:
                                        <input type='text' name='city' id='city' placeholder='city'
                                            className='input' onChange={this.handleChange} />
                                        {this.state.cityError ? this.Alert() : ''}
                                    </label>
                                    <div className='addProperty__roomWashroomContainer'>
                                        <label htmlFor='rooms' className='input-label addProperty__room'>Rooms:
                                            <input type='number' name='rooms' id='rooms' className='input' min='1'
                                                placeholder='1' onChange={this.handleChange} />
                                        </label>
                                        <label htmlFor='washrooms' className='input-label addProperty__room'>Washrooms:
                                            <input type='number' name='washrooms' id='washrooms' className='input'
                                                min='1' placeholder='1' onChange={this.handleChange} />
                                        </label>
                                    </div>
                                    <label htmlFor='description' className='input-label'>Description:
                                        <input type='text' name='description' id='description' className='input'
                                            placeholder='description' onChange={this.handleChange} />
                                        {this.state.descriptionError ? this.Alert() : ''}
                                    </label>
                                    <label htmlFor='recentUpgrade' className='input-label'>Recent Upgrade:
                                        <input type='text' name='recentUpgrade' id='recentUpgrade' className='input'
                                            placeholder='recent upgrade' onChange={this.handleChange} />
                                    </label>
                                    <label htmlFor='askingPrice' className='input-label'>Asking Price:
                                        <input type='text' name='askingPrice' id='askingPrice' className='input'
                                            placeholder='100000' onChange={this.handleChange} />
                                        {this.state.askingPriceError ? this.Alert() : ''}
                                        {this.state.isValidPrice ? '' : this.AlertAskingPrice()}
                                    </label>
                                    
                                    <label className='input-label input-label--image'>Image:
                                        <input type='file' name='image' multiple onChange={this.imageInputHandler} className='input--image' />
                                    </label>
                                    <input type='submit' className='button button--register' value='Submit' />
                                </form>
                            </div>
                        }
                    </div>
                }
            </section>
        )
    }
}
export default AddProperty