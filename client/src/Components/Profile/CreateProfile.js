import React from 'react';
import './CreateProfile.scss';
import errorIcon from '../../assets/icons/error.svg';
import Cookies from 'js-cookie';

class CreateProfile extends React.Component {
    state = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        type: 'Seller',
        profession: 'Handyman',
        refereeName: '',
        refereePhone: '',
        professionList: ['Handyman', 'Painter', 'Lawyer', 'Mortgage Specialist', 'Gardener'],

        firstNameError: false, lastNameError: false, phoneError: false, emailError: false,
        refereeNameError: false, refereePhoneError: false,
        isValid: true, isValidPhone: true, isValidRefereePhone: true, isValidEmail: true,
        isFormSubmitted: false,
    }

// Alert div after validation:

    Alert = () => <div className='input--errorContainer'>
                    <img src={errorIcon} alt="error" className='input--error-img' />
                    <span className='input--error-msg'>This field is required </span>
                 </div>


// Alert div for phonenumber:

    AlertPhoneNumber = () => <div className='input--errorContainer'>
                                <img src={errorIcon} alt="error" className='input--error-img' />
                                <span className='input--error-msg'>Required format 1-111-222-3333 </span>
                            </div>

// Alert div for email:

    AlertEmail = () => <div className='input--errorContainer'>
                            <img src={errorIcon} alt="error" className='input--error-img' />
                            <span className='input--error-msg'>Enter a valid email </span>
                        </div>

    // Phone number validation:

    checkPhoneNumber = (phone) => {
        let phoneRegex = /^1?-\d{3}-\d{3}-\d{4}$/;
        let x;
        if (phone === this.state.phone) x = 'isValidPhone';
        if (phone === this.state.refereePhone) x = 'isValidRefereePhone';
        if (phone.match(phoneRegex)) {
            this.setState({ [x]: true });
            return true;
        }
        else {
            this.setState({ [x]: false });
            return false;
        }
    }

    // Email validation:

    checkValidEmail = () => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            .test(this.state.email)) {
            this.setState({ isValidEmail: true });
            return true;
        }
        else {
            this.setState({ isValidEmail: false });
            return false;
        }
    }

    // Form validation:

    isFormValid = () => {
        if (!this.state.firstName) this.setState({ firstNameError: true });
        if (!this.state.lastName) this.setState({ lastNameError: true });
        if (!this.state.phone) this.setState({ phoneError: true });
        if (!this.state.email) this.setState({ emailError: true });
        this.checkValidEmail();
        this.setState({ isValidPhone: this.checkPhoneNumber(this.state.phone) });
        let refereeError = false;
        if (this.state.type === 'Associate') {
            if (!this.state.refereeName) this.setState({ refereeNameError: true });
            if (!this.state.refereePhone) this.setState({ refereePhoneError: true });
            this.checkPhoneNumber(this.state.refereePhone);
            console.log('checking referee phone error', this.state.isValidRefereePhone)
            console.log(this.state.isValidPhone)
            refereeError = !this.checkPhoneNumber(this.state.refereePhone) || this.state.refereeNameError;
        }
        if (this.state.firstNameError || this.state.lastNameError ||
            !this.checkPhoneNumber(this.state.phone) || !this.checkValidEmail() || refereeError) {
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

// Handle form submit:

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.isFormValid()) {
            this.setState({ isFormSubmitted: true });
            let name = `${this.state.firstName[0].toUpperCase()}${this.state.firstName.slice(1)} ${this.state.lastName[0].toUpperCase()}${this.state.lastName.slice(1)}`;
            let userProfile = {
                name: name,
                userId: Cookies.get('userId'),
                phone: this.state.phone,
                email: this.state.email,
                type: this.state.type,
                profession: this.state.profession,
                refereeName: this.state.refereeName,
                refereePhone: this.state.refereePhone,
            }
            this.setState({ isFormSubmitted: true });
            this.props.handleCreateProfile(userProfile);
            event.target.reset();
        }
    }

