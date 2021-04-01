import React from 'react';
import './CreateProfile.scss';
import errorIcon from '../../assets/icons/error.svg';
import Cookies from 'js-cookie';

class CreateProfile extends React.Component{
    state = {
        firstName:'',
        lastName:'',
        phone:'',
        email:'',
        type:'Seller',
        profession:'Handyman',
        refereeName:'',
        refereePhone:'',
        professionList:['Handyman', 'Painter', 'Lawyer', 'Mortgage Specialist', 'Gardener'],

        firstNameError:true, lastNameError:true, phoneError:true,  emailError:true,
        refereeNameError:true, refereePhoneError:true,
        isValid: true, isValidPhone: true, isValidRefereePhone: true, isValidEmail: true,
        isFormSubmitted: false,


    }



// Alert div after validation:

    Alert = () =><div className='input--errorContainer'>
                    <img src={errorIcon} alt="error" className='input--error-img' />
                    <span className='input--error-msg'>This field is required </span>
                </div>

// Alert div (invisible)

    AlertInvisible = () =>  <div className='input--errorContainer-invisible'>
                                <img src={errorIcon} alt="error" className='input--error-img' />
                                <span className='input--error-msg'>This field is required </span>
                            </div>

// Alert div for phonenumber:

    AlertPhoneNumber = () => <div className='input--errorContainer'>
                                <img src={errorIcon} alt="error" className='input--error-img'  />
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
        let x = (phone === this.state.phone)? 'isValidPhone': 'isValidRefereePhone';
        if(phone.match(phoneRegex)){
            this.setState({[x]: true});
            return true;
        }
        else{
            this.setState({[x]: false});
            return false;
        }
    }

// Email validation:

    checkValidEmail = () => {
        
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            .test(this.state.email)) {
                this.setState({isValidEmail: true});
                return true;
            }
        else{
            this.setState({isValidEmail: false});
            return false;
        }
    } 

// Form validation:

    isFormValid = () => {
        this.checkValidEmail();
        this.checkPhoneNumber(this.state.phone);
        let refereeError = false;
        if(this.state.type==='Associate'){
            refereeError = !this.checkPhoneNumber(this.state.refereePhone) || this.state.refereeNameError;
        }
        if(this.state.firstNameError || this.state.lastNameError ||
            !this.checkPhoneNumber(this.state.phone) || !this.checkValidEmail() || refereeError) {
                
                this.setState({isValid: false});
                return false;
        }
        else{
           
            this.setState({isValid: true});
            return true;
        }
    }

// handle onChange:

    handleChange= (event) =>{
        let x = event.target.name + 'Error'
        // console.log(event.target.value)
        if(event.target.value === ''){ this.setState({[x]: true}); }
        else { this.setState({[x]: false});   }
        this.setState({[event.target.name]: event.target.value})
        
    }
// Handle form submit:

    handleSubmit = (event) =>{
        event.preventDefault();
        
        if(this.isFormValid()){
            this.setState({isFormSubmitted: true});
            let name= `${this.state.firstName[0].toUpperCase()}${this.state.firstName.slice(1)} ${this.state.lastName[0].toUpperCase()}${this.state.lastName.slice(1)}`;
            
            let userProfile = {
                name: name,
                phone: this.state.phone,
                email: this.state.email,
                type: this.state.type,
                profession: this.state.profession,
                refereeName: this.state.refereeName,
                refereePhone: this.state.refereePhone,
            }
            this.setState({isFormSubmitted: true});
            this.props.handleCreateProfile(userProfile);
            event.target.reset();
        }
        
    }

    render(){
        //console.log('currentuser', Cookies.get('username'), Cookies.get('userId'));
        let cookieName = Cookies.get('username');
        //console.log('username from cookie', cookieName)
        return(
            <section className='createProfile'>
                {!cookieName? <h1>Login</h1>: 
                <div>
                {this.state.isFormSubmitted ? 
                    <div className='createProfile__formSubmitted'>
                        <h3 className="createProfile__subheading"> Thank you!!! Your profile is created!!</h3>
                        <a href = '/home' className="link button">Home</a>
                    </div> : 
                   <div>
                    <h2 className='createProfile__heading'>Complete your profile</h2>
                    <form className='createProfile__form' onSubmit={(event)=>this.handleSubmit(event)}>
                        <label className='input-label' htmlFor='firstName'>First Name </label>
                        <input type='text' name='firstName' id='firstName' className='input' placeholder='first name' onChange={this.handleChange}/>
                        {this.state.firstNameError? this.Alert(): this.AlertInvisible() }
                        <label className='input-label' htmlFor='lastName'>Last Name </label>
                        <input type='text' name='lastName' id='lastName' className='input' placeholder='last name' onChange={this.handleChange}/>
                        {this.state.lastNameError? this.Alert(): this.AlertInvisible() }
                        <label className='input-label' htmlFor='phone'>Phone Number (1-111-222-3333) </label>
                        <input type='tel' name='phone' id='phone' 
                        className='input' placeholder='1-111-222-3333' onChange={this.handleChange}/>
                        {this.state.isValidPhone? '': this.AlertPhoneNumber()}
                        {this.state.phoneError? this.Alert(): this.AlertInvisible()}
                        <label htmlFor='email' className='input-label'>Email</label>
                        <input type='text' name='email' id='email'
                                className='input' onChange={this.handleChange} />
                        {this.state.emailError? this.Alert(): '' }
                        {this.state.isValidEmail? this.AlertInvisible(): this.AlertEmail()}
                        <div className='createProfile__type'>
                            <label className='input-label'>Which type of user?</label>
                            <div className='createProfile__typeRadio'>
                                <input type='radio' name='type' id='type-seller'
                                        className='radio' 
                                        value='Seller'
                                        defaultChecked={this.state.type==='Seller'}
                                        onChange={this.handleChange}
                                />
                                <label htmlFor='type-seller' className='input-label'>Seller </label>
                            </div>
                            <div className='createProfile__typeRadio'>
                                <input type='radio' name='type' id='type-associate'
                                        className='radio' 
                                        value='Associate'
                                        defaultChecked={this.state.type !=='Seller'}
                                        onChange={this.handleChange}
                                />
                                <label htmlFor='type-associate' className='input-label'>Associate </label>
                            </div>
                        </div>
                        {
                            this.state.type==='Associate'? 
                            <div className='createProfile__associateDiv'>
                                <label htmlFor='profession' className='input-label'>Profession</label>
                                <select name='profession' id='profession'
                                    className='select' 
                                    defaultValue={'Handyman'}
                                    onChange={this.handleChange} >
                                    {this.state.professionList.map(professionName =>
                                            <option key={professionName} name= {professionName} value={professionName}
                                                    defaultValue={professionName === 'Handyman'}>
                                                {professionName}
                                            </option>
                                    )}
                            </select>
                                <h3 className='createProfile__subHeader'>Referee Information </h3>
                                <label className='input-label' htmlFor='refereeName'>Referee Name </label>
                                <input type='text' name='refereeName' id='refereeName' className='input' placeholder='referee name' onChange={this.handleChange}/>
                                {this.state.refereeNameError? this.Alert(): this.AlertInvisible() }
                                <label className='input-label' htmlFor='refereePhone'>Referee Phone Number (1-111-222-3333) </label>
                                <input type='tel' name='refereePhone' id='refereePhone' 
                                className='input' placeholder='1-111-222-3333' onChange={this.handleChange}/>
                                {this.state.isValidRefereePhone? '': this.AlertPhoneNumber()}
                                {this.state.refereePhoneError? this.Alert(): this.AlertInvisible()}
                            </div>: ''
                        }
                        <input className='button button--create-profile' type='submit'value='Create Profile'/>
                    </form>
                </div>
                }
                </div>
                }
            </section> 
            
        )
    }
}
export default CreateProfile;