// Check if user already has created the profile:

    checkProfileCreated = () => {
        let userId = this.props.match.params.userId;
        let user;
        let userProfile =  this.props.allUserProfiles.find(user => user.userId === userId)
        if(userProfile) user = {...userProfile};
        return user;
    }

    render() {
        let cookieName = Cookies.get('username');
        console.log(this.checkProfileCreated());
        return (
            <section className='createProfile'>
                {!cookieName ?
                    <div className='createProfile__section createProfile__formSubmitted'>
                        <h3 className="createProfile__heading createProfile__heading--status"> Please login to create profile.</h3>
                        <a href='/login' className="link button">Login</a>
                    </div> : ''
                }
                {(this.state.isFormSubmitted || this.checkProfileCreated()) ?
                    <div className='createProfile__formSubmitted'>
                        <h3 className="createProfile__heading createProfile__heading--status"> Your profile is created!!</h3>
                        <a href={`/users/${Cookies.get('userId')}/profile`} className="link button">View Profile</a>
                    </div> :
                    <div className='createProfile__section'>
                        <h3 className='createProfile__heading'>Complete your profile</h3>
                        <form className='createProfile__reg-form' onSubmit={(event) => this.handleSubmit(event)}>
                            <div className='createProfile__infoContainer'>
                            <label className='input-label' htmlFor='firstName'>First Name:
                            <input type='text' name='firstName' id='firstName' className='input' placeholder='first name' onChange={this.handleChange} />
                                {this.state.firstNameError ? this.Alert() : ''}
                            </label>
                            <label className='input-label' htmlFor='lastName'>Last Name:
                                <input type='text' name='lastName' id='lastName' className='input' placeholder='last name' onChange={this.handleChange} />
                                {this.state.lastNameError ? this.Alert() : ''}
                            </label>
                            <label className='input-label' htmlFor='phone'>Phone Number (1-111-222-3333):
                            <input type='tel' name='phone' id='phone'
                                    className='input' placeholder='1-111-222-3333' onChange={this.handleChange} />
                                {this.state.isValidPhone ? '' : this.AlertPhoneNumber()}
                                {this.state.phoneError ? this.Alert() : ''}
                            </label>
                            <label htmlFor='email' className='input-label'>Email:
                            <input type='text' name='email' id='email'
                                    className='input' onChange={this.handleChange} />
                                {this.state.emailError ? this.Alert() : ''}
                                {this.state.isValidEmail ? '' : this.AlertEmail()}
                            </label>
                            <div className='createProfile__type'>
                                <label className='input-label input-label--radio'>Which type of user?</label>
                                <div className='createProfile__typeRadio'>
                                    <input type='radio' name='type' id='type-seller'
                                        className='radio' value='Seller'
                                        defaultChecked={this.state.type === 'Seller'} onChange={this.handleChange}
                                    />
                                    <label htmlFor='type-seller' className='input-label input-label--radio'>Seller </label>
                                </div>
                                <div className='createProfile__typeRadio'>
                                    <input type='radio' name='type' id='type-associate'
                                        className='radio' value='Associate'
                                        defaultChecked={this.state.type !== 'Seller'} onChange={this.handleChange}
                                    />
                                    <label htmlFor='type-associate' className='input-label input-label--radio'>Associate </label>
                                </div>
                            </div>
                            </div>
                            {this.state.type === 'Associate' ?
                                <div className='createProfile__infoContainer'>
                                    <label htmlFor='profession' className='input-label'>Profession: </label>
                                    <select name='profession' id='profession'
                                        className='select'
                                        defaultValue={'Handyman'}
                                        onChange={this.handleChange} >
                                        {this.state.professionList.map(professionName =>
                                            <option key={professionName} name={professionName} value={professionName}
                                                defaultValue={professionName === 'Handyman'}>
                                                {professionName}
                                            </option>
                                        )}
                                    </select>
                                    <h3 className='createProfile__heading'>Referee Information: </h3>
                                    <label className='input-label' htmlFor='refereeName'>Referee Name:
                                        <input type='text' name='refereeName' id='refereeName' className='input' placeholder='referee name' onChange={this.handleChange} />
                                        {this.state.refereeNameError ? this.Alert() : ''}
                                    </label>
                                    <label className='input-label' htmlFor='refereePhone'>Referee Phone Number (1-111-222-3333):
                                <input type='tel' name='refereePhone' id='refereePhone'
                                            className='input' placeholder='1-111-222-3333' onChange={this.handleChange} />
                                        {this.state.isValidRefereePhone ? '' : this.AlertPhoneNumber()}
                                        {this.state.refereePhoneError ? this.Alert() : ''}
                                    </label>
                                </div> : ''
                            }
                            <input className='button button--alignEnd' type='submit' value='Create Profile' />
                        </form>
                    </div>
                }
            </section>
        )
    }
}
export default CreateProfile;